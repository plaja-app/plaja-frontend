<script lang="ts">
	import { Button } from '$lib/components/shadcn-ui/button/index';
	import { AspectRatio } from '$lib/components/shadcn-ui/aspect-ratio';
</script>

<div class="grid px-32 py-8 mx-auto xl:gap-0 lg:py-16 lg:grid-cols-12 grid-cols-[min-content_1fr]">

	<div class="mr-auto shrink place-self-center col-span-6">
		<div class="pb-5">
			<h1 class="text-4xl font-semibold pb-2">Несіть вогонь</h1>
			<p class="text-xl text-muted-foreground sm:w-[500px]">
				Поділіться своїми знаннями зі світом, створивши новий курс із навчальними матеріалами
			</p>
		</div>
		<div class="flex grid-cols-2 grid-rows-1 gap-2">
			<Button href="/teaching/courses/create" class="h-11 shrink px-5">
				Створити курс
			</Button>

			<Button variant="outline" href="/courses/5" class="h-11 shrink px-5">
				Довідка
			</Button>
		</div>

	</div>

	<div class="w-[590px] h-[380px] bg-indigo-200 rounded-md overflow-hidden">
		<img
			src="https://plus.unsplash.com/premium_photo-1677109899422-e81b8a9f97b0?q=80&w=2820&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
			alt="Flame"
			class="h-full w-full rounded-md object-cover"
		/>
	</div>

</div>