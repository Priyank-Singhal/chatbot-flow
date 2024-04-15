import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import SettingPanel from './SettingPanel';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateConnections, updateSelectedNode } from '../utils/appSlice';
import NodesPanel from './NodesPanel';
import { addNode } from '../utils/nodeSlice';


const initialNodes = [
  {
    id: 'node_0',
    type: 'default',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left
  },
];

let id = 0;
const getId = () => `node_${++id}`;

const Body = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const dispatch = useDispatch();
  const SelectedNode = useSelector(store => store.app.selectedNode)
  const AllNodes = useSelector(store => store.node.nodes)
  const Connections = useSelector(store => store.app.connections)

  useEffect(() => {
    setNodes((prevNodes) => {
      if(AllNodes.length == 0){
        dispatch(addNode(prevNodes))
        return prevNodes
      } 
      else{
        return AllNodes
      } 
    });
  }, [AllNodes])

  const handleNodeClick = ((e) => {
    dispatch(updateSelectedNode(e.target.dataset.id))
  });

  const onConnect = useCallback(
    (params) => {
      console.log("params", params)
      const {source, target} = params
      dispatch(updateConnections({[source]: target }))
      setEdges((eds) => addEdge(params, eds))
    },
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const isValidConnection = (connection) => {
    const SourceNode = connection.source;
    if(Connections[SourceNode]) return false;
    // console.log("connection",connection);
    return true;
  } 

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };
      setNodes((nds) => {
        const newNodes = nds.concat(newNode);
        dispatch(addNode(newNodes))
        return newNodes
      }
      );
    },
    [reactFlowInstance],
  );

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onNodeClick={handleNodeClick}
            isValidConnection={isValidConnection}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <div className='dndflow-aside'>
          {SelectedNode == undefined ? <SettingPanel /> : <NodesPanel />}
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default Body;