import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { formSchema } from "./schema";
import { fail, redirect } from '@sveltejs/kit';
import { BackendURL } from '$lib';

export const load: PageServerLoad = async () => {
	const response = await fetch(`${BackendURL}/api/v1/course-categories?id=all&sort=title`);
	const courseCategories: CourseCategory[] = await response.json();

	return {
		form: await superValidate(zod(formSchema)),
		categories: courseCategories,
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

		console.log(form.data)

		// const response = await fetch(`${BackendURL}/api/v1/users/login`,
		// 	{method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify(form.data)
		// 	})
		//

		//throw redirect(303, '/')
	},
};