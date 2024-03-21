import type { PageServerLoad } from './$types';
import { BackendURL } from '$lib';

export const load: PageServerLoad = async ({ params, locals,}) => {
	const course_id = params.id;

	const response = await fetch(`${BackendURL}/api/v1/courses?id=${course_id}`);
	const course = await response.json();

	const session = locals.session as Session | undefined;

	let isEnrolled: boolean = false

	if (session) {
		const response1 = await fetch(`${BackendURL}/api/v1/enrollments?course_id=${course_id}&user_id=${session.User.ID}`);
		isEnrolled = (await response1.json()).length === 1;
	}

	return { course, session, isEnrolled };
};