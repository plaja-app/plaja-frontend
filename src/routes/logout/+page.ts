import { redirect } from '@sveltejs/kit';
import { BackendURL } from '$lib';
import { parseCookies } from '$lib/utils';
import type { PageServerLoad } from './$types';
import { json } from '@sveltejs/kit';
import { invalidateAll } from '$app/navigation';
import { __await } from 'tslib';


 export const load: PageServerLoad = async ({ fetch, cookies }) => {
 		throw redirect(303, '/');
 }

// export async function POST({ request }) {
// 	const headers = new Headers();
// 	headers.append('Set-Cookie', 'pja_user_jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict');
//
// 	return new Response(null, {
// 		status: 200,
// 		headers
// 	});
// }