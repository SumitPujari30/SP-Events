import fs from 'fs';
import path from 'path';

const coverImagesDir = 'c:/Users/Sumit Pujari/Desktop/SP_Website/SP-Events/public/assets/cover_images';
const servicesDataPath = 'c:/Users/Sumit Pujari/Desktop/SP_Website/SP-Events/src/data/servicesData.ts';

const files = fs.readdirSync(coverImagesDir);
const servicesData = fs.readFileSync(servicesDataPath, 'utf8');

const missingFiles = [];
files.forEach(file => {
    if (!servicesData.includes(file)) {
        missingFiles.push(file);
    }
});

console.log('Files in cover_images but missing from servicesData.ts:');
missingFiles.forEach(file => console.log(file));
