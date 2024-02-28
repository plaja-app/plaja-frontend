import { redirect } from '@sveltejs/kit';
import { BackendURL } from '$lib';
import { parseCookies } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const response = await fetch(`${BackendURL}/api/v1/users/logout`,
		{
			method: "POST",
			credentials: 'include',
		})

	const parsedCookies = parseCookies(response.headers.getSetCookie())

	parsedCookies.forEach(cookie => {
		cookies.set(cookie.name, cookie.attributes.value, {
			maxAge: cookie.attributes.maxAge,
			httpOnly: cookie.attributes.httpOnly,
			secure: false,
			path: '/',
		});
	});

	throw redirect(303, '/');
}

import { json } from '@sveltejs/kit';

// export async function POST({ request }) {
// 	const headers = new Headers();
// 	headers.append('Set-Cookie', 'pja_user_jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict');
//
// 	return new Response(null, {
// 		status: 200,
// 		headers
// 	});
// }