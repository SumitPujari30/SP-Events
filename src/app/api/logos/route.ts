import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public/assets/client_logos');
    
    // Check if directory exists
    if (!fs.existsSync(imagesDirectory)) {
      return NextResponse.json({ brands: [] });
    }

    const files = fs.readdirSync(imagesDirectory);
    
    // Filter for common image extensions
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
    const brandFiles = files.filter(file => 
      imageExtensions.includes(path.extname(file).toLowerCase()) &&
      !file.includes('_demo') // Exclude demo files if any
    );

    const brands = brandFiles.map(file => ({
      name: path.parse(file).name,
      logo: file
    }));

    return NextResponse.json({ brands });
  } catch (error) {
    console.error('Error reading logos directory:', error);
    return NextResponse.json({ error: 'Failed to read logos' }, { status: 500 });
  }
}
