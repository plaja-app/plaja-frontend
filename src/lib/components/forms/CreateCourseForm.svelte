<script lang="ts">
	import { writable } from 'svelte/store';
	import { Input } from '$lib/components/shadcn-ui/input';
	import TagSelector from '$lib/components/TagSelector.svelte';
	import { Button } from '$lib/components/shadcn-ui/button';
	import { browser } from '$app/environment';

	export let categories: CourseCategory[] = [];

	let title = '';
	let selector;
	let selectedCategories: CourseCategory[] = [];
	let validationMessage = writable('');

	function onTagSelectionUpdate(event: CustomEvent<number[]>) {
		selectedCategories = event.detail.map(selectedId => {
			const category = categories.find(category => category.ID === selectedId);
			return { id: category.ID, title: category.Title };
		});
	}

	function handleSubmit() {
		validationMessage.set('');

		if (title.trim().length === 0) {
			validationMessage.set('Введіть назву.');
			return;
		}

		if (selectedCategories.length === 0) {
			validationMessage.set('Оберіть принаймні одну категорію.');
			return;
		}

		const formData = {
			title,
			categories: selectedCategories,
		};

		console.log(formData);

		title = '';
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="flex flex-col">
	<div class="form-field mb-5">
		<label for="title" class="text-base">Назва</label>
		<Input id="title" placeholder="Пр. Створення веб-застосунків" bind:value={title} />
		<p class="text-sm text-gray-500 mt-1">
			Назву можна буде змінити пізніше.
		</p>
	</div>

	<div class="form-field mb-1">
		<label for="categories" class="text-base">Категорії</label>
		<TagSelector
			description="Оберіть категорії, які стосуються вашого курсу."
			categories={categories}
			maxTags={3}
			on:update={onTagSelectionUpdate} />
	</div>

	<p class="text-red-500 class mb-1">{$validationMessage}</p>

	<Button type="submit" class="mt-1 flex-grow">Створити</Button>
</form>
