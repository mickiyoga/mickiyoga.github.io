<script lang="ts">
  import type { Snippet } from "svelte";
  import Section from "./Section.svelte";
  import Hero from "./Hero.svelte";
  import ImageDivider from "./ImageDivider.svelte";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    children: Snippet;
    title: string;
    subTitle?: string;
    subSnippet?: Snippet;
    divider?: string;
    class?: ClassValue;
  }

  const props: Props = $props();
</script>

<template>
  <Hero>
    <h1 class="title">
      {props.title}
    </h1>
    <h2 class="subtitle">
      {props.subTitle ?? ""}
      {@render props.subSnippet?.()}
    </h2>
  </Hero>

  <ImageDivider image={props.divider} />

  <Section class={props.class}>
    <article class="container is-max-desktop content markdown-columns">
      {@render props.children()}
    </article>
  </Section>
</template>

<style>
</style>
