"use client"
import React, { useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    Node,
    Edge,
    ConnectionLineType,
    MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

import { CategoryNode } from './CategoryNode';
import { ToolNode } from './ToolNode';
import { ToolsData, Category, Tool } from '@/lib/types';
import { useTheme } from 'next-themes';

const nodeTypes = {
    category: CategoryNode,
    tool: ToolNode,
};

interface RoadmapProps {
    data: ToolsData;
    searchQuery: string;
    onToolClick: (tool: Tool) => void;
}

export function Roadmap({ data, searchQuery, onToolClick }: RoadmapProps) {
    const { theme } = useTheme();

    const { initialNodes, initialEdges } = useMemo(() => {
        const nodes: Node[] = [];
        const edges: Edge[] = [];

        data.categories.forEach((cat) => {
            // Category Node
            nodes.push({
                id: cat.id,
                type: 'category',
                position: cat.position,
                data: {
                    label: cat.name,
                    icon: cat.icon,
                    color: cat.color,
                    toolCount: cat.tools.length
                },
            });

            // Tool Nodes Layout
            const toolsPerRow = 3;
            const xSpacing = 200;
            const ySpacing = 150;
            const startY = 200;

            // Calculate centering offset
            const rowWidth = (Math.min(cat.tools.length, toolsPerRow) - 1) * xSpacing;
            const startX = -rowWidth / 2; // Center relative to category

            cat.tools.forEach((tool, index) => {
                const row = Math.floor(index / toolsPerRow);
                const col = index % toolsPerRow;

                const x = cat.position.x + startX + (col * xSpacing);
                const y = cat.position.y + startY + (row * ySpacing);

                // Use JSON position if available (override)
                const finalX = tool.position ? tool.position.x : x;
                const finalY = tool.position ? tool.position.y : y;

                nodes.push({
                    id: tool.id,
                    type: 'tool',
                    position: { x: finalX, y: finalY },
                    data: { ...tool, label: tool.name }, // Pass full tool data
                    parentNode: undefined, // Independent nodes but connected
                });

                // Edge
                edges.push({
                    id: `${cat.id}-${tool.id}`,
                    source: cat.id,
                    target: tool.id,
                    type: 'smoothstep', // or default bezier
                    animated: true,
                    style: { stroke: cat.color, strokeWidth: 2, opacity: 0.5 },
                });
            });
        });

        return { initialNodes: nodes, initialEdges: edges };
    }, [data]);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // Filter Logic
    useEffect(() => {
        if (!searchQuery) {
            setNodes((nds) => nds.map((n) => ({ ...n, hidden: false })));
            setEdges((eds) => eds.map((e) => ({ ...e, hidden: false })));
            return;
        }

        const lowerQuery = searchQuery.toLowerCase();

        // Find matching nodes
        setNodes((nds) => nds.map((n) => {
            const match = n.data.label.toLowerCase().includes(lowerQuery) ||
                (n.data.tags && n.data.tags.some((t: string) => t.toLowerCase().includes(lowerQuery)));

            // If category matches, show it
            if (n.type === 'category' && match) return { ...n, hidden: false };

            // If tool matches, show it
            if (n.type === 'tool' && match) return { ...n, hidden: false };

            return { ...n, hidden: true };
        }));

        // Hide edges if either source or target is hidden
        // Use timeout to wait for node state update or just do it in one go (Node state isn't immediate in effect hook dependency cycle usually, but here we set them together)
        // Actually need to check visibility based on the logic above, separate from state
        // For simplicity, we just hide edges connecting to hidden nodes.
        // However, ReactFlow handles hidden nodes' edges automatically? No.

        // Better: setNodes and setEdges together
    }, [searchQuery, setNodes, setEdges]); // Simplified

    const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        if (node.type === 'tool') {
            onToolClick(node.data as Tool);
        }
    }, [onToolClick]);

    const nodeColor = theme === 'dark' ? '#333' : '#eee';

    return (
        <div className="w-full h-full bg-background/50 backdrop-blur-sm">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                onNodeClick={handleNodeClick}
                fitView
                minZoom={0.1}
                maxZoom={2}
                defaultEdgeOptions={{
                    type: 'smoothstep',
                    animated: true,
                }}
            >
                <Background gap={20} color={nodeColor} />
                <Controls className="bg-background border-border" />
                <MiniMap
                    nodeColor={(n) => {
                        if (n.type === 'category') return (n.data.color as string);
                        return theme === 'dark' ? '#555' : '#ddd';
                    }}
                    className="bg-background border-border"
                />
            </ReactFlow>
        </div>
    );
}
