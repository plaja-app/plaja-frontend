// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			code: string;
			id: string;
		}
		interface Locals {
			user?: User,
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
