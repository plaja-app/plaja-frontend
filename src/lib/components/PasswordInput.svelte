<script lang="ts">
	import { EyeClosed, EyeOpen } from 'radix-icons-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	export let id: string;
	export let placeholder: string = 'Пароль';
	export let disabled: boolean = false;
	export let required: boolean = false;

	let isPasswordVisible = false;

	function togglePasswordVisibility() {
		isPasswordVisible = !isPasswordVisible;
	}
</script>

<div class="flex gap-2 items-center">
	<Input
		{id}
		class="flex-grow"
		{placeholder}
		type={isPasswordVisible ? 'text' : 'password'}
		{disabled}
		{required}
	/>

	<Button variant="outline" on:click={togglePasswordVisibility} class="shrink-0">
		{#if isPasswordVisible}
			<EyeClosed />
		{:else}
			<EyeOpen />
		{/if}
	</Button>
</div>
