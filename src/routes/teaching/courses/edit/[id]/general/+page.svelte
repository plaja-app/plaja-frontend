<script lang="ts">
	import CourseEditingForm from '$lib/components/teaching/CourseGeneralForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="mx-6 my-5">
	<CourseEditingForm data={data.form} session={data.session} course={data.course}/>
</div>
