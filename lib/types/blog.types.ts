export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  readTime: string;
  originalUrl: string;
  fetchTime: string;
  content: string;
  thumbnail?: string;
}
