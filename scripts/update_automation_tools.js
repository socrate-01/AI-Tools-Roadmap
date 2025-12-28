
const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '../src/data/tools.json');
const data = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

// Identify correct Automation category ID
// Usually 'automation' or 'automation-workflows'
// Let's deduce or find it. Step 625 output shows: "id": "automation-workflows" (implied by "name": "Automation & Workflows" at line 1308)
// Wait, I should verify ID.
// Line 1308 says "name": "Automation & Workflows". The ID is likely above it. 
// I'll filter by name to be safe.

const automationCategory = data.categories.find(c => c.name.includes('Automation') || c.id.includes('automation'));

if (automationCategory) {
    console.log(`Found category: ${automationCategory.id}`);

    // 1. Keep only Zapier, n8n, Workato
    const updates = [
        { key: 'zapier', logo: '/img/Zapier.png' },
        { key: 'n8n', logo: '/img/n8n.png' },
        { key: 'workato', logo: '/img/Workato.png' }
    ];

    automationCategory.tools = automationCategory.tools.filter(t => {
        const id = t.id.toLowerCase();
        const name = t.name.toLowerCase();
        return updates.some(u => id.includes(u.key) || name.includes(u.key));
    });

    // 2. Map new logos
    updates.forEach(update => {
        let tool = automationCategory.tools.find(t =>
            t.id.includes(update.key) || t.name.toLowerCase().includes(update.key)
        );

        if (tool) {
            tool.logo = update.logo;
            if (update.key === 'zapier') {
                // Ensure name is just Zapier if needed, but "Zapier Central" might be current. User said "Keep Zapier".
                // If the tool is "Zapier Central", I should probably rename it to "Zapier" or keep as is?
                // User said "keep Zapier".
                if (!tool.name.includes('Zapier')) tool.name = "Zapier";
            }
        } else {
            console.log(`Creating missing tool: ${update.key}`);
            const newTool = {
                id: update.key,
                name: update.key.charAt(0).toUpperCase() + update.key.slice(1),
                logo: update.logo,
                logoFallback: update.key.substring(0, 2).toUpperCase(),
                pricing: "freemium",
                officialWebsite: "https://example.com",
                shortDescription: "Automation Tool",
                fullDescription: "Automation Tool",
                bestFor: "Workflows",
                categoryId: automationCategory.id
            };
            if (update.key === 'n8n') newTool.name = "n8n";
            automationCategory.tools.push(newTool);
        }
    });

    // Update tool count
    automationCategory.toolCount = automationCategory.tools.length;

    fs.writeFileSync(toolsPath, JSON.stringify(data, null, 4));
    console.log('Successfully updated Automation tools.');
} else {
    console.error('Automation category not found');
}
