<script lang="ts">
	import CourseGeneralForm from '$lib/components/teaching/CourseGeneralForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="max-w-screen-md flex-1 pr-20">
	<div class="mx-6 my-5">
		<CourseGeneralForm
			data={data.form}
			course={data.course} />
	</div>
</div>
