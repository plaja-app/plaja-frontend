import type { PageServerLoad } from './$types';
import { BackendURL } from '$lib';

export const load: PageServerLoad = async ({ }) => {

	const response = await fetch(`${BackendURL}/api/v1/courses?id=all`);
	const courses = await response.json();

	return { courses };
}