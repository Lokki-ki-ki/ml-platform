/*
This store is for user related variables.
*/
import { createSlice } from "@reduxjs/toolkit";

export const loginAccountSlice = createSlice({
    name: "loginAccount",
    initialState: {
        accounts: [],
        currentAccount: null,
    },
    reducers: {
        setLoginAccount: (state, action) => {
            state.accounts = action.payload.accounts;
            state.currentAccount = action.payload.currentAccount;
        },
        clearLoginAccount: (state) => {
            state.accounts = [];
            state.currentAccount = null;
        },
    },
});

export const { setLoginAccount, clearLoginAccount } = loginAccountSlice.actions;
export default loginAccountSlice.reducer;
