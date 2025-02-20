import { fetchMarkdownPosts } from '$lib/utils';
import { json } from '@sveltejs/kit';

export async function GET(): Promise<Response> {
  const allPosts = await fetchMarkdownPosts();

  const sortedPosts = allPosts
    .sort((a, b) => Date.parse(b.meta.date) - Date.parse(a.meta.date));

  return json(sortedPosts);
};
