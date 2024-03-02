import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { formSchema } from "./schema";
import { fail, redirect } from '@sveltejs/kit';
import { toast } from 'svelte-sonner';
import { BackendURL } from '$lib';
import { parseCookies } from '$lib/utils';

export const load: PageServerLoad = async ({ locals }) => {
	if (typeof locals.session !== 'undefined') {
		throw redirect(303, "/")
	}

	return {
		form: await superValidate(zod(formSchema)),
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const response = await fetch(`${BackendURL}/api/v1/users/login`,
			{method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form.data)
			})

		const parsedCookies = parseCookies(response.headers.getSetCookie())

		parsedCookies.forEach(cookie => {
			event.cookies.set(cookie.name, cookie.attributes.value, {
				maxAge: cookie.attributes.maxAge,
				httpOnly: cookie.attributes.httpOnly,
				secure: false,
				path: '/',
			});
		});

		throw redirect(303, '/')
	},
};