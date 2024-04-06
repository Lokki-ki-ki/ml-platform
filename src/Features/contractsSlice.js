import { createSlice } from "@reduxjs/toolkit";

export const contractsSlice = createSlice({
    name: "contracts",
    initialState: {
        platformAddress: "0xA2342381A576E65CF72886E9f3dcD93043030c74",
        contractAddress: [],
        allcontractAddressItem: [],
        allcontractAddress: []
    },
    reducers: {
        setContractAddress: (state, action) => {
            state.contractAddress = action.payload.contractAddress;
        },
        addContractAddress: (state, action) => {
            const newAddress = action.payload;
            const existed = state.contractAddress.find(address => address === newAddress);
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
            const existed = state.allcontractAddress.find(address => address === add);
            if (!existed) {
                state.allcontractAddress.push(action.payload.mlPlatformAddress);
                state.allcontractAddressItem.push(action.payload);
            }
        }
    }
});

export const { setContractAddress, addContractAddress, clearContractAddress, addWholePlatformContractAddress } = contractsSlice.actions;
export default contractsSlice.reducer;