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

	const response = await fetch(`${BackendURL}/api/v1/course-exercises?exercise_id=all&course_id=${id}`);
	const exercises: CourseExercise[] = await response.json();

	console.log(exercises)

	return {
		form: await superValidate(zod(formSchema)),
		session,
		exercises
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

		if (event.locals.session) {
			form.data["InstructorID"] = event.locals.session.User.ID;
			form.data["CourseID"] = +event.params.id;
		}

		console.log("Received Exercises:", form.data);

		const cookie_token = event.cookies.get('pja_user_jwt') as string;
		const bearer_token = event.request.headers.get("pja_user_jwt'")?.split(' ')[1];
		const token = cookie_token ?? bearer_token;

		const response = await fetch(`${BackendURL}/api/v1/course-exercises/create-update`, {
			method: 'POST',
			headers: {
				Cookie: `pja_user_jwt=${token}`
			},
				body: JSON.stringify(form.data)
			});

		// if (response.ok) {
		toast.success('Дані оновлено!');
		// }

		return {
			form
		};
	}
};
