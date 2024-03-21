<script lang="ts">
	import { Button } from '$lib/components/shadcn-ui/button';
	import * as Card from '$lib/components/shadcn-ui/card';
	import { Progress } from '../shadcn-ui/progress';
	import { onMount } from "svelte";
	import { IconCertificate } from '@tabler/icons-svelte';

	export let course: Course;

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	let value = 13;
	onMount(() => {
		const timer = setTimeout(() => (value = getRandomInt(101)), 500);
		return () => clearTimeout(timer);
	});
</script>

<a href="/courses/{course.ID}/learn">
<Card.Root
	class="duration-175 transform cursor-pointer border-b border-border/40 bg-background/95 shadow-sm backdrop-blur-sm transition-all ease-in-out hover:-translate-y-1 hover:shadow-lg supports-[backdrop-filter]:bg-background/60">
	<Card.Header class="flex flex-col items-start">
		<div>
			<p class="font-medium">{course.Title}</p>

			<Button
				variant="link"
				class="p-0 pt-0 h-min pb-3 font-normal text-muted-foreground"
				href="/users/{course.Instructor.ID}"
			>
				{course.Instructor.FirstName + ' ' + course.Instructor.LastName}
			</Button>
		</div>

		<div class="flex items-center gap-3 w-full">
			<Progress {value} max={100} class="flex-grow h-1" />

			{#if course.HasCertificate}
				<div class="flex-shrink-0 text-muted-foreground">
						<IconCertificate stroke={1.5} class="h-5 w-5" />
				</div>
			{/if}
		</div>
		<p class="text-muted-foreground text-sm">{value}% завершено</p>
	</Card.Header>
</Card.Root>
</a>