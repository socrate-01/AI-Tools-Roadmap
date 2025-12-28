
const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '../src/data/tools.json');
const data = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

// 1. Update Code Generation & No-Code Category
// ID: code-generation-no-code (need to verify, likely 'code-generation' or similar)
// Let's filter by name "Code Generation".
let codeCategory = data.categories.find(c => c.name.includes('Code Generation'));

if (codeCategory) {
    console.log(`Found Code Generation category: ${codeCategory.id}`);

    // Updates
    const codeUpdates = [
        { key: 'supabase', logo: '/img/supabase.png' },
        { key: 'glide', logo: '/img/glide.png' },
        { key: 'replit', logo: '/img/replit.png' },
        { key: 'bubble', logo: '/img/bubble.png' }
    ];

    // Filter tools
    codeCategory.tools = codeCategory.tools.filter(t => {
        const id = t.id.toLowerCase();
        const name = t.name.toLowerCase();
        return codeUpdates.some(u => id.includes(u.key) || name.includes(u.key));
    });

    // Update logos
    codeUpdates.forEach(update => {
        let tool = codeCategory.tools.find(t =>
            t.id.includes(update.key) || t.name.toLowerCase().includes(update.key)
        );

        if (tool) {
            tool.logo = update.logo;
            if (update.key === 'supabase') tool.name = "Supabase"; // Fix if "Supabase AI"
        } else {
            console.log(`Creating missing tool: ${update.key}`);
            const newTool = {
                id: update.key,
                name: update.key.charAt(0).toUpperCase() + update.key.slice(1),
                logo: update.logo,
                logoFallback: update.key.substring(0, 2).toUpperCase(),
                pricing: "freemium",
                officialWebsite: "https://example.com",
                shortDescription: "No-Code Tool",
                fullDescription: "No-Code Tool",
                bestFor: "Building Apps",
                categoryId: codeCategory.id
            };
            codeCategory.tools.push(newTool);
        }
    });
    codeCategory.toolCount = codeCategory.tools.length;
    console.log('Successfully updated Code Generation tools.');
} else {
    console.error('Code Generation category not found');
}

// 2. Fix Julius AI (Business Intelligence)
const biCategory = data.categories.find(c => c.id === 'business-intelligence');
if (biCategory) {
    const julius = biCategory.tools.find(t => t.id === 'julius' || t.name.includes('Julius'));
    if (julius) {
        julius.logo = '/img/julius.jpg'; // Fix extension
        console.log('Successfully fixed Julius AI logo.');
    } else {
        console.error('Julius AI tool not found for fix.');
    }
}

fs.writeFileSync(toolsPath, JSON.stringify(data, null, 4));
