
const get_contract = async (web3, contract_abi, contract_address) => {
    try {
        const contract = new web3.eth.Contract(contract_abi, contract_address);
        return contract
    } catch (e) {
        console.log("Erorr when get the contract", e);
    }
}

const pre_require_check = () => {
    if (window.ethereum) {
        return true;
    }
    return false;
}

export {get_contract, pre_require_check};
