<script lang="ts">
	import * as Form from "$lib/components/shadcn-ui/form";
	import { Input } from "$lib/components/shadcn-ui/input";
	import { formSchema, type FormSchema } from '../../../routes/teaching/courses/create/schema';
	import SuperDebug, {
		type SuperValidated,
		type Infer,
		superForm,
	} from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import * as Select from '$lib/components/shadcn-ui/select';
	import { browser } from "$app/environment";

	export let data: SuperValidated<Infer<FormSchema>>;
	export let categories: CourseCategory[] = [];

	const form = superForm(data, {
		validators: zodClient(formSchema),
	});

	const { form: formData, enhance } = form;

	$: selectedCategory = $formData.categoryID
		? {
			label: categories.find(c => c.ID === $formData.categoryID)?.Title,
			value: $formData.categoryID,
		}
		: undefined;
</script>

<form method="POST" use:enhance class="flex flex-col">
	<Form.Field {form} name="title">
		<Form.Control let:attrs>
			<Form.Label class="text-base">Назва</Form.Label>
			<Input placeholder="Пр. Створення веб-застосунків" {...attrs} bind:value={$formData.title} />
			<Form.Description>
				Назву можна буде змінити пізніше.
			</Form.Description>
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Field {form} name="categoryID">
		<Form.Control let:attrs>
			<Form.Label class="text-base">Категорія</Form.Label>
			<Select.Root
				selected={selectedCategory}
				onSelectedChange={(v) => {
          v && ($formData.categoryID = v.value);
        }}>
				<Select.Trigger>
					<Select.Value placeholder="Категорія" />
				</Select.Trigger>
				<Select.Content>
					{#each categories as { Title, ID }}
						<Select.Item value={ID}>{Title}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.categoryID} name={attrs.name} />
		</Form.Control>
	</Form.Field>

	<Form.Button class="mt-1 flex-grow">Перейти до наповнення</Form.Button>

	<div class="mt-10">
		{#if browser}
			<SuperDebug data={$formData} />
		{/if}
	</div>
</form>