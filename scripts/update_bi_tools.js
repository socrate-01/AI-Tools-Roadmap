
const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '../src/data/tools.json');
const data = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

// Identify correct BI category ID
// Usually 'business-intelligence', but I should be careful.
const biCategory = data.categories.find(c => c.id === 'business-intelligence');

if (biCategory) {
    // 1. Keep only Julius, Power BI, Rows
    const updates = [
        { key: 'julius', logo: '/img/julius.png' },
        { key: 'power', logo: '/img/powerBi.webp' }, // Power BI
        { key: 'rows', logo: '/img/rows.png' }
    ];

    biCategory.tools = biCategory.tools.filter(t => {
        const id = t.id.toLowerCase();
        const name = t.name.toLowerCase();
        return updates.some(u => id.includes(u.key) || name.includes(u.key));
    });

    // 2. Map new logos
    updates.forEach(update => {
        let tool = biCategory.tools.find(t =>
            t.id.includes(update.key) || t.name.toLowerCase().includes(update.key)
        );

        if (tool) {
            tool.logo = update.logo;
            if (update.key === 'power') {
                if (!tool.name.toLowerCase().includes('power bi')) tool.name = "Power BI (Copilot)";
            }
            if (update.key === 'rows') tool.name = "Rows.com";
        } else {
            console.log(`Creating missing tool: ${update.key}`);
            const newTool = {
                id: update.key,
                name: update.key.charAt(0).toUpperCase() + update.key.slice(1),
                logo: update.logo,
                logoFallback: update.key.substring(0, 2).toUpperCase(),
                pricing: "freemium",
                officialWebsite: "https://example.com",
                shortDescription: "AI Data Tool",
                fullDescription: "AI Data Tool",
                bestFor: "Data Analysis",
                categoryId: "business-intelligence"
            };
            if (update.key === 'power') newTool.name = "Power BI";
            if (update.key === 'rows') newTool.name = "Rows.com";
            if (update.key === 'julius') newTool.name = "Julius AI";

            biCategory.tools.push(newTool);
        }
    });

    // Update tool count
    biCategory.toolCount = biCategory.tools.length;

    fs.writeFileSync(toolsPath, JSON.stringify(data, null, 4));
    console.log('Successfully updated Business Intelligence tools.');
} else {
    console.error('Business Intelligence category not found');
}
