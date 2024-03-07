import SignUpForm from '$lib/components/forms/SignUpForm.svelte';

import { z } from 'zod';

export const formSchema = z.object({
	Email: z.string().email({
		message: 'Некоректна адреса.'
	}),

	Password: z.string()
});

export type FormSchema = typeof formSchema;
