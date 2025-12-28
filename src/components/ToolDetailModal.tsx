"use client"
import { X, ExternalLink, Check, BookOpen, MessageSquare, Video, ThumbsUp, ThumbsDown } from "lucide-react"
import { Tool } from "@/lib/types"
import { useEffect, useState } from "react"

interface ToolDetailModalProps {
    tool: Tool | null;
    onClose: () => void;
}

export function ToolDetailModal({ tool, onClose }: ToolDetailModalProps) {
    const [activeTab, setActiveTab] = useState<'overview' | 'pricing' | 'resources'>('overview');

    useEffect(() => {
        if (tool) {
            document.body.style.overflow = 'hidden'
            setActiveTab('overview');
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [tool])

    if (!tool) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="relative w-full max-w-2xl h-full bg-background border-l border-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="flex-none p-6 border-b border-border bg-background/95 backdrop-blur z-10 sticky top-0 justify-between flex items-start">
                    <div className="flex gap-5">
                        <div className="w-20 h-20 rounded-2xl bg-muted/50 p-1 border border-border flex items-center justify-center shrink-0">
                            {tool.logo ? (
                                <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain rounded-xl" />
                            ) : (
                                <span className="text-2xl font-bold text-muted-foreground">{tool.logoFallback}</span>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-2xl font-bold tracking-tight leading-none">{tool.name}</h2>
                                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider
                            ${tool.pricing === 'free' ? 'bg-emerald-500/10 text-emerald-600' :
                                        tool.pricing === 'paid' ? 'bg-amber-500/10 text-amber-600' :
                                            'bg-blue-500/10 text-blue-600'}`}
                                >
                                    {tool.pricing}
                                </span>
                            </div>
                            <p className="text-muted-foreground text-sm line-clamp-2">{tool.shortDescription}</p>

                            <div className="flex gap-2 mt-4">
                                <a
                                    href={tool.officialWebsite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                                >
                                    Visit Website <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors -mr-2 -mt-2">
                        <X size={24} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-border px-6 sticky top-[116px] bg-background z-10">
                    {['overview', 'pricing', 'resources'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === tab
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-20">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <section>
                                <h3 className="text-lg font-bold mb-3">About</h3>
                                <p className="text-foreground/80 leading-relaxed text-sm">
                                    {tool.fullDescription || tool.shortDescription}
                                </p>
                                <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border/50">
                                    <span className="font-semibold text-sm">Best For: </span>
                                    <span className="text-sm text-foreground/80">{tool.bestFor}</span>
                                </div>
                            </section>

                            {/* Getting Started */}
                            {tool.gettingStarted && (
                                <section>
                                    <h3 className="text-lg font-bold mb-3">Getting Started</h3>
                                    <div className="space-y-4">
                                        {tool.gettingStarted.installation && (
                                            <div className="space-y-2">
                                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Installation</h4>
                                                <div className="bg-muted p-3 rounded-lg font-mono text-xs overflow-x-auto">
                                                    {tool.gettingStarted.installation.join('\n')}
                                                </div>
                                            </div>
                                        )}
                                        {tool.gettingStarted.basicUsage && (
                                            <div className="space-y-2">
                                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Basic Usage</h4>
                                                <ol className="list-decimal list-inside space-y-1 text-sm text-foreground/80 ml-2">
                                                    {tool.gettingStarted.basicUsage.map((step, i) => <li key={i}>{step}</li>)}
                                                </ol>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* Use Cases */}
                            {tool.useCases && (
                                <section>
                                    <h3 className="text-lg font-bold mb-3">Use Cases</h3>
                                    <ul className="grid grid-cols-1 gap-2">
                                        {tool.useCases.map((useCase, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                                <Check size={16} className="mt-0.5 text-primary shrink-0" />
                                                {useCase}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* Pros & Cons */}
                            {(tool.pros || tool.cons) && (
                                <section className="grid grid-cols-2 gap-4">
                                    {tool.pros && (
                                        <div>
                                            <h3 className="text-sm font-bold text-emerald-600 mb-3 flex items-center gap-1">
                                                <ThumbsUp size={14} /> Pros
                                            </h3>
                                            <ul className="space-y-2">
                                                {tool.pros.map((p, i) => (
                                                    <li key={i} className="text-xs text-foreground/80 flex gap-1.5">
                                                        <span className="text-emerald-500">•</span> {p}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {tool.cons && (
                                        <div>
                                            <h3 className="text-sm font-bold text-amber-600 mb-3 flex items-center gap-1">
                                                <ThumbsDown size={14} /> Cons
                                            </h3>
                                            <ul className="space-y-2">
                                                {tool.cons.map((c, i) => (
                                                    <li key={i} className="text-xs text-foreground/80 flex gap-1.5">
                                                        <span className="text-amber-500">•</span> {c}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </section>
                            )}
                        </div>
                    )}

                    {/* Pricing Tab */}
                    {activeTab === 'pricing' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {tool.freeTier?.available && (
                                <div className="border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-emerald-700 dark:text-emerald-400">Free Tier</h4>
                                    </div>
                                    <ul className="space-y-2 mt-3">
                                        {tool.freeTier.features.map((f, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                                <Check size={15} className="mt-0.5 text-emerald-600 shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {tool.paidPlans?.map((plan, i) => (
                                <div key={i} className="border border-border rounded-xl p-5 hover:border-primary/40 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="font-bold text-lg">{plan.name}</h4>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold">${plan.priceUSD}<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
                                            <div className="text-xs text-muted-foreground">~${plan.priceCAD} CAD</div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {plan.features.map((f, j) => (
                                            <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <Check size={15} className="mt-0.5 text-primary shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Resources Tab */}
                    {activeTab === 'resources' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="grid gap-3">
                                {tool.resources?.documentation && (
                                    <a href={tool.resources.documentation} target="_blank" className="flex items-center gap-4 p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors group">
                                        <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary/20 transition-colors">
                                            <BookOpen size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold">Documentation</div>
                                            <div className="text-xs text-muted-foreground">Official guides and references</div>
                                        </div>
                                        <ExternalLink size={16} className="text-muted-foreground" />
                                    </a>
                                )}
                                {tool.resources?.community && (
                                    <a href={tool.resources.community} target="_blank" className="flex items-center gap-4 p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors group">
                                        <div className="p-2 bg-purple-500/10 text-purple-600 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                                            <MessageSquare size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold">Community</div>
                                            <div className="text-xs text-muted-foreground">Join the discussion</div>
                                        </div>
                                        <ExternalLink size={16} className="text-muted-foreground" />
                                    </a>
                                )}
                            </div>

                            {tool.resources?.tutorials && tool.resources.tutorials.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold uppercase text-muted-foreground mb-3">Video Tutorials</h3>
                                    <div className="space-y-2">
                                        {tool.resources.tutorials.map((t, i) => (
                                            <a key={i} href={t} target="_blank" className="flex items-center gap-2 p-3 bg-muted/20 border border-transparent hover:border-border rounded-lg transition-colors text-sm group">
                                                <Video size={16} className="text-red-500" />
                                                <span className="truncate group-hover:underline">Tutorial Video {i + 1}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
