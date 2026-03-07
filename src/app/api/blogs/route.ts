import { NextRequest, NextResponse } from 'next/server';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const blogsDir = join(process.cwd(), 'blogs');
    
    try {
      const files = await readdir(blogsDir);
      const jsonFiles = files.filter(file => file.endsWith('.json'));
      
      const blogs = [];
      
      for (const file of jsonFiles) {
        try {
          const filePath = join(blogsDir, file);
          const fileContent = await readFile(filePath, 'utf-8');
          const blogData = JSON.parse(fileContent);
          
          blogs.push({
            slug: blogData.slug,
            title: blogData.title,
            description: blogData.description,
            createdAt: blogData.createdAt,
            updatedAt: blogData.updatedAt,
          });
        } catch (error) {
          console.error(`Error reading blog file ${file}:`, error);
        }
      }
      
      // Sort by creation date (newest first)
      blogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      return NextResponse.json({ blogs });
      
    } catch (error) {
      // Directory doesn't exist or is empty
      return NextResponse.json({ blogs: [] });
    }
    
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
