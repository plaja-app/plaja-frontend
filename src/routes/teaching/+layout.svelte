<script lang="ts">
	import '../../app.pcss';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { LayoutData } from './$types';
	import { Toaster } from '$lib/components/shadcn-ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import TeacherSidebar from '$lib/components/teaching/TeacherSidebar.svelte';
	import { Separator } from '$lib/components/shadcn-ui/separator';
	import { page } from '$app/stores';

	export let data: LayoutData

	$: isApplyPage = $page.url.pathname.endsWith('/apply');
</script>

{#if !isApplyPage}
	<div class="grid grid-cols-8 my-5">
		<div class="col-span-1">
			<div class="fixed">
				<TeacherSidebar />
			</div>
		</div>

		<div class="col-span-7">
			<main>
				<slot></slot>
			</main>
		</div>
	</div>
{:else}
	<div class="my-5">
		<main>
			<slot></slot>
		</main>
	</div>
{/if}