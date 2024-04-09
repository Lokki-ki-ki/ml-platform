
const get_contract = async (web3, contract_abi, contract_address) => {
    try {
        const contract = new web3.eth.Contract(contract_abi, contract_address);
        return contract
    } catch (e) {
        console.log("Erorr when get the contract", e);
    }
}

export {get_contract};
