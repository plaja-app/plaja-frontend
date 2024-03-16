import { z } from 'zod';

export const formSchema = z.object({
	Title: z
		.string({
			required_error: 'Назва не може бути порожньою.'
		})
		.min(1, {
			message: 'Назва не може бути порожньою.'
		})
		.max(60, {
			message: 'Назва не може бути довшою за 60 символів.'
		}),

	Categories: z
		.array(
			z.object({
				ID: z.number(),
				Title: z.string()
			})
		)
		.nonempty({
			message: 'Оберіть хоча б 1 категорію.'
		}),

	LevelID: z.number().positive({
		message: 'Оберіть рівень складності.'
	}),

	HasCertificate: z.boolean(),

	InstructorID: z.number()
});

export type FormSchema = typeof formSchema;
