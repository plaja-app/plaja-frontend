<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import Logo from '$lib/components/Logo.svelte';
	import Search from '$lib/components/Search.svelte';
	import UserNavbar from '$lib/components/UserNavbar.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';

	export let categories: CourseCategory[] = []

	// import { onMount } from 'svelte';
	//
	// let categories: CourseCategory[] = [];
	//
	// async function fetchData() {
	// 	const response = await fetch('/api/v1/course_categories?id=all&sort=title');
	// 	categories = await response.json();
	// }
	//
	// onMount(() => {
	// 	fetchData();
	// });
</script>

<nav class="flex items-center justify-between px-4 bg-white">
	<Logo />

	<div class="flex-grow">
		<Search />
	</div>

	<div class="flex items-end gap-2 pl-2">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button builders={[builder]} variant="link" href="/courses">Курси</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56">
				<DropdownMenu.Item href="/courses">Усі</DropdownMenu.Item>
				<DropdownMenu.Separator />

				{#each categories as category (category.ID)}
					<DropdownMenu.Item href="?q={category.Title}">{category.Title}</DropdownMenu.Item>
				{/each}

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