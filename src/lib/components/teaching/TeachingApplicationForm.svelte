<script lang="ts">
	import * as Form from '$lib/components/shadcn-ui/form';
	import * as Select from '$lib/components/shadcn-ui/select';
	import { Input } from '$lib/components/shadcn-ui/input';
	import { Button } from '$lib/components/shadcn-ui/button';
	import { formSchema, type FormSchema } from '../../../routes/teaching/apply/schema';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Textarea } from '$lib/components/shadcn-ui/textarea/index.js';
	import { browser } from '$app/environment';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;

	$: selectedExperience = $formData.Experience
		? {
				label: $formData.Experience,
				value: $formData.Experience
			}
		: undefined;
</script>

<form method="POST" use:enhance class="w-auto max-w-[460px]">
	<Form.Field {form} name="Experience">
		<Form.Control let:attrs>
			<Form.Label>Досвід викладання</Form.Label>
			<Select.Root
				selected={selectedExperience}
				onSelectedChange={(v) => {
					v && ($formData.Experience = v.label);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Досвід викладання" />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="Amateur" label="Аматорське викладання" />
					<Select.Item value="Tutoring" label="Репетиторство" />
					<Select.Item value="Professional" label="Професійне викладання" />
				</Select.Content>
			</Select.Root>
			<input hidden {...attrs} bind:value={$formData.Experience} />
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Field {form} name="Motivation">
		<Form.Control let:attrs>
			<Form.Label>Ваша мотивація</Form.Label>
			<Textarea {...attrs} class="max-h-36 resize-y" bind:value={$formData.Motivation} />
		</Form.Control>
		<Form.Description class="mt-1 text-sm text-gray-500">До 150 символів.</Form.Description>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Field {form} name="PlatformChoice">
		<Form.Control let:attrs>
			<Form.Label>Чому ви обрали Plaja?</Form.Label>
			<Textarea {...attrs} class="max-h-20 resize-y" bind:value={$formData.PlatformChoice} />
		</Form.Control>
		<Form.Description class="mt-1 text-sm text-gray-500">До 50 символів.</Form.Description>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Button class="mt-1">Готово</Form.Button>
</form>
