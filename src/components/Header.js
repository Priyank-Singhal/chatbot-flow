import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedNode } from '../utils/appSlice';
import { updateNode } from '../utils/nodeSlice';
import Alert from './Alert';

const Header = () => {
  const dispatch = useDispatch();
  const CurrentNodeText = useSelector(store => store.app.selectedNodeText)
  const CurrentNodeId = useSelector(store => store.app.selectedNode)
  const Connections = useSelector(store => store.app.connections)
  const AllNodes = useSelector(store => store.node.nodes)
  const connectedTargets = Object.values(Connections);
  const connectedSources = Object.keys(Connections);

  const [alert, setAlert] = useState(false);

  const handleClick = (() => {
    for (const node of AllNodes) {
      const nodeId = node.id;
      if (!connectedSources.includes(nodeId) && !connectedTargets.includes(nodeId) && AllNodes.length > 1) {
        setAlert(true);
        setTimeout(() => setAlert(false), 4000)
        return;
      }
    }
    dispatch(updateNode({ id: CurrentNodeId, text: CurrentNodeText }));
    dispatch(updateSelectedNode(undefined));
  })
  return (
    <div className='h-16 bg-gray-200 flex flex-row-reverse flex-wrap items-center'>
      <button
        className='py-2 px-7 h-auto rounded-md border-2 border-sky-500 bg-white mr-48 font-bold text-sky-600 shadow-lg'
        onClick={CurrentNodeId && handleClick}
      >
        Save Changes
      </button>
      <div className='fixed left-[40%] top-7'>
        {alert && <Alert text={"Cannot save Flow"} />}
      </div>
    </div>
  )
}

export default Header 