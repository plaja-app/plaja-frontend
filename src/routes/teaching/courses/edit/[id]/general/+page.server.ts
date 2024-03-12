import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { toast } from 'svelte-sonner';
import { BackendURL } from '$lib';

export const load: PageServerLoad = async ({ params, locals }) => {
	const id = params.id;

	const response = await fetch(`${BackendURL}/api/v1/courses?id=${id}`);
	const courses = await response.json();

	let course = courses[0] as Course;

	const session = locals.session;

	if (typeof session === 'undefined') {
		throw redirect(303, '/'); // TODO: 401
	}

	if (session.User.ID !== course.Instructor.ID) {
		// @ts-ignore
		throw error(403, "У вас немає дозволу на перегляд цієї сторінки.");
	}

	return {
		form: await superValidate(zod(formSchema)),
		session,
		course
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
