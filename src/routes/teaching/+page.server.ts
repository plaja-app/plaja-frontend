import type { PageServerLoad } from './$types';
import { BackendURL } from '$lib';

export const load: PageServerLoad = async ({ locals }) => {
	const response = await fetch(`${BackendURL}/api/v1/courses?instructor_id=${locals.session?.User.ID}`);
	const courses = await response.json();

	return { courses };
};