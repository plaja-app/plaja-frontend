<script lang="ts">
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/shadcn-ui/button';
	import { page } from '$app/stores';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	export let items: { icon: any; href: string; title: string }[];

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});
</script>

<nav class={cn('z-50 mx-2 my-4 ml-8 flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1')}>
	{#each items as item}
		{@const isActive = $page.url.pathname === item.href}
		<Button
			href={item.href}
			variant="ghost"
			class={cn(!isActive && 'hover:underline', 'relative justify-start hover:bg-transparent')}
		>
			<svelte:component this={item.icon} stroke={1.75} class="z-50 mr-2 size-5" />

			{#if isActive}
				<div
					class="absolute inset-0 rounded-md bg-muted"
					in:send={{ key: 'active-sidebar-tab' }}
					out:receive={{ key: 'active-sidebar-tab' }}
				/>
			{/if}
			<div class="relative">
				{item.title}
			</div>
		</Button>
	{/each}
</nav>
