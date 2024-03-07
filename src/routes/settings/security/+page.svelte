<script lang="ts">
	import PrivacyForm from '$lib/components/settings/PrivacyForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="mx-6 my-5">
	<PrivacyForm data={data.form} session={data.session} />
</div>
