<script lang="ts">
	import { IconLanguageHiragana } from '@tabler/icons-svelte';
	import { Button } from '$lib/components/shadcn-ui/button';
</script>

<div>
	<Button variant="outline">
		<span class="pe-2">Українська</span>
		<IconLanguageHiragana stroke={1.5} class="h-5 w-5" />
	</Button>
</div>
