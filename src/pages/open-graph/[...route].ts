import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';

const posts = await getCollection('blog', ({ data }) => !data.draft);

const pages = Object.fromEntries(
  posts.map((post) => [
    post.id,
    {
      title: post.data.title,
      description: post.data.description,
    },
  ])
);

// Ảnh mặc định cho homepage / fallback
pages['default'] = {
  title: 'Huy Tran',
  description: 'Personal website and technical blog about .NET and architecture.',
};

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
  }),
});