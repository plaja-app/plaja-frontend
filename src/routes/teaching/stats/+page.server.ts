import type { PageServerLoad } from './$types';
import { BackendURL } from '$lib';

export const load: PageServerLoad = async ({ locals }) => {
	const response = await fetch(
		`${BackendURL}/api/v1/stats/categories`
	);

	let categoriesData;
	if (response.ok) {
		categoriesData = await response.json();
	} else {
		categoriesData = [];
	}

	const response1 = await fetch(
		`${BackendURL}/api/v1/stats/course-levels`
	);

	let levelsData;
	if (response1.ok) {
		levelsData = await response1.json();
	} else {
		levelsData = [];
	}

	return { categoriesData, levelsData };
};