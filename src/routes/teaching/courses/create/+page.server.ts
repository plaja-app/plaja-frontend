import type { PageServerLoad, Actions } from "./$types";
import { BackendURL } from '$lib';

export const load: PageServerLoad = async () => {
	const response = await fetch(`${BackendURL}/api/v1/course-categories?id=all&sort=title`);
	const courseCategories: CourseCategory[] = await response.json();

	return {
		initialCategories: courseCategories,
	};
};

export const actions: Actions = {
	default: async (event) => {

	},
};