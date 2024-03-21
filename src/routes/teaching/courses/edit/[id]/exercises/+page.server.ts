import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
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

	let response = await fetch(`${BackendURL}/api/v1/course-exercises?exercise_id=all&course_id=${id}`);
	let exercises: CourseExercise[] = await response.json();

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

		const cookie_token = event.cookies.get('pja_user_jwt') as string;
		const bearer_token = event.request.headers.get("pja_user_jwt'")?.split(' ')[1];
		const token = cookie_token ?? bearer_token;

		let updateResponse = await fetch(`${BackendURL}/api/v1/course-exercises/create-update`, {
			method: 'POST',
			headers: {
				Cookie: `pja_user_jwt=${token}`
			},
			body: JSON.stringify(form.data)
		});

		if (updateResponse.ok) {
			toast.success('Дані оновлено!');

			// After updating, fetch the latest exercises list
			let fetchExercisesResponse = await fetch(`${BackendURL}/api/v1/course-exercises?exercise_id=all&course_id=${event.params.id}`, {
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});
			if (fetchExercisesResponse.ok) {
				const exercisesFullData = await fetchExercisesResponse.json();
				const repExercises = exercisesFullData.map((exercise: { ID: any; Title: any; Content: any; }) => ({
					ID: exercise.ID,
					Title: exercise.Title,
					Content: exercise.Content,
				}));
				form.data["Exercises"] = repExercises;
			} else {
				// Handle error if the fetch operation failed
				console.error('Failed to fetch updated exercises');
				toast.error('Не вдалося оновити список завдань.');
			}
		} else {
			// Handle error if the update operation failed
			console.error('Failed to update exercises');
			toast.error('Не вдалося оновити дані.');
			return fail(400, { form });
		}

		// Clear the ExercisesToDelete array as part of cleanup
		form.data["ExercisesToDelete"] = [];

		return {
			form
		};
	}
};

