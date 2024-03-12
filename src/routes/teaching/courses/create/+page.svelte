<script lang="ts">
	import type { PageData } from './$types';
	import CreateCourseForm from '$lib/components/teaching/CreateCourseForm.svelte';

	export let data: PageData;
</script>

<div
	class="center container relative hidden h-[780px] flex-col items-center justify-center md:grid lg:max-w-none lg:px-0"
>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[580px]">
			<div class="flex flex-col place-items-center space-y-2 text-center">
				<h1 class="text-2xl font-semibold">Створити курс</h1>
				<div class="w-4/5">
					<p class="text-muted-foreground">
						Перед початком роботи над наповненням курсу надайте базову інформацію
					</p>
				</div>
			</div>
			<CreateCourseForm
				categories={data.categories}
				levels={data.levels}
				session={data.locals.session}
				data={data.form}
			/>
		</div>
	</div>
</div>
