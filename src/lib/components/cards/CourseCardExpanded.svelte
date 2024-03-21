<script lang="ts">
	import { Button } from '$lib/components/shadcn-ui/button';
	import { toast } from 'svelte-sonner';
	import { Badge } from '$lib/components/shadcn-ui/badge';
	import { IconCertificate, IconClock, IconTargetArrow } from '@tabler/icons-svelte';
	import * as Card from '$lib/components/shadcn-ui/card';
	import { Reload } from 'radix-icons-svelte';
	import { goto } from '$app/navigation';

	export let course: Course;
	export let isEnrolled: boolean;
	let loading = false;

	async function handleSubmit(event) {
		event.preventDefault();
		loading = true;
		const formData = {
			CourseID: course.ID,
		};

		const response = await fetch('/api/v1/enrollments/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(formData)
		});

		if (response.ok) {
			setTimeout(() => {
				toast.success("Курс додано до бібліотеки!");
				loading = false;
				isEnrolled = true;
			}, 1250);
		} else {
			toast.error("Помилка!");
			loading = false;
		}
	}

	function navigateToLearn() {
		goto(`/courses/${course.ID}/learn`);
	}
</script>

<div class="text-center">
	<Card.Root
		class="border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
	>
		<Card.Header class="grid gap-5">
			<div
				class="h-[200px] w-[325px] overflow-hidden rounded-md border border-gray-200 bg-neutral-400"
			>
				<img src={course.Thumbnail} alt={course.Title} class="h-full w-full object-cover" />
			</div>

			{#if !isEnrolled}
			<div>
				<Card.Title class="text-2xl font-medium">
					{#if course.Price !== 0}
						{course.Price} ₴
					{:else}
						Безкоштовно
					{/if}
				</Card.Title>
			</div>
				{/if}
		</Card.Header>
		<Card.Content class="grid gap-2">
<!--			<form method="POST" use:enhance>-->
			{#if !isEnrolled}
				{#if !loading}
					{#if course.Price !== 0}
						<Button class="h-11 flex-grow" on:click={handleSubmit}>Придбати</Button>
					{:else}
						<Button class="h-11 flex-grow" on:click={handleSubmit}>Записатися</Button>
					{/if}
				{:else}
					<Button class="h-11" disabled>
						<Reload class="mr-2 h-4 w-4 animate-spin" />
						{#if course.Price !== 0} Записатися {:else} Записатися {/if}
					</Button>
				{/if}
			{:else}
				<Button class="h-11 flex-grow" variant="outline" on:click={navigateToLearn}>Проходити</Button>
			{/if}

		</Card.Content>
		<Card.Footer class="place-content-center flex flex-col gap-4">

			<div class="w-3/4">
				{#if course.Price !== 0}
					<p class="text-sm text-muted-foreground">Після придбання курс залишиться у вас назавжди.</p>
				{:else}
					<p class="text-sm text-muted-foreground">Курс залишиться у вашій бібліотеці назавжди.</p>
				{/if}
			</div>

		<div class="flex flex-row gap-2 place-content-center">
			<Badge variant="outline">
				<div class="flex gap-1 p-1">
					<IconClock stroke={1.5} class="h-4 w-4 text-muted-foreground" />
					<p class="font-normal text-muted-foreground">{course.Length} хв</p>
				</div>
			</Badge>

			<Badge variant="outline">
				<div class="flex gap-1 p-1">
					<IconTargetArrow stroke={1.5} class="h-4 w-4 text-muted-foreground" />
					<p class="font-normal text-muted-foreground">{course.Level.Title}</p>
				</div>
			</Badge>

			{#if course.HasCertificate}
				<Badge variant="outline">
					<div class="flex gap-1 p-1">
						<IconCertificate stroke={1.5} class="h-4 w-4 text-muted-foreground" />
						<p class="font-normal text-muted-foreground">Сертифікат</p>
					</div>
				</Badge>
			{/if}
		</div>
		</Card.Footer>
	</Card.Root>
</div>
