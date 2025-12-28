
const fs = require('fs');
const path = require('path');
const https = require('https');

const toolsPath = path.join(__dirname, '../src/data/tools.json');
const data = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

// 1. Delete Customer Support category
// ID is likely 'customer-support' (implied by previous reads).
// Line 1502 name "Customer Support"
// I will filter out any category with name "Customer Support" or ID "customer-support".

const initialCount = data.categories.length;
data.categories = data.categories.filter(c => {
    return c.id !== 'customer-support' && c.name !== 'Customer Support';
});

if (data.categories.length < initialCount) {
    console.log('Successfully removed Customer Support category.');
} else {
    console.log('Category Customer Support not found (or already deleted).');
}

// 2. Fix Julius AI logo (Simple download attempt)
// Since julius.png was 404, we'll try to download it from a fallback or just skip if too complex for this script.
// I will assume I can just fix it by ensuring the file exists.
// Actually, I'll log a warning. The user didn't explicitly ask for this fix here, but for "delete category".
// I'll keep this script focused on deletion.
// But to be helpful, I'll check if I can quickly fetch a Julius logo.
// Not easy without a URL. I'll skip it for now and focus on the deletion.

fs.writeFileSync(toolsPath, JSON.stringify(data, null, 4));
