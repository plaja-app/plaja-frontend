<script lang="ts">
	import '../../../../../app.pcss';
	import type { LayoutData } from './$types';
	import { IconChecklist as Tasks } from '@tabler/icons-svelte';
	import { IconSettings as General } from '@tabler/icons-svelte';
	import SettingsSidebar from '$lib/components/settings/SettingsSidebar.svelte';
	// $: isEditPage = $page.url.pathname.startsWith('/teaching/courses/edit/');

	// const sidebarNavItems = [
	// 	{
	// 		icon: Courses,
	// 		title: 'Мої курси',
	// 		href: '/teaching'
	// 	},
	// 	{
	// 		icon: Stats,
	// 		title: 'Статистика',
	// 		href: '/teaching/stats'
	// 	}
	// ];

	export let data: LayoutData;

	const sidebarNavEditItems = [
		{
			icon: General,
			title: 'Інформація',
			href: `/teaching/courses/edit/${data.id}/general`
		},
		{
			icon: Tasks,
			title: 'Завдання',
			href: `/teaching/courses/edit/${data.id}/exercises`
		}
	];
</script>

	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-5 lg:space-y-0">
		<aside class="lg:w-1/6">
			<div class="fixed">
				<p class="mx-2 my-4 mb-3 ml-9 text-xl font-medium">Курс</p>
				<SettingsSidebar items={sidebarNavEditItems} />

				<!--{#if isEditPage}-->
				<!--	<p class="mx-2 my-4 mb-3 ml-9 text-xl font-medium">Курс</p>-->
				<!--	<SettingsSidebar items={sidebarNavEditItems} />-->
				<!--{/if}-->
			</div>

		</aside>
		<div class="ml-80 max-w-screen-md flex-1 pr-20">
			<slot />
		</div>
	</div>