import type { PageServerLoad } from '../../../../../../../.svelte-kit/types/src/routes';
import { BackendURL } from '$lib';

export const load: PageServerLoad = async ({ params, locals }) => {
	const id = params.id;

	// const response = await fetch(`${BackendURL}/api/v1/users?id=${id}`);
	// const user = await response.json();

	const response = await fetch(`${BackendURL}/api/v1/courses?id=${id}`);
	const course = await response.json();

	const session = locals.session;

	return { course, session };
};
