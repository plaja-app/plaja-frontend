import SignUpForm from '$lib/components/forms/SignUpForm.svelte';

import { z } from 'zod';

export const formSchema = z.object({
	OldPassword: z.string(),

	NewPassword: z.string().min(8).optional(),

	Email: z
		.string()
		.email({
			message: 'Некоректна адреса.'
		})
		.optional()
});

export type FormSchema = typeof formSchema;
