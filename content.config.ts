import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    coverImage: z.string().optional(),
    coverAlt: z.string().default(""),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  blog,
};