import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        selectedNode: undefined,
        selectedNodeText: "",
        connections: {},
        savingInProgess: false
    },
    reducers: {
        updateSelectedNode: (state, action) => {
            state.selectedNode = action.payload
        },
        updateSelectedNodeText: (state, action) => {
            state.selectedNodeText = action.payload
        },
        updateConnections: (state, action) => {
            const newConnection = action.payload
            state.connections = {...state.connections, ...newConnection }
        },
        updateSavingProgress: (state, action) => {
            state.savingInProgess = action.payload
        }
    }
})

export const {updateSelectedNode, updateSelectedNodeText, updateConnections, updateSavingProgress} = appSlice.actions;

export default appSlice.reducer;