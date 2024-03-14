<script lang="ts">
	import '../../../../../app.pcss';
	import type { LayoutData } from './$types';
	import { IconChecklist as Tasks } from '@tabler/icons-svelte';
	import { IconSettings as General } from '@tabler/icons-svelte';
	import SettingsSidebar from '$lib/components/settings/SettingsSidebar.svelte';
	import { Button } from '$lib/components/shadcn-ui/button';
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
			<p class="mx-2 my-4 mb-3 ml-8 text-xl font-medium">Курс</p>
			<SettingsSidebar items={sidebarNavEditItems} />
			<div class="z-50 ml-8 mt-8">
				<Button class="w-full" disabled>Надіслати</Button>
			</div>
		</div>
	</aside>
	<div class="ml-3 max-w-screen-lg flex-1 pr-20">
		<slot />
	</div>
</div>
