/*
This store is for submission related variables, which will change based on the contract user selected
*/
import { createSlice } from "@reduxjs/toolkit";

export const submissionsSlice = createSlice({
    name: "submissions",
    initialState: {
        startBlock: 0,
        submissionId: null,
        submittedItems: [],
        rewards: [],
    },
    reducers: {
        addSubmission: (state, action) => {
            if (action.payload.id !== state.submissionId) {
                state.submissionId = action.payload.id;
                state.submittedItems = [];
            }
            const clientIndex = state.submittedItems.findIndex(
                (item) => item.clientId === action.payload.clientId
            );
            clientIndex === -1
                ? state.submittedItems.push(action.payload)
                : (state.submittedItems[clientIndex] = action.payload);
        },
        setStartBlock: (state, action) => {
            state.startBlock = action.payload;
        },
        addReward: (state, action) => {
            // const row = {
            //     clientId: Number(record.returnValues['_clientId']),
            //     reward: Number(record.returnValues['_reward']),
            //     roundOfTrainning: Number
            // }
            const existed = state.rewards.find(
                (reward) =>
                    reward.roundOfTrainning ===
                        action.payload.roundOfTrainning &&
                    reward.clientId === action.payload.clientId
            );
            if (!existed) {
                state.rewards.push(action.payload);
            }
        },
        clearSubmissions: (state) => {
            state.submittedItems = [];
        },
    },
});

export const { addSubmission, setStartBlock, addReward } =
    submissionsSlice.actions;
export default submissionsSlice.reducer;
