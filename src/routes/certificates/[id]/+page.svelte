<script lang="ts">
	import type { PageData } from './$types';
	import UserCard from '$lib/components/cards/UserCard.svelte';
	import { AspectRatio } from '$lib/components/shadcn-ui/aspect-ratio';
	import { Button } from '$lib/components/shadcn-ui/button';
	import { IconDownload, IconLanguageHiragana } from '@tabler/icons-svelte';
	import { Separator } from '$lib/components/shadcn-ui/separator';
	import { LinkedinLogo } from 'radix-icons-svelte';
	import { buildAddToLinkedInURL, formatDate } from '$lib/utils';

	export let data: PageData;

	let certificate: {
		Title: string;
		ID: number;
		User: { ID: number; FirstName: string; LastName: string };
		Course: { ID: number; Title: string; Instructor: string };
		CreatedAt: string;
	} = {
		ID: 0,
		Title: 'Тестування сертифікатів',
		User: {
			ID: 2,
			FirstName: 'Владислав',
			LastName: 'Павленко'
		},
		Course: {
			ID: 1,
			Title: 'Тестування сертифікатів',
			Instructor: "Ім'я Прізвище"
		},
		CreatedAt: '2024-03-06 16:34:11.694000 +00:00'
	};
</script>

<div class="mx-32 my-12 pt-8">
	<div class="grid grid-cols-4 grid-rows-1 gap-24">
		<div class="col-span-3 shrink flex-row gap-20">
			<div class="grid gap-6 rounded-lg">
				<AspectRatio ratio={3 / 2}>
					<img
						src="http://localhost:8080/api/v1/storage/certificates/test-certificate.png"
						alt="Certificate {certificate.ID}"
						class="duration-175 h-full w-full transform rounded-lg border object-cover
						shadow-sm shadow-gray-100 transition-all ease-in-out hover:-translate-y-1 hover:shadow-lg"
					/>
				</AspectRatio>

				<Separator />

				<p>
					Цей сертифікат засвідчує, що <a
						href="/users/{certificate.User.ID}"
						class="font-medium hover:underline"
						>{certificate.User.FirstName} {certificate.User.LastName}</a
					>
					успішно завершив (-ла) курс
					<a href="/courses/{certificate.Course.ID}" class="font-medium hover:underline"
						>«{certificate.Course.Title}»</a
					>
					{formatDate(certificate.CreatedAt)}, який викладав {certificate.Course.Instructor} на Plaja.
				</p>
			</div>
		</div>

		<div class="grid shrink content-start gap-4">
			<p class="text-xl font-medium">Сертифікат</p>
			<UserCard user={certificate.User} tag="Отримувач" />

			<div class="grid shrink content-start gap-2">
				{#if data.session?.User?.ID === certificate.User.ID}
					<Button variant="outline" class="w-min" on:click={() => {}}>
						<IconDownload stroke={1.75} class="size-5" />
						<span class="ps-2">Завантажити</span>
					</Button>

					<Button
						target="_blank"
						rel="noopener noreferrer"
						style="background-color: #2d64bc; color: white;"
						class="w-min"
						href={buildAddToLinkedInURL(certificate)}
					>
						<LinkedinLogo class="size-5" />
						<span class="ps-2">Додати в профіль</span>
					</Button>
				{/if}
			</div>
		</div>
	</div>
</div>
