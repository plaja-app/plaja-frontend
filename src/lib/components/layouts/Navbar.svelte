<script lang="ts">
	import { Button } from '$lib/components/shadcn-ui/button';
	import Logo from '$lib/components/other/Logo.svelte';
	import Search from '$lib/components/layouts/Search.svelte';
	import UserNavbar from '$lib/components/layouts/UserNavbar.svelte';
	import * as DropdownMenu from '$lib/components/shadcn-ui/dropdown-menu';
	export let categories: CourseCategory[] = [];
	export let session: Session | undefined;
</script>

<nav
	class="flex-no-wrap fixed top-0 z-50 flex w-full items-center justify-between
						border-b border-border/40 bg-background/95 bg-white py-4 backdrop-blur-md
						supports-[backdrop-filter]:bg-background/60 lg:flex-wrap lg:justify-start lg:py-4"
>
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

		<div
			class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
			data-te-collapse-item
		>
			<a class="mb-0 ml-1 mr-5 flex w-28 items-center" href="/">
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

					{#each categories as { ID, Title }}
						<DropdownMenu.Item href="?q={ID}">{Title}</DropdownMenu.Item>
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>

			{#if session?.User?.UserType?.Title === 'Learner' || !session}
				<Button variant="link" class="mr-2 p-1" href="/teaching/apply">Викладати на Plaja</Button>
			{:else}
				<Button variant="link" class="mr-2 p-1" href="/teaching">Викладання</Button>
			{/if}

			{#if session}
				<div class="relative mr-2 flex items-center">
					<UserNavbar {session} />
				</div>
			{:else}
				<div class="flex flex-row gap-2">
					<Button variant="outline" class="!visible" href="/login">Увійти</Button>
					<Button href="/signup">Зареєструватися</Button>
				</div>
			{/if}
		</div>
	</div>
</nav>
