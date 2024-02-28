import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { formSchema } from "./schema";
import { fail } from "@sveltejs/kit";
import { toast } from 'svelte-sonner';
import { BackendURL } from '$lib';

export const load: PageServerLoad = async () => {
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

		const response = await fetch(`${BackendURL}/api/v1/users/signup`,
			{method: "POST",
				headers: {
				"Content-Type": "application/json",
				},
				body: JSON.stringify(form.data)
			});

		console.log(form)

		if (response.ok) {
			toast.success("Account created!")
		}

		return {
			form,
		};
	},
};