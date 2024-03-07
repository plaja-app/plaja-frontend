<script lang="ts">
	import { Badge } from '$lib/components/shadcn-ui/badge/index';
	import { IconX } from '@tabler/icons-svelte';
	import { writable, type Writable } from 'svelte/store';
	import * as Select from '$lib/components/shadcn-ui/select';
	import { createEventDispatcher } from 'svelte';
	export let categories: CourseCategory[] = [];
	export let maxTags: number = 3;
	export let description: string;
	let selectedCategories = writable<number[]>([]);

	const dispatch = createEventDispatcher();

	$: if ($selectedCategories) {
		dispatch('update', $selectedCategories);
	}

	function handleSelectCategory(categoryId: number) {
		selectedCategories.update((current) => {
			if (current.length < maxTags && !current.includes(categoryId)) {
				return [...current, categoryId];
			}
			return current;
		});
	}

	function handleRemoveCategory(categoryId: number) {
		selectedCategories.update((current) => current.filter((id) => id !== categoryId));
	}

	function isSelected(categoryId: number) {
		return $selectedCategories.includes(categoryId);
	}

	let canSelectMore = writable(true);

	$: canSelectMore.set($selectedCategories.length < maxTags);
</script>

<div>
	<div class="mb-1 flex flex-wrap gap-1">
		{#each $selectedCategories as categoryId}
			<Badge variant="secondary" class="h-8 border border-input">
				<span class="font-medium">{categories.find((c) => c.ID === categoryId)?.Title}</span>
				<button type="button" class="ml-2" on:click={() => handleRemoveCategory(categoryId)}>
					<IconX stroke={2} class="h-3 w-3" />
				</button>
			</Badge>
		{/each}
	</div>

	<div class="relative">
		<Select.Root disabled={!$canSelectMore}>
			<Select.Trigger>
				<Select.Value placeholder={$canSelectMore ? 'Категорії' : 'Обрано максимум категорій'} />
			</Select.Trigger>
			{#if $canSelectMore}
				<Select.Content>
					{#each categories as { Title, ID }}
						{#if !isSelected(ID)}
							<Select.Item value={ID} on:click={() => handleSelectCategory(ID)}>{Title}</Select.Item
							>
						{/if}
					{/each}
				</Select.Content>
			{/if}
		</Select.Root>
		{#if !$canSelectMore}
			<p class="mt-1 text-sm text-gray-500">Обрано максимум категорій.</p>
		{:else}
			<p class="mt-1 text-sm text-gray-500">{description}</p>
		{/if}
	</div>
</div>
