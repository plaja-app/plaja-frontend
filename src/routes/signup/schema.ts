import { z } from 'zod';
import { message } from 'sveltekit-superforms';

export const formSchema = z.object({
	FullName: z
		.string()
		.min(1, {
			message: 'Поле не може бути порожнім.'
		})
		.max(50, {
			message: 'Не може бути більше 40 символів.'
		}),

	Email: z.string().email({
		message: 'Некоректна адреса.'
	}),

	Password: z.string().min(8, {
		message: 'Мінімальна довжина паролю 8 символів.'
	})
});

export type FormSchema = typeof formSchema;
