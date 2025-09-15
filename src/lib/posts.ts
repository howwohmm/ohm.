import matter from 'gray-matter';

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

// Get all blog posts
export async function getAllPosts(): Promise<Post[]> {
  try {
    // Load all MDX files in content/blog as raw strings
    const modules = import.meta.glob('/content/blog/*.mdx', { as: 'raw', eager: true }) as Record<string, string>;

    const posts: Post[] = Object.entries(modules).map(([path, raw]) => {
      const { data, content } = matter(raw);
      const slug = path.split('/').pop()!.replace(/\.mdx$/i, '');

      const meta: PostMeta = {
        title: String(data.title || slug),
        date: String(data.date || new Date().toISOString().slice(0, 10)),
        description: String(data.description || ''),
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
        cover: data.cover ? String(data.cover) : undefined,
      };

      return { slug, meta, content };
    });

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