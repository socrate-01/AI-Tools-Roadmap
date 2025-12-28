"use client"
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ToolCard } from '@/components/ToolCard'
import { ToolDetailModal } from '@/components/ToolDetailModal'
import { ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import toolsDataRaw from '@/data/tools.json'
import { ToolsData, Tool } from '@/lib/types'
import { useParams } from 'next/navigation'

// Ensure type safety
const data = toolsDataRaw as unknown as ToolsData;

export default function CategoryClient() {
    const params = useParams();
    const id = params?.id as string;
    const [activeTool, setActiveTool] = useState<Tool | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const category = data.categories.find(c => c.id === id);

    if (!category) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Category Not Found</h1>
                    <Link href="/" className="text-primary hover:underline">Return Home</Link>
                </div>
            </div>
        )
    }

    // @ts-ignore
    const Icon = (Icons[category.icon as keyof typeof Icons] as LucideIcon) || Icons.Folder;

    // Filter tools
    const filteredTools = category.tools.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar onSearch={setSearchQuery} />

            <main className="flex-1 container mx-auto px-4 py-8 pt-24">
                {/* Breadcrumb & Header */}
                <div className="mb-8 animate-in slide-in-from-left-5 duration-300">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Categories
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className={`rounded-2xl p-3 ${category.image ? 'bg-transparent' : 'bg-muted/50'}`} style={{ color: category.color }}>
                            {category.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={category.image} alt={category.name} className="w-16 h-16 object-contain rounded-lg" />
                            ) : (
                                <Icon size={40} />
                            )}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
                            <p className="text-muted-foreground mt-1">{category.description}</p>
                        </div>
                    </div>
                </div>

                {/* Tools Grid */}
                {filteredTools.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {filteredTools.map((tool) => (
                            <ToolCard
                                key={tool.id}
                                tool={tool}
                                onClick={setActiveTool}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border border-dashed border-border rounded-xl">
                        <Search size={48} className="mb-4 opacity-20" />
                        <p className="text-lg font-medium">No tools found matching "{searchQuery}"</p>
                        <p className="text-sm">Try adjusting your search terms</p>
                    </div>
                )}
            </main>

            <Footer />

            <ToolDetailModal
                tool={activeTool}
                onClose={() => setActiveTool(null)}
            />
        </div>
    )
}
