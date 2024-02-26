import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {

	const response = await fetch('/api/v1/courses?id=all');
	const courses = await response.json();

	return { courses };
}