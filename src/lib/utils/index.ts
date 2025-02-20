import type { SvelteComponent } from "svelte";

export interface BlogPostMetadata {
  title: string,
  date: string,
  author: string
}

export interface Markdown<M> {
  metadata: M,
  default: SvelteComponent
}

export interface MarkdownPost {
  meta: BlogPostMetadata,
  path: string
}

export async function fetchMarkdownPosts(): Promise<MarkdownPost[]> {
  const iterablePostFiles =
    Object.entries(import.meta.glob<Markdown<BlogPostMetadata>>("/src/routes/blog/posts/*.md"));

  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const postPath = `/blog/${path.slice(23, -3)}`;

      return {
        meta: metadata,
        path: postPath
      };
    })
  );

  return allPosts;
};

export function showDate(date: string): string {
  return new Date(date).toLocaleDateString();
}