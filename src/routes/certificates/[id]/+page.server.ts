import type { PageServerLoad } from './$types';
import { BackendURL } from '$lib';

export const load: PageServerLoad = async ({ params, locals }) => {
	const id = params.id;

	const response = await fetch(`${BackendURL}/api/v1/users?id=${id}`);
	const user = await response.json();

	const session = locals.session;

	return { user, session };
};
