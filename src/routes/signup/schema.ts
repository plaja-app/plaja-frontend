import { z } from 'zod';
import { message } from 'sveltekit-superforms';

export const formSchema = z.object({
	FirstName: z.string()
		.min(1, {
			message: 'Поле не може бути порожнім.'
		})
		.max(20, {
			message: 'Не може бути більше 20 символів.'
		}),

	LastName: z.string()
		.min(1, {
			message: 'Поле не може бути порожнім.'
		})
		.max(20, {
			message: 'Не може бути більше 20 символів.'
		}),


	Email: z.string().email({
		message: 'Некоректна адреса.'
	}),

	Password: z.string()
		.min(8, {
			message: 'Мінімальна довжина паролю 8 символів.'
		}),

	PasswordRepeat: z.string()
		.min(8, {
			message: 'Мінімальна довжина паролю 8 символів.'
		}),
}).refine((data) => data.Password === data.PasswordRepeat, {
		message: 'Паролі не співпадають.',
		path: ["PasswordRepeat"],
	});

export type FormSchema = typeof formSchema;
