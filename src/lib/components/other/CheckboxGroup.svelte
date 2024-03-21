<script lang="ts">
	import { Checkbox } from '$lib/components/shadcn-ui/checkbox';

	type Filter = {
		id: number;
		label: string;
		checked: boolean;
	};

	export let filters: Filter[] = [];

	// const items = [
	// 	{ id: 'item1', label: 'Варіант 1', checked: false },
	// 	{ id: 'item2', label: 'Варіант 2', checked: false },
	// 	{ id: 'item3', label: 'Варіант 3', checked: false }
	// ];

	function handleCheckedChange(id: number, checked: boolean) {
		filters.find((filter) => filter.id === id)!.checked = checked;
		const divElement = document.getElementById('courses-table');

		if (divElement) {
			const checkedLabels = filters.filter((filter) => filter.checked).map((filter) => filter.label);
			divElement.textContent = 'This is new content: ' + checkedLabels.join(', ');
		} else {
			console.error("Element with ID 'courses-table' not found.");
		}
	}
</script>

<div class="grid items-start">
	{#each filters as filter}
		<div class="flex items-center space-x-2 pb-1">
			<div class="pr-1">
				<Checkbox onCheckedChange={(checked) => handleCheckedChange(filter.id, !!checked)} />
			</div>
			<p class="font-normal">
				{filter.label}
			</p>
		</div>
	{/each}
</div>

<!--<form action="?/filter" method="POST" class="space-y-8" use:enhance>-->
<!--	<Form.Fieldset {form} name="items" class="space-y-0">>-->
<!--		<Form.Label>Мова</Form.Label>-->
<!--		{#each items as item}-->
<!--				<Form.Control>-->
<!--					<Form.Checkbox onCheckedChange={(checked) => handleCheckedChange(item.id, checked)}/>-->
<!--					<Form.Label class="font-normal">-->
<!--						{item.label}-->
<!--					</Form.Label>-->
<!--				</Form.Control>-->
<!--		{/each}-->
<!--	</Form.Fieldset>-->
<!--</form>-->
