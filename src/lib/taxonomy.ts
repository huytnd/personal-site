export const BLOG_CATEGORIES = [
  ".NET",
  "Software Architecture",
  "Web Development",
  "DevOps",
  "Database",
  "Career",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

const TAG_DISPLAY_LABELS: Record<string, string> = {
  "aspnet-core": "ASP.NET Core",
  "ef-core": "EF Core",
};

const stripDiacritics = (value: string) =>
  value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");

export const slugify = (value: string): string =>
  stripDiacritics(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/\./g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/[\s_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const normalizeTag = (tag: string): string => slugify(tag);

export const getCategorySlug = (category: BlogCategory): string => slugify(category);

export const getCategoryBySlug = (slug: string): BlogCategory | undefined =>
  BLOG_CATEGORIES.find((category) => getCategorySlug(category) === slugify(slug));

export const getTagDisplayLabel = (tagOrSlug: string): string => {
  const normalized = normalizeTag(tagOrSlug);
  return TAG_DISPLAY_LABELS[normalized] ?? tagOrSlug.trim().replace(/\s+/g, " ");
};
