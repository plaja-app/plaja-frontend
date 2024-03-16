<script lang="ts">
	import '../../app.pcss';
	import SettingsSidebar from '$lib/components/settings/SettingsSidebar.svelte';
	import { IconChartLine as Stats } from '@tabler/icons-svelte';
	import { IconLayoutDashboard as Panel } from '@tabler/icons-svelte';
	import { IconUserCog as Users} from '@tabler/icons-svelte';
	import { IconDatabaseCog as Courses} from '@tabler/icons-svelte';
	import { IconFilterCog as Categories} from '@tabler/icons-svelte';

	const sidebarNavItems = [
		{
			icon: Panel,
			title: 'Панель',
			href: '/admin'
		},
		{
			icon: Users,
			title: 'Користувачі',
			href: '/admin/users'
		},
		{
			icon: Courses,
			title: 'Курси',
			href: '/admin/courses'
		},
		{
			icon: Categories,
			title: 'Категорії',
			href: '/admin/categories'
		}
	];
</script>

	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-5 lg:space-y-0">
		<aside class="lg:w-1/6">
			<div class="fixed">
				<p class="mx-2 my-4 mb-3 ml-9 text-xl font-medium">Адмінпанель</p>
				<SettingsSidebar items={sidebarNavItems} />
			</div>
		</aside>
		<div class="ml-80 w-auto flex-1 pr-20">
			<slot />
		</div>
	</div>
