// @ts-ignore
import type { LayoutServerLoad } from './$types';
import { BackendURL } from '$lib';

// @ts-ignore
export const load: LayoutServerLoad = async ({ locals }) => {

	const response = await fetch(`${BackendURL}/api/v1/course-categories?id=all&sort=title`);
	const categories = await response.json();

	return { categories, locals };
}