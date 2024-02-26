import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch, params }) => {
	const id = params.id;

	const response = await fetch(`/api/v1/courses?id=${id}`)
	const course = await response.json();

	return { course };
}