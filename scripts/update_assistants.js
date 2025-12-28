
const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '../src/data/tools.json');
const data = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

const assistantCategory = data.categories.find(c => c.id === 'ai-assistants');
if (assistantCategory) {
    // 1. Delete "Poe" and "Pi"
    assistantCategory.tools = assistantCategory.tools.filter(t => {
        const id = t.id.toLowerCase();
        const name = t.name.toLowerCase();
        return !id.includes('poe') && !name.includes('poe') &&
            !id.includes('pi-ai') && !name.includes('pi');
    });

    // 2. Map of exact target tools and their new logos
    const updates = [
        { key: 'chatgpt', logo: '/img/chatgpt.svg' },
        { key: 'claude', logo: '/img/Claude.png' },
        { key: 'gemini', logo: '/img/Gemini.png' },
        { key: 'perplexity', logo: '/img/perplexity.webp' },
        { key: 'microsoft-copilot', logo: '/img/microsoftcopilot.svg' },
        { key: 'grok', logo: '/img/grok.webp' },
        { key: 'huggingchat', logo: '/img/HuggingChat.png' },
        { key: 'mistral', logo: '/img/mistral.png' }
    ];

    updates.forEach(update => {
        let tool = assistantCategory.tools.find(t =>
            t.id.includes(update.key) || t.name.toLowerCase().includes(update.key.replace('-', ' '))
        );

        if (tool) {
            tool.logo = update.logo;
            // Force reasonable names if found
            if (update.key === 'microsoft-copilot') tool.name = "Microsoft Copilot";
        } else {
            console.log(`Creating missing tool: ${update.key}`);
            const newTool = {
                id: update.key,
                name: update.key.charAt(0).toUpperCase() + update.key.slice(1).replace('-', ' '),
                logo: update.logo,
                logoFallback: update.key.substring(0, 2).toUpperCase(),
                pricing: "freemium",
                officialWebsite: "https://example.com",
                shortDescription: `AI Assistant: ${update.key}`,
                fullDescription: `AI Assistant: ${update.key}`,
                bestFor: "General Assistance",
                categoryId: "ai-assistants"
            };
            if (update.key === 'claude') {
                newTool.name = "Claude (Anthropic)";
                newTool.officialWebsite = "https://claude.ai";
                newTool.shortDescription = "Anthropic's helpful and harmless AI assistant.";
                newTool.fullDescription = "Anthropic's helpful and harmless AI assistant. Known for large context windows and safe responses.";
            }
            if (update.key === 'microsoft-copilot') {
                newTool.name = "Microsoft Copilot";
                newTool.id = "microsoft-copilot";
                newTool.officialWebsite = "https://copilot.microsoft.com";
                newTool.shortDescription = "AI companion for the web and Microsoft 365.";
            }
            assistantCategory.tools.push(newTool);
        }
    });

    // Update tool count
    assistantCategory.toolCount = assistantCategory.tools.length;

    fs.writeFileSync(toolsPath, JSON.stringify(data, null, 4));
    console.log('Successfully updated AI Assistants tools.');
} else {
    console.error('AI Assistants category not found');
}
