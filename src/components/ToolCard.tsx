"use client"
import { Tool } from '@/lib/types';
import { useState } from 'react';

interface ToolCardProps {
    tool: Tool;
    onClick: (tool: Tool) => void;
}

export function ToolCard({ tool, onClick }: ToolCardProps) {
    const [imageError, setImageError] = useState(false);

    // Helper for pricing badge color
    const getPricingColor = (p: string) => {
        switch (p) {
            case 'free': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900';
            case 'paid': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900';
            default: return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900';
        }
    };

    return (
        <div
            onClick={() => onClick(tool)}
            className="group w-[160px] h-[160px] relative bg-card border border-border rounded-xl p-4 flex flex-col items-center cursor-pointer hover:-translate-y-1 hover:shadow-md hover:border-primary/30 transition-all duration-300"
        >
            {/* Pricing Badge */}
            <div className={`absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${getPricingColor(tool.pricing)} uppercase tracking-wider`}>
                {tool.pricing}
            </div>

            {/* Logo Area */}
            <div className="mt-4 w-16 h-16 rounded-xl bg-muted/30 flex items-center justify-center overflow-hidden border border-border/50 group-hover:border-primary/20 transition-colors shadow-sm">
                {!imageError && tool.logo ? (
                    <img
                        src={tool.logo}
                        alt={tool.name}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 text-primary font-bold text-xl">
                        {tool.logoFallback}
                    </div>
                )}
            </div>

            {/* Name */}
            <div className="mt-3 text-center w-full">
                <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {tool.name}
                </h3>
            </div>

            {/* Hover Description (Optional: Tooltip behavior or overlay) */}
            <div className="absolute inset-x-0 bottom-0 bg-background/95 backdrop-blur-sm p-2 text-[10px] text-muted-foreground text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-t border-border translate-y-full group-hover:translate-y-0 rounded-b-xl">
                {tool.shortDescription.substring(0, 40)}...
            </div>
        </div>
    );
}
