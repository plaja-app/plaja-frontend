import type { PageServerLoad } from './$types';
import { BackendURL } from '$lib';

export const load: PageServerLoad = async ({ locals }) => {
	console.log(locals.session)
	const response = await fetch(`${BackendURL}/api/v1/courses?instructor_id=${locals.session?.User.ID}`);

	let courses
	if (response.ok) {
		courses = await response.json();
	} else {
		courses = [];
	}

	return { courses };
};