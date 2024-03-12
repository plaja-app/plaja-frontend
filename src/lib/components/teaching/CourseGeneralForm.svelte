<script lang="ts">
	import { Input } from '$lib/components/shadcn-ui/input';
	import * as Form from '$lib/components/shadcn-ui/form';
	import * as Avatar from '$lib/components/shadcn-ui/avatar';
	import * as DropdownMenu from '$lib/components/shadcn-ui/dropdown-menu';
	import TagSelector from '$lib/components/other/TagSelector.svelte';
	import { IconCamera } from '@tabler/icons-svelte';
	import { formSchema, type FormSchema } from '../../../routes/teaching/courses/edit/[id]/general/schema';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { browser } from '$app/environment';
	import { Button } from '$lib/components/shadcn-ui/button';
	import { IconPencil } from '@tabler/icons-svelte';
	import { TextAlignBottom } from 'radix-icons-svelte';
	import { Textarea } from '$lib/components/shadcn-ui/textarea';
	import { Checkbox } from '$lib/components/shadcn-ui/checkbox';
	export let session: Session;
	export let course: Course;
	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = form;

	$formData.Title = course.Title;
	$formData.ShortDescription = course.ShortDescription;
	$formData.Description = course.Description;
	$formData.Price = course.Price;

	let fileInput;

	function triggerFileInput() {
		fileInput.click();
	}

	async function handleFileChange(event) {
		const files = event.target.files;
		if (files.length > 0) {
			const file = files[0];
			$formData.Thumbnail = event.currentTarget.files?.item(0) as File;
		}
	}

	function deleteThumbnail() {
		$formData.Thumbnail = '';
	}

	let priceValue = $formData.Price || 0;

	function handleInput(event) {
		const value = event.target.value;
		priceValue = value === "" || value < 0 ? 0 : +value;

		$formData.Price = value === "" ? 0 : +value;
	}
</script>

<form method="POST" enctype="multipart/form-data" use:enhance class="flex flex-col gap-2">
	<Form.Field {form} name="Thumbnail">
		<Form.Control let:attrs>
			<Form.Label>Обкладинка</Form.Label>
			<div class="relative mt-1">
				<input
					type="file"
					accept="image/*"
					class="hidden"
					{...attrs}
					bind:this={fileInput}
					bind:value={$formData.Thumbnail}
					on:change={handleFileChange}
				/>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
							<div class="ml-2 h-[200px] w-[320px] border border-gray-200 overflow-hidden rounded-md bg-neutral-400">
								<img src={course.Thumbnail} alt={course.Title} class="h-full w-full object-cover" />
							</div>

							<Button variant="outline" class="absolute bottom-0 left-0 ml-0 px-2">
								<IconPencil stroke={1.75} class="size-5" />
							</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Item on:click={triggerFileInput}>Змінити обкладинку</DropdownMenu.Item>
							<DropdownMenu.Item
								disabled={session.User.ProfilePic !== undefined}
								on:click={deleteThumbnail}>Видалити обкладинку</DropdownMenu.Item
							>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
		<p class="pt-2 text-start text-sm text-muted-foreground">
			Обкладинка курсу (1280x720 пікселів).
		</p>
	</Form.Field>

	<Form.Field {form} name="Title">
		<Form.Control let:attrs>
			<div class="flex justify-between items-center mb-1">
				<Form.Label>Короткий опис курсу</Form.Label>
				<Form.Description class="text-xs text-gray-500">
					{$formData.Title.length}/{ formSchema.shape.Title._def.checks[1].value}
				</Form.Description>
			</div>
			<Input placeholder={course.Title} {...attrs} bind:value={$formData.Title} />
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Field {form} name="ShortDescription">
		<Form.Control let:attrs>
			<div class="flex justify-between items-center mb-1">
				<Form.Label>Короткий опис курсу</Form.Label>
				<Form.Description class="text-xs text-gray-500">
					{$formData.ShortDescription.length}/{ formSchema.shape.ShortDescription._def.checks[1].value}
				</Form.Description>
			</div>
			<Textarea
				{...attrs}
				placeholder={course.ShortDescription}
				class="resize-y max-h-36"
				bind:value={$formData.ShortDescription}
			/>
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Field {form} name="Description">
		<Form.Control let:attrs>
			<div class="flex justify-between items-center mb-1">
				<Form.Label>Повний опис курсу</Form.Label>
				<Form.Description class="text-xs text-gray-500">
					{$formData.Description.length}/{ formSchema.shape.Description._def.checks[1].value}
				</Form.Description>
			</div>
			<Textarea
				{...attrs}
				placeholder={course.Description}
				class="resize-y min-h-48 max-h-72"
				bind:value={$formData.Description}
			/>
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Field {form} name="Price">
		<Form.Control let:attrs>
			<Form.Label>Ціна</Form.Label>
			<div class="flex items-center gap-3 w-32">
				<Input type="number" placeholder={course.Price.toString()} {...attrs}
							 bind:value={priceValue} on:input={handleInput} />
				<p class="text-xl font-normal">₴</p>
			</div>
		</Form.Control>
		<Form.Description class="mt-1 text-sm text-gray-500">
			Уведіть 0, якщо бажаєте зробити курс безкоштовним.
		</Form.Description>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Button class="mt-1 w-min flex-grow">Зберегти зміни</Form.Button>

	<div class="mt-3">
		{#if browser}
			<SuperDebug data={$formData} />
		{/if}
	</div>
</form>
