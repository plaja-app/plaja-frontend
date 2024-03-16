import type { PageServerLoad } from './$types';
import { BackendURL } from '$lib';

export const load: PageServerLoad = async ({ params, locals }) => {
	const id = params.id;

	const response = await fetch(`${BackendURL}/api/v1/users?id=${id}`);
	const user = await response.json();

	const stats = {
		totalCreated: 0,
		totalCompleted: 0,
		totalCertificates: 0,
	};


	const certificates = await fetch(`${BackendURL}/api/v1/course-certificates?user_id=${id}`);
	stats.totalCertificates = (await certificates.json()).length;

	const completedCourses = await fetch(`${BackendURL}/api/v1/enrollments?user_id=${id}&status_id=2,3`);
	stats.totalCompleted = (await completedCourses.json()).length;

	const createdCourses = await fetch(`${BackendURL}/api/v1/courses?instructor_id=${id}`);
	stats.totalCreated = (await createdCourses.json()).length;

	const session = locals.session;

	return { user, stats, session };
};
