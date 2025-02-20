import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import addClasses from "rehype-class-names";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		sveltePreprocess(),
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [[addClasses, {
				// Bulma classes can be added to markdown content here
				"h1,h2": "subtitle",
				p: "block"
			}]]
		})
	],
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		// Using recommendations for github static pages: https://svelte.dev/docs/kit/adapter-static#github-pages
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			// Provide a custom 404 to avoid using github's.
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		paths: {
			// Update for the repo root, e.g. https://your-username.github.io/your-repo-name
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		}
	},
	extensions: [
		'.svelte',
		// Using simple markdown files, not mdsvex's .svx
		'.md'
	]
};

export default config;
