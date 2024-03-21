<script lang="ts">
	import { Button } from '$lib/components/shadcn-ui/button';
	import { toast } from 'svelte-sonner';
	import { Badge } from '$lib/components/shadcn-ui/badge';
	import { IconCertificate, IconClock, IconTargetArrow } from '@tabler/icons-svelte';
	import * as Card from '$lib/components/shadcn-ui/card';
	import { Reload } from 'radix-icons-svelte';
	import { goto } from '$app/navigation';
	import { AspectRatio } from '$lib/components/shadcn-ui/aspect-ratio';

	export let course: Course;

</script>

<div class="text-start size-72">
	<Card.Root
		class="border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
	>
		<Card.Header class="grid gap-3 items-start justify-start">

			<AspectRatio ratio={1280 / 720} class="bg-muted">
				<img
					src={course.Thumbnail}
					alt={course.Title}
					class="h-full w-full rounded-md object-cover"
				/>
			</AspectRatio>
			<div>
				<p class="font-medium mb-1">{course.Title}</p>
				<Button
					variant="link"
					class="p-0 pt-0 font-normal text-muted-foreground"
					href="/users/{course.Instructor.ID}"
				>
					{course.Instructor.FirstName + ' ' + course.Instructor.LastName}
				</Button>
			</div>
		</Card.Header>
	</Card.Root>
</div>