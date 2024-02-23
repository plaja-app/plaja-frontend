<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import Logo from '$lib/components/Logo.svelte';
	import Search from '$lib/components/Search.svelte';
	import UserNavbar from '$lib/components/UserNavbar.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
</script>

<nav class="flex items-center justify-between px-4 bg-white">
	<Logo />

	<div class="flex-grow">
		<Search />
	</div>

	<div class="flex items-end gap-2 pl-2">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button builders={[builder]} variant="link" href="/">Курси</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56">
				<DropdownMenu.Item>Усі</DropdownMenu.Item>

				<DropdownMenu.Separator />

					<DropdownMenu.Sub>
						<DropdownMenu.SubTrigger>Веб-розробка</DropdownMenu.SubTrigger>
						<DropdownMenu.SubContent>
							<DropdownMenu.Item>SvelteKit</DropdownMenu.Item>
							<DropdownMenu.Item>JavaScript</DropdownMenu.Item>
							<DropdownMenu.Item>TypeScript</DropdownMenu.Item>
						</DropdownMenu.SubContent>
					</DropdownMenu.Sub>

				<DropdownMenu.Sub>
					<DropdownMenu.SubTrigger>Мови програмування</DropdownMenu.SubTrigger>
					<DropdownMenu.SubContent>
						<DropdownMenu.Item>Go</DropdownMenu.Item>
						<DropdownMenu.Item>Python</DropdownMenu.Item>
						<DropdownMenu.Item>C++</DropdownMenu.Item>
					</DropdownMenu.SubContent>

					<DropdownMenu.Sub>
						<DropdownMenu.SubTrigger>Бази даних</DropdownMenu.SubTrigger>
						<DropdownMenu.SubContent>
							<DropdownMenu.Item>SQL</DropdownMenu.Item>
							<DropdownMenu.Item>MySQL</DropdownMenu.Item>
							<DropdownMenu.Item>PostgreSQL</DropdownMenu.Item>
						</DropdownMenu.SubContent>
					</DropdownMenu.Sub>
				</DropdownMenu.Sub>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
		<Button variant="link" href="/teaching/apply">Викладати на Plaja</Button>

		<Button variant="outline" href="/login">Увійти</Button>
		<Button href="/signup">Зареєструватися</Button>

		{#if false}
			<UserNavbar />
		{/if}
	</div>
</nav>