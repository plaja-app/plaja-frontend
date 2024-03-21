<script lang="ts">
	import { writable } from 'svelte/store';
	import CheckboxesGroup from '$lib/components/other/CheckboxGroup.svelte';
	import CourseCard from '$lib/components/cards/CourseCard.svelte';
	import type { PageData } from './$types';
	import * as Accordion from '$lib/components/shadcn-ui/accordion';
	import * as Pagination from '$lib/components/shadcn-ui/pagination';
	import Search from '$lib/components/layouts/Search.svelte';
	import { Input } from '$lib/components/shadcn-ui/input';

	export let data: PageData;

	let currentPage = 1;
	const perPage = 3;
	let searchQuery = writable('');

	$: filteredCourses = $searchQuery
		? data.courses.filter(course => course.title.toLowerCase().includes($searchQuery.toLowerCase()))
		: data.courses;

	$: totalPages = Math.ceil(filteredCourses.length / perPage);
	$: if ($searchQuery !== '') currentPage = 1;
	$: startIndex = (currentPage - 1) * perPage;
	$: endIndex = startIndex + perPage;
	$: visibleCourses = filteredCourses.slice(startIndex, endIndex);

	function setPage(page: number) {
		if (page < 1 || page > totalPages) return;
		currentPage = page;
	}

	function goToPrevPage() {
		setPage(currentPage - 1);
	}

	function goToNextPage() {
		setPage(currentPage + 1);
	}
</script>


<div class="mx-10 py-8">
	<div class="grid grid-cols-12">
		<div class="col-span-2 mr-8">
			<p class="pb-5 text-xl font-semibold">Фільтри</p>
			<Accordion.Root multiple>
				<Accordion.Item value="item-1">
					<Accordion.Trigger>Категорія</Accordion.Trigger>
					<Accordion.Content>
						<CheckboxesGroup filters={data.categoryFilters}/>
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item value="item-2">
					<Accordion.Trigger>Ціна</Accordion.Trigger>
					<Accordion.Content>
						<CheckboxesGroup />
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item value="item-3">
					<Accordion.Trigger>Сертифікат</Accordion.Trigger>
					<Accordion.Content>
						<CheckboxesGroup />
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</div>
		<div class="col-span-10">
			<p class="text-xl font-semibold">Курси</p>
			<p class="mb-4 text-muted-foreground">{data.courses.length} результатів</p>
			<div class="flex flex-row">
				<Input bind:value={$searchQuery} placeholder="Пошук..." class="mb-4 flex-grow" />

				<div>
					<Pagination.Root count={totalPages} let:pages>
						<Pagination.Content class="list-none">
							<Pagination.Item>
								<Pagination.PrevButton on:click={goToPrevPage} disabled={currentPage <= 1} />
							</Pagination.Item>
							<Pagination.Item>
								<Pagination.NextButton on:click={goToNextPage} disabled={currentPage >= totalPages} />
							</Pagination.Item>
						</Pagination.Content>
					</Pagination.Root>
				</div>
			</div>
			<div id="courses-table" class="grid flex-grow gap-5">
				{#each visibleCourses as course (course.ID)}
					<CourseCard {course} />
				{/each}
			</div>
		</div>
	</div>
</div>
