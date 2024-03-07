<script lang="ts">
	import * as Form from '$lib/components/shadcn-ui/form';
	import { Input } from '$lib/components/shadcn-ui/input';
	import { formSchema, type FormSchema } from '../../../routes/settings/security/schema';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { browser } from '$app/environment';
	import { Button } from '$lib/components/shadcn-ui/button';
	import { IconEye, IconEyeOff } from '@tabler/icons-svelte';

	export let session: Session;
	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;

	let isPasswordVisible = false;

	function togglePasswordVisibility() {
		isPasswordVisible = !isPasswordVisible;
	}
</script>

<form method="POST" use:enhance class="flex flex-col">
	<Form.Field {form} name="OldPassword">
		<Form.Control let:attrs>
			<Form.Label>Старий пароль</Form.Label>
			<Input type="password" placeholder="Старий пароль" {...attrs} bind:value={$formData.OldPassword} />
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Field {form} name="NewPassword">
		<Form.Control let:attrs>
			<Form.Label>Новий пароль</Form.Label>
			<div class="flex items-center gap-1">
				<Input
					type={isPasswordVisible ? 'text' : 'password'}
					placeholder="Новий пароль"
					{...attrs}
					bind:value={$formData.NewPassword}
				/>
				<Button variant="outline" on:click={togglePasswordVisibility} class="px-2.5">
					{#if isPasswordVisible}
						<IconEye stroke={1.5} class="size-5" />
					{:else}
						<IconEyeOff stroke={1.5} class="size-5" />
					{/if}
				</Button>
			</div>
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Field {form} name="Email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input placeholder={session.User.Email} {...attrs} bind:value={$formData.Email} />
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<p class="pb-2 text-start text-sm text-muted-foreground"></p>

	<Form.Button class="mt-1 w-min flex-grow">Зберегти зміни</Form.Button>

	<div class="mt-3">
		{#if browser}
			<SuperDebug data={$formData} />
		{/if}
	</div>
</form>
