import React from "react";
import Web3 from "web3";
import { Button, Input, Notification, Divider, Link } from '@arco-design/web-react';
import { IconCheckCircle } from '@arco-design/web-react/icon';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addSubmission } from "../Features/submissionsSlice";
import AllSubmissions from "../Components/AllSubmissions";
const contractABI = require('../Docs/MlContract.json');


const SubmitModel = () => {
    const { id } = useParams();
    const [weightAdd, setWeightAdd] = useState('');
    const [deposit, setDeposit] = useState(0);
    const [dataAdd, setDataAdd] = useState('');
    const [labelAdd, setLabelAdd] = useState('');
    const currentAccount = useSelector((state) => state.loginAccount.currentAccount);
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        Notification.warning({
            style: {position: 'topRight'},
            id: 'submitting',
            title: 'Model Submitted',
            content: 'Will update after submitted...',
            duration: 3000
        });
        // Check type of weightAdd and deposit
        // Check whether the string deposit can be converted into number
        if (typeof weightAdd !== 'string' || typeof parseInt(deposit) !== 'number') {
            Notification.error({
                style: {position: 'topRight'},
                id: 'error',
                title: 'Submission Errors',
                content: 'Please input the correct type of weight address and deposit amount',
                duration: 3000
            });
            return;
        }
        const web3 = new Web3(window.ethereum);
        const currcontract = new web3.eth.Contract(contractABI.abi, id);
        try {
            const validate = await currcontract.methods.submitWeights(weightAdd).call({from: currentAccount, gasPrice: '20', value: web3.utils.toWei(deposit.toString(), 'wei')});
        } catch (error) {
            Notification.error({
                style: {position: 'topRight'},
                id: 'error',
                title: 'Submission Errors',
                content: `Your model has not been submitted because of error: ${error}`,
            });
            console.error("Error Message is: ", error.data.message);
            return;
        }

        try {

            const estimate = await currcontract.methods.submitWeights(weightAdd).estimateGas({from: currentAccount, gasPrice: '20', value: 1000000000000000000});
            const txs = await currcontract.methods.submitWeights(weightAdd).send({from: currentAccount, gasPrice: '20', value: web3.utils.toWei(deposit.toString(), 'wei')});
            // console.log("Estimate: ", txs);
            const event = txs.events.SubmissionDone.returnValues;
            // console.log("Event: ", event);
            const row = {
                clientId: Number(event['_clientId']),
                weightsAddress: event['_weightsAddress'],
                reputation: Number(event['_reputation']),
                currentBlock: Number(event['_block']),
                id: id
            }
            dispatch(addSubmission(row));
            Notification.success({
                style: {position: 'topRight'},
                id: 'submitting',
                title: 'Model Submitted',
                content: `Your model has been submitted successfully with txs hash: ${txs.transactionHash}`,
            });
            
        } catch (error) {
            Notification.error({
                style: {position: 'topRight'},
                id: 'error',
                title: 'Submission Errors',
                content: `Your model has not been submitted because of error: ${error}`,
            });
            console.error("Error Message is: ", error);
        }

    }

    const startEvaluation = async () => {
    // function startEvaluation(string memory testDataAddress, string memory testDataLabelAddress) public onlyParticipants onlySubmission {
        Notification.normal({
            style: {position: 'topRight'},
            id: 'evaluating',
            title: 'Model Submitted',
            content: 'Will update after evaluation is done...',
            duration: 5000
        });
        const web3 = new Web3(window.ethereum);
        const currcontract = new web3.eth.Contract(contractABI.abi, id);
        
        try {
            const txs = await currcontract.methods.startEvaluation(dataAdd, labelAdd).call({from: currentAccount});
            console.log("Txs: ", txs);
            Notification.success({
                style: {position: 'topRight'},
                id: 'evaluating',
                title: 'Evaluation Started',
                content: `The evaluation has been started successfully with txs hash: ${txs}`,
            });
        } catch (error) {
            const msg = error.data.message || error;
            Notification.error({
                style: {position: 'topRight'},
                id: 'error',
                title: 'Evaluation Errors',
                content: `The evaluation has not been started because of error: ${msg}`,
            });
            console.error("Error Message is: ", msg);
        }
    }

    return (
        <div>
            <h1><IconCheckCircle /> Your are submitting model to:<Link icon>{id}</Link></h1>
            <Divider />
            <div>
                <div>
                    <Input placeholder='Please input model address' onChange={(e) => setWeightAdd(e)} style={{ width:"30%", margin: 20 }}></Input>
                </div>
                <div>
                    <Input placeholder='Please input deposit amount' onChange={(e) => setDeposit(e)} style={{ width:"30%", margin: 20 }}></Input>
                </div>
                <div style={{ 'justify-content': 'space-between', padding: '10px'}}>
                <Button type="outline" className="submit-button" onClick={handleSubmit}><span>Submit the models</span></Button>
                {/* <Button onClick={ () => {}}>Test</Button> */}
                </div>
            </div>
            <Divider />
            <div>
                <h1>Models submitted for this contract:</h1>
                <AllSubmissions />
            </div>
            <Divider />
            <div>
                <h1>Start Evaluation</h1>
                <p>The time range for this contract is setted by the initializers, if the submission deadline arrives, the initializer can start the evaluations, other participants can only start the evaluation when the initializer doesn't show up.</p>
                <div>
                    <Input placeholder='Please input data address' onChange={(e) => setDataAdd(e)} style={{ width:"30%", margin: 20 }}></Input>
                </div>
                <div>
                    <Input placeholder='Please input labels amount' onChange={(e) => setLabelAdd(e)} style={{ width:"30%", margin: 20 }}></Input>
                </div>
                <Button type="primary" onClick={startEvaluation}>Start Evaluation</Button>
            </div>

        </div>
    );
};

export default SubmitModel;