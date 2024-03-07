<script lang="ts">
	import { Button } from '$lib/components/shadcn-ui/button/index';
</script>

<div
	class="center container relative flex-col items-center justify-center sm:h-[550px] md:grid lg:max-w-none lg:px-0"
>
	<div class="lg:p-8">
		<div
			class="mx-auto flex w-full flex-col content-center items-center justify-center space-y-6 sm:w-[550px]"
		>
			<div class="flex flex-col place-items-center space-y-2 text-center sm:w-[550px]">
				<h1 class="text-4xl font-semibold">Станьте іскрою нових знань</h1>
				<p class="text-xl text-muted-foreground sm:w-[500px]">
					Доєднайтесь до викладачів платформи та створюйте власні навчальні матеріали
				</p>
			</div>
			<Button href="/courses" class="h-11 px-5">Заповнити форму</Button>
		</div>
	</div>
</div>
