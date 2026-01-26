import React from 'react';

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-primary">
            <a href="/blog" className="hover:underline">品牌营销深度解析 - 博客</a>
          </h1>
          <nav className="mt-2">
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="text-muted-foreground hover:text-foreground">首页</a>
              </li>
              <li>
                <a href="/blog" className="text-muted-foreground hover:text-foreground">所有文章</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main>{children}</main>
      
      <footer className="bg-white border-t mt-12 py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} 品牌营销深度解析 - Demand Curve</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogLayout;