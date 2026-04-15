import fs from 'fs';
import path from 'path';

const clientDataPath = 'c:/Users/Sumit Pujari/Desktop/SP_Website/SP-Events/src/lib/clientData.ts';
const transparentBrandsPath = 'c:/Users/Sumit Pujari/Desktop/SP_Website/SP-Events/src/lib/transparentBrands.ts';
const imagesDir = 'c:/Users/Sumit Pujari/Desktop/SP_Website/SP-Events/public/assets/client_transparent_images';

function checkFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const logoMatches = fileContent.match(/logo:\s*"([^"]+)"/g) || [];
    const logosInCode = logoMatches.map(m => m.match(/"([^"]+)"/)[1]);

    const filesInDir = fs.readdirSync(imagesDir);

    console.log(`--- Comparison for ${path.basename(filePath)} ---`);
    logosInCode.forEach(logo => {
        if (!filesInDir.includes(logo)) {
            console.log(`MISSING FILE: ${logo}`);
            const match = filesInDir.find(f => f.toLowerCase() === logo.toLowerCase());
            if (match) {
                console.log(`  Found case mismatch: ${match}`);
            }
        }
    });
}

checkFile(clientDataPath);
checkFile(transparentBrandsPath);
