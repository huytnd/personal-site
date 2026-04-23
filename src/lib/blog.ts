import { getCollection, type CollectionEntry } from "astro:content";
import {
  BLOG_CATEGORIES,
  getCategoryBySlug,
  getCategorySlug,
  getTagDisplayLabel,
  normalizeTag,
} from "./taxonomy";

export const BLOG_PAGE_SIZE = 10;

export type BlogPost = CollectionEntry<"blog">;
export type TaxonomySummary = {
  label: string;
  slug: string;
  count: number;
};
export type PaginationLinks = {
  first?: string;
  prev?: string;
  next?: string;
  last?: string;
};

const collator = new Intl.Collator("en", { sensitivity: "base" });
const RESERVED_BLOG_SEGMENTS = new Set(["archive", "category", "tag"]);
const RESERVED_PAGE_SLUG = /^page-\d+$/;

const sortPostsByPublishedDate = (posts: readonly BlogPost[]): BlogPost[] =>
  [...posts].sort(
    (a, b) => b.data.publishedDate.getTime() - a.data.publishedDate.getTime(),
  );

const assertNoReservedBlogSlugs = (posts: readonly BlogPost[]) => {
  for (const post of posts) {
    const [topLevelSegment] = post.id.split("/");

    if (RESERVED_BLOG_SEGMENTS.has(topLevelSegment)) {
      throw new Error(
        `Blog post id "${post.id}" conflicts with a reserved /blog namespace segment.`,
      );
    }

    if (!post.id.includes("/") && RESERVED_PAGE_SLUG.test(post.id)) {
      throw new Error(
        `Blog post id "${post.id}" conflicts with the reserved paginated route pattern /blog/page-{n}.`,
      );
    }
  }
};

const sortTaxonomyItems = (items: Iterable<TaxonomySummary>): TaxonomySummary[] =>
  [...items].sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }

    return collator.compare(a.label, b.label);
  });

export const formatBlogDate = (value: Date): string =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value);

export const getBlogPostUrl = (postOrSlug: BlogPost | string): string => {
  const slug = typeof postOrSlug === "string" ? postOrSlug : postOrSlug.id;
  return `/blog/${slug}`;
};

export const getBlogIndexPageUrl = (pageNumber = 1): string =>
  pageNumber <= 1 ? "/blog" : `/blog/page-${pageNumber}`;

export const getCategoryUrl = (categorySlug: string): string =>
  `/blog/category/${categorySlug}`;

export const getCategoryPageUrl = (
  categorySlug: string,
  pageNumber = 1,
): string =>
  pageNumber <= 1
    ? getCategoryUrl(categorySlug)
    : `${getCategoryUrl(categorySlug)}/page-${pageNumber}`;

export const getTagUrl = (tagSlug: string): string => `/blog/tag/${tagSlug}`;

export const getTagPageUrl = (tagSlug: string, pageNumber = 1): string =>
  pageNumber <= 1 ? getTagUrl(tagSlug) : `${getTagUrl(tagSlug)}/page-${pageNumber}`;

export const getArchiveUrl = (): string => "/blog/archive";

export const getPaginationLinks = (
  currentPage: number,
  lastPage: number,
  urlBuilder: (pageNumber: number) => string,
): PaginationLinks => ({
  first: currentPage > 1 ? urlBuilder(1) : undefined,
  prev: currentPage > 1 ? urlBuilder(currentPage - 1) : undefined,
  next: currentPage < lastPage ? urlBuilder(currentPage + 1) : undefined,
  last: currentPage < lastPage ? urlBuilder(lastPage) : undefined,
});

export async function getAllPosts(options?: {
  includeDrafts?: boolean;
}): Promise<BlogPost[]> {
  const includeDrafts = options?.includeDrafts ?? false;
  const posts = await getCollection(
    "blog",
    includeDrafts ? undefined : ({ data }) => !data.draft,
  );

  assertNoReservedBlogSlugs(posts);
  return sortPostsByPublishedDate(posts);
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.featured);
}

export async function getPostsByCategory(
  categorySlug: string,
): Promise<BlogPost[]> {
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    return [];
  }

  const posts = await getAllPosts();
  return posts.filter((post) => post.data.category === category);
}

export async function getPostsByTag(tagSlug: string): Promise<BlogPost[]> {
  const normalizedTag = normalizeTag(tagSlug);
  const posts = await getAllPosts();

  return posts.filter((post) =>
    post.data.tags.some((tag) => normalizeTag(tag) === normalizedTag),
  );
}

export async function getAllCategories(): Promise<TaxonomySummary[]> {
  const posts = await getAllPosts();

  return BLOG_CATEGORIES.map((category) => {
    const count = posts.filter((post) => post.data.category === category).length;

    return {
      label: category,
      slug: getCategorySlug(category),
      count,
    };
  }).filter((item) => item.count > 0);
}

export async function getAllTags(): Promise<TaxonomySummary[]> {
  const posts = await getAllPosts();
  const counts = new Map<string, TaxonomySummary>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = normalizeTag(tag);
      const existing = counts.get(slug);

      if (existing) {
        existing.count += 1;
        continue;
      }

      counts.set(slug, {
        label: getTagDisplayLabel(tag),
        slug,
        count: 1,
      });
    }
  }

  return sortTaxonomyItems(counts.values());
}

export function getRelatedPosts(
  currentPost: BlogPost,
  allPosts: readonly BlogPost[],
  limit = 4,
): BlogPost[] {
  const currentTagSlugs = new Set(currentPost.data.tags.map(normalizeTag));

  return allPosts
    .filter((post) => post.id !== currentPost.id)
    .map((post) => {
      const sharedTagCount = post.data.tags.reduce((count, tag) => {
        return currentTagSlugs.has(normalizeTag(tag)) ? count + 1 : count;
      }, 0);

      const sameCategory = post.data.category === currentPost.data.category ? 1 : 0;

      return {
        post,
        score: sharedTagCount * 100 + sameCategory * 10,
      };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return (
        b.post.data.publishedDate.getTime() - a.post.data.publishedDate.getTime()
      );
    })
    .slice(0, limit)
    .map(({ post }) => post);
}

export function groupPostsByYear(posts: readonly BlogPost[]): [string, BlogPost[]][] {
  const grouped = new Map<string, BlogPost[]>();

  for (const post of posts) {
    const year = String(post.data.publishedDate.getFullYear());
    const existingPosts = grouped.get(year);

    if (existingPosts) {
      existingPosts.push(post);
      continue;
    }

    grouped.set(year, [post]);
  }

  return [...grouped.entries()].sort(
    ([yearA], [yearB]) => Number(yearB) - Number(yearA),
  );
}
