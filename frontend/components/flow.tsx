import Link from "next/link";
import { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 150, y: 150 }, data: { label: "🎬 Start 🎬" } },
  { id: "2", position: { x: 250, y: 250 }, data: { label: "GPT4" } },
  {
    id: "3",
    position: { x: 350, y: 350 },
    data: { label: "My New Prompt Chain" },
  },
  { id: "4", position: { x: 450, y: 450 }, data: { label: "MidJourney" } },
  { id: "5", position: { x: 550, y: 550 }, data: { label: "🛑 Finish 🛑" } },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
];

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <Link href="/" className="z-50">
        <button className="btn btn-primary btn-lg fixed top-4 left-4 z-50">
          Cancel
        </button>
      </Link>
      <Link href="/add" className="z-50">
        <button className="btn btn-primary btn-lg fixed top-4 right-4 z-50">
          Publish Agent
        </button>
      </Link>

      {/* <MiniMap /> */}
      <Controls />
      <Background />
    </ReactFlow>
  );
};

export default Flow;
