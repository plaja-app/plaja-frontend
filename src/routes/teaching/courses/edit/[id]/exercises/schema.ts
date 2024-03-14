import { z } from 'zod';
import { message } from 'sveltekit-superforms';

export const formSchema = z.object({
	Exercises: z
		.array(
			z.object({
				Title: z
					.string()
					.min(1, {
						message: 'Назва не може бути порожньою.'
					})
					.max(60, {
						message: 'Назва не може бути довшою за 60 символів.'
					}),

				Content: z
					.string()
					.min(1, {
						message: 'Вміст не може бути порожнім.'
					})
					.max(600, {
						message: 'Максимальна довжина 600 символів.'
					})
			})
		)
		.nonempty({
			message: 'Створіть хоча б 1 завдання.'
		}),

	InstructorID: z.number(),

	CourseID: z.number(),
});

export type FormSchema = typeof formSchema;
