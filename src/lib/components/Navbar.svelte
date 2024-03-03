<script lang="ts">
	import { Button } from "$lib/components/shadcn-ui/button";
	import Logo from '$lib/components/Logo.svelte';
	import Search from '$lib/components/Search.svelte';
	import UserNavbar from '$lib/components/UserNavbar.svelte';
	import * as DropdownMenu from '$lib/components/shadcn-ui/dropdown-menu/index';
	import { HamburgerMenu } from 'radix-icons-svelte';

	export let categories: CourseCategory[] = []
	export let session: Session | undefined
</script>

<nav class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md
						supports-[backdrop-filter]:bg-background/60 flex-no-wrap flex items-center justify-between bg-white
						py-4 lg:flex-wrap lg:justify-start lg:py-4">

	<div class="flex w-full flex-wrap items-center justify-end px-6">
<!--		<button-->
<!--			class="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none lg:hidden"-->
<!--			type="button"-->
<!--			data-te-collapse-init-->
<!--			data-te-target="#navbarSupportedContent1"-->
<!--			aria-controls="navbarSupportedContent1"-->
<!--			aria-expanded="false"-->
<!--			aria-label="Toggle navigation">-->
<!--			<Button variant="outline" class="shrink-0">-->
<!--					<HamburgerMenu />-->
<!--			</Button>-->
<!--		</button>-->

		<div class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto" data-te-collapse-item>
			<a class="mb-4 ml-1 w-28 mr-5 flex items-center lg:mb-0" href="/">
				<Logo />
			</a>

			<div class="grow px-5">
				<Search />
			</div>
		</div>

		<div class="relative flex items-center gap-4">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button builders={[builder]} variant="link" class="p-1" href="/courses">Курси</Button>
				</DropdownMenu.Trigger>

				<DropdownMenu.Content class="w-auto">
					<DropdownMenu.Item href="/courses">Усі</DropdownMenu.Item>

					<DropdownMenu.Separator />

					{#each categories as {ID, Title}}
						<DropdownMenu.Item href="?q={ID}">{Title}</DropdownMenu.Item>
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>

			<Button variant="link" class="p-1" href="/teaching/apply">Викладання</Button>

			{#if session !== undefined}
				<div class="relative flex items-center mr-2">
						<UserNavbar session={session}/>
				</div>
			{:else}
					<Button variant="outline" class="!visible" href="/login">Увійти</Button>
					<Button href="/signup">Зареєструватися</Button>
			{/if}
		</div>
	</div>
</nav>