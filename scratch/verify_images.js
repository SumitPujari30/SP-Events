const fs = require('fs');
const content = fs.readFileSync('src/data/servicesData.ts', 'utf8');
const lines = content.split('\n');
lines.forEach((line, i) => {
    if (line.includes('"image":') && !line.includes('/assets/Layout_page.png')) {
        console.log(`Line ${i+1}: ${line.trim()}`);
    }
});
