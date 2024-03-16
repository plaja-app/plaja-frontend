import type { PageServerLoad, Actions } from './$types';
import { BackendURL } from '$lib';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { formSchema } from './schema';
import { toast } from 'svelte-sonner';
import { goto } from '$app/navigation';

export const load: PageServerLoad = async () => {
	let response1 = await fetch(`${BackendURL}/api/v1/course-categories?id=all&sort=title`);
	const courseCategories: CourseCategory[] = await response1.json();

	const response2 = await fetch(`${BackendURL}/api/v1/course-levels?id=all`);
	const courseLevels: CourseCategory[] = await response2.json();

	return {
		categories: courseCategories,
		levels: courseLevels,
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

		const cookie_token = event.cookies.get('pja_user_jwt') as string;
		const bearer_token = event.request.headers.get("pja_user_jwt'")?.split(' ')[1];
		const token = cookie_token ?? bearer_token;

		const response = await fetch(`${BackendURL}/api/v1/courses/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Cookie: `pja_user_jwt=${token}`
			},
			body: JSON.stringify(form.data),
			credentials: 'include'
		});

		// redirect(303, '/teaching');
		await goto('/teaching');

		return {
			form
		};
	}
};
