import { z } from 'zod';
import { message } from 'sveltekit-superforms';

export const formSchema = z.object({
	Thumbnail: z.instanceof(File, { message: 'Завантажте файл.' })
		.refine((f) => f.size < 5_000_000, 'Маскимальний розмір 5 MB.')
		.optional(),

	Title: z.string({
			required_error: 'Поле не може бути порожнім.'
		})
		.min(1, {
			message: 'Назва не може бути порожньою.'
		})
		.max(60, {
			message: 'Назва не може бути довшою за 60 символів.'
		}),

	ShortDescription: z.string()
		.min(1, {
			message: 'Поле не може бути порожнім.'
		})
		.max(200, {
			message: 'Максимальна довжина 100 символів.'
		}),

	Description: z.string()
		.min(1, {
			message: 'Поле не може бути порожнім.'
		})
		.max(600, {
			message: 'Максимальна довжина 600 символів.'
		}),

	Price: z.number()
		.max(5000, {
		message: 'Ціна не може бути більшою за 5000₴.'
	}).optional()
});

export type FormSchema = typeof formSchema;
