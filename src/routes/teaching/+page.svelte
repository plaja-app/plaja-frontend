<script lang="ts">
	import { Button } from '$lib/components/shadcn-ui/button/index';
	import * as Alert  from '../../lib/components/shadcn-ui/alert';

</script>

<div class="mx-6 my-6">
	<Alert.Root class="mb-6">
		<div class="mx-12 my-10">
			<Alert.Title class="text-4xl font-semibold pb-2">
				Несіть вогонь
			</Alert.Title>
			<Alert.Description class="text-xl text-muted-foreground mb-4 sm:w-[500px]">
				Поділіться своїми знаннями зі світом, створивши новий курс із навчальними матеріалами
			</Alert.Description>

			<div class="flex grid-cols-2 grid-rows-1 gap-2">
				<Button href="/teaching/courses/create" class="h-11 shrink px-5">
					Створити курс
				</Button>

				<Button variant="outline" href="/courses/5" class="h-11 shrink px-5">
					Довідка
				</Button>
			</div>
		</div>
	</Alert.Root>

	<div class="pt-3">
		<div>
			<p class="font-semibold text-xl pb-1">Ваші курси</p>
			<p class="text-muted-foreground">
				Ви ще не створили жодного курсу.
			</p>
		</div>
	</div>
</div>