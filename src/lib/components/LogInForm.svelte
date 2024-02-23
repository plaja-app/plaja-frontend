<script lang="ts">
	import { LinkedinLogo } from 'radix-icons-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { cn } from "$lib/utils";
	import PasswordInput from '$lib/components/PasswordInput.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	let isLoading = false;
	async function onSubmit() {
		isLoading = true;

		setTimeout(() => {
			isLoading = false;
		}, 3000);
	}
</script>

<div class={cn("grid gap-6", className)} {...$$restProps}>
	<form on:submit|preventDefault={onSubmit}>
		<div class="grid gap-2">
			<div class="grid gap-1">
				<Label for="email">Електронна пошта</Label>
				<Input
					id="email"
					placeholder="name@example.com"
					type="email"
					autocapitalize="none"
					autocomplete="email"
					autocorrect="off"
					disabled={isLoading}
				/>
			</div>
			<div class="grid gap-1">
				<Label for="password">Пароль</Label>
				<PasswordInput id="password" required />
			</div>
			<Button disabled={isLoading}>
				{#if isLoading}
<!--					<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />-->
				{/if}
				Увійти
			</Button>
		</div>
	</form>
	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t" />
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background px-2 text-muted-foreground"> або </span>
		</div>
	</div>
	<Button variant="outline" type="button" disabled={isLoading}>
		{#if isLoading}
<!--			<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />-->
		{:else}
			<LinkedinLogo class="mr-2 h-4 w-4" />
		{/if}
		{" "}
		LinkedIn
	</Button>
</div>