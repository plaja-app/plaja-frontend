<script lang="ts">
	import type { PageData } from './$types';
	import UserCard from '$lib/components/UserCard.svelte';
	import { AspectRatio } from '$lib/components/shadcn-ui/aspect-ratio';
	import { Button } from '$lib/components/shadcn-ui/button';
	import { IconDownload, IconLanguageHiragana } from '@tabler/icons-svelte';
	import { Separator } from '$lib/components/shadcn-ui/separator';

	export let session: Session | undefined
	export let data: PageData

	let certificate: { Title: string; ID: number, User: {ID: number, FirstName: string, LastName: string}, Course: {ID: number, Title: string, Instructor: string}, CreatedAt: string } = {
		ID: 0,
		Title: "Тестування сертифікатів",
		User: {
			ID: 1,
			FirstName: "Владислав",
			LastName: "Павленко",
		},
		Course: {
			ID: 1,
			Title: "Тестування сертифікатів",
			Instructor: "Ім'я Прізвище",
		},
		CreatedAt: "6 березня 2024"
	}
</script>

<div class="mx-32 my-12 pt-8">
	<div class="grid gap-24 grid-cols-4 grid-rows-1">
		<div class="flex-row gap-20 shrink col-span-3">
			<div class="grid gap-6">
				<AspectRatio ratio={3 / 2} class="bg-muted">
					<img
						src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
						alt="Gray by Drew Beamer"
						class="h-full w-full rounded-md object-cover"
					/>
				</AspectRatio>

				<Separator />

				<p>Цей сертифікат засвідчує, що <a href="/users/{certificate.User.ID}" class="font-medium hover:underline">{certificate.User.FirstName} {certificate.User.LastName}</a> успішно завершив (-ла) курс <a href="/courses/{certificate.Course.ID}" class="font-medium hover:underline">«{certificate.Course.Title}»</a> {certificate.CreatedAt}, який викладав {certificate.Course.Instructor} на Plaja.</p>
			</div>
		</div>

		<div class="grid gap-4 shrink content-start">
			<p class="text-xl font-medium">Сертифікат</p>
			<UserCard user={certificate.User} tag="Отримувач" />

			{#if session?.User?.ID === certificate.User.ID}
				<Button
					variant="outline"
					class="w-min"
					on:click={() => {}}>
					<IconDownload stroke={1.75} class="size-5" />
					<span class="ps-2">Завантажити</span>
				</Button>
			{/if}
		</div>
	</div>
</div>