
const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '../src/data/tools.json');
const data = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

const contentCategory = data.categories.find(c => c.id === 'content');
if (contentCategory) {
    // 1. Keep only Jasper, Copy.ai, Rytr
    const updates = [
        { key: 'jasper', logo: '/img/Jasper.png' },
        { key: 'copy', logo: '/img/copy.webp' },
        { key: 'rytr', logo: '/img/Rytr.png' }
    ];

    contentCategory.tools = contentCategory.tools.filter(t => {
        const id = t.id.toLowerCase();
        const name = t.name.toLowerCase();
        return updates.some(u => id.includes(u.key) || name.includes(u.key));
    });

    // 2. Map new logos
    updates.forEach(update => {
        let tool = contentCategory.tools.find(t =>
            t.id.includes(update.key) || t.name.toLowerCase().includes(update.key)
        );

        if (tool) {
            tool.logo = update.logo;
            // Ensure Copy.ai proper naming/ID potentially
            if (update.key === 'copy') {
                if (!tool.name.toLowerCase().includes('copy.ai')) tool.name = "Copy.ai";
            }
        } else {
            console.log(`Creating missing tool: ${update.key}`);
            const newTool = {
                id: update.key,
                name: update.key.charAt(0).toUpperCase() + update.key.slice(1),
                logo: update.logo,
                logoFallback: update.key.substring(0, 2).toUpperCase(),
                pricing: "free",
                officialWebsite: "https://example.com",
                shortDescription: "AI Content Tool",
                fullDescription: "AI Content Tool",
                bestFor: "Writing",
                categoryId: "content-creation"
            };
            if (update.key === 'copy') newTool.name = "Copy.ai";
            contentCategory.tools.push(newTool);
        }
    });

    // Update tool count
    contentCategory.toolCount = contentCategory.tools.length;

    fs.writeFileSync(toolsPath, JSON.stringify(data, null, 4));
    console.log('Successfully updated Content Creation tools.');
} else {
    // Fallback if ID is different
    console.error('Content Creation category not found (checked "content-creation")');
}
