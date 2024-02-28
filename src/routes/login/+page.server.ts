import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { formSchema } from "./schema";
import { fail, redirect } from '@sveltejs/kit';
import { toast } from 'svelte-sonner';
import { BackendURL } from '$lib';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema)),
	};
};

function parseCookies(cookieStrings: string[]): Cookie[] {
	return cookieStrings.map((cookieString) => {
		const parts = cookieString.split(';').map(part => part.trim());
		const [name, value] = parts[0].split('=');
		const attributes: CookieAttributes = { value };

		parts.slice(1).forEach(part => {
			const [key, val] = part.split('=');
			switch (key) {
				case 'Max-Age':
					attributes.maxAge = parseInt(val, 10);
					break;
				case 'HttpOnly':
					attributes.httpOnly = true;
					break;
				case 'SameSite':
					attributes.sameSite = val as 'Lax' | 'Strict' | 'None';
					break;
			}
		});

		return {
			name,
			attributes,
		};
	});
}

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