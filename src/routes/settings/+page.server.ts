import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { toast } from 'svelte-sonner';
import { BackendURL } from '$lib';

export const load: PageServerLoad = async ({ locals }) => {
	const session = locals.session;

	if (typeof session === 'undefined') {
		throw redirect(303, '/'); // TODO: 401
	}

	return {
		form: await superValidate(zod(formSchema)),
		session
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}

		const cookie_token = event.cookies.get('pja_user_jwt') as string;
		const bearer_token = event.request.headers.get("pja_user_jwt'")?.split(' ')[1];
		const token = cookie_token ?? bearer_token;

		const formData = new FormData();

		for (const key in form.data) {
			if (key !== 'ProfilePic') {
				// @ts-ignore
				formData.append(key, form.data[key]);
			}
		}

		const file = form.data.ProfilePic;
		// @ts-ignore
		formData.append('ProfilePic', file);

		const response = await fetch(`${BackendURL}/api/v1/users/update-general`, {
			method: 'POST',
			headers: {
				Cookie: `pja_user_jwt=${token}`
			},
			body: formData,
			credentials: "include",
		});

		return withFiles({ form });
	}
};