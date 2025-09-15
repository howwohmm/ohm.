import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Post, formatDate } from '@/lib/posts';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  post: Post;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <Link to={`/blog/${post.slug}`} className="block">
        {post.meta.cover && (
          <div className="aspect-video overflow-hidden">
            <img
              src={post.meta.cover}
              alt={post.meta.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.meta.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {post.meta.title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {post.meta.description}
          </p>
          
          <time className="text-xs text-muted-foreground">
            {formatDate(post.meta.date)}
          </time>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;