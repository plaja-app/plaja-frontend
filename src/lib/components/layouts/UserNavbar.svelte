<script lang="ts">
	import * as Avatar from '$lib/components/shadcn-ui/avatar';
	import * as DropdownMenu from '$lib/components/shadcn-ui/dropdown-menu';
	import { Button } from '$lib/components/shadcn-ui/button';
	import { redirect } from '@sveltejs/kit';
	import { BackendURL } from '$lib';
	import { Skeleton } from '$lib/components/shadcn-ui/skeleton';
	import { IconSettings } from '@tabler/icons-svelte';
	import { IconUserCircle } from '@tabler/icons-svelte';
	import { IconChalkboard } from '@tabler/icons-svelte';
	import { IconLogout } from '@tabler/icons-svelte';

	export let session: Session;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative px-0 aspect-square rounded-full">
			<Avatar.Root>
				<Avatar.Image src={session.User.ProfilePic} alt="User {session.User.ID}" />
				<Avatar.Fallback class="text-slate-700"
					>{Array.from(session.User.FirstName)[0]}{Array.from(
						session.User.LastName
					)[0]}</Avatar.Fallback
				>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-52 shadow-md" align="end">
		<DropdownMenu.Item href="/users/{session?.User?.ID}" class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">
					{session?.User?.FirstName}
					{session?.User?.LastName}
				</p>
				<p class="text-xs leading-none text-muted-foreground">{session?.User?.Email}</p>
			</div>
		</DropdownMenu.Item>
		<DropdownMenu.Separator />

		<DropdownMenu.Item href="/users/{session?.User?.ID}">
			<div class="flex flex-row items-center">
				<IconUserCircle stroke={1.5} class="size-5" />
				<p class="ml-1.5">Профіль та курси</p>
			</div>
		</DropdownMenu.Item>
		<!--			<DropdownMenu.Item href="/users/courses">Мої курси</DropdownMenu.Item>-->

		<DropdownMenu.Item href="/settings">
			<div class="flex flex-row items-center">
				<IconSettings stroke={1.5} class="size-5" />
				<p class="ml-1.5">Налаштування</p>
			</div>
		</DropdownMenu.Item>

		{#if session?.User.UserType.Title !== "Learner"}
			<DropdownMenu.Item href="/teaching">
				<div class="flex flex-row items-center">
					<IconChalkboard stroke={1.5} class="size-5" />
					<p class="ml-1.5">Викладання</p>
				</div>
			</DropdownMenu.Item>
		{/if}

		<DropdownMenu.Separator />
		<DropdownMenu.Item
			on:click={() => (window.location.href = '/logout')}
			data-sveltekit-preload-data="off">
			<div class="flex flex-row gap-1.5 items-center">
				<IconLogout stroke={1.5} class="size-5 text-red-600" />
				<p class="text-red-600">Вийти</p>
			</div>
		</DropdownMenu.Item
		>
	</DropdownMenu.Content>
</DropdownMenu.Root>
