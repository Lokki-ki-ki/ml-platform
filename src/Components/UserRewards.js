import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addReward } from '../Features/submissionsSlice.js';
import Web3 from 'web3';
import { Table } from '@arco-design/web-react';
const contractABI = require('../Docs/MlContract.json');

const columns = [
    {
        title: 'Client ID',
        dataIndex: 'clientId',
        sorter: (a, b) => a.clientId - b.clientId,
    },
    {
        title: 'Reward',
        dataIndex: 'reward',
        sorter: (a, b) => a.reward - b.reward,
    },
    {
        title: 'Round of Trainning',
        dataIndex: 'roundOfTrainning',
        sorter: (a, b) => a.roundOfTrainning - b.roundOfTrainning,
    }
]

const UserRewards = () => {
    // Get the contract id from the url
    const { id } = useParams();
    const currentAccount = useSelector((state) => state.loginAccount.currentAccount);
    const rewards = useSelector((state) => state.submissions.rewards);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('test');
        const web3 = new Web3(window.ethereum);
        const currentcontract = new web3.eth.Contract(contractABI.abi, id);
        
        const getRewardsCurrentContract = async () => {
            const res = await currentcontract.getPastEvents('RewardPaid', {
                fromBlock: 0,
                toBlock: 'latest'
            });
            res.forEach(record => {
                const row = {
                    clientId: Number(record.returnValues['_clientId']),
                    reward: Number(record.returnValues['_reward']),
                    roundOfTrainning: Number(record.returnValues['_roundOfTraining']),
                }
                dispatch(addReward(row));
            });
        };
        getRewardsCurrentContract();

    }, [currentAccount]);

    return (
        <div>
            <h1>Current Rewards</h1>
            <Table data={rewards} columns={columns} />
        </div>
    );

};

export default UserRewards;