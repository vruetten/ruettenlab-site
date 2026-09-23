import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const people = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/people' }),
	schema: z.object({
		name: z.string(),
		role: z.string(),
		links: z
			.array(z.object({ label: z.string(), url: z.string().url() }))
			.optional(),
	}),
});

const research = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		acquisition: z.string(),
		figure: z.boolean().default(false),
	}),
});

const resources = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
	schema: z.object({
		title: z.string(),
		kind: z.enum(['data', 'protocol', 'code', 'line']),
		url: z.string().url(),
	}),
});

const publications = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
	schema: z.object({
		title: z.string(),
		year: z.number().int(),
		authors: z.string(),
		venue: z.string(),
		url: z.string().url(),
		figure: z.string().optional(),
		pdf: z.string().optional(),
		supplements: z
			.array(z.object({ label: z.string(), file: z.string() }))
			.optional(),
	}),
});

const news = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
	schema: z.object({
		date: z.coerce.date(),
		text: z.string(),
	}),
});

export const collections = { people, research, resources, publications, news };
