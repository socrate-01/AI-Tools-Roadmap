
import { MetadataRoute } from 'next'
import toolsDataRaw from '@/data/tools.json'
import { ToolsData } from '@/lib/types'

const data = toolsDataRaw as unknown as ToolsData;
const baseUrl = 'https://ai-tools-roadmap.vercel.app'; // Placeholder base URL

export default function sitemap(): MetadataRoute.Sitemap {
    const categories = data.categories.map((category) => ({
        url: `${baseUrl}/category/${category.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...categories,
    ]
}
