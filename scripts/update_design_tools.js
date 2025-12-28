
const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '../src/data/tools.json');
const data = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

const designCategory = data.categories.find(c => c.id === 'design');
if (designCategory) {
    // 1. Keep only Midjourney, Figma, Galileo, Adobe Firefly
    const updates = [
        { key: 'midjourney', logo: '/img/midjourney.webp' },
        { key: 'figma', logo: '/img/Figma.png' },
        { key: 'galileo', logo: '/img/Galileo.webp' },
        { key: 'adobe', logo: '/img/adobe.png' }
    ];

    designCategory.tools = designCategory.tools.filter(t => {
        const id = t.id.toLowerCase();
        const name = t.name.toLowerCase();
        return updates.some(u => id.includes(u.key) || name.includes(u.key));
    });

    // 2. Map new logos
    updates.forEach(update => {
        let tool = designCategory.tools.find(t =>
            t.id.includes(update.key) || t.name.toLowerCase().includes(update.key)
        );

        if (tool) {
            tool.logo = update.logo;
            // Force basic naming only if it seems off, but usually existing names are okay.
            // Midjourney is Midjourney.
            // Figma is Figma.
            // Galileo AI -> Galileo.
            // Adobe Firefly -> Adobe Firefly.
        } else {
            // Create if missing. "Adobe" usually matches "Adobe Firefly".
            console.log(`Creating missing tool: ${update.key}`);
            const newTool = {
                id: update.key,
                name: update.key.charAt(0).toUpperCase() + update.key.slice(1),
                logo: update.logo,
                logoFallback: update.key.substring(0, 2).toUpperCase(),
                pricing: "paid",
                officialWebsite: "https://example.com",
                shortDescription: "AI Design Tool",
                fullDescription: "AI Design Tool",
                bestFor: "Design",
                categoryId: "design"
            };
            if (update.key === 'adobe') newTool.name = "Adobe Firefly";
            designCategory.tools.push(newTool);
        }
    });

    // Update tool count
    designCategory.toolCount = designCategory.tools.length;

    fs.writeFileSync(toolsPath, JSON.stringify(data, null, 4));
    console.log('Successfully updated Design tools.');
} else {
    console.error('Design category not found');
}
