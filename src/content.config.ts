import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    // Shorter title for cards and rows; falls back to `title`.
    card_title: z.string().optional(),
    // Short uppercase label shown above card titles (e.g., "Faculty development").
    tag: z.string().optional(),
    // Display order on /projects/ (lowest first).
    order: z.number().default(99),
    subtitle: z.string().optional(),
    slug: z.string().optional(),
    url: z.string().optional(),
    status: z.enum(['flagship', 'mini']).default('flagship'),
    role: z.string().optional(),
    years: z.string().optional(),
    institution: z.string().optional(),
    funding: z.string().optional(),
    partners: z.array(z.string()).optional(),
    co_authors: z.array(z.string()).optional(),
    recognition: z.string().optional(),
    location: z.string().optional(),
    audience: z.array(z.string()).optional(),
    themes: z.array(z.string()).optional(),
    last_updated: z.union([z.string(), z.date().transform(d => d.toISOString().slice(0, 10))]).optional(),
    featured: z.boolean().default(false),
    summary: z.string().optional(),
    hero_image: z.string().optional(),
    hero_image_alt: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    // Optional on-page H1 when it should differ from the title (e.g., Contact).
    heading: z.string().optional(),
    slug: z.string().optional(),
    url: z.string().optional(),
    last_updated: z.union([z.string(), z.date().transform(d => d.toISOString().slice(0, 10))]).optional(),
    audience: z.array(z.string()).optional(),
    themes: z.array(z.string()).optional(),
    meta_description: z.string().optional(),
  }),
});

// ---- Data files edited in Decap (see public/admin/config.yml → "Site data") ----
// Each file holds several lists; a parser picks one list and gives each item a
// zero-padded id so getCollection() order matches the file order.
const pick = (key: string) => (text: string) =>
  (JSON.parse(text)[key] ?? []).map((item: object, i: number) => ({
    id: String(i).padStart(3, '0'),
    ...item,
  }));

const link = z.object({ label: z.string(), url: z.string() });

const works = defineCollection({
  loader: file('src/data/scholarship.json', { parser: pick('works') }),
  schema: z.object({
    kind: z.enum(['pub', 'pres']),
    year: z.coerce.number(),
    type: z.string(),
    title: z.string(),
    venue: z.string().default(''),
    meta: z.string().default(''),
    url: z.string().optional().default(''),
  }),
});

const highlights = defineCollection({
  loader: file('src/data/scholarship.json', { parser: pick('highlights') }),
  schema: z.object({
    label: z.string(),
    title: z.string(),
    note: z.string().default(''),
    url: z.string().optional().default(''),
  }),
});

const scholarProfiles = defineCollection({
  loader: file('src/data/scholarship.json', { parser: pick('profiles') }),
  schema: link,
});

const awards = defineCollection({
  loader: file('src/data/recognition.json', { parser: pick('topAwards') }),
  schema: z.object({
    year: z.coerce.string(),
    title: z.string(),
    org: z.string(),
    note: z.string().default(''),
    team: z.string().default(''),
  }),
});

const recognitionGroups = defineCollection({
  loader: file('src/data/recognition.json', { parser: pick('groups') }),
  schema: z.object({
    name: z.string(),
    items: z.array(z.object({
      year: z.coerce.string(),
      title: z.string(),
      org: z.string().default(''),
    })),
  }),
});

export const collections = {
  projects, pages, works, highlights, scholarProfiles, awards, recognitionGroups,
};
