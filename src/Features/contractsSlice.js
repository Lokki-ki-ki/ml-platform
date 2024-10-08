/*
This store is for platform related variables.
*/
import { createSlice } from "@reduxjs/toolkit";

export const contractsSlice = createSlice({
    name: "contracts",
    initialState: {
        platformAddress: "0x5b6215b4e431D846b25389c7696015e9Cd45b831",
        contractAddress: [],
        allcontractAddressItem: [],
        allcontractAddress: [],
        startBlock: 0,
    },
    reducers: {
        setContractAddress: (state, action) => {
            state.contractAddress = action.payload.contractAddress;
        },
        addContractAddress: (state, action) => {
            const newAddress = action.payload;
            const existed = state.contractAddress.find(
                (address) => address === newAddress
            );
            if (!existed) {
                state.contractAddress.push(newAddress);
            }
        },
        clearContractAddress: (state) => {
            state.contractAddress = [];
        },
        addWholePlatformContractAddress: (state, action) => {
            console.log("Action Payload: ", state.allcontractAddress);
            const add = action.payload.mlPlatformAddress;
            console.log("Action Payload: ", add);
            const existed = state.allcontractAddress.find(
                (address) => address === add
            );
            if (!existed) {
                state.allcontractAddress.push(action.payload.mlPlatformAddress);
                state.allcontractAddressItem.push(action.payload);
            }
        },
        setPlatformAddress: (state, action) => {
            state.platformAddress = action.payload;
        }
    },
});

export const {
    setContractAddress,
    addContractAddress,
    clearContractAddress,
    addWholePlatformContractAddress,
    setPlatformAddress
} = contractsSlice.actions;
export default contractsSlice.reducer;
