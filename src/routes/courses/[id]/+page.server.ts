import type { PageServerLoad } from './$types'
import { BackendURL } from '$lib';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id;

	const response = await fetch(`${BackendURL}/api/v1/courses?id=${id}`)
	const course = await response.json();

	return { course };
}