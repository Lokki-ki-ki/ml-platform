import React from 'react';
import Web3 from 'web3';
import { errorMessages } from '../Utils/message_utils';
import { convertDateToTimestamp } from '../Utils/date_utils';
import { useState } from 'react';
import { Input, Button } from '@arco-design/web-react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const contractABI = require('../Docs/MlContract.json');




const StartNextRound = () => {

    const id = useParams();
    const [minDeposit, setMinDeposit] = useState(0);
    const [newDdl, setNewDdl] = useState(0);
    const [nextRoundDeposit, setNextRoundDeposit] = useState(0);
    const [testData, setTestData] = useState('');
    const [testLabel, setTestLabel] = useState('');
    const [round, setRound] = useState(0);
    const currentAccount = useSelector((state) => state.loginAccount.currentAccount);

    const startNextRound = async () => {
        const web3 = new Web3(window.ethereum);
        const currcontract = new web3.eth.Contract(contractABI.abi, id);
        const newDeposit = parseInt(nextRoundDeposit);
        const newDdlTimestamp = convertDateToTimestamp(Number(newDdl));
        
        try {
            await currcontract.methods.startNextRound(newDdlTimestamp, testData, testLabel).call({ from: currentAccount, gasPrice: '21000', value: web3.utils.toWei(newDeposit, "wei")});
            const txs = await currcontract.methods.startNextRound(newDdlTimestamp, testData, testLabel).send({ from: currentAccount, gasPrice: '21000', value: web3.utils.toWei(newDeposit, "wei")});
            Notification.success({
                style: {position: 'topRight'},
                id: 'nextRound',
                title: 'Next Round Started',
                content: `The next round has been started successfully with txs hash: ${txs}`,
            });
        } catch (error) {
            const msg = errorMessages(error);
            Notification.error({
                style: {position: 'topRight'},
                id: 'error',
                title: 'Next Round Errors',
                content: `The next round has not been started because of error: ${msg}`,
            });
            console.error("Error Message is: ", msg);
        }
    }


    return (
        <div>
            <div><Input placeholder="Please put ddl for next round" onChange={(e) => setNewDdl(e)} style={{ width:"30%", margin: 20 }}></Input></div>
            <div><Input placeholder="Please put reward for next round" onChange={(e) => setNextRoundDeposit(e)} style={{ width:"30%", margin: 20 }}></Input></div>
            <div><Input placeholder="Please put test data hash" onChange={(e) => setTestData(e)} style={{ width:"30%", margin: 20 }}></Input></div>
            <div><Input placeholder="Please put test label hash" onChange={(e) => setTestLabel(e)} style={{ width:"30%", margin: 20 }}></Input></div>
            <Button onClick={startNextRound}>Start Next Round</Button>
        </div>
    );

};

export default StartNextRound;