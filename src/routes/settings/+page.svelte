<script lang="ts">
	import ProfileForm from '$lib/components/settings/ProfileForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="mx-6 my-5">
	<ProfileForm data={data.form} session={data.session} />
</div>
