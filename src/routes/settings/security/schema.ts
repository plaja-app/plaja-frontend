import { z } from 'zod';

export const formSchema = z
	.object({
		OldPassword: z.string().min(1, {
			message: 'Поле не може бути порожнім.'
		}),

		NewPassword: z.string().min(8, {
			message: 'Мінімальна довжина паролю 8 символів.'
		}),

		NewPasswordRepeat: z.string().min(8, {
			message: 'Мінімальна довжина паролю 8 символів.'
		})
	})
	.refine((data) => data.NewPassword === data.NewPasswordRepeat, {
		message: 'Паролі не співпадають.',
		path: ['NewPasswordRepeat']
	});

export type FormSchema = typeof formSchema;
