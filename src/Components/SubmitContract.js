import React from "react";
import { useRef } from "react";
import { Form, Input, Button, Checkbox, Divider, Notification, Message } from '@arco-design/web-react';
import { useState } from "react";
import Web3 from "web3";
import contractABI from '../Docs/MlPlatformFactory.json';
import { useSelector, useDispatch } from "react-redux";
import { addWholePlatformContractAddress } from "../Features/contractsSlice";
import { addContractAddress } from "../Features/contractsSlice";
import { convertTimestampToDate } from "../Utils/date_utils";
const FormItem = Form.Item;


const SubmitContract = () => {
    const formRef = useRef();
    const platformAddress = useSelector((state) => state.contracts.platformAddress);
    const currentAccount = useSelector((state) => state.loginAccount.currentAccount);
    const [values, setValues] = useState({});
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    
    // Function to convert date to timestamp with range
    const convertDateToTimestamp = (range) => {
        const ddl = new Date();
        ddl.setDate(ddl.getDate() + Number(range));
        // console.log(ddl);
        const timestamp = Math.floor(ddl.getTime() / 1000);
        console.log("Timestamp is:", typeof timestamp, timestamp);
        return timestamp;
    };


    async function handleSubmit() {
        if(!checked) {
            Message.warning('Please read the manual and click the checkbox to proceed!')
            return;
        }
        Notification.warning({
            style: {position: 'topRight'},
            id: 'submitting',
            title: 'Contract Submitted',
            content: 'Will update after submitted...',
            duration: 3000
        });
        
        const web3 = new Web3(window.ethereum);
        const currcontract = new web3.eth.Contract(contractABI.abi, platformAddress);
        // console.log('check', typeof values.contract.range);
        const ddlTimestamp = convertDateToTimestamp(values.contract.range);
        console.log('check', ddlTimestamp)
        // get current timestamp
        const current = web3.eth.getBlock('latest').timestamp;
        console.log('current timestamp', current);
        const depositReq = values.contract.deposit ? Number(values.contract.deposit) : 100;
        try {
            const res = await currcontract.methods.createMlPlatform(values.contract.modelAddress, values.contract.datahash, values.contract.labelhash, ddlTimestamp, depositReq)
                .call({from: currentAccount, gasPrice:'21000', value: web3.utils.toWei('1', 'ether')});
        } catch (error) {
            const msg = error.data.message;
            console.log(error);
            Notification.error({
                style: {position: 'topRight'},
                id: 'error',
                title: 'Submission Errors',
                content: `Your contract has not been submitted because of error: ${msg}`,
            });
            return;
        };
        try {
            const res = await currcontract.methods.createMlPlatform(values.contract.modelAddress, values.contract.datahash, values.contract.labelhash, ddlTimestamp, depositReq).send({from: currentAccount, gasPrice:'21000', value: web3.utils.toWei('1', 'ether'), });
            const event = res.events.MlPlatformCreated.returnValues;
            const row = {
                mlPlatformAddress: event.mlPlatformAddress,
                owner: event.owner, contractId: Number(event.contractId), 
                ddlDate: convertTimestampToDate(Number(event.ddlTimestamp)).toUTCString(), 
                ddlTimestamp: Number(event.ddlTimestamp),
                depositRequired: Number(event.depositRequired)
            }
            dispatch(addWholePlatformContractAddress(row));
            dispatch(addContractAddress(event.mlPlatformAddress));
            Notification.success({
                style: {position: 'topRight'},
                id: 'submitted',
                title: 'Contract Submitted',
                content: `Your contract has been submitted successfully with txs hash: ${res.transactionHash}`,
                duration: 3000
            });
            formRef.current.resetFields();
            setValues({});
            setChecked(false);
        } catch (error) {
            // console.error("Error Message is: ", error);
            console.log(error);
            Notification.error({
                style: {position: 'topRight'},
                id: 'error',
                title: 'Submission Errors',
                content: `Your model has not been submitted because of error: ${error}`,
            });
        }

        


    }
    return (
        <div>
        <Form style={{ padding: 10, width: '50%', maxWidth: 800, position: 'relative', left: '30%'}} autoComplete='off'
            ref={formRef}
            onValuesChange={(_, values) => {
                setValues(values);
                console.log(values);
            }}
            >
            <FormItem label='Model Address' field='contract.modelAddress' tooltip={<div>Model Address is required. </div>} rules={[{ required: true }]} >
            <Input style={{ width: '80%' }} placeholder='please enter your model file cid...' />
            </FormItem>
            <FormItem label='Data Hash' field='contract.datahash' tooltip={<div>Test data hash is required. </div>} rules={[{ required: true }]}>
            <Input style={{ width: '80%' }} placeholder='please enter your test data hash...' />
            </FormItem>
            <FormItem label='Label Hash' field='contract.labelhash' tooltip={<div>Test label hash is required. </div>} rules={[{ required: true }]}>
                <Input style={{ width: '80%' }} placeholder="Please enter the test label hash..." />
            </FormItem>
            <FormItem label='DDL Range' field='contract.range' tooltip={<div>The Time Range the competition is expected to end. </div>}>
                <Input style={{ width: '80%' }} placeholder="Please enter the DDL Range..." />
            </FormItem>
            <FormItem label='Deposite Req' field='contract.deposit' tooltip={<div>The minimum deposit the participant should pay, default 100. </div>}>
                <Input style={{ width: '80%' }} placeholder="Please enter the deposit Req amount..." />
            </FormItem>
            <FormItem label='Initial Reward' field='contract.reward' tooltip={<div>The initial reward to put into the contract. </div>}>
                <Input style={{ width: '80%' }} placeholder="Please enter the initial reward amount..." />
            </FormItem>
            <FormItem>
            <Checkbox onChange={(e) => {setChecked(e)}}>I have read the manual</Checkbox>
            </FormItem>
            <FormItem>
            <Button type='primary' onClick={handleSubmit} >Submit</Button>
            </FormItem>
        </Form>
        </div>
    )
};

export default SubmitContract;