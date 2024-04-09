import React from 'react';
import { useEffect } from 'react';
import { Link, Table } from '@arco-design/web-react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addSubmission, setStartBlock } from '../Features/submissionsSlice';
import contractABI from '../Docs/MlContract.json';
import Web3 from 'web3';

const columns = [
    {
        title: 'Client ID',
        dataIndex: 'clientId',
        sorter: (a, b) => Number(a.clientId) - Number(b.clientId),
    },
    {
        title: 'Weight Address',
        dataIndex: 'weightsAddress',
        sorter: (a, b) => a.weightsAddress.length - b.weightsAddress.length,
    },
    {
        title: 'Reputation',
        dataIndex: 'reputation',
        sorter: (a, b) => Number(a.reputation) - Number(b.reputation),
    }
];

const tableStyle = { width: '80%', padding: '50px', position: 'relative', left: '10%' }

const AllSubmissions = () => {
    const { id } = useParams();
    const submittedItems = useSelector((state) => state.submissions.submittedItems);
    const currentBlock = useSelector((state) => state.contracts.startBlock);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Current Block: ", submittedItems);
        async function getCurrentSubmissions() {
            try {
                const web3 = new Web3(window.ethereum);
                const currcontract = new web3.eth.Contract(contractABI.abi, id);
                const results = await currcontract.getPastEvents('SubmissionDone', {
                    fromBlock: 0,
                    toBlock: 'latest'
                });
                let latestBlock = 0;

                // console.log('Results', results[0])
                results.forEach(record => {
                    // event SubmissionDone(uint256 _clientId, string _weightsAddress, uint256 _reputation, uint256 _timestamp);
                    const row = {
                        clientId: Number(record.returnValues['_clientId']),
                        weightsAddress: record.returnValues['_weightsAddress'],
                        reputation: Number(record.returnValues['_reputation']),
                        currentBlock: Number(record.returnValues['_block']),
                        id: id
                    }
                    latestBlock = Math.max(Number(record.returnValues['_block']), latestBlock);
                    dispatch(addSubmission(row));
                });
                dispatch(setStartBlock(latestBlock));
            } catch (error) {
                console.error("Error Message is: ", error);
            }
        }
        getCurrentSubmissions();
    }, [id]);

    return (
        <div>
            <Table columns={columns} data={submittedItems} style={tableStyle} />
        </div>
    );




}

export default AllSubmissions;