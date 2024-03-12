import { z } from 'zod';

export const formSchema = z.object({
	ProfilePic: z
		.instanceof(File, { message: 'Завантажте файл.' })
		.refine((f) => f.size < 5_000_000, 'Маскимальний розмір 5 MB.')
		.optional(),

	FirstName: z
		.string()
		.min(1, {
			message: 'Поле не може бути порожнім.'
		})
		.max(50, {
			message: 'Не може бути більше 20 символів.'
		}),

	LastName: z
		.string()
		.min(1, {
			message: 'Не може бути порожнім.'
		})
		.max(50, {
			message: 'Не може бути більше 20 символів.'
		})
});

export type FormSchema = typeof formSchema;
