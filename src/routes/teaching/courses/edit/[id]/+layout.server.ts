import type { LayoutServerLoad } from './$types';

// @ts-ignore
export const load: LayoutServerLoad = async ({ params, locals }) => {
	let id = params.id

	return { id, locals };
};
