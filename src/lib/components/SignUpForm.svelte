<script lang="ts">
	import { LinkedinLogo } from 'radix-icons-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { cn } from "$lib/utils";
	import PasswordInput from '$lib/components/PasswordInput.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';

	let className: string | undefined | null = undefined;
	export { className as class };

	let isLoading = false;
	async function onSubmit() {
		isLoading = true;

		setTimeout(() => {
			isLoading = false;
		}, 3000);
	}

	let isPasswordVisible = false;
	let checked = false;

	function togglePassword() {
		isPasswordVisible = !isPasswordVisible;
	}
</script>

<div class={cn("grid gap-6", className)} {...$$restProps}>
	<form on:submit|preventDefault={onSubmit}>
		<div class="grid gap-3">

			<div class="grid gap-1">
				<Label for="name">Ім'я</Label>
				<Input
					id="name"
					placeholder="Ваше повне ім'я"
					type="text"
					autocapitalize="none"
					autocomplete="off"
					autocorrect="off"
					disabled={isLoading}
					required
				/>
			</div>

			<div class="grid gap-1">
				<Label for="email">Електронна пошта</Label>
				<Input
					id="email"
					placeholder="name@example.com"
					type="email"
					autocomplete="email"
					disabled={isLoading}
					required
				/>
			</div>
			<div class="grid gap-1">
				<Label for="password">Пароль</Label>
				<PasswordInput id="password" required />
			</div>

			<div class="flex space-x-2 py-2">
				<Checkbox id="terms" bind:checked />
				<Label
					for="terms"
					class="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					Надсилайте мені спеціальні пропозиції та персоналізовані рекомендації.
				</Label>
			</div>

			<Button disabled={isLoading}>
				{#if isLoading}
					<!--					<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />-->
				{/if}
				Зареєструватися
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