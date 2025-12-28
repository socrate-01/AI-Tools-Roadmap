"use client"
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CategoryCard } from '@/components/CategoryCard'
import toolsDataRaw from '@/data/tools.json'
import { ToolsData } from '@/lib/types'

const data = toolsDataRaw as unknown as ToolsData;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter categories based on search
  const filteredCategories = data.categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Navbar onSearch={setSearchQuery} />

      <main className="flex-1 container mx-auto px-4 py-8 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-in slide-in-from-top-5 duration-500">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Welcome to AI Tools Roadmap
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the complete landscape of AI tools across every domain.
            Navigate through categories to find the perfect tool for your needs.
          </p>
        </div>

        {/* Level 1: Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
          {filteredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center text-muted-foreground mt-12">
            No categories found matching "{searchQuery}"
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
