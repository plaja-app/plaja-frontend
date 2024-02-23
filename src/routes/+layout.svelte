<script>
	import '../app.pcss';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Navbar />

<main>
	<slot></slot>
</main>

<Footer />