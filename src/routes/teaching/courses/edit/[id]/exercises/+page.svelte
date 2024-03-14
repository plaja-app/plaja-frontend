<script lang="ts">
	import ExerciseForm from '$lib/components/teaching/CourseExercisesForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="max-w-screen-lg flex-1 pr-20">
	<div class="mx-6 my-5">
		<ExerciseForm session={data.session} data={data.form} course={data.course} />
	</div>
</div>
