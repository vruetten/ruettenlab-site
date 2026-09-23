import { existsSync } from 'node:fs';
import path from 'node:path';

export function authorTokens(authors: string) {
	return authors
		.split(',')
		.map((part) => part.trim())
		.filter((text) => text.length > 0)
		.map((text) => ({ text, mark: /ru+e*tten/i.test(text) }));
}

export function hasBody(body: string | undefined) {
	return (body ?? '').trim().length > 0;
}

export function publicationFile(file: string) {
	if (file !== path.basename(file) || file.includes('..')) {
		throw new Error(`Publication file name is not a single file: ${file}`);
	}
	const full = path.resolve('public/publications', file);
	if (!existsSync(full)) throw new Error(`Missing publication file: ${file}`);
	return file;
}
