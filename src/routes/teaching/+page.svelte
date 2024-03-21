<script lang="ts">
	import { Button } from '$lib/components/shadcn-ui/button/index';
	import * as Alert from '../../lib/components/shadcn-ui/alert';
	import CourseCard from '$lib/components/teaching/CourseCard.svelte';
	import type { PageData } from './$types';
	import * as ContextMenu from '$lib/components/shadcn-ui/context-menu';
	import { IconFileTypeXls } from '@tabler/icons-svelte';
	import * as XLSX from 'xlsx';

	export let data: PageData;

	function getStatusTitle(statusID: number) {
		switch (statusID) {
			case 1:
				return 'Чорновик';
			case 2:
				return 'На розгляді';
			case 3:
				return 'Вимагаються зміни';
			case 4:
				return 'Опублікований';
			case 5:
				return 'Усунутий';
			case 6:
				return 'Архівований';
			default:
				return 'Невідомий статус';
		}
	}

	function handleExportToXLS() {
		const ws = XLSX.utils.json_to_sheet(data.courses.map(course => ({
			'ID': course.ID,
			'Title': course.Title,
			'Level': course.Level,
			'Price': course.Price,
			'Status': getStatusTitle(course.StatusID),
			'Short Description': course.ShortDescription,
			'Description': course.Description,
			'Length': course.Length,
			'Certificate': course.HasCertificate,
			'Categories': course.Categories.map(cat => cat.Title).join(", "),
			'Created At': course.CreatedAt,
			'Updated At': course.UpdatedAt
		})));

		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Courses");

		XLSX.writeFile(wb, "courses.xlsx");
	}
</script>

<div class="mx-6 my-6">
	<Alert.Root class="mb-6">
		<div class="mx-12 my-10">
			<Alert.Title class="pb-2 text-4xl font-semibold">Несіть вогонь</Alert.Title>
			<Alert.Description class="mb-4 text-xl text-muted-foreground sm:w-[500px]">
				Поділіться своїми знаннями зі світом, створивши новий курс із навчальними матеріалами
			</Alert.Description>

			<div class="flex grid-cols-2 grid-rows-1 gap-2">
				<Button href="/teaching/courses/create" class="h-11 shrink px-5">Створити курс</Button>

				<Button variant="outline" href="/courses/5" class="h-11 shrink px-5">Довідка</Button>
			</div>
		</div>
	</Alert.Root>

	<div class="pt-3">
		<div>
			<div class="flex justify-between flex-row">
				<p class="pb-3 text-xl font-semibold">Ваші курси</p>
				<Button class="flex items-center justify-between gap-2 px-2" variant="link" on:click={() => handleExportToXLS()}>
					<IconFileTypeXls stroke={1.5} class="size-5" />
					<p class="pr-1.5">Експортувати в XLS</p>
				</Button>
			</div>

			{#if data.courses.length === 0}
				<p class="text-muted-foreground">Ви ще не створили жодного курсу.</p>
			{:else}
				<div class="grid flex-grow gap-5">
					{#each data.courses as course (course.ID)}
						<CourseCard {course} />
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
