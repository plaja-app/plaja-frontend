<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
</script>

<div class="flex items-center gap-2">
	<Avatar.Root class="h-9 w-9">
		<Avatar.Image src="https://plus.unsplash.com/premium_photo-1677109899422-e81b8a9f97b0?q=80&w=2820&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Avatar" />
		<Avatar.Fallback>PT</Avatar.Fallback>
	</Avatar.Root>
	<div class="space-y-1">
		<p class="text-sm font-medium leading-none">Plaja Team</p>
		<p class="text-sm text-muted-foreground">Команда платформи Plaja</p>
	</div>
</div>