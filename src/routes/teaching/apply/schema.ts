import { z } from 'zod';

export const formSchema = z.object({
	UserID: z.number(),

	Experience: z.string().min(1, {
		message: 'Оберіть досвід викладання.'
	}),

	Motivation: z.string().max(150, {
		message: 'Текст повинен бути до 150 символів.'
	}),

	PlatformChoice: z.string().max(50, {
		message: 'Текст повинен бути до 50 символів.'
	})
});

export type FormSchema = typeof formSchema;
