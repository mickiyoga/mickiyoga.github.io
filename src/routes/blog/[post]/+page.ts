import type { BlogPostMetadata, Markdown } from '$lib/utils/index.js';
import type { SvelteComponent } from 'svelte';

// Need to override static site adapter setting in +layout.js
export const prerender = false;

export interface BlogPost extends BlogPostMetadata {
  Content: SvelteComponent
}

export async function load({ params }): Promise<BlogPost> {
  const { metadata: { title, date, author }, default: Content }
    = await import(`../posts/${params.post}.md`) as Markdown<BlogPostMetadata>;

  return {
    Content,
    title,
    date,
    author
  };
}
