<script lang="ts">
  import type { Snippet } from "svelte";
  import Section from "./Section.svelte";
  import Hero from "./Hero.svelte";
  import ImageDivider from "./ImageDivider.svelte";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    children: Snippet;
    title: string;
    subtitles?: string[];
    theme?: string;
    sectionClass?: ClassValue;
  }

  const { children, title, subtitles, theme, sectionClass }: Props = $props();
</script>

<template>
  <Hero>
    <h1 class="title">
      {title}
    </h1>
    {#if subtitles}
      <h2 class="subtitle">
        <ul>
          {#each subtitles as sub}
            <li>{sub}</li>
          {/each}
        </ul>
      </h2>
    {/if}
  </Hero>

  <ImageDivider image={theme} />

  <Section {sectionClass}>
    <article class="container is-max-desktop content markdown-columns">
      {@render children()}
    </article>
  </Section>
</template>

<style>
</style>
