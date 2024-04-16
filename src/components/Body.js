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
import { updateConnections, updateSavingProgress, updateSelectedNode } from '../utils/appSlice';
import NodesPanel from './NodesPanel';
import { addNode } from '../utils/nodeSlice';
import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: 'node_0',
    type: 'custom',
    data: { label: 'Send Message', msg: "type your message..." },
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
  const SavingInProgess = useSelector(store => store.app.savingInProgess)

  useEffect(() => {
    setNodes((prevNodes) => {
      if (AllNodes.length == 0) {
        dispatch(addNode(prevNodes))
        return prevNodes
      }
      else {
        return AllNodes
      }
    });
  }, [AllNodes])

  useEffect(() => {
    if (SavingInProgess) {
      dispatch(addNode(nodes))
      dispatch(updateSavingProgress(false))
    }
  }, [SavingInProgess])

  const onConnect = useCallback(
    (params) => {
      const { source, target } = params
      dispatch(updateConnections({ [source]: target }))
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
    if (Connections[SourceNode]) return false;
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

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type: 'custom',
        position,
        data: { label: 'Send Message', msg: 'type your message...' },
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
    <div className="flex flex-grow h-[100%]">
      <ReactFlowProvider>
        <div className="flex-grow h-[100%] w-9/12" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onInit={setReactFlowInstance}
            isValidConnection={isValidConnection}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <div className='border border-gray-700 w-3/12'>
          {SelectedNode == undefined ? <SettingPanel /> : <NodesPanel />}
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default Body;