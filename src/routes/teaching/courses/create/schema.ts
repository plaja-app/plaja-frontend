import { z } from "zod";

export const formSchema = z.object({
	title: z.string().max(60),
	categoryID: z.number({
		required_error: "required field",
		invalid_type_error: "Category is required",
	}),
});

export type FormSchema = typeof formSchema;