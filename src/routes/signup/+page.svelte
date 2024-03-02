<script lang="ts">
	import type { PageData } from "./$types";
	import SignUpForm from '$lib/components/forms/SignUpForm.svelte';
	export let data: PageData;
</script>

<div class="container relative hidden h-[700px] flex-col items-center justify-center center md:grid lg:max-w-none lg:px-0">
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center place-items-center">
				<h1 class="text-2xl font-semibold">Створити акаунт</h1>
			</div>
			<SignUpForm data={data.form} />
			<p class="px-8 text-center text-sm text-muted-foreground">
				Реєструючи акаунт, ви погоджуєтеся з нашими
				<a href="/terms" class="underline p-0 underline-offset-4 hover:text-primary">
					Правилами використання
				</a>
				та
				<a href="/privacy" class="underline p-0 underline-offset-4 hover:text-primary">
					Політикою конфіденційності
				</a>
			</p>
		</div>
	</div>
</div>