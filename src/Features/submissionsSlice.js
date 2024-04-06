import { createSlice } from "@reduxjs/toolkit";

export const submissionsSlice = createSlice({
    name: "submissions",
    initialState: {
        startBlock: 0,
        submissionId: null,
        submittedItems: []
    },
    reducers: {
        addSubmission: (state, action) => {
            if (action.payload.id !== state.submissionId) {
                state.submissionId = action.payload.id;
                state.submittedItems = [];
            }
            const clientIndex = state.submittedItems.findIndex(item => item.clientId === action.payload.clientId);
            clientIndex === -1 ? state.submittedItems.push(action.payload) : state.submittedItems[clientIndex] = action.payload;
        },
        setStartBlock: (state, action) => {
            state.startBlock = action.payload;
        }

    }
});

export const { addSubmission, setStartBlock } = submissionsSlice.actions;
export default submissionsSlice.reducer;