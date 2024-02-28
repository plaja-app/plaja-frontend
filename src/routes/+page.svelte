<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import { Rocket } from 'radix-icons-svelte';
	import { ArrowRight } from 'radix-icons-svelte';
</script>

<div class="container relative hidden flex-col items-center justify-center center md:grid lg:max-w-none lg:px-0 sm:h-[550px]">
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col content-center items-center justify-center space-y-6 sm:w-[550px]">
			<div class="flex flex-col space-y-2 text-center place-items-center sm:w-[550px]">
				<h1 class="text-4xl font-semibold">Запал для ваших знань</h1>
				<p class="text-xl text-muted-foreground sm:w-[500px]">
					Нова українська навчальна платформа для опанування сучасних IT-технологій
				</p>
			</div>
			<Button href="/courses" class="h-11 px-5">
				Перейти до курсів
				<ArrowRight class="ml-1 h- w-4" />
			</Button>
		</div>
	</div>
</div>