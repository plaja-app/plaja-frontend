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
	import { onDestroy } from 'svelte';
	export let session: Session;
	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		dataType: 'json',
		resetForm: false,
	});

	const { form: formData, enhance } = form;

	$formData.FirstName = session.User?.FirstName;
	$formData.LastName = session.User?.LastName;

	let fileInput;

	let imageURL = session.User.ProfilePic;

	function handleFileChange(event) {
		const files = event.target.files;
		if (files.length > 0) {
			const file = files[0];
			imageURL = URL.createObjectURL(file);
		}
	}

	onDestroy(() => {
		if (imageURL.startsWith('blob:')) {
			URL.revokeObjectURL(imageURL);
		}
	});

	function triggerFileInput() {
		fileInput.click();
	}

	const MaxFirstNameLength: number = formSchema.shape.FirstName._def.checks[1].value;
	const MaxLastNameLength: number = formSchema.shape.LastName._def.checks[1].value;
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
					on:input={(e) => ($formData.ProfilePic = e.currentTarget.files?.item(0))}
					on:change={handleFileChange}
				/>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<div class="inline-flex size-28 items-center justify-center rounded-full">
							<Avatar.Root class="size-28">
								<Avatar.Image src={imageURL} alt="User {session.User.ID}" />
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
<!--							<DropdownMenu.Item-->
<!--								disabled={session.User.ProfilePic !== undefined}-->
<!--								on:click={deleteAvatar}>Видалити фото</DropdownMenu.Item-->
<!--							>-->
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
			<div class="mb-1 flex items-center justify-between">
				<Form.Label>Ім'я</Form.Label>
				<Form.Description class="text-xs text-gray-500">
					{$formData.FirstName.length}/{MaxFirstNameLength}
				</Form.Description>
			</div>
			<Input maxlength={MaxFirstNameLength} placeholder={session?.User?.FirstName} {...attrs} bind:value={$formData.FirstName} />
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Field {form} name="LastName">
		<Form.Control let:attrs>
			<div class="mb-1 flex items-center justify-between">
				<Form.Label>Прізвище</Form.Label>
				<Form.Description class="text-xs text-gray-500">
					{$formData.LastName.length}/{MaxLastNameLength}
				</Form.Description>
			</div>
			<Input maxlength={MaxLastNameLength} placeholder={session?.User?.LastName} {...attrs} bind:value={$formData.LastName} />
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<p class="pb-2 text-start text-sm text-muted-foreground">
		Ваше офіційне ім'я та прізвище, що буде використовуватися в сертифікатах.
	</p>

	<Form.Button class="mt-1 w-min flex-grow">Зберегти зміни</Form.Button>
</form>
