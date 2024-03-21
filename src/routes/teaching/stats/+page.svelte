<script lang="ts">
	import { BarChartGrouped, PieChart } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css'
	import type { PageData } from './$types';

	export let data: PageData;

	const pieData = data.categoriesData.map((category: {Title: string; CoursesCount: number}) => ({
		group: category.Title,
		value: category.CoursesCount,
	}));

	const barData = data.levelsData
		.filter((level: { LevelTitle: string; CategoryTitle: string; CoursesCount: number }) => level.LevelTitle !== "" && level.CoursesCount > 0)
		.map((level: { LevelTitle: string; CategoryTitle: string; CoursesCount: number }) => ({
			group: level.LevelTitle,
			value: level.CoursesCount,
			key: level.CategoryTitle
		}));

	const pieOptions = {
		title: 'Категорії',
		height: '350px',
		legend: {
			alignment: 'center',
		},
		pie: {
			alignment: 'center',
		},
		toolbar: {
			numberOfIcons: 2,
			controls: [
				{
					type: "Show as data-table"
				},
				{
					type: "Export as PNG"
				},
			]
		}
	}

	const barOptions = {
		title: 'Рівні',
		axes: {
			left: {
				mapsTo: 'value',
				ticks: {
					formatter: (value: number) => value % 1 === 0 ? value.toString() : '',
				},

			},
			bottom: {
				mapsTo: 'key',
				scaleType: 'labels',
			},
		},
		legend: {
			alignment: 'center',
		},
		toolbar: {
			numberOfIcons: 2,
			controls: [
				{
					type: "Show as data-table"
				},
				{
					type: "Export as PNG"
				},
			]
		}
	};
</script>

<div class="pt-4">
	<p class="pb-3 text-xl font-semibold">Статистика платформи</p>
	<div class="flex flex-row gap-20">
		<div class="min-w-fit">
			<PieChart data={pieData} options={pieOptions} />
		</div>

		<div class="w-full">
			<BarChartGrouped data={barData} options={barOptions}> </BarChartGrouped>
		</div>
	</div>
</div>
