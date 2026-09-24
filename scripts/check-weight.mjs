import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const limits = {
	js: 30 * 1024,
	css: 20 * 1024,
	fonts: 120 * 1024,
	total: 400 * 1024,
};

const fontExt = new Set(['.woff', '.woff2', '.ttf', '.otf']);

async function htmlFiles(dir) {
	const found = [];
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) found.push(...(await htmlFiles(full)));
		else if (entry.name.endsWith('.html')) found.push(full);
	}
	return found;
}

function allowsScript(rel) {
	return rel.startsWith(`research${path.sep}`) && rel !== path.join('research', 'index.html');
}

function byteLength(text) {
	return Buffer.byteLength(text, 'utf8');
}

async function fileBytes(urlPath) {
	const relative = urlPath.replace(/^\/ruettenlab-site\/?/, '');
	const full = path.join(root, relative);
	try {
		return byteLength(await readFile(full, 'utf8'));
	} catch {
		return 0;
	}
}

let failed = false;

for (const file of await htmlFiles(root)) {
	const html = await readFile(file, 'utf8');
	let js = 0;
	let css = 0;
	let fonts = 0;

	let otherJs = 0;
	for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
		let bytes = byteLength(match[2]);
		const src = match[1].match(/\ssrc="([^"]+)"/);
		if (src) bytes += await fileBytes(src[1]);
		js += bytes;
		const hold =
			match[2].includes('ruetten-direction') ||
			match[2].includes('ruetten-theme') ||
			match[2].includes("setAttribute('data-news'") ||
			match[2].includes("setAttribute('data-people'");
		if (!hold) otherJs += bytes;
	}
	for (const match of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
		css += byteLength(match[1]);
	}
	for (const match of html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/gi)) {
		css += await fileBytes(match[1]);
	}
	for (const match of html.matchAll(/url\(([^)]+)\)/g)) {
		const raw = match[1].replace(/['"]/g, '');
		if (fontExt.has(path.extname(raw.split('?')[0]).toLowerCase())) fonts += await fileBytes(raw);
	}

	const rel = path.relative(root, file);
	const problems = [];
	if (!allowsScript(rel) && otherJs > 0) problems.push(`${otherJs} bytes of JavaScript on a page that does not move`);
	if (js > limits.js) problems.push(`${js} bytes of JavaScript`);
	if (css > limits.css) problems.push(`${css} bytes of CSS`);
	if (fonts > limits.fonts) problems.push(`${fonts} bytes of fonts`);
	if (js + css + fonts > limits.total) problems.push(`${js + css + fonts} bytes total`);
	if (rel === 'index.html') {
		console.log(
			`home page: ${js} bytes JavaScript, ${css} bytes CSS, ${fonts} bytes fonts, ${js + css + fonts} bytes total`,
		);
	}
	if (problems.length) {
		failed = true;
		console.error(`${rel}: ${problems.join('; ')}`);
	}
}

if (failed) process.exit(1);
console.log('weight check passed');
