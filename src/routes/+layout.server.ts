import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {

	const response = await fetch('/api/v1/course_categories?id=all&sort=title');
	const categories = await response.json();

	return { categories };
}