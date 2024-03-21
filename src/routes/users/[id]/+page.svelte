<script lang="ts">
	import * as Avatar from '$lib/components/shadcn-ui/avatar/index';
	import Search from '$lib/components/layouts/Search.svelte';
	import * as Accordion from '$lib/components/shadcn-ui/accordion/index';
	import { Separator } from '$lib/components/shadcn-ui/separator';
	import {
		IconBooks,
		IconCertificate,
		IconFlame,
		IconPencil,
		IconSchool
	} from '@tabler/icons-svelte';
	import type { PageData } from './$types';
	import { formatDate } from '$lib/utils';
	import { Button } from '$lib/components/shadcn-ui/button';
	import CourseCardMini from '$lib/components/cards/CourseCardMini.svelte';
	import CourseCardProfile from '$lib/components/cards/CourseCardProfile.svelte';

	export let data: PageData;

	$: user = data.user[0] as User;
</script>

<div class="mx-72 my-24 pt-8">
	<div class="grid grid-cols-[min-content_1fr] gap-24">
		<div class="sticky top-20 -mt-10 z-10 pt-10 self-start">
			<div class="mb-5">
				<Avatar.Root class="size-48">
					<Avatar.Image src={user.ProfilePic} alt="User {user.ID}" />
					<Avatar.Fallback class="text-7xl text-slate-700"
						>{Array.from(user.FirstName)[0]}{Array.from(user.LastName)[0]}</Avatar.Fallback
					>
				</Avatar.Root>
			</div>

			<div>
				<p class="w-72 text-2xl font-medium">{user.FirstName} {user.LastName}</p>
				<p class="w-32 font-normal text-muted-foreground">
					{#if user.UserType?.Title === 'Learner'}
						Студент
					{:else if user.UserType?.Title === 'Educator'}
						Викладач
					{:else if user.UserType?.Title === 'Admin'}
						Команда Plaja
					{/if}
				</p>
			</div>

			<div class="mt-4">
				{#if user.UserType?.Title !== 'Learner'}
					<div class="flex gap-1.5 pb-1">
						<IconBooks stroke={1.5} class="h-5 w-5" />
						<p>{data.stats.totalCreated} курсів створено</p>
					</div>
				{/if}

				<div class="flex gap-1.5 pb-1">
					<IconSchool stroke={1.5} class="h-5 w-5" />
					<p>{data.stats.totalCompleted} курсів пройдено</p>
				</div>

				<div class="flex gap-1.5 pb-1">
					<IconCertificate stroke={1.5} class="h-5 w-5" />
					<p>{data.stats.totalCertificates} сертифікатів</p>
				</div>
			</div>

			<Separator class="my-4 mb-2 w-3/4" />
			<div class="flex gap-1.5">
				<IconFlame stroke={1.5} class="h-5 w-5 text-muted-foreground" />
				<p class="text-muted-foreground">На Plaja з {formatDate(user.CreatedAt)}</p>
			</div>

			{#if data.session?.User?.ID === user.ID}
				<Button variant="outline" href="/settings" class="mt-5">
					<IconPencil stroke={1.75} class="mr-1 size-5" />
					Налаштування
				</Button>
			{/if}
		</div>

		<div>
			<div class="mb-4">
				{#if data.enrolledIn.length === 0}
					<p class="text-xl font-medium">Курси</p>
					<p class="text-muted-foreground">
					{#if data.session?.User?.ID === user.ID}
						Ви ще не берете участь у жодному курсі.
					{:else}
						Користувач не бере участь у жодному курсі.
					{/if}
				</p>
					{:else}
					<Accordion.Root>
						<Accordion.Item value="courses">
							<Accordion.Trigger class="text-xl font-medium">Курси</Accordion.Trigger>
							<Accordion.Content>
								{#each data.enrolledIn as course}
									<div class="mt-3">
										<CourseCardProfile course={course}/>
									</div>
								{/each}
							</Accordion.Content>
						</Accordion.Item>
					</Accordion.Root>
					{/if}
			</div>

			<div>
				<p class="text-xl font-medium">Сертифікати</p>
				<p class="text-muted-foreground">
					{#if data.stats.totalCertificates === 0}
						{#if data.session?.User?.ID === user.ID}
							Ви ще не отримали жодного сертифікату.
						{:else}
							Користувач ще не отримав жодного сертифікату.
						{/if}
					{:else if data.session?.User?.ID === user.ID}
						Ви отримали {data.stats.totalCertificates} сертифікатів.
					{:else}
						Користувач отримав {data.stats.totalCertificates} сертифікатів.
					{/if}
				</p>
			</div>
		</div>
	</div>
</div>
