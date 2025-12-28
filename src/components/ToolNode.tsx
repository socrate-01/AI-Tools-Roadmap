"use client"
import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export const ToolNode = memo(({ data, selected }: NodeProps) => {
    return (
        <div className={`
      relative w-[160px] h-[110px] bg-card border rounded-xl shadow-sm 
      transition-all duration-300 group cursor-pointer overflow-hidden
      ${selected ? 'ring-2 ring-primary ring-offset-1 border-primary -translate-y-1 shadow-md' : 'border-border hover:-translate-y-1 hover:shadow-md hover:border-primary/50'}
    `}>
            {/* Badge */}
            <div className={`
            absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider
            ${data.pricing === 'free'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'}
        `}>
                {data.pricing}
            </div>

            <div className="h-full flex flex-col items-center justify-center p-4 pt-6">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-3 text-xs font-bold text-muted-foreground overflow-hidden shadow-sm">
                    {data.logo ? (
                        <img src={data.logo} alt={data.label} className="w-full h-full object-cover" />
                    ) : (
                        <span>{data.logoFallback || data.label.substring(0, 2)}</span>
                    )}
                </div>
                <div className="text-sm font-semibold text-center leading-tight line-clamp-2 text-foreground/90 group-hover:text-primary transition-colors">
                    {data.label}
                </div>
            </div>

            <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-border !opacity-0" />
        </div>
    )
});

ToolNode.displayName = 'ToolNode';
