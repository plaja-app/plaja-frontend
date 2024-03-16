import type { PageServerLoad } from './$types';
import { BackendURL } from '$lib';

export const load: PageServerLoad = async ({ params, locals }) => {
	const id = params.id;

	const response = await fetch(`${BackendURL}/api/v1/courses?id=${id}`);
	const course = await response.json();

	const session = locals.session as Session | undefined;

	return { course, session };
};

// async function handleButtonClick() {
// 	const cookie_token = event.cookies.get('pja_user_jwt') as string;
// 	const bearer_token = event.request.headers.get("pja_user_jwt'")?.split(' ')[1];
// 	const token = cookie_token ?? bearer_token;
//
// 	const response = await fetch(`${BackendURL}/api/v1/enrollment/create`,
// 		{method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 				Cookie: `pja_user_jwt=${token}`,
// 			},
// 			body: JSON.stringify({
// 				user_id: data.session?.User.UserID,
// 				course_id: data.course.CourseID,
// 			})
// 		});
//
// 	if (response.ok) {
// 		const data = await response.json();
// 		console.log('Success:', data);
// 		// Handle success
// 	} else {
// 		// Handle error
// 		console.error('Error:', response.statusText);
// 	}
// }