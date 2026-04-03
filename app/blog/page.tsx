import React from 'react';
import Link from 'next/link';
import blogPosts from '@/lib/blog-data';

const extractFirstImage = (content: string) => {
  // Look for markdown image syntax: ![alt text](url)
  const imgRegex = /!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/;
  const match = content.match(imgRegex);
  return match ? match[2] : null;
};

const extractSummary = (content: string, maxLength: number = 150) => {
  // Remove markdown formatting for summary
  let cleanContent = content
    .replace(/^#+\s+/gm, '') // Remove heading markers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers
    .replace(/\*(.*?)\*/g, '$1') // Remove italic markers
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // Remove link formatting
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '') // Remove image markdown
    .replace(/^\s*[*\-]\s(.*)$/gm, '$1') // Remove list markers
    .replace(/^\s*\d+\.\s(.*)$/gm, '$1'); // Remove numbered list markers

  // Get first paragraph after removing special formatting
  const paragraphs = cleanContent.split('\n').filter(p => p.trim() !== '' && !p.startsWith('#') && !p.startsWith('!['));
  const firstParagraph = paragraphs.length > 0 ? paragraphs[0] : cleanContent;

  // Return summary with specified max length
  return firstParagraph.length > maxLength 
    ? firstParagraph.substring(0, maxLength) + '...' 
    : firstParagraph;
};

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-4 text-foreground">品牌营销深度解析 - 博客</h1>
        <p className="text-center text-muted-foreground mb-12">来自 Start Point 的精选营销文章</p>
        
        <div className="space-y-8">
          {blogPosts.map((post) => {
            const summary = extractSummary(post.content);
            
            return (
              <div key={post.id} className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                {post.thumbnail && (
                  <div className="mb-4">
                    <img 
                      src={post.thumbnail} 
                      alt={post.title} 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                <h2 className="text-2xl font-semibold mb-3 text-foreground">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-4">
                  {summary}
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>作者：{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>阅读时间：{post.readTime}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;