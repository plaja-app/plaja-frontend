<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button/index';

	export let user: User | undefined
</script>

	<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button variant="destructive" builders={[builder]} class="relative rounded-full aspect-square">
					<Avatar.Root>
						<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
						<Avatar.Fallback>SC</Avatar.Fallback>
					</Avatar.Root>
				</Button>
			</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-52 shadow-md" align="end">
			<DropdownMenu.Label class="font-normal">
				<div class="flex flex-col space-y-1">
					<p class="text-sm font-medium leading-none">{user?.FirstName} {user?.LastName}</p>
					<p class="text-xs leading-none text-muted-foreground">{user?.Email}</p>
				</div>
			</DropdownMenu.Label>
			<DropdownMenu.Separator />

			<DropdownMenu.Item>Профіль</DropdownMenu.Item>
			<DropdownMenu.Item>Мої курси</DropdownMenu.Item>
			<DropdownMenu.Item>Налаштування</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>Допомога</DropdownMenu.Item>
			<DropdownMenu.Item><p class="text-red-600">Вийти</p></DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>