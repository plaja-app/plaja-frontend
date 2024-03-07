<script lang="ts">
	import * as Form from '$lib/components/shadcn-ui/form';
	import { Input } from '$lib/components/shadcn-ui/input';
	import { Button } from '$lib/components/shadcn-ui/button';
	import { EyeClosed, EyeOpen, LinkedinLogo } from 'radix-icons-svelte';
	import { formSchema, type FormSchema } from '../../../routes/login/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance, message } = form;

	let isPasswordVisible = false;

	function togglePasswordVisibility() {
		isPasswordVisible = !isPasswordVisible;
	}
</script>

<form method="POST" use:enhance class="flex flex-col">
	{#if $message}
		<p class="pb-2 text-center font-normal text-destructive">{$message}</p>
	{/if}
	<Form.Field {form} name="Email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input placeholder="Email" {...attrs} bind:value={$formData.Email} />
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Field {form} name="Password">
		<Form.Control let:attrs>
			<Form.Label>Пароль</Form.Label>

			<div class="flex items-center gap-1">
				<Input
					type={isPasswordVisible ? 'text' : 'password'}
					placeholder="Пароль"
					{...attrs}
					bind:value={$formData.Password}
				/>
				<Button variant="outline" on:click={togglePasswordVisibility} class="shrink-0">
					{#if isPasswordVisible}
						<EyeOpen />
					{:else}
						<EyeClosed />
					{/if}
				</Button>
			</div>
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Button class="mt-1 flex-grow">Увійти</Form.Button>
</form>

<div class="relative">
	<div class="absolute inset-0 flex items-center">
		<span class="w-full border-t" />
	</div>
	<div class="relative flex justify-center text-xs uppercase">
		<span class="bg-background px-2 text-muted-foreground"> або </span>
	</div>
</div>

<Button variant="outline" type="button">
	<LinkedinLogo class="mr-2 h-4 w-4" />
	Продовжити з LinkedIn
</Button>
