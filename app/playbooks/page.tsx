import React from 'react';
import Link from 'next/link';
import playbooksPosts from '@/lib/playbooks-data';

const PlaybooksPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="py-12 md:py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6">
            营销指南
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            从SEO到社交媒体营销，从Shopify商店到TikTok广告，这里有你需要的所有营销策略和技巧。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {playbooksPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/playbooks/${post.slug}`}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                {post.thumbnail && (
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img 
                      src={post.thumbnail} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.content.replace(/[#*`]/g, '').substring(0, 150)}...
                  </p>
                  <div className="flex items-center text-sm text-primary">
                    阅读更多
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaybooksPage;
