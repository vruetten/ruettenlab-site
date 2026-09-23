export const labName = 'WHOLISTIC lab';
export const email = 'vms.ruetten@gmail.com';
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
	{ path: 'resources/', label: 'Resources' },
	{ path: 'publications/', label: 'Publications' },
	{ path: 'news/', label: 'News' },
	{ path: 'join/', label: 'Join' },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDate(date: Date): string {
	return `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function siteHref(path = ''): string {
	const raw = import.meta.env.BASE_URL;
	const base = raw.endsWith('/') ? raw : `${raw}/`;
	return `${base}${path.replace(/^\//, '')}`;
}
