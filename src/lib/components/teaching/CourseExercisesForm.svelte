<script lang="ts">
	import { Button } from '$lib/components/shadcn-ui/button/index';
	import * as Card from '$lib/components/shadcn-ui/card';
	import * as Form from '$lib/components/shadcn-ui/form/index';
	import * as Accordion from '$lib/components/shadcn-ui/accordion/index';
	import * as ContextMenu from '$lib/components/shadcn-ui/context-menu';

	import { IconHourglassHigh } from '@tabler/icons-svelte';
	import { IconClock } from '@tabler/icons-svelte';
	import { IconExclamationCircle } from '@tabler/icons-svelte';
	import { IconTrash } from '@tabler/icons-svelte';
	import { Input } from '$lib/components/shadcn-ui/input';
	import { Textarea } from '$lib/components/shadcn-ui/textarea';
	import SuperDebug, { type Infer, setError, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import {
		formSchema,
		type FormSchema
	} from '../../../routes/teaching/courses/edit/[id]/exercises/schema';
	import { browser } from '$app/environment';
	import CheckboxesGroup from '$lib/components/other/CheckboxGroup.svelte';
	import { Carta, CartaEditor } from 'carta-md';
	import { attachment } from '@cartamd/plugin-attachment';
	import { emoji } from '@cartamd/plugin-emoji';
	import { code } from '@cartamd/plugin-code';
	import '$lib/styles/editor.scss';
	import 'carta-md/light.css';
	import '@cartamd/plugin-code/default.css';

	export let data: SuperValidated<Infer<FormSchema>>;
	export let session: Session;

	export let exercises: CourseExercise[]

	const form = superForm(data, {
		validators: zodClient(formSchema),
		dataType: 'json'
	});

	const { form: formData, errors, enhance } = form;

	function addExercise() {
		console.log(formData);
		formData.update((currentData) => ({
			...currentData,
			Exercises: [...(currentData.Exercises || []), { Title: '', Content: '' }]
		}));
	}

	function removeExercise(index: number) {
		formData.update((currentData) => {
			const newExercises = currentData.Exercises ? [...currentData.Exercises] : [];
			newExercises.splice(index, 1);
			return { ...currentData, Exercises: newExercises };
		});
	}

	const carta = new Carta({
		extensions: [
			// attachment({
			// 	async upload() {
			// 		return 'some-url-from-server.xyz';
			// 	}
			// }),
			emoji(),
			code()
		],
		disableIcons: ['quote', 'taskList']
	});

	const MaxTitleLength: number = formSchema.shape.Exercises.element.shape.Title._def.checks[1].value
	const MaxContentLength: number = formSchema.shape.Exercises.element.shape.Content._def.checks[1].value
</script>

<div class="flex flex-row justify-between">
	<p class="text-xl font-medium">Завдання</p>
	<Button type="button" variant="outline" class="mb-2 w-min" on:click={addExercise}
	>Додати завдання</Button
	>
</div>
<form method="POST" use:enhance class="flex flex-col">
	<Accordion.Root multiple>
		<Form.Field {form} name="Exercises">
			<Form.Control let:attrs>
				{#each $formData.Exercises as exercise, index}
					<Accordion.Item value={`item-${index}`}>
						<ContextMenu.Root>
							<ContextMenu.Trigger>
								<Accordion.Trigger>
									<Button variant="ghost" class="me-2 flex w-full items-center justify-start pb-2 font-normal">
										<p class="font-semibold">Завдання {index + 1}</p>
										{#if exercise.Title !== ''}
											<p class="font-semibold">:&nbsp;</p>
											<p>
												{#if exercise.Title.length > MaxTitleLength}
													<div class="flex flex-row justify-between">
													{exercise.Title.substring(0, MaxTitleLength)}
													</div>
												{:else}
													{exercise.Title}
												{/if}
											</p>
										{/if}
										{#if $errors.Exercises?.[index]?.Title || $errors.Exercises?.[index]?.Content}
											<IconExclamationCircle stroke={1.5} class="ml-1 size-5 text-red-600" />
										{/if}
									</Button>
								</Accordion.Trigger>
								<ContextMenu.Content class="w-32">
									<ContextMenu.Item
										inset
										class="flex items-center justify-between pl-2"
										on:click={() => removeExercise(index)}
									>
										<IconTrash stroke={1.5} class="size-5 text-red-600" />
										<p class="pr-1.5 text-red-600">Видалити</p>
									</ContextMenu.Item>
								</ContextMenu.Content>
							</ContextMenu.Trigger>
						</ContextMenu.Root>
						<Accordion.Content>
							<Card.Root class="mb-6 rounded-md shadow-none bg-secondary">
								<Card.Content class="pt-6">

									<Form.Field {form} name={`Exercises[${index}].Title`}>
										<div class="mb-1 flex items-center justify-between">
											<Form.Label
												class={$errors.Exercises?.[index]?.Title ? "text-red-600" : ""}
											>
												Назва
											</Form.Label>
											<Form.Description class="text-xs text-gray-500">
												{exercise.Title.length}/{MaxTitleLength}
											</Form.Description>
										</div>
										<Input
											data-invalid={$errors.Exercises?.[index]?.Title}
											{...attrs} bind:value={exercise.Title} maxlength={MaxTitleLength} />

										{#if $errors.Exercises?.[index]?.Title}
											<span class="font-normal text-red-600">{ $errors.Exercises?.[index]?.Title}</span>
										{/if}
									</Form.Field>
									<Form.Field {form} name={`Exercises[${index}].Content`}>
										<div class="mb-1 flex items-center justify-between">
											<Form.Label
												class={$errors.Exercises?.[index]?.Content ? "text-red-600" : ""}
											>
												Вміст
											</Form.Label>
											<div class="flex flex-row gap-2">
												<p class="text-xs text-gray-500 flex flex-row gap-0.5 mr-1.5">
													<IconClock stroke={1.5} class="size-4 text-gray-500" />
													~{Math.floor(exercise.Content.split(/\s+/).filter(Boolean).length / 200)} хв
												</p>
												<Form.Description class="text-xs text-gray-500">
													{exercise.Content.length}/{MaxContentLength}
												</Form.Description>
											</div>
										</div>

										<CartaEditor {...attrs} data-invalid={$errors.Exercises?.[index]?.Content} bind:value={exercise.Content} mode="tabs" theme="editor" {carta} />
<!--										<input-->
<!--											type="hidden"-->
<!--											bind:value={exercise.Content}-->
<!--											data-invalid={$errors.Exercises?.[index]?.Content}-->
<!--										/>-->

										{#if $errors.Exercises?.[index]?.Content}
											<span class="font-normal text-red-600">{ $errors.Exercises?.[index]?.Content}</span>
										{/if}
									</Form.Field>
								</Card.Content>
							</Card.Root>
						</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Form.Control>
			<Form.FieldErrors class="font-normal" />
		</Form.Field>
	</Accordion.Root>
	<Button type="submit" class="w-min mt-1">Зберегти</Button>

	<div class="mt-3">
		{#if browser}
			<SuperDebug data={$formData} />
		{/if}
	</div>
</form>