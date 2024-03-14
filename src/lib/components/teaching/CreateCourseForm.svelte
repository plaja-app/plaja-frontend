<script lang="ts">
	import { Input } from '$lib/components/shadcn-ui/input';
	import TagSelector from '$lib/components/other/TagSelector.svelte';
	import * as Select from '$lib/components/shadcn-ui/select';
	import * as Form from '$lib/components/shadcn-ui/form';
	import { formSchema, type FormSchema } from '../../../routes/teaching/courses/create/schema';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { browser } from '$app/environment';
	import { Checkbox } from '$lib/components/shadcn-ui/checkbox';

	export let categories: CourseCategory[] = [];
	export let levels: CourseLevel[] = [];
	export let session: Session | undefined;
	export let data: SuperValidated<Infer<FormSchema>>;

	let instructorID: number = session?.User?.ID;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = form;

	let selectedCategories: CourseCategory[] = [];

	function onTagSelectionUpdate(event: CustomEvent<number[]>) {
		selectedCategories = event.detail.map((selectedId) => {
			const category = categories.find((category) => category.ID === selectedId);
			return { ID: category.ID, Title: category.Title };
		});
	}

	$: formData.update((currentData) => {
		return { ...currentData, Categories: selectedCategories };
	});

	$: selectedLevelID =
		$formData.LevelID && levels.length > 0
			? {
					label: levels.find((level) => level.ID === $formData.LevelID)?.Title || '',
					value: $formData.LevelID
				}
			: undefined;

	if (session) {
		$formData.InstructorID = session?.User.ID;
	}
</script>

<form method="POST" use:enhance class="flex flex-col">
	<Form.Field {form} name="Title">
		<Form.Control let:attrs>
			<Form.Label>Назва</Form.Label>
			<Input placeholder="Створення вебзастосунків" {...attrs} bind:value={$formData.Title} />
		</Form.Control>
		<Form.Description class="mt-1 text-sm text-gray-500"
			>Цей параметр можна буде змінити пізніше.</Form.Description
		>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Field {form} name="Categories">
		<Form.Control let:attrs>
			<Form.Label>Категорії</Form.Label>
			<!--			TODO: Change to Combobox-->
			<TagSelector
				description="Оберіть категорії, які стосуються вашого курсу."
				{categories}
				maxTags={3}
				on:update={onTagSelectionUpdate}
			/>
			<input hidden {...attrs} bind:value={$formData.Categories} />
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Field {form} name="LevelID">
		<Form.Control let:attrs>
			<Form.Label>Рівень складності</Form.Label>
			<Select.Root
				selected={selectedLevelID}
				onSelectedChange={(v) => {
					v && ($formData.LevelID = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Рівень" />
				</Select.Trigger>
				<Select.Content>
					{#each levels as { Title, ID }}
						<Select.Item value={ID} label={Title} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden {...attrs} bind:value={$formData.LevelID} />
		</Form.Control>
		<Form.Description class="mt-1 text-sm text-gray-500"
			>Цей параметр можна буде змінити пізніше.</Form.Description
		>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Field {form} name="HasCertificate">
		<Form.Control let:attrs>
			<Form.Label>Сертифікат по завершенню</Form.Label>
			<div class="mt-1 flex items-center space-x-2">
				<Checkbox {...attrs} bind:checked={$formData.HasCertificate} />
				<Form.Label class="font-normal">Видавати сертифікат</Form.Label>
			</div>
			<Form.Description class="mt-1 text-sm text-gray-500">
				Користувачі
				{#if !$formData.HasCertificate}
					не
				{/if}

				можуть отримувати сертифікати за проходження вашого курсу.
			</Form.Description>
			<input name={attrs.name} value={$formData.HasCertificate} hidden />
		</Form.Control>
	</Form.Field>

	<Form.Button class="mt-1 flex-grow">Створити</Form.Button>

	<div class="mt-3">
		{#if browser}
			<SuperDebug data={$formData} />
		{/if}
	</div>
</form>
