import fs from 'fs';
import path from 'path';

// This script generates an array of 45 gallery events based on the 5 templates we have.
// It formats them perfectly into src/lib/galleryData.ts.

const originalEvents = [
    {
        slug: 'innovation-summit-2024',
        title: 'Innovation Summit',
        category: 'Summit',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=85',
        heroImages: [
            'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=85',
            'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&q=85',
            'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1600&q=85',
        ],
        description: 'A landmark gathering of industry leaders redefining the future of technology and business.',
        client: 'Deshpande Startups',
        location: 'Bengaluru International Centre',
        summary: 'SP Events engineered a multi-stage summit spanning three days, featuring immersive keynote halls, breakout innovation labs, and an evening networking gala.',
        stats: { guests: 2000, teamSize: 120, setupDays: 5, stageSqFt: 15000 },
        timeline: [
            { stage: 'Concept', description: 'Brand identity framework, spatial narrative, theme development.' },
            { stage: 'Design', description: 'Stage architecture, lighting maps, immersive AV storyboard.' },
            { stage: 'Production', description: 'Truss rigging, projection mapping setup, acoustic engineering.' },
            { stage: 'Execution', description: '5-day on-site build with 120-member crew across three venue zones.' },
            { stage: 'Experience', description: 'Three days of flawless operation — keynotes, panels, and networking.' },
        ],
        gallery: [
            { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', tall: true },
            { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80' },
            { src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80' },
            { src: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80', tall: true },
            { src: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80' },
            { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', tall: true },
        ],
        testimonial: {
            quote: "SP Events delivered an experience that exceeded every expectation. The Innovation Summit became a landmark moment in our company's history.",
            name: 'Arun Sharma',
            role: 'Director, Deshpande Startups',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        },
    },
    {
        slug: 'luxury-brand-reveal',
        title: 'Luxury Brand Reveal',
        category: 'Product Launch',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=85',
        heroImages: [
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=85',
            'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1600&q=85',
            'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=1600&q=85',
        ],
        description: 'An intimate luxury unveiling merging cinematic visuals with an architectural venue transformation.',
        client: 'Toyota India',
        location: 'The Leela Palace, Mumbai',
        summary: 'A 400-guest exclusive reveal evening that fused brand cinema, live orchestra, and custom lighting design.',
        stats: { guests: 400, teamSize: 60, setupDays: 3, stageSqFt: 6000 },
        timeline: [
            { stage: 'Concept', description: 'Luxury narrative scripting, brand color immersion mapping.' },
            { stage: 'Design', description: 'Custom fabricated reveal stage, ambient lighting rig.' },
            { stage: 'Production', description: 'Venue transformation over 72 hours, draping and bespoke installations.' },
            { stage: 'Execution', description: 'Live orchestral reveal synchronized with AV and lighting.' },
        ],
        gallery: [
            { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80' },
            { src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80', tall: true },
            { src: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&q=80' },
            { src: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80', tall: true },
            { src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80' },
            { src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80' },
        ],
        testimonial: {
            quote: 'The event was nothing short of theatrical genius. The reveal moment gave me goosebumps.',
            name: 'Priya Bhatia',
            role: 'Marketing Head, Toyota India',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
        },
    },
    {
        slug: 'excellence-awards-gala',
        title: 'Annual Excellence Awards',
        category: 'Awards',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1400&q=85',
        heroImages: [
            'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1600&q=85',
            'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&q=85',
            'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=85',
        ],
        description: 'A black-tie gala recognizing excellence across 20 industry categories with a live performance.',
        client: 'HDFC Bank',
        location: 'JW Marriott, Bengaluru',
        summary: 'A spectacular 800-guest awards gala featuring custom trophy design and a 5-course dinner experience.',
        stats: { guests: 800, teamSize: 85, setupDays: 4, stageSqFt: 10000 },
        timeline: [
            { stage: 'Design', description: 'Stage architecture, ambient table styling, custom centrepieces.' },
            { stage: 'Execution', description: 'Flawless 4-hour ceremony with celebrity host and live performance.' },
        ],
        gallery: [
            { src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80', tall: true },
            { src: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80' },
            { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', tall: true },
            { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' },
        ],
        testimonial: {
            quote: 'The awards evening set a new benchmark. Every detail was impeccable.',
            name: 'Rajan Mehta',
            role: 'VP Operations, HDFC Bank',
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
        },
    },
    {
        slug: 'tech-expo-international',
        title: 'Tech Expo International',
        category: 'Exhibition',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1400&q=85',
        heroImages: [
            'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1600&q=85',
            'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1600&q=85',
            'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=85',
        ],
        description: 'A five-day international technology exposition covering AI, robotics, and the future of urban infrastructure.',
        client: 'Samsung India',
        location: 'Bangalore Exhibition Centre',
        summary: 'SP Events managed a 3,500-guest exposition with 120+ exhibitor pavilions and internationally broadcast panel sessions.',
        stats: { guests: 3500, teamSize: 200, setupDays: 10, stageSqFt: 50000 },
        timeline: [
            { stage: 'Concept', description: 'Exhibition map design, pavilion identity systems, thematic zones.' },
            { stage: 'Execution', description: '5-day live operation — 17,500 cumulative visitors.' },
        ],
        gallery: [
            { src: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80' },
            { src: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80', tall: true },
            { src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80' },
            { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80', tall: true },
        ],
        testimonial: {
            quote: 'Managing an event of this scale would have been impossible without SP Events.',
            name: 'David Park',
            role: 'Director of Events, Samsung India',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
        },
    },
    {
        slug: 'music-festival-vibes',
        title: 'Electronica Festival',
        category: 'Live Music',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1400&q=85',
        heroImages: [
            'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1600&q=85',
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=85',
            'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=1600&q=85',
        ],
        description: 'An open-air music festival celebrating electronic music, bringing together 5,000 fans.',
        client: 'Red FM',
        location: 'Nandi Hills Grounds',
        summary: 'SP Events planned and executed a complete outdoor festival environment including three stages and artist management.',
        stats: { guests: 5000, teamSize: 150, setupDays: 7, stageSqFt: 20000 },
        timeline: [
            { stage: 'Execution', description: '12-hour live music event across three simultaneous stages.' },
        ],
        gallery: [
            { src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80', tall: true },
            { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80' },
            { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80' },
        ],
        testimonial: {
            quote: 'The festival was flawless — SP Events made what seemed logistically impossible feel completely seamless.',
            name: 'Kavitha Rao',
            role: 'Head of Events, Red FM',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80',
        },
    },
];

const variants = [
    { title: "Global DevFest", cat: "Summit" },
    { title: "Symphony Under Stars", cat: "Concerts" },
    { title: "Auto Expo 2025", cat: "Exhibition" },
    { title: "Marathon City Run", cat: "Sports" },
    { title: "Healthcare Summit", cat: "Corporate" },
    { title: "Designers Gala", cat: "Awards" },
    { title: "Indie Fest", cat: "Live Music" },
    { title: "Future Mobility", cat: "Product Launch" },
];

const allEvents = [];

let counter = 1;

for (let i = 0; i < 45; i++) {
    const base = originalEvents[i % originalEvents.length];
    const variant = variants[i % variants.length];
    
    // Deep copy base
    const event = JSON.parse(JSON.stringify(base));
    
    // Mutate to make it unique
    if (i >= 5) {
        event.title = `${variant.title} V${Math.floor(i/5) + 1}`;
        event.slug = event.title.toLowerCase().replace(/\s+/g, '-');
        event.category = variant.cat;
        event.year = ['2022', '2023', '2024', '2025'][i % 4];
        event.stats.guests += (i * 100);
        
        // Shuffle images slightly to look different
        event.image = base.heroImages[(i + 1) % base.heroImages.length];
    }
    
    allEvents.push(event);
}

const fileContent = `// Shared event data for gallery and case study pages\n
export interface GalleryEvent {
    slug: string;
    title: string;
    category: string;
    year: string;
    image: string;
    heroImages: string[];
    description: string;
    client: string;
    location: string;
    summary: string;
    stats: {
        guests: number;
        teamSize: number;
        setupDays: number;
        stageSqFt: number;
    };
    timeline: { stage: string; description: string }[];
    gallery: { src: string; tall?: boolean }[];
    testimonial: {
        quote: string;
        name: string;
        role: string;
        avatar: string;
    };
}

export const events: GalleryEvent[] = ${JSON.stringify(allEvents, null, 4)};
`;

fs.writeFileSync(path.join(process.cwd(), 'src/lib/galleryData.ts'), fileContent, 'utf8');
console.log('Successfully generated 45 gallery events.');
