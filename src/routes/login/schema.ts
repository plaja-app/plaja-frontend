import SignUpForm from '$lib/components/SignUpForm.svelte';

import { z } from "zod";

export const formSchema = z.object({
	email: z.string().email().max(50),
	password: z.string().min(8),
});

export type FormSchema = typeof formSchema;