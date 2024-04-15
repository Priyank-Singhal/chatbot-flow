import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        selectedNode: undefined,
        selectedNodeText: "",
        connections: {}
    },
    reducers: {
        updateSelectedNode: (state, action) => {
            state.selectedNode = action.payload
        },
        updateSelectedNodeText: (state, action) => {
            state.selectedNodeText = action.payload
        },
        updateConnections: (state, action) => {
            console.log("action.payload", action.payload)
            const newConnection = action.payload
            // console.log("source", source)
            // console.log("target", target)
            const NewConnections = {...state.connections, ...newConnection }
            console.log("NewConnections",NewConnections)
            state.connections = NewConnections
        }
    }
})

export const {updateSelectedNode, updateSelectedNodeText, updateConnections} = appSlice.actions;

export default appSlice.reducer;