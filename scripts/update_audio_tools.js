
const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '../src/data/tools.json');
const data = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

// Based on previous reads, ID is likely 'audio-video'
const avCategory = data.categories.find(c => c.id === 'audio-video');

if (avCategory) {
    // 1. Keep only Runway Gen-3, Sora, Nano Banana
    const updates = [
        { key: 'runway', logo: '/img/runway.jpg' },
        { key: 'sora', logo: '/img/Sora.webp' },
        { key: 'nano', logo: '/img/nanobanana.jpeg', name: 'Nano Banana' }
    ];

    avCategory.tools = avCategory.tools.filter(t => {
        const id = t.id.toLowerCase();
        const name = t.name.toLowerCase();
        // Keep if matches runway or sora
        return id.includes('runway') || name.includes('runway') ||
            id.includes('sora') || name.includes('sora');
        // Nano Banana will be added, so no need to filter for it unless it exists (unlikely)
    });

    // 2. Update existing and create new
    updates.forEach(update => {
        let tool = avCategory.tools.find(t =>
            t.id.includes(update.key) || t.name.toLowerCase().includes(update.key)
        );

        if (tool) {
            tool.logo = update.logo;
            // Ensure names match user request closer if needed
            if (update.key === 'runway') tool.name = "Runway Gen-3";
            if (update.key === 'sora') tool.name = "Sora (OpenAI)";
        } else {
            console.log(`Creating missing tool: ${update.name || update.key}`);
            const newTool = {
                id: update.key === 'nano' ? 'nanobanana' : update.key,
                name: update.name || (update.key.charAt(0).toUpperCase() + update.key.slice(1)),
                logo: update.logo,
                logoFallback: update.key.substring(0, 2).toUpperCase(),
                pricing: "free", // Default
                officialWebsite: "https://example.com",
                shortDescription: "AI Audio/Video Tool",
                fullDescription: "AI Audio/Video Tool",
                bestFor: "Content Creation",
                categoryId: "audio-video"
            };
            avCategory.tools.push(newTool);
        }
    });

    // Update tool count
    avCategory.toolCount = avCategory.tools.length;

    fs.writeFileSync(toolsPath, JSON.stringify(data, null, 4));
    console.log('Successfully updated Audio & Video tools.');
} else {
    // Fallback if ID is different
    console.error('Audio & Video category not found (checked "audio-video")');
}
