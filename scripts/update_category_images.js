
const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '../src/data/tools.json');
const data = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

// Mappings requested:
// Code (Generic Coding Assistants/Development) -> coding.jpg
// Mobile App Development -> mobileApp.webp
// Web Development -> webApp.jpg
// AI Assistants (LLMs) -> aiAssist.avif

const categoryUpdates = [
    { nameOrId: 'development', newImage: '/img/coding.jpg' },
    { nameOrId: 'code', newImage: '/img/coding.jpg' },
    { nameOrId: 'mobile-development', newImage: '/img/mobileApp.webp' },
    { nameOrId: 'web-development', newImage: '/img/webApp.jpg' },
    { nameOrId: 'ai-assistants', newImage: '/img/aiAssist.avif' },
    { nameOrId: 'project-management', newImage: '/img/projectManage.avif' },
    { nameOrId: 'design', newImage: '/img/design.jpg' },
    { nameOrId: 'content', newImage: '/img/copywriting.jpg' },
    { nameOrId: 'audio-video', newImage: '/img/audio.webp' },
    { nameOrId: 'business-intelligence', newImage: '/img/BI.jpg' },
    { nameOrId: 'automation', newImage: '/img/workflow.jpg' },
    { nameOrId: 'code-generation', newImage: '/img/noCode.webp' } // ID might be code-generation or similar
];

categoryUpdates.forEach(update => {
    // Find category by ID or loose Name match
    const category = data.categories.find(c =>
        c.id === update.nameOrId ||
        c.name.includes(update.nameOrId) ||
        (update.nameOrId === 'code' && c.name.startsWith('Code')) // "Code" usually named "Code" or "Development"
    );

    if (category) {
        // Only update if it's strictly one of the requested categories
        // Be careful not to overwrite generic "Code Generation" with "coding.jpg" unless intended.
        // User said "in code (general coding assistants) put coding.jpg".
        // Category ID for "Code" is usually 'code' or 'development'. 
        // I'll assume ID match is best.

        category.image = update.newImage;
        console.log(`Updated category '${category.name}' (${category.id}) with image ${update.newImage}`);
    } else {
        console.log(`Category matching '${update.nameOrId}' not found.`);
    }
});

fs.writeFileSync(toolsPath, JSON.stringify(data, null, 4));
