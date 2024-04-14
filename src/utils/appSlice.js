import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        nodes: []
    },
    reducers: {
        addNode: (state, action) => {
            state.nodes.push(action.payload)
        }
    }
})

export const {addNode} = appSlice.actions;

export default appSlice.reducer;