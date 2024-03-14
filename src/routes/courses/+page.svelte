<script lang="ts">
	import CheckboxesGroup from '$lib/components/other/CheckboxGroup.svelte';
	import CourseCard from '$lib/components/cards/CourseCard.svelte';
	import type { PageData } from './$types';
	import * as Accordion from '$lib/components/shadcn-ui/accordion';
	import { Separator } from '$lib/components/shadcn-ui/separator';
	import Search from '$lib/components/layouts/Search.svelte';
	import SettingsSidebar from '$lib/components/settings/SettingsSidebar.svelte';
	export let data: PageData;
</script>

<div class="mx-10 py-8">
	<div class="grid grid-cols-12">
		<div class="col-span-2 mr-8">
			<p class="pb-5 text-xl font-semibold">Фільтри</p>
			<Accordion.Root multiple>
				<Accordion.Item value="item-1">
					<Accordion.Trigger>Мова</Accordion.Trigger>
					<Accordion.Content>
						<CheckboxesGroup />
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item value="item-2">
					<Accordion.Trigger>Ціна</Accordion.Trigger>
					<Accordion.Content>
						<CheckboxesGroup />
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item value="item-3">
					<Accordion.Trigger>Сертифікат</Accordion.Trigger>
					<Accordion.Content>
						<CheckboxesGroup />
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</div>
		<div class="col-span-10">
			<p class="pb-5 text-xl font-semibold">Курси</p>
			<Search class="pb-6" />
			<div id="courses-table" class="grid flex-grow gap-5">
				{#each data.courses as course (course.ID)}
					<CourseCard {course} />
				{/each}
			</div>
		</div>
	</div>
</div>
