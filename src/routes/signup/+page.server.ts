import type { PageServerLoad, Actions } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { fail, redirect } from '@sveltejs/kit';
import { toast } from 'svelte-sonner';
import { BackendURL } from '$lib';

export const load: PageServerLoad = async ({ locals }) => {
	if (typeof locals.session !== 'undefined') {
		throw redirect(303, '/');
	}

	return {
		form: await superValidate(zod(formSchema))
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

		const { PasswordRepeat, ...data } = form.data;

		const response = await fetch(`${BackendURL}/api/v1/users/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (response.ok) {
			toast.success('Account created!');
			redirect(303, '/login');
		} else {
			return message(form, 'Користувач із цією адресою електронної пошти вже існує.', {
				// @ts-ignore
				status: response.status
			});
		}

		return {
			form
		};
	}
};
