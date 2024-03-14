<script lang="ts">
	import type { PageData } from './$types';
	import CourseCardExpanded from '$lib/components/cards/CourseCardExpanded.svelte';
	import UserCard from '$lib/components/cards/UserCard.svelte';
	import { Button } from '$lib/components/shadcn-ui/button';
	import Confetti from '$lib/components/other/Confetti.svelte';

	export let data: PageData;

	$: course = data.course[0] as Course;

	let showConfetti = false;
	const confettiTimeout = 5000;

	function createCertificateAndShowConfetti() {
		showConfetti = true;

		setTimeout(() => {
			showConfetti = false;
		}, confettiTimeout * 2);
	}
</script>

{#if showConfetti}
	<Confetti timeout={5000}></Confetti>
{/if}

<div class="flex columns-2 justify-between px-40 py-20">
	<div>
		<div class="grid place-items-start gap-3.5">
			<p class="text-3xl font-medium">{course.Title}</p>
			<div class="pb-2">
				<UserCard user={course.Instructor} tag="Інструктор" />
			</div>
			<div class="w-1">
				<p class="font-medium">Опис</p>
			</div>
			<Button variant="destructive" on:click={createCertificateAndShowConfetti}
				>Створити сертифікат</Button
			>
		</div>
	</div>

	<CourseCardExpanded {course} />
</div>
