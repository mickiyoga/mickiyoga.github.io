import type { Markdown } from '$lib/utils/index.js';
import type { SvelteComponent } from 'svelte';

// Need to override static site adapter setting in +layout.js
export const prerender = false;

export interface ContactContent {
  Content: SvelteComponent
}

export async function load(): Promise<ContactContent> {
  const { default: Content }
    = await import(`./index.md`) as Markdown<undefined>;

  return {
    Content
  };
}