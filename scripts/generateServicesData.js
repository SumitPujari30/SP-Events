const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../public/assets/webp_images');
const outputDir = path.join(__dirname, '../src/data');
const outputFile = path.join(outputDir, 'servicesData.ts');

const categoryMapping = {
    'Corporate Events': { id: 'corporate', title: 'Corporate', num: '01', tagline: 'Strategy meets spectacle', desc: 'We elevate corporate gatherings into powerful brand moments.', bgImage: '/assets/services/corporate_bg.png' },
    'Special Events': { id: 'special', title: 'Special', num: '02', tagline: 'Moments that become memories', desc: 'Life\'s most meaningful occasions deserve flawless execution.', bgImage: '/assets/services/special_bg.png' },
    'Launch Events': { id: 'launch', title: 'Launch', num: '03', tagline: 'First impressions, perfected', desc: 'A product launch is your brand\'s most critical moment.', bgImage: '/assets/services/launch_bg.png' },
    'Music Events': { id: 'music', title: 'Music', num: '04', tagline: 'Sonic experiences that move crowds', desc: 'From intimate acoustic evenings to stadium-filling concerts.', bgImage: '/assets/services/music_bg.png' },
    'Sports Events': { id: 'sports', title: 'Sports', num: '05', tagline: 'Where champions are celebrated', desc: 'We bring the energy of sport to life.', bgImage: '/assets/services/sports_bg.png' },
    'Weddings': { id: 'wedding', title: 'Wedding', num: '06', tagline: 'Love stories brought to life', desc: 'Every love story is unique — and your wedding should be too.', bgImage: '/assets/services/wedding_bg.png' }
};

function getWebpImages(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
        .filter(file => file.toLowerCase().endsWith('.webp'))
        .map(file => {
            // Get path relative to 'public' folder
            const relativePath = path.relative(path.join(__dirname, '../public'), path.join(dir, file));
            return '/' + relativePath.replace(/\\/g, '/');
        });
}

function generateData() {
    const services = [];

    Object.entries(categoryMapping).forEach(([folderName, config]) => {
        const categoryDir = path.join(baseDir, folderName);
        const events = [];

        if (fs.existsSync(categoryDir)) {
            const eventFolders = fs.readdirSync(categoryDir, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name);

            eventFolders.forEach((eventFolder, index) => {
                const eventDir = path.join(categoryDir, eventFolder);
                const images = getWebpImages(eventDir);

                if (images.length > 0) {
                    events.push({
                        id: `${config.id}-${index + 1}`,
                        title: eventFolder,
                        image: images[0], // First image as thumbnail
                        allImages: images
                    });
                }
            });
        }

        services.push({
            ...config,
            events: events
        });
    });

    const content = `
export interface SubEvent {
    id: string;
    title: string;
    image: string;
    allImages: string[];
}

export interface ServiceCategory {
    id: string;
    num: string;
    title: string;
    tagline: string;
    desc: string;
    bgImage: string;
    events: SubEvent[];
}

export const services: ServiceCategory[] = ${JSON.stringify(services, null, 4)};
`;

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(outputFile, content);
    console.log('Services data generated successfully at ' + outputFile);
}

generateData();
