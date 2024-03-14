<script lang="ts">
	import * as Form from '$lib/components/shadcn-ui/form';
	import { Input } from '$lib/components/shadcn-ui/input';
	import { formSchema, type FormSchema } from '../../../routes/settings/security/schema';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { browser } from '$app/environment';

	export let session: Session;
	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" autocomplete="off" use:enhance class="flex flex-col">
	<Form.Field {form} name="OldPassword">
		<Form.Control let:attrs>
			<Form.Label>Старий пароль</Form.Label>
			<Input type="password" {...attrs} bind:value={$formData.OldPassword} />
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Field {form} name="NewPassword">
		<Form.Control let:attrs>
			<Form.Label>Новий пароль</Form.Label>
			<div class="flex items-center gap-1">
				<Input type="password" {...attrs} bind:value={$formData.NewPassword} />
			</div>
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Field {form} name="NewPasswordRepeat">
		<Form.Control let:attrs>
			<Form.Label>Підтвердьте новий пароль</Form.Label>
			<div class="flex items-center gap-1">
				<Input type="password" {...attrs} bind:value={$formData.NewPasswordRepeat} />
			</div>
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Button class="mb-2 mt-1 w-min flex-grow">Зберегти зміни</Form.Button>

	<a
		class="pb-2 text-start text-sm text-muted-foreground hover:underline"
		data-sveltekit-preload-data="off"
		href="/settings/privacy/password-reset">Забули пароль?</a
	>
	<div class="mt-3">
		{#if browser}
			<SuperDebug data={$formData} />
		{/if}
	</div>
</form>
