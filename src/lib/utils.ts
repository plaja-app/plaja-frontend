import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { BackendURL } from '$lib/index';
import { redirect } from '@sveltejs/kit';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export function parseCookies(cookieStrings: string[]): Cookie[] {
	return cookieStrings.map((cookieString) => {
		const parts = cookieString.split(';').map((part) => part.trim());
		const [name, value] = parts[0].split('=');
		const attributes: CookieAttributes = { value };

		parts.slice(1).forEach((part) => {
			const [key, val] = part.split('=');
			switch (key) {
				case 'Max-Age':
					attributes.maxAge = parseInt(val, 10);
					break;
				case 'HttpOnly':
					attributes.httpOnly = true;
					break;
				case 'SameSite':
					attributes.sameSite = val as 'Lax' | 'Strict' | 'None';
					break;
			}
		});

		return {
			name,
			attributes
		};
	});
}

export function formatDate(dateString: string): string {
	const date = new Date(dateString);

	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();

	return `${day}.${month}.${year}`;
}

export function buildAddToLinkedInURL(certificate: CourseCertificate) {
	const encodedName = encodeURIComponent(certificate.Course.Title);
	const encodedCertUrl = encodeURIComponent("plaja.io/certificates/id");
	const date = new Date(certificate.CreatedAt);

	const issueMonth = (date.getMonth() + 1).toString().padStart(2, '0');
	const issueYear = date.getFullYear();

	let url = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME`;
	url += `&name=${encodedName}`;
	url += `&organizationName=Plaja`;
	url += `&issueYear=${issueYear}`;
	url += `&issueMonth=${issueMonth}`;

	url += `&certUrl=${encodedCertUrl}`;
	url += `&certId=${certificate.ID}`;

	return url;
}