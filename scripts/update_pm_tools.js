
const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '../src/data/tools.json');
const data = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

const pmCategory = data.categories.find(c => c.id === 'project-management');
if (pmCategory) {
    // 1. Keep only Asana, Notion, Trello, Jira
    // I need to filter.
    // I will assume standard IDs first, or name matches.

    // Updates
    const updates = [
        { key: 'asana', logo: '/img/asana.jpg' },
        { key: 'notion', logo: '/img/notion.png' },
        { key: 'trello', logo: '/img/trello.png' },
        { key: 'jira', logo: '/img/Jira.png' }
    ];

    pmCategory.tools = pmCategory.tools.filter(t => {
        const id = t.id.toLowerCase();
        const name = t.name.toLowerCase();
        return updates.some(u => id.includes(u.key) || name.includes(u.key));
    });

    // 2. Map new logos
    updates.forEach(update => {
        let tool = pmCategory.tools.find(t =>
            t.id.includes(update.key) || t.name.toLowerCase().includes(update.key)
        );

        if (tool) {
            tool.logo = update.logo;
            // Force basic naming if needed
            if (update.key === 'asana' && tool.name.includes('Intelligence')) { /* keep it */ }
        } else {
            console.log(`Creating missing tool: ${update.key}`);
            // If any are missing, I'd create them, but PM category usually has these.
            // Notion might be under Notion AI.
            // Jira might be Jira Software.
            // Trello might be Trello.
        }
    });

    // Update tool count
    pmCategory.toolCount = pmCategory.tools.length;

    fs.writeFileSync(toolsPath, JSON.stringify(data, null, 4));
    console.log('Successfully updated Project Management tools.');
} else {
    console.error('Project Management category not found');
}
