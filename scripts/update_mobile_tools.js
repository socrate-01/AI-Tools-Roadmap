
const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '../src/data/tools.json');
const data = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

const mobileCategory = data.categories.find(c => c.id === 'mobile-development');
if (mobileCategory) {
    // Keep only FlutterFlow, Crowdbotics, Uizard
    const keepIds = ['flutterflow', 'crowdbotics', 'uizard'];
    mobileCategory.tools = mobileCategory.tools.filter(t => keepIds.includes(t.id));
    mobileCategory.toolCount = mobileCategory.tools.length;

    // Update logos
    const logoMap = {
        'flutterflow': '/img/flutterflow.png',
        'crowdbotics': '/img/Crowdbotics.png',
        'uizard': '/img/Uizard.jpg'
    };

    mobileCategory.tools.forEach(t => {
        if (logoMap[t.id]) {
            t.logo = logoMap[t.id];
        }
    });

    fs.writeFileSync(toolsPath, JSON.stringify(data, null, 4));
    console.log('Successfully updated mobile tools.');
} else {
    console.error('Mobile category not found');
}
