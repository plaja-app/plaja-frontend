<script lang="ts">
	import type { PageData } from './$types';
	import LogInForm from '$lib/components/forms/LogInForm.svelte';
	export let data: PageData;
</script>

<div
	class="center container relative hidden h-[700px] flex-col items-center justify-center md:grid lg:max-w-none lg:px-0"
>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold">Увійти в акаунт</h1>
			</div>

			<LogInForm data={data.form} />

			<p class="px-8 text-center text-sm text-muted-foreground">
				Виконуючи вхід, ви погоджуєтеся з нашими {' '}
				<a href="/terms" class="underline underline-offset-4 hover:text-primary">
					Правилами використання
				</a>{' '}
				та{' '}
				<a href="/privacy" class="underline underline-offset-4 hover:text-primary">
					Політикою конфіденційності
				</a>
			</p>
		</div>
	</div>
</div>
