import matter from 'gray-matter';
import { glob } from 'glob';

export interface PostMeta {
  title: string;
  date: string;
  description: string;
  tags: string[];
  cover?: string;
}

export interface Post {
  slug: string;
  meta: PostMeta;
  content: string;
}

// Get all blog posts from the content directory
export async function getAllPosts(): Promise<Post[]> {
  try {
    // Get all MDX files from content/blog directory
    const files = await glob('content/blog/*.mdx');
    
    const posts: Post[] = await Promise.all(
      files.map(async (file) => {
        const response = await fetch(`/${file}`);
        const content = await response.text();
        const { data, content: markdownContent } = matter(content);
        
        // Extract slug from filename
        const slug = file.split('/').pop()?.replace('.mdx', '') || '';
        
        return {
          slug,
          meta: {
            title: data.title,
            date: data.date,
            description: data.description,
            tags: data.tags || [],
            cover: data.cover
          },
          content: markdownContent
        };
      })
    );

    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

// Get a specific post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const posts = await getAllPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error('Error loading post:', error);
    return null;
  }
}

// Parse markdown content to HTML (simplified for now)
export async function markdownToHtml(markdown: string): Promise<string> {
  // For now, return the markdown as-is. In production, you'd use a proper markdown parser
  return markdown.replace(/^### /gm, '<h3>').replace(/^## /gm, '<h2>').replace(/^# /gm, '<h1>').replace(/\n/g, '<br>');
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}