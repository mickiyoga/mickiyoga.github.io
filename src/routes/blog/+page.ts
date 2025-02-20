import type { MarkdownPost } from "$lib/utils";

interface BlogPageData {
  posts: MarkdownPost[]
}

export async function load({ fetch }): Promise<BlogPageData> {
  const response = await fetch(`/api/posts`);
  const posts = await response.json();

  return {
    posts
  };
};
