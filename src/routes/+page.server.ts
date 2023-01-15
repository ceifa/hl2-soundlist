import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const sounds = await fetch('/hl2/path.txt')
		.then((res) => res.text())
		.then((text) => text.split('\n'))
		.then((paths) => paths.map((path) => path.replace('sound\\', '').replaceAll('\\', '/').trim()))
		.then((paths) => paths.filter((path) => path.length > 0));

	return {
		sounds
	};
}) satisfies PageServerLoad;
