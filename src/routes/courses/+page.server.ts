import type { PageServerLoad } from './$types';
import { BackendURL } from '$lib';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({}) => {
	const response = await fetch(`${BackendURL}/api/v1/courses?id=all&status_id=4`);
	const courses = await response.json();

	const categoriesResponse = await fetch(`${BackendURL}/api/v1/course-categories?id=all&sort=title`);
	const categories: CourseCategory[] = await categoriesResponse.json();

	const categoryFilters = categories.map(category => ({
		id: category.ID,
		label: category.Title,
		checked: false,
	}));

	return { courses, categoryFilters };
};