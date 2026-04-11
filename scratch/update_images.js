const fs = require('fs');
const path = 'src/data/servicesData.ts';
let content = fs.readFileSync(path, 'utf8');

// Replace all "image": "..." where value starts with /assets/webp_images/
// We use a regex that matches the key and the specific path prefix
const regex = /"image":\s*"\/assets\/webp_images\/.*?"/g;
const updated = content.replace(regex, '"image": "/assets/Layout_page.png"');

fs.writeFileSync(path, updated);
console.log('Update complete.');
