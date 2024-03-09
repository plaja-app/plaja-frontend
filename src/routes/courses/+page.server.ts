import type { PageServerLoad } from './$types';
import { BackendURL } from '$lib';

export const load: PageServerLoad = async ({}) => {
	const response = await fetch(`${BackendURL}/api/v1/courses?id=all&status_id=4`);
	const courses = await response.json();

	return { courses };
};
