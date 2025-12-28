"use client"
import { useState, useEffect } from "react"
import { X, Copy, Download, Check } from "lucide-react"

interface JsonViewerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function JsonViewer({ isOpen, onClose }: JsonViewerProps) {
    const [data, setData] = useState<any>(null);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen && !data) {
            fetch('/api/tools')
                .then(res => res.json())
                .then(json => {
                    setData(json);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [isOpen, data]);

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ai-tools-data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-4xl max-h-[85vh] bg-background border border-border rounded-xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary font-bold font-mono text-sm">JSON</div>
                        <div>
                            <h3 className="font-bold">API Response Explorer</h3>
                            <p className="text-xs text-muted-foreground font-mono">GET /api/tools</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-muted transition-colors"
                        >
                            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                            {copied ? "Copied" : "Copy"}
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-muted transition-colors"
                        >
                            <Download size={14} /> Download
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors ml-2">
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-0 bg-muted/30 font-mono text-xs">
                    {loading ? (
                        <div className="flex items-center justify-center h-40">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <pre className="p-4 text-foreground/80">
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    )}
                </div>
            </div>
        </div>
    );
}
