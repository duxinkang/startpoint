'use client';

import React, { useState, useEffect, use } from 'react';
import blogPosts, { BlogPost as BlogPostType } from '@/lib/blog-data';

const BlogPost = ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = use(params);
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogContent = async () => {
      setLoading(true);
      
      // Find the blog post by slug from our data layer
      const foundPost = blogPosts.find(post => post.slug === resolvedParams.slug);
      
      if (foundPost) {
        setPost(foundPost);
      } else {
        setPost(null);
      }
      
      setLoading(false);
    };

    fetchBlogContent();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">文章未找到</h1>
          <p className="text-lg text-muted-foreground">抱歉，您查找的文章不存在。</p>
        </div>
      </div>
    );
  }

  // Function to convert markdown content to HTML with proper formatting
  const renderMarkdownContent = (content: string) => {
    let htmlContent = content;

    // Handle headings (first, before processing other elements to avoid conflicts)
    htmlContent = htmlContent.replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>');
    htmlContent = htmlContent.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>');
    htmlContent = htmlContent.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-6 mb-4">$1</h1>');

    // Handle images - this should be done before links to avoid conflicts
    htmlContent = htmlContent.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="my-4 rounded-lg max-w-full h-auto block" />');

    // Handle links
    htmlContent = htmlContent.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');

    // Handle bold and italic
    htmlContent = htmlContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    htmlContent = htmlContent.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Handle lists
    // Unordered lists
    const ulLines = htmlContent.split('\n').map(line => {
      if (/^\s*[*\-]\s/.test(line)) {
        const indentLevel = (line.match(/^\s*/)?.[0]?.length || 0);
        const indent = '  '.repeat(Math.floor(indentLevel / 2));
        return `${indent}<li class="ml-6">${line.replace(/^\s*[*\-]\s/, '')}</li>`;
      }
      return line;
    }).join('\n');
    
    // Replace ul blocks
    htmlContent = ulLines.replace(/(<li class="ml-6">[^\0]*?\n?)+/g, match => {
      return `<ul class="list-disc my-4 pl-6">${match}</ul>`;
    });

    // Ordered lists
    const olLines = htmlContent.split('\n').map(line => {
      if (/^\s*\d+\.\s/.test(line)) {
        const indentLevel = (line.match(/^\s*/)?.[0]?.length || 0);
        const indent = '  '.repeat(Math.floor(indentLevel / 2));
        return `${indent}<li class="ml-6">${line.replace(/^\s*\d+\.\s/, '')}</li>`;
      }
      return line;
    }).join('\n');
    
    // Replace ol blocks
    htmlContent = olLines.replace(/(<li class="ml-6">[^\0]*?\n?)+/g, match => {
      return `<ol class="list-decimal my-4 pl-6">${match}</ol>`;
    });

    // Handle paragraphs (for lines that don't start with special characters)
    htmlContent = htmlContent.split('\n').map(line => {
      if (line.trim() !== '' && !line.startsWith('<') && !line.startsWith('#') && !line.startsWith(' ') && !line.startsWith('!') && !line.match(/^\s*[*\-]\s/) && !line.match(/^\s*\d+\.\s/)) {
        return `<p class="mb-4 leading-relaxed">${line}</p>`;
      }
      return line;
    }).join('\n');

    return { __html: htmlContent };
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-2">{post.title}</h1>
          <div className="text-muted-foreground mb-6">
            <p><strong>作者:</strong> {post.author}</p>
            <p><strong>阅读时间:</strong> {post.readTime}</p>
            <p><strong>原文URL:</strong> <a href={post.originalUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{post.originalUrl}</a></p>
            <p><strong>获取时间:</strong> {post.fetchTime}</p>
          </div>
          <div className="prose-invert">
            <div dangerouslySetInnerHTML={renderMarkdownContent(post.content)} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;