import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
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
    slug: z.string().optional(),
    url: z.string().optional(),
    last_updated: z.union([z.string(), z.date().transform(d => d.toISOString().slice(0, 10))]).optional(),
    audience: z.array(z.string()).optional(),
    themes: z.array(z.string()).optional(),
    meta_description: z.string().optional(),
  }),
});

export const collections = { projects, pages };