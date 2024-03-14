import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate, withFiles } from 'sveltekit-superforms';
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
		throw redirect(303, '/');
	}

	if (session.User.ID !== course.Instructor.ID) {
		// @ts-ignore
		throw error(403, 'У вас немає дозволу на перегляд цієї сторінки.');
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
			return fail(400, withFiles({ form }));
		}

		// Альтернативний підхід, який спав мені на думку
		if (event.locals.session) {
			form.data["InstructorID"] = event.locals.session.User.ID;
			form.data["CourseID"] = +event.params.id;
		}

		console.log("Received:", form.data);

		const cookie_token = event.cookies.get('pja_user_jwt') as string;

		const bearer_token = event.request.headers.get("pja_user_jwt'")?.split(' ')[1];
		const token = cookie_token ?? bearer_token;

		const formData = new FormData();
// Add string and number entries
		for (const key in form.data) {
			if (key !== 'Thumbnail') {
				// @ts-ignore
				formData.append(key, form.data[key]);
			}
		}

// Add file entry with appropriate key
		const file = form.data.Thumbnail;
		// @ts-ignore
		formData.append('Thumbnail', file);

		const response = await fetch(`${BackendURL}/api/v1/courses/update-general`, {
			method: 'POST',
			headers: {
				Cookie: `pja_user_jwt=${token}`
			},
			body: formData,
			credentials: "include",
		});

		if (response.ok) {
			console.log("works")
		}

		return withFiles({ form });
	}
};