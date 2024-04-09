import React from "react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";
import { addContractAddress, clearContractAddress } from "../Features/contractsSlice";
import { useSelector, useDispatch } from 'react-redux'
import { Table } from "@arco-design/web-react";
const contractABI = require('../Docs/MlPlatformFactory.json');

const columns = [
    {
        title: 'Contract',
        dataIndex: '',
        render: (col, record, index) => {
            return <span>{record}</span>
        },
    },
    {
        title: 'Link', 
        dataIndex : 'link', 
        render: (col, record, index) => {
            return <Link to={`/contracts/${record}`}>Link</Link>
    }}
];

const tableStyle = {width: '80%', padding: '50px', position: 'relative', left: '10%'}

const UserInfo = () => {
    const accounts = useSelector((state) => state.loginAccount.accounts);
    const currentAccount = useSelector((state) => state.loginAccount.currentAccount);
    const platformAddress = useSelector((state) => state.contracts.platformAddress);
    const contractAddress = useSelector((state) => state.contracts.contractAddress);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log('UserInfo +1');
        setIsLoading(true);
        dispatch(clearContractAddress());
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI.abi, platformAddress);
        async function getContractList() {
            if (currentAccount === null) {
                setIsLoading(false);
                return;
            }

            try {
                console.log("Current Account: ", currentAccount);
                const results = await contract.methods.getContractList(currentAccount).call({from: currentAccount});
                results.forEach(async item => {
                    const add = await contract.methods.idToContract(Number(item)).call({from: accounts[0]});
                    if (add.length > 0) {
                        console.log("Result: ", add);
                        dispatch(addContractAddress(add));
                    }
                })
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error("Error Message is: ", error);
            }
        }
        getContractList();
    }, [currentAccount]);


    return (
        <div>
                <div>
                    <Table ></Table>
                    <p>Current Account: {isLoading? <p>Loading...</p> : currentAccount} </p>
                    <h1>Your Contracts:</h1>
                    <p>
                    {
                        isLoading? <Table tableLayoutFixed={true} style={tableStyle} loading columns={columns} /> :
                        <Table tableLayoutFixed={true} style={tableStyle} columns={columns} data={contractAddress} /> 
                    }
                    </p>
                </div>
        </div>
    );

};

export default UserInfo;