<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { EnvelopeClosed, Heart } from 'radix-icons-svelte';
	import { HeartFilled } from 'radix-icons-svelte';
	import { toast } from "svelte-sonner";
	import CourseCard from '$lib/components/CourseCard.svelte';
	export let course: Course;

	let inWishlist = false;

	function toggleWishlist() {
		inWishlist = !inWishlist;
	}

</script>

<div class="w-1/3 text-center ">
	<Card.Root class="border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
		<Card.Header class="grid gap-5">
				<div class="w-[325px] h-[200px] bg-indigo-200 rounded-md overflow-hidden">
					<img
						src={course.Thumbnail}
						alt={course.Title}
						class="w-full h-full object-cover"
					/>
				</div>

				<div>
				<Card.Title class="text-2xl font-medium">
					{#if course.Price !== 0}
						{course.Price} ₴
					{:else}
						Безкоштовно
					{/if}
				</Card.Title>
				</div>
		</Card.Header>
		<Card.Content class="grid gap-2">
			<Button class="h-11 flex-grow">Придбати</Button>

			<Button
				variant="outline"
				class="h-11 flex-grow gap-2"
				on:click={() => {
					toggleWishlist();

					if (inWishlist) {
						toast.info("Курс додано до списку бажань.");
					} else {
						toast.info("Курс видалено зі списку бажань.");
					}
				}}
			>
				{#if inWishlist}
					<HeartFilled />
					<p>У списку бажаного</p>
				{:else}
					<Heart />
					<p>Додати до бажаного</p>
				{/if}
			</Button>

			<Button
				variant="outline"
				class="h-11 flex-grow gap-2"
			>
				<EnvelopeClosed />
				<p>Подарувати</p>
			</Button>

		</Card.Content>
		<Card.Footer class="place-content-center">
			<div class="w-3/4">
				<p class="text-sm text-muted-foreground">Після придбання курс залишиться у вас назавжди</p>
			</div>
		</Card.Footer>
	</Card.Root>
</div>