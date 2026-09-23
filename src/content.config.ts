import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const people = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/people' }),
	schema: z.object({
		name: z.string(),
		role: z.string(),
		order: z.number().int().optional(),
		showEmail: z.boolean().optional(),
		image: z.string().optional(),
		crop: z.enum(['center', 'left', 'right']).default('center'),
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
		featured: z
			.array(z.object({ label: z.string(), url: z.string().url() }))
			.optional(),
		supplements: z
			.array(z.object({ label: z.string(), file: z.string() }))
			.optional(),
	}),
});

const news = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
	schema: z
		.object({
			kind: z.enum(['press', 'lab']),
			date: z.coerce.date(),
			outlet: z.string().optional(),
			title: z.string().optional(),
			url: z.string().url().optional(),
			topic: z.enum(['wholistic', 'mhs']).optional(),
			image: z.string().optional(),
			crop: z.enum(['center', 'left', 'right']).default('center'),
			size: z.enum(['large', 'small']).default('large'),
			lead: z.boolean().default(false),
			pin: z.boolean().default(false),
			text: z.string().optional(),
		})
		.check((ctx) => {
			const item = ctx.value;
			if (item.kind === 'press') {
				if (!item.outlet) ctx.issues.push({ code: 'custom', message: 'Press needs an outlet', input: item });
				if (!item.title) ctx.issues.push({ code: 'custom', message: 'Press needs a title', input: item });
				if (!item.url) ctx.issues.push({ code: 'custom', message: 'Press needs a url', input: item });
				if (!item.topic) ctx.issues.push({ code: 'custom', message: 'Press needs a topic', input: item });
				if (!item.image) ctx.issues.push({ code: 'custom', message: 'Press needs an image', input: item });
			}
			if (item.kind === 'lab' && !item.text) {
				ctx.issues.push({ code: 'custom', message: 'Lab news needs text', input: item });
			}
		}),
});

export const collections = { people, research, resources, publications, news };
