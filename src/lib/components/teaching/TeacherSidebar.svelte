<script lang="ts">
	import { cn } from "$lib/utils";
	import { Button } from '$lib/components/shadcn-ui/button';
	import { Separator } from '$lib/components/shadcn-ui/separator';
	import { IconChartCandle as Stats } from '@tabler/icons-svelte';
	import { IconBooks as Courses } from '@tabler/icons-svelte';
</script>

<div class="ml-4">
	<div class="mx-2 z-50 my-4">
		<p class="ml-4 mb-3 text-xl font-medium">Викладання</p>

		<div class="grid gap-1">
			<Button variant="ghost" class="w-full justify-start">
				<Courses stroke={1.5} class="size-5 mr-2" />
				Мої курси
			</Button>

			<Button variant="ghost" class="w-full justify-start">
				<Stats stroke={1.5} class="size-5 mr-2" />
				Статистика
			</Button>
		</div>
	</div>
</div>