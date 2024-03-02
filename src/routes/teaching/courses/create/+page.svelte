<script lang="ts">
	import { Separator } from '$lib/components/shadcn-ui/separator';
	import type { PageData } from "./$types";
	import CreateCourseForm from '$lib/components/forms/CreateCourseForm.svelte';
	import SignUpForm from '$lib/components/forms/SignUpForm.svelte';
	import { onMount } from 'svelte';

	export let data: PageData;
</script>

<div class="container relative hidden h-[580px] flex-col items-center justify-center center md:grid lg:max-w-none lg:px-0">
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[580px]">
			<div class="flex flex-col space-y-2 text-center place-items-center">
				<h1 class="text-2xl font-semibold">Створити курс</h1>
				<div class="w-4/5">
					<p class="text-muted-foreground">Перед початком роботи над наповненням курсу надайте базову інформацію</p>
				</div>

			</div>
			<CreateCourseForm data={data.form} categories={data.categories} />
		</div>
	</div>
</div>