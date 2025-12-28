"use client"
import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export const CategoryNode = memo(({ data, selected }: NodeProps) => {
    // @ts-ignore
    const Icon = (Icons[data.icon as keyof typeof Icons] as LucideIcon) || Icons.Folder;

    return (
        <div className={`
      relative w-[200px] h-[120px] bg-background border-2 rounded-2xl shadow-lg 
      flex flex-col items-center justify-center p-4 transition-all duration-300
      ${selected ? 'ring-2 ring-primary ring-offset-2 scale-105' : 'hover:scale-102 hover:shadow-xl'}
    `}
            style={{ borderColor: data.color || 'var(--border)' }}
        >
            <div
                className="p-3 rounded-2xl mb-3 shadow-inner"
                style={{
                    backgroundColor: `${data.color}15`,
                    color: data.color
                }}
            >
                <Icon size={32} strokeWidth={1.5} />
            </div>
            <div className="font-bold text-base text-center leading-tight">
                {data.label}
            </div>
            <div className="text-[10px] text-muted-foreground mt-1 font-medium">
                {data.toolCount || 0} Tools
            </div>

            {/* Connections flow outwards from bottom/sides */}
            <Handle
                type="source"
                position={Position.Bottom}
                className="!w-3 !h-3 !bg-muted-foreground !border-2 !border-background"
            />
            <Handle
                type="target"
                position={Position.Top}
                className="!w-3 !h-3 !bg-muted-foreground !border-2 !border-background"
            />
        </div>
    );
});

CategoryNode.displayName = 'CategoryNode';
