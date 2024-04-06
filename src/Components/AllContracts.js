import React from "react";
import Web3 from "web3";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table } from "@arco-design/web-react";
import { addWholePlatformContractAddress } from "../Features/contractsSlice";
import { type } from "@testing-library/user-event/dist/type";
const contractABI = require('../Docs/MlPlatformFactory.json');

const columns = [
    {
      title: 'Contract',
      dataIndex: 'mlPlatformAddress',
      sorter: (a, b) => a.mlPlatformAddress.length - b.mlPlatformAddress.length,
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      sorter: (a, b) => a.owner - b.owner,
    },
    {title: 'Link', 
    dataIndex : 'link', 
    render: (col, record, index) => {
        return <Link to={`/contracts/${record.mlPlatformAddress}`}>Link</Link>
        // return <span>{record}</span>
    }}
];

const tableStyle = {width: '80%', padding: '50px', position: 'relative', left: '10%'}


const AllContracts = () => {

    const platformAddress = useSelector((state) => state.contracts.platformAddress);
    const allcontractAddressItem = useSelector((state) => state.contracts.allcontractAddressItem);
    // const [allContracts, setAllContracts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        setIsLoading(true);
        async function getAllContracts() {
            const web3 = new Web3("http://127.0.0.1:7545");
            const contract = new web3.eth.Contract(contractABI.abi, platformAddress);
            try {
                const results = await contract.getPastEvents('MlPlatformCreated', {
                    fromBlock: 0,
                    toBlock: 'latest'
                });
                results.forEach(record => {
                    const row = {
                        mlPlatformAddress: record.returnValues['mlPlatformAddress'],
                        owner: record.returnValues['owner'],
                        contractId: Number(record.returnValues['contractId'])
                    }
                    console.log("Test", typeof row);
                    dispatch(addWholePlatformContractAddress(row));
                });
                setIsLoading(false);
            } catch (error) {
                console.error("Error Message is: ", error);
                setIsLoading(false);
            }
        }
        getAllContracts();

    }, [])


    return (
        <div>
            <h1>All Contracts</h1>
            <div>
                {
                    isLoading ? <Table tableLayoutFixed={true} style={tableStyle} loading columns={columns}/> :
                    <Table tableLayoutFixed={true} style={tableStyle} columns={columns} data={allcontractAddressItem} />
                }
            </div>
        </div>
    );
};

export default AllContracts;