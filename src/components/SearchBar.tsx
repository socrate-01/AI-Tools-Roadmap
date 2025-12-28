"use client"
import { Search } from "lucide-react"

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
    return (
        <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
                type="text"
                placeholder="Search AI tools, categories..."
                className="w-full h-10 pl-10 pr-4 rounded-full border border-input bg-muted/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    )
}
