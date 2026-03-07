import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { generateSlug } from '@/lib/utils';
import { serializeMDX } from '@/lib/markdown/mdx-renderer';

export async function POST(request: NextRequest) {
  try {
    const { title, description, content } = await request.json();

    // Validate inputs
    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Generate slug and HTML content
    const slug = generateSlug(title);
    const htmlContent = await serializeMDX(content);

    // Create blog data
    const blogData = {
      title: title.trim(),
      description: description?.trim() || '',
      content: content.trim(),
      htmlContent,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Ensure blogs directory exists
    const blogsDir = join(process.cwd(), 'blogs');
    try {
      await mkdir(blogsDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    // Save blog as JSON file
    const filePath = join(blogsDir, `${slug}.json`);
    await writeFile(filePath, JSON.stringify(blogData, null, 2));

    return NextResponse.json({ 
      success: true, 
      slug,
      message: 'Blog saved successfully' 
    });

  } catch (error) {
    console.error('Error saving blog:', error);
    return NextResponse.json(
      { error: 'Failed to save blog' },
      { status: 500 }
    );
  }
}
