<script lang="ts">
	import CheckboxesGroup from '$lib/components/CheckboxGroup.svelte';
	import CourseCard from '$lib/components/CourseCard.svelte';
	import type { PageData } from './$types';
	import { Separator } from '$lib/components/shadcn-ui/separator';
	export let data: PageData
</script>

<!--<div class="flex columns-2 pt-5 pb-10">-->
<!--	<div class="pl-14">-->
<!--		<p class="font-semibold text-xl pb-5">Фільтри</p>-->
<!--		<div>-->
<!--			<CheckboxesGroup label="Мова" />-->
<!--		</div>-->
<!--	</div>-->
<!--	<div class="ps-10 flex-grow">-->
<!--		<div class="row-auto">-->
<!--			<p class="font-semibold text-xl pb-5">Курси</p>-->
<!--		</div>-->
<!--		<div id="courses-table" class="grid flex-grow mr-5 gap-5">-->
<!--			{#each data.courses as course (course.ID)}-->
<!--				<CourseCard-->
<!--					course={course}-->
<!--				/>-->
<!--			{/each}-->
<!--		</div>-->
<!--	</div>-->
<!--</div>-->

<div class="mx-10 py-8">
	<div class="grid grid-cols-12">
		<div class="col-span-2">
			<p class="font-semibold text-xl pb-5">Фільтри</p>
			<CheckboxesGroup label="Мова" />
		</div>
		<div class="col-span-10">
			<p class="font-semibold text-xl pb-5">Курси</p>
			<div id="courses-table" class="grid flex-grow gap-5">
				{#each data.courses as course (course.ID)}
					<CourseCard
						course={course}
					/>
				{/each}
			</div>
		</div>
	</div>
</div>