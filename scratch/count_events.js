const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'Sumit Pujari', 'Desktop', 'SP_Website', 'SP-Events', 'src', 'data', 'servicesData.ts');
const content = fs.readFileSync(filePath, 'utf8');

// I'll extract all "title" fields that appear after an "id" with a hyphen (sub-events).
// Example: "id": "corporate-1", "title": "..."
const subEventRegex = /"id":\s*"[^"]+-[^"]+",\s*"title":\s*"([^"]+)"/g;
const titles = [];
let match;

while ((match = subEventRegex.exec(content)) !== null) {
    titles.push(match[1]);
}

const uniqueTitles = [...new Set(titles)].sort();

console.log(`Total unique events (sub-events): ${uniqueTitles.length}`);
uniqueTitles.forEach((t, i) => console.log(`${i + 1}. ${t}`));
