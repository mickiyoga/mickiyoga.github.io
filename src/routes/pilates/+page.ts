import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  const { default: Content, metadata } = await import("$lib/cms/pilates.md");

  return {
    title: metadata.title as string,
    subtitles: metadata.subtitles as string[],
    theme: metadata.theme as string,
    Content
  };
};
