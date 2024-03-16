<script lang="ts">
	import * as Card from '$lib/components/shadcn-ui/card';
	import { Button } from '$lib/components/shadcn-ui/button';
	import { EnvelopeClosed, Heart } from 'radix-icons-svelte';
	import { HeartFilled } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';
	import CourseCard from '$lib/components/cards/CourseCard.svelte';
	import { Badge } from '$lib/components/shadcn-ui/badge';
	import { IconCertificate, IconClock, IconTargetArrow } from '@tabler/icons-svelte';
	export let course: Course;

	let inWishlist = false;

	function toggleWishlist() {
		inWishlist = !inWishlist;
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
			{#if course.Price !== 0}
				<Button class="h-11 flex-grow">Придбати</Button>
			{:else}
				<Button class="h-11 flex-grow">Вивчати</Button>
			{/if}

<!--			<Button-->
<!--				variant="outline"-->
<!--				class="h-11 flex-grow gap-2"-->
<!--				on:click={() => {-->
<!--					toggleWishlist();-->

<!--					if (inWishlist) {-->
<!--						toast.info('Курс додано до списку бажань.');-->
<!--					} else {-->
<!--						toast.info('Курс видалено зі списку бажань.');-->
<!--					}-->
<!--				}}-->
<!--			>-->
<!--				{#if inWishlist}-->
<!--					<HeartFilled />-->
<!--					<p>У списку бажаного</p>-->
<!--				{:else}-->
<!--					<Heart />-->
<!--					<p>Додати до бажаного</p>-->
<!--				{/if}-->
<!--			</Button>-->

<!--			<Button variant="outline" class="h-11 flex-grow gap-2">-->
<!--				<EnvelopeClosed />-->
<!--				<p>Подарувати</p>-->
<!--			</Button>-->
<!--			-->
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
