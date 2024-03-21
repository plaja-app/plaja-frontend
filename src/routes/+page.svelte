<script lang="ts">
	import { Button } from '$lib/components/shadcn-ui/button/index';
	import { Rocket } from 'radix-icons-svelte';
	import { IconArrowRight } from '@tabler/icons-svelte';
</script>

<div
	class="center container relative flex-col items-center justify-center sm:h-[600px] md:grid lg:max-w-none lg:px-0"
>
	<div class="lg:p-8">
		<div
			class="mx-auto flex w-full flex-col content-center items-center justify-center space-y-6 "
		>
			<div class="flex flex-col place-items-center space-y-2 text-center">
				<h1 class="text-5xl font-semibold">Запал для ваших знань</h1>
				<p class="text-xl text-muted-foreground sm:w-[500px]">
					Нова українська навчальна платформа для опанування IT-технологій
				</p>
			</div>
			<Button href="/courses" class="h-11 px-5">
				Перейти до курсів
				<IconArrowRight stroke={2.5} class="ml-1 w-4" />
			</Button>
		</div>
	</div>
</div>
<!--<div class="grid grid-cols-3 mx-32 place-items-center">-->
<!--	<div class="max-w-[240px] text-center">-->
<!--		<p class="font-medium text-2xl mb-1">Зручна модель поширення контенту</p>-->
<!--		<p class="text-muted-foreground">Наша платформа відкрита для ваших курсів</p>-->
<!--	</div>-->
<!--	<div class="max-w-[240px] text-center">-->
<!--		<p class="font-medium text-2xl mb-1">Зручна модель поширення контенту</p>-->
<!--		<p class="text-muted-foreground">Наша платформа відкрита для ваших курсів</p>-->
<!--	</div>-->
<!--	<div class="max-w-[240px] text-center">-->
<!--		<p class="font-medium text-2xl mb-1">Зручна модель поширення контенту</p>-->
<!--		<p class="text-muted-foreground">Наша платформа відкрита для ваших курсів</p>-->
<!--	</div>-->
<!--</div>-->

