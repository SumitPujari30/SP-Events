const fs = require('fs');
const path = require('path');

const dir = './src';
const replacements = [
    { regex: /#0D0B1E/gi, replace: '#050505' },
    { regex: /#08061A/gi, replace: '#000000' },
    { regex: /#1C1935/gi, replace: '#111111' },
    { regex: /#12102A/gi, replace: '#0A0A0A' },
    { regex: /rgba\(\s*28\s*,\s*25\s*,\s*53/gi, replace: 'rgba(17, 17, 17' },
    { regex: /rgba\(\s*13\s*,\s*11\s*,\s*30/gi, replace: 'rgba(5, 5, 5' },
    { regex: /rgba\(\s*88\s*,\s*60\s*,\s*180/gi, replace: 'rgba(200, 200, 200' },
    { regex: /#a8a4b8/gi, replace: '#a0a0a0' },
    { regex: /--color-purple-primary:/gi, replace: '--color-dark-primary:' },
    { regex: /--color-purple-glow:/gi, replace: '--color-dark-glow:' },
    { regex: /--gradient-purple:/gi, replace: '--gradient-dark:' },
    { regex: /Deep Indigo-Purple \+ Warm Gold/gi, replace: 'Pure Black + Warm Gold' },
    { regex: /Deep indigo-purple background/gi, replace: 'Pure black background' }
];

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.css') || fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            for (const { regex, replace } of replacements) {
                if (regex.test(content)) {
                    content = content.replace(regex, replace);
                    modified = true;
                }
            }
            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated: ' + fullPath);
            }
        }
    }
}

processDirectory(dir);
