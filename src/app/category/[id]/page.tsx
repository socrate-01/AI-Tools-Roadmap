
import type { Metadata } from 'next'
import CategoryClient from './CategoryClient'
import toolsDataRaw from '@/data/tools.json'
import { ToolsData } from '@/lib/types'

const data = toolsDataRaw as unknown as ToolsData;

type Props = {
    params: Promise<{ id: string }>
}


export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    // read route params
    const { id } = await params

    // fetch data
    const category = data.categories.find(c => c.id === id)

    if (!category) {
        return {
            title: 'Category Not Found',
        }
    }

    return {
        title: category.name, // Template in layout handles full title
        description: `Discover the best ${category.name} AI tools. ${category.description}`,
        openGraph: {
            title: `${category.name} AI Tools - AI Tools Roadmap`,
            description: category.description,
            images: category.image ? [{ url: category.image }] : [],
        }
    }
}

export default async function Page({ params }: Props) {
    await params; // Ensure params is awaited if needed, though client uses useParams
    return <CategoryClient />
}
