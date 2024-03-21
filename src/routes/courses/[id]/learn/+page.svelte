<script lang="ts">
	import * as Resizable from "$lib/components/shadcn-ui/resizable/index";
	import type { PageData } from './$types';
	import { Button } from '$lib/components/shadcn-ui/button';
	import { Checkbox } from '$lib/components/shadcn-ui/checkbox';

	export let data: PageData;
</script>

<Resizable.PaneGroup
	direction="horizontal"
	class="min-h-[700px] w-full"
>
	<Resizable.Pane minSize={15} maxSize={30} defaultSize={20}>
	<div class="flex h-full p-4 flex-col">
		<span class="mb-3 ml-5 text-xl font-medium">Завдання</span>
		<div>
			{#each data.exercises as exercise}
				<div class="grid grid-cols-2 text-start">
					<Checkbox></Checkbox>
					<Button variant="ghost" class="mb-2">{exercise.Title}</Button>
				</div>
			{/each}
		</div>
	</div>
</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane minSize={15} defaultSize={80}>
		<div class="flex h-full p-4">
			<span class="mb-3 ml-5 text-xl font-medium">Зміст</span>
		</div>
	</Resizable.Pane>
</Resizable.PaneGroup>
