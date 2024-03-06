<script lang="ts">
	import type { PageData } from './$types';
	import CourseCardExpanded from '$lib/components/CourseCardExpanded.svelte';
	import UserCard from '$lib/components/UserCard.svelte';

	export let data: PageData

	$: course = data.course[0] as Course;
</script>


<div class="columns-2 py-20 px-40 justify-between flex">
	<div>
		<div class="grid place-items-start gap-3.5">
			<p class="text-3xl font-medium">{course.Title}</p>
			<div class="pb-2">
				<UserCard user={course.Instructor} tag="Інструктор" />
			</div>
			<div class="w-1">
				<p class="font-medium">Опис</p>
			</div>
		</div>
	</div>

	<CourseCardExpanded course={course} />
</div>