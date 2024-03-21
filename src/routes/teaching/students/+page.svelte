<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { Input } from '$lib/components/shadcn-ui/input';
	import * as XLSX from 'xlsx';
	import { writable } from 'svelte/store';
	import { IconExclamationCircle } from '@tabler/icons-svelte';
	import { Button } from '$lib/components/shadcn-ui/button';
	import { toast } from 'svelte-sonner';

	export let data;
	let excelData = writable([]);
	let errorMessage = writable("");
	let fileInput;

	function handleFileChange(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, {type: 'array'});
				const firstSheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[firstSheetName];
				const json = XLSX.utils.sheet_to_json(worksheet, {defval: " "});

				if (validateColumns(json)) {
					excelData.set(json);
					errorMessage.set("");
				} else {
					excelData.set([]);
					errorMessage.set("Завантажений файл не містить усіх обов'язкових атрибутів: FirstName, LastName, Email та Password.");
					clearFileInput();
				}
			};
			reader.readAsArrayBuffer(file);
		}
	}

	function validateColumns(data) {
		if (data.length === 0) return false;
		const columns = Object.keys(data[0]);
		const requiredColumns = ["FirstName", "LastName", "Email", "Password"];
		return requiredColumns.every(col => columns.includes(col));
	}

	function clearFileInput() {
		if (fileInput) fileInput.value = ''; // Reset the input
	}

	export let isEnrolled: boolean;
	let loading = false;
	let registrationStatus = writable([]);

	async function registerStudents() {
		const students = $excelData;
		registrationStatus.set([]);
		for (let student of students) {
			try {
				const response = await fetch('/api/v1/users/signup', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					credentials: 'include',
					body: JSON.stringify(student)
				});

				if (response.ok) {
					toast.success(`Зареєстровано ${student.FirstName} ${student.LastName}`);
					registrationStatus.update(current => [...current, { student: `${student.FirstName} ${student.LastName}`, success: true }]);
				} else {
					throw new Error(`Помилка при реєстрації ${student.FirstName} ${student.LastName}`);
				}
			} catch (error) {
				toast.error(error.message);
				registrationStatus.update(current => [...current, { student: `${student.FirstName} ${student.LastName}`, success: false }]);
			}
			await tick(); // Wait for the DOM to update
		}
	}

</script>

<!-- Use bind:this to get a reference to the input element -->
<div class="pt-4 h-[500px]">
	<p class="text-xl font-semibold">Студенти</p>
	<p class="pb-3 text-muted-foreground">Завантажте файл EXCEL, щоб здійснити масову реєстрацію студентів.</p>
	<div class="flex flex-row gap-20">
		<Input type="file" class="w-min" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
					 on:change={handleFileChange} bind:this={fileInput}/>
	</div>
	{#if $errorMessage}
		<div class="flex-row flex">
			<IconExclamationCircle stroke={1.75} class="mt-2.5 size-5 text-red-600" />
			<div class="ml-2 text-red-600 mt-2">{$errorMessage}</div>
		</div>
	{/if}
	<div class="mt-3">
		{#if $excelData.length > 0}
			<div class="flex flex-row">
				<table class="w-full">
					<thead>
					<tr>
						{#each Object.keys($excelData[0]) as key}
							<th class="border px-4 py-2 bg-gray-200">{key}</th>
						{/each}
					</tr>
					</thead>
					<tbody>
					{#each $excelData as row}
						<tr>
							{#each Object.values(row) as value}
								<td class="border px-4 py-2">{value}</td>
							{/each}
						</tr>
					{/each}
					</tbody>
				</table>
			</div>

			<Button class="mt-3" on:click={registerStudents}>Зареєструвати</Button>

			<div class="pt-3">
				{#each $registrationStatus as status}
					<div>
						<p class={status.success ? 'text-green-500' : 'text-red-600'}>
							{status.student}: {status.success ? 'успішно зареєстровано.' : 'помилка реєстрації.'}
						</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
