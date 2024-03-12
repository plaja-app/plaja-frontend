<script lang="ts">
	import { Input } from '$lib/components/shadcn-ui/input';
	import * as Form from '$lib/components/shadcn-ui/form';
	import * as Avatar from '$lib/components/shadcn-ui/avatar';
	import * as DropdownMenu from '$lib/components/shadcn-ui/dropdown-menu';
	import TagSelector from '$lib/components/other/TagSelector.svelte';
	import { IconCamera } from '@tabler/icons-svelte';
	import { formSchema, type FormSchema } from '../../../routes/settings/schema';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { browser } from '$app/environment';
	import { Button } from '$lib/components/shadcn-ui/button';
	import { IconPencil } from '@tabler/icons-svelte';
	export let session: Session;
	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = form;

	$formData.FirstName = session.User?.FirstName;
	$formData.LastName = session.User?.LastName;

	let fileInput;

	function triggerFileInput() {
		fileInput.click();
	}

	async function handleFileChange(event) {
		const files = event.target.files;
		if (files.length > 0) {
			const file = files[0];
			$formData.ProfilePic = event.currentTarget.files?.item(0) as File;
		}
	}

	function deleteAvatar() {
		$formData.ProfilePic = '';
	}
</script>

<form method="POST" enctype="multipart/form-data" use:enhance class="flex flex-col">
	<Form.Field {form} name="ProfilePic">
		<Form.Control let:attrs>
			<Form.Label>Аватар</Form.Label>
			<div class="relative mt-1">
				<input
					type="file"
					accept="image/*"
					class="hidden"
					{...attrs}
					bind:this={fileInput}
					bind:value={$formData.ProfilePic}
					on:change={handleFileChange}
				/>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<div class="inline-flex size-28 items-center justify-center rounded-full">
							<Avatar.Root class="size-28">
								<Avatar.Image src={session.User.ProfilePic} alt="User {session.User.ID}" />
								<Avatar.Fallback class="text-4xl text-slate-700"
									>{Array.from(session.User.FirstName)[0]}{Array.from(
										session.User.LastName
									)[0]}</Avatar.Fallback
								>
							</Avatar.Root>

							<Button variant="outline" class="absolute bottom-0 left-0 ml-0 px-2">
								<IconPencil stroke={1.75} class="size-5" />
							</Button>
						</div>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Item on:click={triggerFileInput}>Змінити фото</DropdownMenu.Item>
							<DropdownMenu.Item
								disabled={session.User.ProfilePic !== undefined}
								on:click={deleteAvatar}>Видалити фото</DropdownMenu.Item
							>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<p class="pb-2 text-start text-sm text-muted-foreground">
		Ваше фото, яке будуть бачити інші користувачі.
	</p>

	<Form.Field {form} name="FirstName">
		<Form.Control let:attrs>
			<Form.Label>Ім'я</Form.Label>
			<Input placeholder={session?.User?.FirstName} {...attrs} bind:value={$formData.FirstName} />
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Field {form} name="LastName">
		<Form.Control let:attrs>
			<Form.Label>Прізвище</Form.Label>
			<Input placeholder={session?.User?.LastName} {...attrs} bind:value={$formData.LastName} />
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<p class="pb-2 text-start text-sm text-muted-foreground">
		Ваше офіційне ім'я та прізвище, що буде використовуватися в сертифікатах.
	</p>

	<Form.Button class="mt-1 w-min flex-grow">Зберегти зміни</Form.Button>

	<div class="mt-3">
		{#if browser}
			<SuperDebug data={$formData} />
		{/if}
	</div>
</form>
