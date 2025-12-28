"use client"
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Category } from '@/lib/types';
import Link from 'next/link';

interface CategoryCardProps {
    category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
    // @ts-ignore
    const Icon = (Icons[category.icon as keyof typeof Icons] as LucideIcon) || Icons.Folder;

    return (
        <Link
            href={`/category/${category.id}`}
            className="group"
        >
            <div className="w-[200px] min-h-[160px] h-full border border-border rounded-xl p-6 flex flex-col items-center justify-center bg-card hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center relative overflow-hidden">
                {/* Subtle background glow */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: category.color }}
                />

                <div
                    className={`rounded-2xl mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300 overflow-hidden ${category.image ? 'bg-transparent' : 'p-3.5 bg-muted/50'}`}
                    style={{ color: category.color }}
                >
                    {category.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-16 h-16 object-contain rounded-lg"
                        />
                    ) : (
                        <Icon size={40} strokeWidth={1.5} />
                    )}
                </div>

                <h3 className="font-bold text-base leading-tight group-hover:text-primary transition-colors">
                    {category.name}
                </h3>

                <div className="text-xs text-muted-foreground mt-2 font-medium">
                    {category.toolCount} Tools
                </div>
            </div>
        </Link>
    );
}
