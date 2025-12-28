"use client"
import { useState } from "react"
import { Search, Database, Github, Menu, Bot } from "lucide-react" // Removed Sun/Moon imports as they are in ThemeToggle
import { ThemeToggle } from "./ThemeToggle"
import { JsonViewer } from "./JsonViewer"
import Link from "next/link"

interface NavbarProps {
    onSearch?: (query: string) => void; // Optional now as strictly filters might settle
}

export function Navbar({ onSearch }: NavbarProps) {
    const [jsonOpen, setJsonOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 h-16 border-b border-border/40 bg-background/80 backdrop-blur-md z-50 px-4 md:px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl md:text-2xl tracking-tight hover:opacity-80 transition-opacity">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                        <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <span className="hidden sm:inline bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        AI Tools Roadmap
                    </span>
                </Link>

                {/* Search - Centered */}
                <div className="flex-1 max-w-md mx-4 hidden md:block">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search AI tools, categories..."
                            className="w-full h-10 pl-10 pr-4 rounded-full border border-input bg-muted/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                            onChange={(e) => onSearch && onSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    <button
                        onClick={() => setJsonOpen(true)}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                        title="View API JSON"
                    >
                        <Database size={18} />
                        <span className="hidden lg:inline">View JSON</span>
                    </button>

                    <a
                        href="https://github.com/socrate-01/AI-Tools-Roadmap.git"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                    >
                        <Github size={18} />
                        <span className="hidden lg:inline">GitHub</span>
                    </a>

                    <button className="md:hidden p-2 hover:bg-muted rounded-full ml-1">
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </nav>

            {/* JSON Modal */}
            <JsonViewer isOpen={jsonOpen} onClose={() => setJsonOpen(false)} />
        </>
    )
}
