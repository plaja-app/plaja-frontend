<script lang="ts">
	import '../app.pcss';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { LayoutData } from './$types';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';

	export let data: LayoutData

	$: categories = data.categories as CourseCategory[];
</script>

<Navbar categories={categories} />

<Toaster />
<ModeWatcher />

<main>
	<slot></slot>
</main>

<Footer />