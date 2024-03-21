import type { PageServerLoad } from './$types';
import { BackendURL } from '$lib';


// TODO: Check if the user is enrolled
export const load: PageServerLoad = async ({ params, locals }) => {
	const id = params.id;

	const response = await fetch(`${BackendURL}/api/v1/course-exercises?exercise_id=all&course_id=${id}`);
	const exercises: CourseExercise[] = await response.json();

	const session = locals.session as Session | undefined;

	return { exercises, session };
};