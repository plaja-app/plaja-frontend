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

<div class="w-1/3 text-center">
	<Card.Root>
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

<!--<Card.Root class="shadow-sm">-->
<!--	<div class="columns-2 flex">-->
<!--		<div class="p-4">-->
<!--			<div class="w-[240px] h-[150px] bg-indigo-200 rounded-md overflow-hidden">-->
<!--				<img-->
<!--					src={course.Thumbnail}-->
<!--					alt={course.Title}-->
<!--					class="w-full h-full object-cover"-->
<!--				/>-->
<!--			</div>-->
<!--		</div>-->

<!--			<Card.Header class="flex">-->
<!--				<div class="flex flex-row justify-between">-->
<!--					<Card.Title class="text-xl">{course.Title}</Card.Title>-->
<!--					<p class="text-xl font-semibold">-->
<!--						{#if course.Price !== 0}-->
<!--							{course.Price} ₴-->
<!--						{:else}-->
<!--							Безкоштовно-->
<!--						{/if}-->

<!--					</p>-->
<!--				</div>-->

<!--				<Card.Description class="place-self-start">-->
<!--					<Button variant="link" class="p-0 h-1 font-normal text-muted-foreground" href="/user/{course.Instructor.ID}">-->
<!--						{course.Instructor.FirstName + " "  + course.Instructor.LastName }-->
<!--					</Button>-->
<!--				</Card.Description>-->
<!--			</Card.Header>-->

<!--			<Card.Content class="w-3/4">-->
<!--				<p>{course.ShortDescription}</p>-->
<!--			</Card.Content>-->

<!--			<Card.Footer class="justify-between">-->
<!--				<div class="flex gap-2">-->
<!--					<Badge variant="outline">-->
<!--						<div class="p-1 flex gap-1.5">-->
<!--							<div class="flex gap-0.5">-->
<!--								<StarFilled class="h-4 w-4 text-muted-foreground" />-->
<!--								<StarFilled class="h-4 w-4 text-muted-foreground" />-->
<!--								<StarFilled class="h-4 w-4 text-muted-foreground" />-->
<!--								<StarFilled class="h-4 w-4 text-muted-foreground" />-->
<!--								<Star class="h-4 w-4 text-muted-foreground" />-->
<!--							</div>-->
<!--							<p class="font-normal text-muted-foreground">3.8 (25 тис.)</p>-->
<!--						</div>-->
<!--					</Badge>-->

<!--					<Badge variant="outline">-->
<!--						<div class="p-1 flex gap-1">-->
<!--							<Person class="h-4 w-4 text-muted-foreground" />-->
<!--							<p class="font-normal text-muted-foreground">27 тис.</p>-->
<!--						</div>-->
<!--					</Badge>-->


<!--					<Badge variant="outline">-->
<!--						<div class="p-1 flex gap-1">-->
<!--							<Clock class="h-4 w-4 text-muted-foreground" />-->
<!--							<p class="font-normal text-muted-foreground">35 год.</p>-->
<!--						</div>-->
<!--					</Badge>-->

<!--					<Badge variant="outline">-->
<!--						<div class="p-1 flex gap-1">-->
<!--							<Crosshair2 class="h-4 w-4 text-muted-foreground" />-->
<!--							<p class="font-normal text-muted-foreground">{course.Level.Title}</p>-->
<!--						</div>-->
<!--					</Badge>-->

<!--					{#if course.HasCertificate}-->
<!--						<Badge variant="outline">-->
<!--							<div class="p-1 flex gap-1">-->
<!--								<IdCard class="h-4 w-4 text-muted-foreground" />-->
<!--								<p class="font-normal text-muted-foreground">Сертифікат</p>-->
<!--							</div>-->
<!--						</Badge>-->
<!--					{/if}-->
<!--				</div>-->

<!--				<Button>Записатися</Button>-->
<!--			</Card.Footer>-->
<!--		</div>-->
<!--</Card.Root>-->