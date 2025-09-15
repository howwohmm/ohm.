import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getPostBySlug, markdownToHtml, formatDate, Post } from '@/lib/posts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const theme = 'dark';
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState(20);
  const [post, setPost] = useState<Post | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const foundPost = await getPostBySlug(slug);
        if (foundPost) {
          setPost(foundPost);
          const html = await markdownToHtml(foundPost.content);
          setHtmlContent(html);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error loading post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      // Update gradient position globally
      const root = document.documentElement;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      root.style.setProperty('--x', `${x}%`);
      root.style.setProperty('--y', `${y}%`);
    };

    const handleMouseEnter = () => setCursorSize(40);
    const handleMouseLeave = () => setCursorSize(20);

    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (notFound) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Dynamic gradient background */}
      <div 
        className="absolute inset-0 animate-gradient pointer-events-none"
        style={{
          background: 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(59,130,246,0.3) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,1) 100%)',
          backgroundSize: '200% 200%',
          animation: 'moveGradient 20s linear infinite',
        }}
      />
      
      {/* Noise overlay */}
      <div 
        className="fixed inset-0 opacity-5 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Custom cursor */}
      <div 
        className="custom-cursor hidden md:block"
        style={{
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px) translate(-50%, -50%)`,
          position: 'fixed',
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          backgroundColor: 'rgba(59,130,246,0.2)',
          borderRadius: '50%',
          pointerEvents: 'none',
          transition: 'width 0.2s, height 0.2s, transform 0.1s ease-out',
          backdropFilter: 'blur(4px)',
          zIndex: 50
        }}
      />

      <Header theme={theme} />
      
      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24 relative z-10">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : post ? (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back button */}
            <Link to="/blog" className="inline-block mb-8">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Button>
            </Link>

            {/* Cover image */}
            {post.meta.cover && (
              <div className="aspect-video mb-8 rounded-lg overflow-hidden">
                <img
                  src={post.meta.cover}
                  alt={post.meta.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Post header */}
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.meta.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {post.meta.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-4">
                {post.meta.description}
              </p>
              
              <time className="text-sm text-muted-foreground">
                {formatDate(post.meta.date)}
              </time>
            </header>

            {/* Post content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-blockquote:text-muted-foreground prose-li:text-foreground"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </motion.article>
        ) : null}
      </main>

      <Footer theme={theme} />
    </div>
  );
};

export default BlogPost;