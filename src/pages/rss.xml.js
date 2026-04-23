import rss from '@astrojs/rss';
import { getAllPosts, getBlogPostUrl } from '@/lib/blog';

export async function GET(context) {
  const publishedPosts = await getAllPosts();

  return rss({
    title: 'Huy Tran Blog',
    description: 'Technical articles about .NET, architecture, and software engineering',
    site: context.site,
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedDate,
      description: post.data.description,
      link: getBlogPostUrl(post),
    })),
    customData: `<language>vi-vn</language>`,
  });
}
