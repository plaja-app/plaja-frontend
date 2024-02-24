<script lang="ts">
	import CheckboxesGroup from '$lib/components/CheckboxesGroup.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';

	// const items = [
	// 	{ id: "item1", label: "Item 1", checked: false },
	// 	{ id: "item2", label: "Item 2", checked: false },
	// 	{ id: "item3", label: "Item 3", checked: false },
	// ];
	//
	// function handleCheckedChange(id: string, checked: boolean) {
	// 	// Update your array and call your function here
	// 	items.find((item) => item.id === id)!.checked = checked;
	//
	// 	console.log('Checked Items:', items.filter((item) => item.checked));
	//
	// 	const divElement = document.getElementById("courses-table");
	// 	if (divElement) {
	// 		// Update the element's content
	// 		const checkedLabels = items.filter((item) => item.checked).map((item) => item.label);
	//
	// 		divElement.textContent = "This is new content" + checkedLabels.join(", ");
	// 	} else {
	// 		console.error("Element with ID 'courses-table' not found.");
	// 	}
	//
	// }

</script>


<div class="columns-2 flex pt-5 pb-10">
	<div class="pl-14">
		<p class="font-semibold text-xl pb-5">Фільтри</p>
<!--		<div class="grid items-start">-->
<!--			{#each items as item}-->
<!--				<div>-->
<!--				<Checkbox  onCheckedChange={(checked) => handleCheckedChange(item.id, checked)}/>-->
<!--				<Label>-->
<!--					{item.label}-->
<!--				</Label>-->
<!--				</div>-->
<!--			{/each}-->
<!--		</div>-->
		<div>
			<CheckboxesGroup />
		</div>
	</div>
	<div id="courses-table" class="ps-10"></div>
</div>