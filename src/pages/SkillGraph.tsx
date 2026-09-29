import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Layers, ExternalLink } from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  category: 'role' | 'core' | 'supporting' | 'tool' | 'framework';
  demandPct: number;
  coveragePct: number;
  gapPct: number;
  description: string;
  x: number;
  y: number;
  connections: string[];
}

export const SkillGraph: React.FC = () => {
  const navigate = useNavigate();

  const [activeRole, setActiveRole] = useState<'backend' | 'cloud' | 'genai'>('backend');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-docker');

  const backendNodes: GraphNode[] = [
    {
      id: 'node-root',
      label: 'Backend Developer',
      category: 'role',
      demandPct: 92,
      coveragePct: 55,
      gapPct: 37,
      description: 'Primary occupational node spanning server-side architecture, APIs, data persistence, and container runtimes.',
      x: 350,
      y: 200,
      connections: ['node-nodejs', 'node-restapi', 'node-mongodb', 'node-git', 'node-docker', 'node-redis', 'node-sql'],
    },
    {
      id: 'node-nodejs',
      label: 'Node.js & Express',
      category: 'core',
      demandPct: 82,
      coveragePct: 62,
      gapPct: 20,
      description: 'Asynchronous event loop server runtime and RESTful endpoint routing framework.',
      x: 180,
      y: 110,
      connections: ['node-root', 'node-restapi', 'node-mongodb'],
    },
    {
      id: 'node-restapi',
      label: 'REST API Specs',
      category: 'core',
      demandPct: 85,
      coveragePct: 60,
      gapPct: 25,
      description: 'OpenAPI 3.0 specification contracts, request validation, and status code standards.',
      x: 520,
      y: 110,
      connections: ['node-root', 'node-nodejs', 'node-git'],
    },
    {
      id: 'node-mongodb',
      label: 'MongoDB / NoSQL',
      category: 'framework',
      demandPct: 68,
      coveragePct: 45,
      gapPct: 23,
      description: 'Document database schema design, indexing, and aggregation pipelines.',
      x: 150,
      y: 290,
      connections: ['node-root', 'node-nodejs'],
    },
    {
      id: 'node-git',
      label: 'Git & GitHub',
      category: 'tool',
      demandPct: 92,
      coveragePct: 40,
      gapPct: 52,
      description: 'Branching workflows, pull request reviews, and continuous integration triggers.',
      x: 540,
      y: 290,
      connections: ['node-root', 'node-docker', 'node-restapi'],
    },
    {
      id: 'node-docker',
      label: 'Docker & Containers',
      category: 'core',
      demandPct: 65,
      coveragePct: 18,
      gapPct: 47,
      description: 'Container image packaging, Dockerfile optimization, and multi-service orchestration.',
      x: 350,
      y: 340,
      connections: ['node-root', 'node-git', 'node-k8s'],
    },
    {
      id: 'node-redis',
      label: 'Redis Caching',
      category: 'supporting',
      demandPct: 48,
      coveragePct: 12,
      gapPct: 36,
      description: 'In-memory key-value cache, session store, and BullMQ worker queue.',
      x: 230,
      y: 40,
      connections: ['node-root', 'node-nodejs'],
    },
    {
      id: 'node-sql',
      label: 'PostgreSQL & SQL',
      category: 'core',
      demandPct: 88,
      coveragePct: 70,
      gapPct: 18,
      description: 'Relational data modeling, ACID transactions, and query optimization.',
      x: 470,
      y: 40,
      connections: ['node-root', 'node-restapi'],
    },
    {
      id: 'node-k8s',
      label: 'Kubernetes Admin',
      category: 'supporting',
      demandPct: 54,
      coveragePct: 14,
      gapPct: 40,
      description: 'Container pod scaling, ingress controllers, and Helm deployment automation.',
      x: 350,
      y: 440,
      connections: ['node-docker'],
    },
  ];

  const nodes = backendNodes;
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const nodeColor = (category: string) => {
    switch (category) {
      case 'role':
        return '#0f172a'; // dark navy
      case 'core':
        return '#0d9488'; // teal
      case 'framework':
        return '#2563eb'; // blue
      case 'tool':
        return '#d97706'; // amber
      default:
        return '#64748b'; // slate
    }
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-slate-900 tracking-tight font-mono uppercase">
              INTERACTIVE COMPETENCY SKILL GRAPH
            </h1>
            <Badge variant="teal">DIRECTED ONTOLOGY GRAPH</Badge>
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">
            Dynamic relational topology mapping occupational requirements, prerequisites, and curriculum gap propagation
          </p>
        </div>

        {/* Role Cluster Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded border border-slate-200 text-2xs font-mono">
          <button
            onClick={() => {
              setActiveRole('backend');
              setSelectedNodeId('node-root');
            }}
            className={`px-2.5 py-1 rounded font-medium ${
              activeRole === 'backend' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
            }`}
          >
            Backend Developer Cluster
          </button>
          <button
            onClick={() => {
              setActiveRole('cloud');
              setSelectedNodeId('node-docker');
            }}
            className={`px-2.5 py-1 rounded font-medium ${
              activeRole === 'cloud' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
            }`}
          >
            Cloud / DevOps Cluster
          </button>
          <button
            onClick={() => {
              setActiveRole('genai');
              setSelectedNodeId('node-restapi');
            }}
            className={`px-2.5 py-1 rounded font-medium ${
              activeRole === 'genai' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
            }`}
          >
            GenAI & LLMOps Cluster
          </button>
        </div>
      </div>

      {/* Main Canvas + Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* SVG Interactive Canvas */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-md p-4 shadow-card flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div className="flex items-center gap-3 text-2xs font-mono">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900" /> Root Role
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-600" /> Core Skill
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Framework
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Tooling
              </span>
            </div>
            <span className="text-2xs font-mono text-slate-400">Click any node to inspect</span>
          </div>

          <div className="w-full h-[480px] bg-slate-50/50 rounded border border-slate-100 relative overflow-hidden flex items-center justify-center">
            {/* SVG Lines and Nodes */}
            <svg viewBox="0 0 700 500" className="w-full h-full select-none cursor-pointer">
              {/* Render edges */}
              {nodes.map((sourceNode) =>
                sourceNode.connections.map((targetId) => {
                  const targetNode = nodes.find((n) => n.id === targetId);
                  if (!targetNode) return null;
                  const isConnectedToSelected =
                    sourceNode.id === selectedNodeId || targetNode.id === selectedNodeId;

                  return (
                    <line
                      key={`${sourceNode.id}-${targetId}`}
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isConnectedToSelected ? '#0d9488' : '#cbd5e1'}
                      strokeWidth={isConnectedToSelected ? 2.5 : 1.2}
                      strokeDasharray={isConnectedToSelected ? undefined : '3 3'}
                      strokeOpacity={isConnectedToSelected ? 0.9 : 0.6}
                    />
                  );
                })
              )}

              {/* Render Nodes */}
              {nodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                const isRoot = node.category === 'role';
                const radius = isRoot ? 32 : isSelected ? 26 : 22;

                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className="cursor-pointer transition-transform duration-150"
                  >
                    {/* Pulsing ring if selected */}
                    {isSelected && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={radius + 6}
                        fill="none"
                        stroke="#0d9488"
                        strokeWidth="2"
                        strokeDasharray="4 2"
                        className="animate-spin"
                        style={{ transformOrigin: `${node.x}px ${node.y}px`, animationDuration: '8s' }}
                      />
                    )}

                    {/* Node circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={radius}
                      fill={nodeColor(node.category)}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      className="shadow-sm hover:opacity-90"
                    />

                    {/* Node text */}
                    <text
                      x={node.x}
                      y={node.y + (isRoot ? 4 : 3)}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={isRoot ? '9.5' : '8'}
                      fontWeight="600"
                      fontFamily="Inter"
                      pointerEvents="none"
                    >
                      {node.label.length > 13 ? `${node.label.substring(0, 11)}...` : node.label}
                    </text>

                    {/* Sub label underneath */}
                    <text
                      x={node.x}
                      y={node.y + radius + 12}
                      textAnchor="middle"
                      fill="#475569"
                      fontSize="8"
                      fontFamily="JetBrains Mono"
                      fontWeight="500"
                    >
                      {node.demandPct}% Demand
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Dynamic Side Node Inspector Panel */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-md p-4 shadow-card flex flex-col justify-between space-y-3.5">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-2xs font-mono uppercase text-slate-400 font-bold">NODE TELEMETRY INSPECTOR</span>
              <Badge variant={selectedNode.category === 'role' ? 'navy' : 'teal'}>
                {selectedNode.category.toUpperCase()}
              </Badge>
            </div>

            <div className="mt-3">
              <h3 className="text-sm font-bold text-slate-900">{selectedNode.label}</h3>
              <p className="text-2xs text-slate-600 mt-1 leading-relaxed font-sans">
                {selectedNode.description}
              </p>
            </div>

            {/* 3 Metric Bars */}
            <div className="space-y-2.5 mt-4 pt-3 border-t border-slate-100">
              <div>
                <div className="flex justify-between text-2xs font-mono mb-1">
                  <span className="text-slate-500">Live Industry Demand</span>
                  <span className="font-bold text-teal-700">{selectedNode.demandPct}%</span>
                </div>
                <ProgressBar value={selectedNode.demandPct} variant="teal" size="xs" />
              </div>

              <div>
                <div className="flex justify-between text-2xs font-mono mb-1">
                  <span className="text-slate-500">State Syllabus Coverage</span>
                  <span className="font-bold text-blue-700">{selectedNode.coveragePct}%</span>
                </div>
                <ProgressBar value={selectedNode.coveragePct} variant="blue" size="xs" />
              </div>

              <div>
                <div className="flex justify-between text-2xs font-mono mb-1">
                  <span className="text-slate-500">Curriculum Deficit Gap</span>
                  <span className="font-bold text-rose-600">{selectedNode.gapPct}%</span>
                </div>
                <ProgressBar value={selectedNode.gapPct} variant="rose" size="xs" />
              </div>
            </div>

            {/* Adjacent Connected Nodes */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-2xs font-mono text-slate-400 uppercase block mb-1.5 font-bold">
                Direct Graph Connections ({selectedNode.connections.length})
              </span>
              <div className="flex flex-wrap gap-1">
                {selectedNode.connections.map((cId) => {
                  const target = nodes.find((n) => n.id === cId);
                  if (!target) return null;
                  return (
                    <button
                      key={cId}
                      onClick={() => setSelectedNodeId(cId)}
                      className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-2xs font-mono text-slate-700 hover:bg-teal-50 hover:text-teal-900 transition-colors"
                    >
                      {target.label} →
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <Button
              variant="secondary"
              size="xs"
              onClick={() => navigate('/skill-gap-analysis')}
              icon={<Layers className="w-3.5 h-3.5" />}
            >
              Analyze Gap
            </Button>
            <Button
              variant="teal"
              size="xs"
              onClick={() => navigate(`/skills/${selectedNode.id.replace('node-', 'skill-')}`)}
              icon={<ExternalLink className="w-3.5 h-3.5" />}
            >
              View Full Node
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
