<script lang="ts">
	import * as Avatar from '$lib/components/shadcn-ui/avatar/index';
	import Search from '$lib/components/Search.svelte';
	import { Separator } from '$lib/components/shadcn-ui/separator';
	import { IconBooks, IconCertificate, IconFlame, IconSchool } from '@tabler/icons-svelte';
	import type { PageData } from './$types';
	import { formatDate } from '$lib/utils';
	export let data: PageData

	$: user = data.user[0] as User;
</script>

<div class="mx-72 my-24 pt-12">
	<div class="grid gap-24 grid-cols-[min-content_1fr]">
		<div>
			<div class="mb-5">
				<Avatar.Root class="h-48 w-48">
					<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
					<Avatar.Fallback>SC</Avatar.Fallback>
				</Avatar.Root>
			</div>

			<div>
				<p class="text-2xl w-72 font-medium">{user.FirstName} {user.LastName}</p>
				<p class="w-32 font-normal text-muted-foreground">
					{#if user.UserType?.Title === "Learner"}
						Студент
					{:else if user.UserType?.Title === "Educator"}
						Викладач
					{:else if user.UserType?.Title === "Admin"}
						Команда Plaja
					{/if}
				</p>
			</div>

			<div class="mt-4">
				{#if user.UserType?.Title !== "Learner"}
					<div class="flex gap-1.5 pb-1">
						<IconBooks stroke={1.5} class="h-5 w-5" />
						<p>X курсів створено</p>
					</div>
				{/if}

				<div class="flex gap-1.5 pb-1">
					<IconSchool stroke={1.5} class="h-5 w-5" />
					<p>X курсів пройдено</p>
				</div>

				<div class="flex gap-1.5 pb-1">
					<IconCertificate stroke={1.5} class="h-5 w-5" />
					<p>X сертифікатів</p>
				</div>
			</div>

			<Separator class="w-3/4 mb-2 my-4" />
			<div class="flex gap-1.5">
				<IconFlame stroke={1.5} class="h-5 w-5 text-muted-foreground" />
				<p class="text-muted-foreground">На Plaja з {formatDate(user.CreatedAt)}</p>
			</div>
		</div>

		<div>
			<div class="mb-4">
				<p class="text-xl font-medium">Курси</p>
				<p class="text-muted-foreground">
					{#if data.session?.User?.ID === user.ID}
						Ви ще не берете участь у жодному курсі.
					{:else}
						Користувач не бере участь у жодному курсі.
					{/if}
				</p>
			</div>

			<div>
				<p class="text-xl font-medium">Сертифікати</p>
				<p class="text-muted-foreground">
					{#if data.session?.User?.ID === user.ID}
						Ви ще не отримали жодного сертифікату.
					{:else}
						Користувач ще не отримав жодного сертифікату.
					{/if}
				</p>
			</div>
		</div>
	</div>
</div>