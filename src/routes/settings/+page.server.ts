import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { toast } from 'svelte-sonner';
import { BackendURL } from '$lib';

export const load: PageServerLoad = async ({ locals }) => {
	const session = locals.session;

	console.log(session);

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
			return fail(400, {
				form
			});
		}

		// const response = await fetch(`${BackendURL}/api/v1/users/signup`,
		// 	{method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify(form.data)
		// 	});

		// if (response.ok) {
		toast.success('Дані оновлено!');
		// }

		return {
			form
		};
	}
};
