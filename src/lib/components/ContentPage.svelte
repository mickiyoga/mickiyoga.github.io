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
    class?: ClassValue;
  }

  const props: Props = $props();
</script>

<template>
  <Hero>
    <h1 class="title">
      {props.title}
    </h1>
    {#if props.subtitles}
      <h2 class="subtitle">
        <ul>
          {#each props.subtitles as sub}
            <li>{sub}</li>
          {/each}
        </ul>
      </h2>
    {/if}
  </Hero>

  <ImageDivider image={props.theme} />

  <Section class={props.class}>
    <article class="container is-max-desktop content markdown-columns">
      {@render props.children()}
    </article>
  </Section>
</template>

<style>
</style>
