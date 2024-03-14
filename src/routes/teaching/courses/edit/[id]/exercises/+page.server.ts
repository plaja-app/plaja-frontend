import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { toast } from 'svelte-sonner';
import { BackendURL } from '$lib';

export const load: PageServerLoad = async ({ params, locals }) => {
	const id = params.id;

	const session = locals.session;

	if (session === undefined) {
		return fail(401);
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
