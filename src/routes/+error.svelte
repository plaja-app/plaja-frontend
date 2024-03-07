<script>
	import { page } from '$app/stores';
</script>

<div
	class="center container relative hidden flex-col items-center justify-center sm:h-[550px] md:grid lg:max-w-none lg:px-0"
>
	<div class="lg:p-8">
		<div
			class="mx-auto flex w-full flex-col content-center items-center justify-center space-y-6 sm:w-[550px]"
		>
			<div class="flex flex-col place-items-center space-y-2 text-center sm:w-[550px]">
				<h1 class="text-4xl font-semibold">{$page.status}</h1>
				<p class="text-xl text-muted-foreground sm:w-[500px]">
					{$page.error?.message}
					<br />
				</p>
			</div>
		</div>
	</div>
</div>
