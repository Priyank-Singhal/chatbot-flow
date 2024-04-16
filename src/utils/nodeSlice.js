import { createSlice } from "@reduxjs/toolkit";

const nodeSlice = createSlice({
    name: 'app',
    initialState: {
        nodes: []
    },
    reducers: {
        addNode: (state, action) => {
            state.nodes = action.payload;
        },
        updateNode: (state, action) => {
            const updatedArray = state.nodes.map(obj => {
                if (obj.id === action.payload.id) {
                    return { ...obj, data: { ...obj.data, msg: action.payload.text } };
                }
                return obj; // Return unchanged object if the condition doesn't match
            });
            state.nodes = updatedArray;
        }
    }
})

export const {addNode, updateNode} = nodeSlice.actions;

export default nodeSlice.reducer;