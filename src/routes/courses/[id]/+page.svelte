<script lang="ts">
	import type { PageData } from './$types';
	import CourseCardExpanded from '$lib/components/cards/CourseCardExpanded.svelte';
	import UserCard from '$lib/components/cards/UserCard.svelte';
	import { Button } from '$lib/components/shadcn-ui/button';
	import Confetti from '$lib/components/other/Confetti.svelte';
	import { Carta, CartaViewer } from 'carta-md';
	import { BackendURL } from '$lib';

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

	const carta = new Carta({

	});
</script>

{#if showConfetti}
	<Confetti timeout={5000}></Confetti>
{/if}

<div class="flex flex-col md:flex-row justify-between px-40 py-10">
	<div class="max-w-screen-sm">
		<div class="grid place-items-start gap-3.5">
			<p class="text-3xl font-medium">{course.Title}</p>
			<p class="font-normal text-muted-foreground">{course.ShortDescription}</p>
			<div class="py-2 mb-3">
				<UserCard user={course.Instructor} tag="Інструктор" />
			</div>
			<div>
				<p class="font-medium text-xl mb-1">Опис</p>
				<CartaViewer carta={carta} value={course.Description} />
			</div>
		</div>
	</div>

	<div class="sticky top-20 -mt-10 z-10 pt-10 self-start">
		<CourseCardExpanded {course} />
	</div>
</div>


