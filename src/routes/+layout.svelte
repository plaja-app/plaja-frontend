<script lang="ts">
	import '../app.pcss';
	import Navbar from '$lib/components/layouts/Navbar.svelte';
	import Footer from '$lib/components/layouts/Footer.svelte';
	import type { LayoutData } from './$types';
	import { Toaster } from '$lib/components/shadcn-ui/sonner';
	import { ModeWatcher } from 'mode-watcher';

	export let data: LayoutData;

	$: categories = data.categories as CourseCategory[];
</script>

<Navbar {categories} session={data.locals.session} />

<Toaster />
<ModeWatcher track={false} defaultMode="light" />

<main class="my-20">
	<slot />
</main>

<!--<div class="fixed inset-x-0 -top-60 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-60" aria-hidden="true">-->
<!--	<div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#FBB040] to-[#FA0C61] opacity-15 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>-->
<!--</div>-->

<!--<div class="fixed inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-40rem)]" aria-hidden="true">-->
<!--	<div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#FBB040] to-[#FA0C61] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>-->
<!--</div>-->

<Footer />
