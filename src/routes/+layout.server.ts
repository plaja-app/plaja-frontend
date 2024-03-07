import type { LayoutServerLoad } from './$types';
import { BackendURL } from '$lib';

export const load: LayoutServerLoad = async ({ locals }) => {
	const response = await fetch(`${BackendURL}/api/v1/course-categories?id=all&sort=title`);
	const categories: CourseCategory[] = await response.json();

	return { categories, locals };
};
