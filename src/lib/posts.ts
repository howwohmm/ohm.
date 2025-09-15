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

// Get all blog posts from the content directory
export async function getAllPosts(): Promise<Post[]> {
  try {
    // In a real filesystem, we'd read from /content/blog
    // For now, we'll use a demo post structure
    const posts: Post[] = [
      {
        slug: 'welcome-to-our-blog',
        meta: {
          title: 'Welcome to Our Blog',
          date: '2024-03-15',
          description: 'This is the first post on our new blog. Learn about what we have planned.',
          tags: ['welcome', 'announcement'],
          cover: '/images/blog/welcome-cover.jpg'
        },
        content: `# Welcome to Our Blog

We're excited to launch our new blog! This is where we'll share insights, updates, and tutorials.

## What to Expect

- Technical deep dives
- Product updates
- Industry insights
- How-to guides

Stay tuned for more content coming soon!`
      },
      {
        slug: 'getting-started-guide',
        meta: {
          title: 'Getting Started Guide',
          date: '2024-03-10',
          description: 'A comprehensive guide to help you get started with our platform.',
          tags: ['guide', 'tutorial', 'beginner'],
          cover: '/images/blog/guide-cover.jpg'
        },
        content: `# Getting Started Guide

This guide will walk you through the basics of our platform.

## Step 1: Setup

First, you'll need to set up your account...

## Step 2: Configuration

Next, configure your settings...

## Step 3: First Project

Create your first project...`
      }
    ];

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