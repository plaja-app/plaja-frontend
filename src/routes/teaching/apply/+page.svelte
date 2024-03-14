<script lang="ts">
	import { Button } from '$lib/components/shadcn-ui/button/index';
	import * as Dialog from '$lib/components/shadcn-ui/dialog';
	import TeachingApplicationForm from '$lib/components/teaching/TeachingApplicationForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div
	class="center container relative flex-col items-center justify-center sm:h-[550px] md:grid lg:max-w-none lg:px-0"
>
	<div class="lg:p-8">
		<div
			class="mx-auto flex w-full flex-col content-center items-center justify-center space-y-6 sm:w-[550px]"
		>
			<div class="flex flex-col place-items-center space-y-2 text-center sm:w-[550px]">
				<h1 class="text-4xl font-semibold">Станьте іскрою нових знань</h1>
				<p class="text-xl text-muted-foreground sm:w-[500px]">
					Доєднайтесь до викладачів платформи та створюйте власні навчальні матеріали
				</p>
			</div>

			{#if typeof data.session === 'undefined'}
				<Button class="h-11 px-5" href="/signup">Створити акаунт</Button>
			{:else}
				<Dialog.Root>
					<Dialog.Trigger>
						<Button class="h-11 px-5">Заповнити форму</Button>
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Викладання</Dialog.Title>
							<Dialog.Description>
								Надайте відповіді на кілька питань та доєдуйтесь до команди викладачів Plaja
							</Dialog.Description>
						</Dialog.Header>
						<TeachingApplicationForm data={data.form} />
					</Dialog.Content>
				</Dialog.Root>
			{/if}
		</div>
	</div>
</div>
