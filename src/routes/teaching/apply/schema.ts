import { z } from "zod";

export const formSchema = z.object({
	Experience: z.string().min(1, {
		message: "Оберіть досвід викладання.",
	}),
	Motivation: z.string().max(250, {
		message: "Текст повинен бути до 250 символів.",
	})
});

export type FormSchema = typeof formSchema;