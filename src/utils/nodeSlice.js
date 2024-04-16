import { createSlice } from "@reduxjs/toolkit";

const nodeSlice = createSlice({
    name: 'app',
    initialState: {
        nodes: []
    },
    reducers: {
        addNode: (state, action) => {
            // const updatedArr = state.nodes.concat(action.payload)
            // state.nodes = state.nodes.concat(action.payload);
            state.nodes = action.payload;
            // state.nodes.push(action.payload)
            // return updatedArr;
        },
        updateNode: (state, action) => {
            const updatedArray = state.nodes.map(obj => {
                if (obj.id === action.payload.id) {
                    return { ...obj, data: { ...obj.data, msg: action.payload.text } }; // In this case, updating the age of object with id 2
                }
                return obj; // Return unchanged object if the condition doesn't match
            });
            state.nodes = updatedArray;
        }
    }
})

export const {addNode, updateNode} = nodeSlice.actions;

export default nodeSlice.reducer;