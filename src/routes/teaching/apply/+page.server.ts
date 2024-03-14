import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { fail, redirect } from '@sveltejs/kit';
import { toast } from 'svelte-sonner';
import { BackendURL } from '$lib';

export const load: PageServerLoad = async ({ locals }) => {
	const session = locals.session as Session | undefined;

	// if (typeof session === 'undefined') {
	// 	throw redirect(307, '/login');
	// }

	if (session) {
		if (session.User.UserType.ID !== 1) {
			throw redirect(303, '/teaching');
		}
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
			return fail(400, {
				form
			});
		}

		const cookie_token = event.cookies.get('pja_user_jwt') as string;
		const bearer_token = event.request.headers.get("pja_user_jwt'")?.split(' ')[1];
		const token = cookie_token ?? bearer_token;

		if (event.locals.session) {
			form.data["UserID"] = event.locals.session.User.ID;
		}

		console.log(form.data)

		const response = await fetch(`${BackendURL}/api/v1/teaching-applications/create`,
			{method: "POST",
				headers: {
					"Content-Type": "application/json",
					Cookie: `pja_user_jwt=${token}`,
				},
				credentials: "include",
				body: JSON.stringify(form.data)
			});

		// if (response.ok) {
		redirect(303, '/teaching');
		// }

		return {
			form
		};
	}
};
