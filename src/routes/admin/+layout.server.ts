import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { BackendURL } from '$lib';

// @ts-ignore
export const load: LayoutServerLoad = async ({ locals }) => {
	if (typeof locals.session === 'undefined') {
		throw redirect(303, '/');
	}

	if (locals.session.User.UserType.ID !== 3) {
		console.log("The user with UsertType.ID = ", locals.session.User.UserType.ID, " is not an admin")
		throw redirect(303, '/');
	}
};