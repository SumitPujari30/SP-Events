import fs from 'fs';

const servicesDataPath = 'c:/Users/Sumit Pujari/Desktop/SP_Website/SP-Events/src/data/servicesData.ts';
const content = fs.readFileSync(servicesDataPath, 'utf8');

// Simple regex to find event blocks and extract title and image
const eventRegex = /\{\s*"id":\s*"([^"]+)",\s*"title":\s*"([^"]+)",\s*"image":\s*"([^"]+)"/g;
let match;
const events = [];

while ((match = eventRegex.exec(content)) !== null) {
    events.push({
        id: match[1],
        title: match[2],
        image: match[3]
    });
}

console.log(JSON.stringify(events, null, 2));
