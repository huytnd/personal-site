import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { BLOG_CATEGORIES } from "./lib/taxonomy";

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/blog",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishedDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      category: z.enum(BLOG_CATEGORIES),
      tags: z.array(z.string().trim().min(1)).default([]),
      featured: z.boolean().default(false),
      series: z.string().trim().min(1).optional(),
      coverImage: image().optional(),
      coverAlt: z.string().optional(),
      canonicalUrl: z.string().url().optional(),
    }),
});

export const collections = {
  blog,
};
