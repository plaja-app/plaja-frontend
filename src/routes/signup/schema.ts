import { z } from "zod";

export const formSchema = z.object({
	fullName: z.string().min(2).max(50),
	email: z.string().email().max(50),
	password: z.string().min(8),
});

export type FormSchema = typeof formSchema;