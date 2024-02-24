<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';

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
	{#each items as item}
		<div>
			<Checkbox  onCheckedChange={(checked) => handleCheckedChange(item.id, checked)}/>
			<Label>
				{item.label}
			</Label>
		</div>
	{/each}
</div>