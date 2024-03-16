<script lang="ts">
	import '../../app.pcss';
	import { page } from '$app/stores';
	import SettingsSidebar from '$lib/components/settings/SettingsSidebar.svelte';
	import { IconChartLine as Stats } from '@tabler/icons-svelte';
	import { IconBook as Courses } from '@tabler/icons-svelte';
	import { IconUsers as Users} from '@tabler/icons-svelte';

	$: isApplyPage =
		$page.url.pathname.endsWith('/apply') ||
		$page.url.pathname.startsWith('/teaching/courses/edit/');
	// $: isEditPage = $page.url.pathname.startsWith('/teaching/courses/edit/');

	const sidebarNavItems = [
		{
			icon: Courses,
			title: 'Мої курси',
			href: '/teaching'
		},
		{
			icon: Stats,
			title: 'Статистика',
			href: '/teaching/stats'
		},
		{
			icon: Users,
			title: 'Студенти',
			href: '/teaching/students'
		}
	];
</script>

{#if !isApplyPage}
	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-5 lg:space-y-0">
		<aside class="lg:w-1/6">
			<div class="fixed">
				<p class="mx-2 my-4 mb-3 ml-9 text-xl font-medium">Викладання</p>
				<SettingsSidebar items={sidebarNavItems} />
			</div>
		</aside>
		<div class="ml-80 w-auto flex-1 pr-20">
			<slot />
		</div>
	</div>
{:else}
	<div class="my-5">
		<main>
			<slot />
		</main>
	</div>
{/if}
