<script lang="ts">
	import * as Avatar from '$lib/components/shadcn-ui/avatar';
	import { goto } from '$app/navigation';
	export let user: User;
	export let tag: string;
</script>

<a class="flex cursor-pointer content-center gap-3.5" href="/users/{user?.ID}">
	<Avatar.Root class="h-9 w-9">
		<Avatar.Image
			src={user.ProfilePic}
			alt={user.FirstName + ' ' + user.LastName}
		/>
		<Avatar.Fallback class="text-slate-700"
		>{Array.from(user.FirstName)[0]}{Array.from(user.LastName)[0]}</Avatar.Fallback
		>
	</Avatar.Root>
	<div class="space-y-1">
		<p class="text-sm font-medium leading-none">{user?.FirstName} {user?.LastName}</p>
		<p class="text-sm text-muted-foreground">{tag}</p>
	</div>
</a>
