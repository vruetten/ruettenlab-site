export const labName = 'WHOLISTIC lab';
export const email = 'v.ruetten@princeton.edu';
export const postalAddress = [
	'Ruetten Group',
	'Princeton University',
	'Omenn-Darling Bioengineering Institute',
	'35 Ivy Lane',
	'Princeton, NJ 08540',
];
export const janeliaUrl = 'https://wholistic.janelia.org/';
export const princetonUrl = 'https://www.princeton.edu/';
export const pniUrl = 'https://pni.princeton.edu/';
export const odbiUrl = 'https://bioengineering.princeton.edu/';

export const profiles = [
	{
		label: 'Google Scholar',
		url: 'https://scholar.google.com/citations?hl=en&user=XRT5C94AAAAJ&view_op=list_works&sortby=pubdate',
	},
];

export const nav = [
	{ path: 'research/', label: 'Research' },
	{ path: 'people/', label: 'People' },
	{ path: 'publications/', label: 'Publications' },
	{ path: 'news/', label: 'News' },
	{ path: 'join/', label: 'Join' },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDate(date: Date, precision: 'day' | 'month' = 'day'): string {
	const month = months[date.getUTCMonth()];
	const year = date.getUTCFullYear();
	if (precision === 'month') return `${month} ${year}`;
	return `${date.getUTCDate()} ${month} ${year}`;
}

export function isUpcoming(date: Date, precision: 'day' | 'month' = 'day'): boolean {
	const now = new Date();
	const year = now.getUTCFullYear();
	const month = now.getUTCMonth();
	if (precision === 'month') {
		return date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() >= month);
	}
	const today = Date.UTC(year, month, now.getUTCDate());
	const event = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
	return event >= today;
}

export function siteHref(path = ''): string {
	const raw = import.meta.env.BASE_URL;
	const base = raw.endsWith('/') ? raw : `${raw}/`;
	return `${base}${path.replace(/^\//, '')}`;
}
