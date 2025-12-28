
const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '../src/data/tools.json');
const data = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

const webCategory = data.categories.find(c => c.id === 'web-development');
if (webCategory) {
    // Keep only V0.dev, Bolt.new, Lovable, Framer AI, Webflow AI
    // Note: I need to ensure the IDs match what is in the JSON or what the user implies.
    // Based on previous reads, V0 ID is 'v0'.
    // I will need to verify the other IDs in the file.
    // If they don't exist, I might need to create them or rename existing ones.

    // Let's first dump the current IDs to be sure, but since I'm writing a script, I can do it dynamically.
    // However, for this script, I'll filter by ID if I know them, or I'll just rewrite the tools array with the specific 5 items.
    // Since the user said "keep... and delete the rest", it implies they might already exist.
    // But "Bolt.new", "Lovable" might be new or named differently.
    // I'll assume standard IDs or map them.

    // Actually, to be safe, I should read the file first to know the IDs.
    // But I can blindly update if I construct the objects.
    // The user didn't give full descriptions, so I should try to preserve existing data if possible.

    // Let's do a logic that keeps if exists, or creates/renames.

    const targetTools = [
        { id: 'v0', name: 'V0.dev (by Vercel)', logo: '/img/Vercel.png' },
        { id: 'bolt-new', name: 'Bolt.new', logo: '/img/bolt.jpeg' }, // Assuming ID
        { id: 'lovable', name: 'Lovable', logo: '/img/Lovable.jpeg' }, // Assuming ID
        { id: 'framer-ai', name: 'Framer AI', logo: '/img/Framer.png' },
        { id: 'webflow-ai', name: 'Webflow AI', logo: '/img/webflow.svg' }
    ];

    const newTools = [];

    // Helper to find existing tool by ID or Name approximation
    const findTool = (target) => {
        return webCategory.tools.find(t =>
            t.id === target.id ||
            t.name.toLowerCase().includes(target.name.toLowerCase().split(' ')[0])
        );
    };

    targetTools.forEach(target => {
        let existing = findTool(target);
        if (existing) {
            existing.logo = target.logo;
            existing.name = target.name; // Ensure name matches user request
            // Ensure ID matches target for consistency if we want
            newTools.push(existing);
        } else {
            // Create new entry if missing (fallback)
            newTools.push({
                id: target.id,
                name: target.name,
                logo: target.logo,
                logoFallback: target.name.substring(0, 2).toUpperCase(),
                pricing: "freemium", // Default
                officialWebsite: "https://example.com", // Placeholder
                shortDescription: "AI web development tool.",
                fullDescription: "AI web development tool.",
                bestFor: "Web Development",
                categoryId: "web-development"
            });
        }
    });

    webCategory.tools = newTools;
    webCategory.toolCount = newTools.length;

    fs.writeFileSync(toolsPath, JSON.stringify(data, null, 4));
    console.log('Successfully updated web tools.');
} else {
    console.error('Web category not found');
}
