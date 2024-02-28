<script lang="ts">
	import LanguageSwitch from '$lib/components/LanguageSwitch.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
</script>

<div class="border-t border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 ">
	<div class="container lg:grid lg:grid-cols-3 py-8">
		<div>
			<p class="font-semibold text-xl">Plaja</p>
			<div class="grid place-items-start pt-2">
				<Button variant="link" class="p-0 font-normal" href="/about">Про нас</Button>
				<Button variant="link" class="p-0 font-normal"  href="/terms">Правила використання</Button>
				<Button variant="link" class="p-0 font-normal"  href="/terms/privacy">Політика конфіденційності</Button>
			</div>
			<p class="pt-6 text-sm">© Plaja, 2024</p>
		</div>

		<div>
			<p class="font-semibold text-xl">Інше</p>
			<div class="grid place-items-start pt-2">
				<Button variant="link" class="p-0 font-normal" href="/validate">Валідація сертифікатів</Button>
			</div>
		</div>

		<div class="grid">
			<div dir="rtl">
				<LanguageSwitch />
			</div>
			<div class="place-self-end">
				<Button variant="link" class="p-0 font-normal" href="mailto:mail@plaja.io">mail@plaja.io</Button>
			</div>
		</div>
	</div>
</div>