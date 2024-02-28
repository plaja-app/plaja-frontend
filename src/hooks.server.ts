import type { Handle } from '@sveltejs/kit';
import { BackendURL } from '$lib';

export const handle: Handle = async ({ event, resolve }) => {
	const cookie_token = event.cookies.get("pja_user_jwt") as string;

	const bearer_token = event.request.headers
		.get("pja_user_jwt'")
		?.split(" ")[1];
	const token = cookie_token ?? bearer_token;

	if (token) {
		const response = await fetch(`${BackendURL}/api/v1/users/getme`, {
			headers: {
				'Cookie': `pja_user_jwt=${token}`,
			}
		});

		if (response.ok) {
			const fullUser = await response.json();

			event.locals.user = {
				ID: fullUser.ID,
				FirstName: fullUser.FirstName,
				LastName: fullUser.LastName,
				Email: fullUser.Email,
				UserName: fullUser.UserName
			};

		} else {
			event.cookies.delete("pja_user_jwt", {
				path: '/',
			})
		}
	}

	return resolve(event);
};