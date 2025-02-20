// Required for static site adapter
//   https://svelte.dev/docs/kit/adapter-static#github-pages
// This can _not_ be merged with +layout.svelte
export const prerender = true;

export const load = ({ url: { pathname: currentRoute } }) => ({ currentRoute });
