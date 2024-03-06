<script lang="ts">
	import * as Form from "$lib/components/shadcn-ui/form";
	import { Input } from "$lib/components/shadcn-ui/input";
	import { Button } from '$lib/components/shadcn-ui/button';
	import { EyeClosed, EyeOpen, LinkedinLogo } from 'radix-icons-svelte';
	import { formSchema, type FormSchema } from '../../../routes/teaching/apply/schema';
	import {
		type SuperValidated,
		type Infer,
		superForm,
	} from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema),
	});

	const { form: formData, enhance } = form;

	let isPasswordVisible = false;

	function togglePasswordVisibility() {
		isPasswordVisible = !isPasswordVisible;
	}
</script>

<form method="POST" use:enhance class="flex flex-col">
	<Form.Field {form} name="Experience">
		<Form.Control let:attrs>
			<Form.Label>Email*</Form.Label>

		</Form.Control>
		<Form.FieldErrors class="font-normal"/>
	</Form.Field>

	<Form.Field {form} name="Motivation">
		<Form.Control let:attrs>
			<Form.Label>Пароль*</Form.Label>

		</Form.Control>
		<Form.FieldErrors class="font-normal"/>
	</Form.Field>

	<Form.Button class="mt-1 flex-grow">Увійти</Form.Button>
</form>