<script lang="ts">
  import type { Snippet } from "svelte";
  import Section from "./Section.svelte";
  import Hero from "./Hero.svelte";
  import ImageDivider from "./ImageDivider.svelte";

  interface Props {
    children: Snippet;
    title: string;
    subTitle?: string;
    subSnippet?: Snippet;
    divider?: string;
  }

  const { children, title, subTitle: subtitle, subSnippet, divider }: Props = $props();
</script>

<template>
  <Hero>
    <h1 class="title">
      {title}
    </h1>
    <h2 class="subtitle">
      {subtitle}
      {@render subSnippet?.()}
    </h2>
  </Hero>

  <ImageDivider image={divider} />

  <Section>
    <article class="container is-max-desktop content markdown-columns">
      {@render children()}
    </article>
  </Section>
</template>

<style>
</style>
