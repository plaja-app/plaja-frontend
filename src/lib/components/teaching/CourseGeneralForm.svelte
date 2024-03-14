<script lang="ts">
	import { Input } from '$lib/components/shadcn-ui/input';
	import * as Form from '$lib/components/shadcn-ui/form';
	import * as Avatar from '$lib/components/shadcn-ui/avatar';
	import * as DropdownMenu from '$lib/components/shadcn-ui/dropdown-menu';
	import {
		formSchema,
		type FormSchema
	} from '../../../routes/teaching/courses/edit/[id]/general/schema';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { browser } from '$app/environment';
	import { Button } from '$lib/components/shadcn-ui/button';
	import { IconPencil } from '@tabler/icons-svelte';
	import { TextAlignBottom } from 'radix-icons-svelte';
	import { Textarea } from '$lib/components/shadcn-ui/textarea';
	import { Checkbox } from '$lib/components/shadcn-ui/checkbox';
	import { Carta, CartaEditor } from 'carta-md';
	import '$lib/styles/editor.scss';
	import 'carta-md/light.css';
	import { emoji } from '@cartamd/plugin-emoji';
	import { code } from '@cartamd/plugin-code';

	export let session: Session;
	export let course: Course;
	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		clearOnSubmit: 'none',
	});

	const { form: formData, enhance } = form;

	// $formData.Title = course.Title;
	// $formData.ShortDescription = course.ShortDescription;
	// $formData.Description = course.Description;
	// $formData.Price = course.Price;
	// $formData.InstructorID = session.User.ID;
	// $formData.CourseID = course.ID;

	formData.update(
		($formData) => {
			$formData.Title = course.Title;
			$formData.ShortDescription = course.ShortDescription;
			$formData.Description = course.Description;
			$formData.Price = course.Price;
			// $formData.InstructorID = session.User.ID;
			// $formData.CourseID = course.ID;
			return $formData;
		},
		{ taint: false }
	);

	console.log($formData)

	let fileInput;
	let imageURL = course.Thumbnail;

	function handleFileChange(event) {
		const files = event.target.files;
		if (files.length > 0) {
			const file = files[0];
			imageURL = URL.createObjectURL(file);
		}
	}

	import { onDestroy } from 'svelte';
	onDestroy(() => {
		if (imageURL.startsWith('blob:')) {
			URL.revokeObjectURL(imageURL);
		}
	});

	function triggerFileInput() {
		fileInput.click();
	}

	// function deleteThumbnail() {
	// 	$formData.Thumbnail = undefined; // TODO: Change to default
	// }

	let priceValue = $formData.Price || 0;

	function handleInput(event) {
		const value = event.target.value;
		priceValue = value === '' || value < 0 ? 0 : +value;

		$formData.Price = value === '' ? 0 : +value;
	}

	const carta = new Carta({
		extensions: [emoji(), code()],
		disableIcons: ['quote', 'taskList', 'code']
	});

	const MaxTitleLength: number = formSchema.shape.Title._def.checks[1].value;
	const MaxShortDescriptionLength = formSchema.shape.ShortDescription._def.checks[1].value;
	const MaxDescriptionLength = formSchema.shape.Description._def.checks[1].value;
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
					on:input={(e) => ($formData.Thumbnail = e.currentTarget.files?.item(0))}
					on:change={handleFileChange}
				/>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<div
							class="ml-2 h-[200px] w-[320px] overflow-hidden rounded-md border border-gray-200 bg-neutral-400"
						>

							<img src={imageURL} alt={course.Title} class="h-full w-full object-cover" />
						</div>

						<Button variant="outline" class="absolute bottom-0 left-0 ml-0 px-2">
							<IconPencil stroke={1.75} class="size-5" />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Item
								on:click={triggerFileInput}>Змінити обкладинку</DropdownMenu.Item>
<!--							<DropdownMenu.Item-->
<!--								disabled={session.User.ProfilePic !== undefined}-->
<!--								on:click={deleteThumbnail}>Видалити обкладинку</DropdownMenu.Item-->
<!--							>-->
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
			<div class="mb-1 flex items-center justify-between">
				<Form.Label>Короткий опис курсу</Form.Label>
				<Form.Description class="text-xs text-gray-500">
					{$formData.Title.length}/{MaxTitleLength}
				</Form.Description>
			</div>
			<Input maxlength={MaxTitleLength} placeholder={course.Title} {...attrs} bind:value={$formData.Title} />
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Field {form} name="ShortDescription">
		<Form.Control let:attrs>
			<div class="mb-1 flex items-center justify-between">
				<Form.Label>Короткий опис курсу</Form.Label>
				<Form.Description class="text-xs text-gray-500">
					{$formData.ShortDescription.length}/{MaxShortDescriptionLength}
				</Form.Description>
			</div>
			<Textarea
				maxlength={MaxShortDescriptionLength}
				{...attrs}
				placeholder={course.ShortDescription}
				class="max-h-36 resize-y"
				bind:value={$formData.ShortDescription}
			/>
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Field {form} name="Description">
		<Form.Control let:attrs>
			<div class="mb-1 flex items-center justify-between">
				<Form.Label>Повний опис курсу</Form.Label>
				<Form.Description class="text-xs text-gray-500">
					{$formData.Description.length}/{MaxDescriptionLength}
				</Form.Description>
			</div>
			<CartaEditor bind:value={$formData.Description} mode="tabs" theme="editor" {carta} />
			<input type="hidden" {...attrs} bind:value={$formData.Description} />
			<!--			<Textarea-->
<!--				maxlength={MaxDescriptionLength}-->
<!--				{...attrs}-->
<!--				placeholder={course.Description}-->
<!--				class="max-h-36 resize-y"-->
<!--				bind:value={$formData.Description}-->
<!--			/>-->
		</Form.Control>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Field {form} name="Price">
		<Form.Control let:attrs>
			<Form.Label>Ціна</Form.Label>
			<div class="flex w-32 items-center gap-3">
				<Input
					type="number"
					min="0"
					placeholder={course.Price.toString()}
					{...attrs}
					bind:value={priceValue}
					on:input={handleInput}
				/>
				<p class="text-xl font-normal">₴</p>
			</div>
		</Form.Control>
		<Form.Description class="mt-1 text-sm text-gray-500">
			Уведіть 0, якщо бажаєте зробити курс безкоштовним.
		</Form.Description>
		<Form.FieldErrors class="font-normal" />
	</Form.Field>

	<Form.Button type="submit" class="mt-1 w-min flex-grow">Зберегти зміни</Form.Button>

	<div class="mt-3">
		{#if browser}
			<SuperDebug data={$formData} />
		{/if}
	</div>
</form>
