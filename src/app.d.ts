/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

interface ImportMetaEnv {
	VITE_RECAPTCHA_SITE_KEY: string;
}
export declare global {
	interface Window {
		handleCaptchaCallback: (token: string) => Promise<void>;
		resetCaptcha: () => void;
		handleCaptchaError: () => void;
	}
}

const json: User | string = await response.json();

if (response.status === 200) {
    // do something with response
} else {
    // show error message
    error = json as string;
}

// types.d.ts

export type User = {
    id: number;
    username: string;
};