<script lang="ts">
	import '../../app.pcss';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { LayoutData } from './$types';
	import { Toaster } from '$lib/components/shadcn-ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import TeacherSidebar from '$lib/components/teaching/TeacherSidebar.svelte';
	import { Separator } from '$lib/components/shadcn-ui/separator';
	import { page } from '$app/stores';
	import { IconChartCandle as Stats } from '@tabler/icons-svelte';
	import { IconBooks as Courses } from '@tabler/icons-svelte';
	import SettingsSidebar from '$lib/components/settings/SettingsSidebar.svelte';
	$: isApplyPage = $page.url.pathname.endsWith('/apply');

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
		}
	];
</script>

<!--{#if !isApplyPage}-->
<!--	<div class="my-5 grid grid-cols-9">-->
<!--		<div class="col-span-1">-->
<!--			<div class="fixed">-->
<!--				<TeacherSidebar items={sidebarNavItems} />-->
<!--			</div>-->
<!--		</div>-->

<!--		<div class="col-span-8">-->
<!--			<main>-->
<!--				<slot />-->
<!--			</main>-->
<!--		</div>-->
<!--	</div>-->
<!--{:else}-->
<!--	<div class="my-5">-->
<!--		<main>-->
<!--			<slot />-->
<!--		</main>-->
<!--	</div>-->
<!--{/if}-->

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
