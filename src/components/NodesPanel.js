import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedNodeText } from '../utils/appSlice';

const NodesPanel = () => {
    const SelectedNode = useSelector(store => store.app.selectedNode);
    const Nodes = useSelector(store => store.node.nodes);
    const CurrentNode = Nodes.filter(node => node.id === SelectedNode)
    const dispatch = useDispatch();
    const handleInputChange = ((e) => {
        console.log(e.target.value);
        dispatch(updateSelectedNodeText(e.target.value));
    })
    return (
        <div>
            <h1>SelectedNode: {SelectedNode}</h1>
            <input className='border-2 border-gray' onChange={handleInputChange} />
        </div>
    )
}

export default NodesPanel