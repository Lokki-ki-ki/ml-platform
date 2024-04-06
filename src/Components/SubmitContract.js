import React from "react";
import { useRef } from "react";
import { Form, Input, Button, Checkbox, Divider, Notification, Message } from '@arco-design/web-react';
import { useState } from "react";
import Web3 from "web3";
import contractABI from '../Docs/MlPlatformFactory.json';
import { useSelector, useDispatch } from "react-redux";
import { addWholePlatformContractAddress } from "../Features/contractsSlice";
import { addContractAddress } from "../Features/contractsSlice";
const FormItem = Form.Item;


const SubmitContract = () => {
    const formRef = useRef();
    const platformAddress = useSelector((state) => state.contracts.platformAddress);
    const currentAccount = useSelector((state) => state.loginAccount.currentAccount);
    const [values, setValues] = useState({});
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    

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
        try {
            console.log("Current Account: ", currentAccount);
            const web3 = new Web3(window.ethereum);
            const currcontract = new web3.eth.Contract(contractABI.abi, platformAddress);
            // const estimate = await currcontract.methods.createMlPlatform(values.contract.modelAddress, values.contract.datahash, values.contract.labelhash).estimateGas({from: currentAccount, gasPrice: '20000', value: web3.utils.toWei('1', 'ether')});
            const res = await currcontract.methods.createMlPlatform(values.contract.modelAddress, values.contract.datahash, values.contract.labelhash).send({from: currentAccount, gasPrice: '20000', value: web3.utils.toWei('1', 'ether'), });
            const event = res.events.MlPlatformCreated.returnValues;
            // console.log("Event: ", event);
            // console.log("Transaction Hash: ", typeof event.mlPlatformAddress, typeof event.owner, typeof event.contractId);
            const row = {
                mlPlatformAddress: event.mlPlatformAddress, owner: event.owner, contractId: Number(event.contractId)
            }
            console.log(row);
            console.log("Error", typeof row);
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
            console.error("Error Message is: ", error);
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
            <FormItem label='Model Address' field='contract.modelAddress' tooltip={<div>Model Address is required </div>} rules={[{ required: true }]} >
            <Input style={{ width: '80%' }} placeholder='please enter your model file cid...' />
            </FormItem>
            <FormItem label='Data Hash' field='contract.datahash' tooltip={<div>Test data hash is required </div>} rules={[{ required: true }]}>
            <Input style={{ width: '80%' }} placeholder='please enter your test data hash...' />
            </FormItem>
            <FormItem label='Label Hash' field='contract.labelhash' tooltip={<div>Test label hash is required </div>} rules={[{ required: true }]}>
                <Input style={{ width: '80%' }} placeholder="Please enter the test label hash..." />
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