import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOOLS_JSON_PATH = path.join(__dirname, '../src/data/tools.json');
const PUBLIC_IMG_DIR = path.join(__dirname, '../public/img');

// Ensure image directory exists
if (!fs.existsSync(PUBLIC_IMG_DIR)) {
    fs.mkdirSync(PUBLIC_IMG_DIR, { recursive: true });
}

async function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(PUBLIC_IMG_DIR, filename);
        const file = fs.createWriteStream(filePath);

        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                file.close();
                fs.unlink(filePath, () => { }); // Delete empty file
                // If it fails, we keep the original URL (or log error)
                console.error(`Failed to download ${url}: Status ${response.statusCode}`);
                reject(new Error(`Status ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filePath, () => { });
            reject(err);
        });
    });
}

async function migrateLogos() {
    console.log('Starting Global Logo Migration...');
    const rawData = fs.readFileSync(TOOLS_JSON_PATH);
    const data = JSON.parse(rawData);

    let downloadCount = 0;
    let skipCount = 0;
    let failCount = 0;

    for (const category of data.categories) {
        console.log(`Processing category: ${category.name}`);
        for (const tool of category.tools) {
            // Check if logo is a remote URL
            if (tool.logo && tool.logo.startsWith('http')) {
                const extension = 'png'; // Clearbit defaults to PNG mostly
                const filename = `${tool.id}.${extension}`;

                try {
                    await downloadImage(tool.logo, filename);
                    // Update the JSON data to point to local file
                    tool.logo = `/img/${filename}`;
                    downloadCount++;
                    process.stdout.write('.'); // Progress dot
                } catch (error) {
                    console.error(`\nError downloading for ${tool.name} (${tool.logo}): ${error.message}`);
                    failCount++;
                }
            } else {
                skipCount++;
            }
        }
    }

    console.log('\n\n--- Migration Summary ---');
    console.log(`Downloaded: ${downloadCount}`);
    console.log(`Skipped (Already Local): ${skipCount}`);
    console.log(`Failed: ${failCount}`);

    // Write updated data back to file
    fs.writeFileSync(TOOLS_JSON_PATH, JSON.stringify(data, null, 4));
    console.log(`\nUpdated ${TOOLS_JSON_PATH}`);
}

migrateLogos().catch(console.error);
