<script lang="ts">
	import { Checkbox } from "$lib/components/shadcn-ui/checkbox";

	export let label: string;

	const items = [
		{ id: "item1", label: "Item 1", checked: false },
		{ id: "item2", label: "Item 2", checked: false },
		{ id: "item3", label: "Item 3", checked: false },
	];

	function handleCheckedChange(id: string, checked: boolean) {
		items.find((item) => item.id === id)!.checked = checked;
		console.log('Checked Items:', items.filter((item) => item.checked));
		const divElement = document.getElementById("courses-table");

		if (divElement) {
			const checkedLabels = items.filter((item) => item.checked).map((item) => item.label);
			divElement.textContent = "This is new content: " + checkedLabels.join(", ");
		} else {
			console.error("Element with ID 'courses-table' not found.");
		}
}
</script>

<div class="grid items-start">
	<div>
		<p class="font-medium pb-2">{label}</p>
	</div>
	{#each items as item}
		<div class="flex items-center space-x-2 pb-1">
			<div class="pr-1">
				<Checkbox onCheckedChange={(checked) => handleCheckedChange(item.id, !!checked)}/>
			</div>
			<p class="font-normal">
				{item.label}
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