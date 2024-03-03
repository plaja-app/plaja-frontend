<script lang="ts">
	import * as Card from '$lib/components/shadcn-ui/card';
	import { Button } from '$lib/components/shadcn-ui/button';
	import { IconClock } from '@tabler/icons-svelte';
	import { IconUsers } from '@tabler/icons-svelte';
	import { Clock } from 'radix-icons-svelte';
	import { IconCertificate } from '@tabler/icons-svelte';
	import { Badge } from '$lib/components/shadcn-ui/badge';
	import { IconStar } from '@tabler/icons-svelte';
	import { IconStarFilled } from '@tabler/icons-svelte';
	import { IconTargetArrow } from '@tabler/icons-svelte';

	export let course: Course;

</script>

<Card.Root class="shadow-sm border-b border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 transition-all ease-in-out duration-175 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer"
					 on:click={() => {
							 if (!window.getSelection()?.toString()) {
								 location.href = `courses/${course.ID}`
							 }}
						 }>

	<div class="columns-2 flex">
		<div class="p-4">
			<div class="w-[240px] h-[150px] bg-neutral-400 rounded-md overflow-hidden">
				<img
					src={course.Thumbnail}
					alt={course.Title}
					class="w-full h-full object-cover"
				/>
			</div>
		</div>

		<div class="grow">
			<Card.Header class="flex">
				<div class="flex flex-row justify-between">
					<Card.Title class="text-xl">{course.Title}</Card.Title>
					<p class="text-xl font-semibold">
						{#if course.Price !== 0}
							{course.Price} ₴
						{:else}
							Безкоштовно
						{/if}

					</p>
				</div>

				<Card.Description class="place-self-start">
					<Button variant="link" class="p-0 h-1 font-normal text-muted-foreground" href="/users/{course.Instructor.ID}">
						{course.Instructor.FirstName + " "  + course.Instructor.LastName }
					</Button>
				</Card.Description>
			</Card.Header>

			<Card.Content class="w-3/4">
				<p>{course.ShortDescription}</p>
			</Card.Content>

			<Card.Footer class="justify-between">
				<div class="flex gap-2">
<!--					<Badge variant="outline">-->
<!--						<div class="p-1 flex gap-1.5">-->
<!--							<div class="flex gap-0.5">-->
<!--								<IconStarFilled stroke={1.5} class="h-4 w-4 text-muted-foreground" />-->
<!--								<IconStarFilled stroke={1.5} class="h-4 w-4 text-muted-foreground" />-->
<!--								<IconStarFilled stroke={1.5} class="h-4 w-4 text-muted-foreground" />-->
<!--								<IconStarFilled stroke={1.5} class="h-4 w-4 text-muted-foreground" />-->
<!--								<IconStar stroke={1.5} class="h-4 w-4 text-muted-foreground" />-->
<!--							</div>-->
<!--							<p class="font-normal text-muted-foreground">3.8 (25 тис.)</p>-->
<!--						</div>-->
<!--					</Badge>-->

<!--					<Badge variant="outline">-->
<!--						<div class="p-1 flex gap-1">-->
<!--							<IconUsers stroke={1.5} class="h-4 w-4 text-muted-foreground" />-->
<!--							<p class="font-normal text-muted-foreground">27 тис.</p>-->
<!--						</div>-->
<!--					</Badge>-->


					<Badge variant="outline">
						<div class="p-1 flex gap-1">
							<IconClock stroke={1.5} class="h-4 w-4 text-muted-foreground" />
							<p class="font-normal text-muted-foreground">35 год.</p>
						</div>
					</Badge>

					<Badge variant="outline">
						<div class="p-1 flex gap-1">
							<IconTargetArrow stroke={1.5} class="h-4 w-4 text-muted-foreground" />
							<p class="font-normal text-muted-foreground">{course.Level.Title}</p>
						</div>
					</Badge>

					{#if course.HasCertificate}
						<Badge variant="outline">
							<div class="p-1 flex gap-1">
								<IconCertificate stroke={1.5} class="h-4 w-4 text-muted-foreground" />
								<p class="font-normal text-muted-foreground">Сертифікат</p>
							</div>
						</Badge>
					{/if}
				</div>

				<Button>Записатися</Button>
			</Card.Footer>
		</div>
	</div>
</Card.Root>