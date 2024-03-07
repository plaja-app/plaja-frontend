<script lang="ts">
	import '../../app.pcss';
	import SettingsSidebar from '$lib/components/settings/SettingsSidebar.svelte';
	import { page } from '$app/stores';
	import { IconShield as Authentication } from '@tabler/icons-svelte';
	import { IconUser as User } from '@tabler/icons-svelte';

	const sidebarNavItems = [
		{
			icon: User,
			title: 'Профіль',
			href: '/settings'
		},
		{
			icon: Authentication,
			title: 'Пароль і автентифікація',
			href: '/settings/security'
		}
	];
</script>

<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
	<aside class="lg:w-1/5">
		<div class="fixed">
			<p class="mx-2 my-4 mb-3 ml-9 text-xl font-medium">Налаштування</p>
			<SettingsSidebar items={sidebarNavItems} />
		</div>
	</aside>
	<div class="ml-80 flex-1 lg:max-w-lg">
		<slot />
	</div>
</div>
