<script module lang="ts">
  export enum HeroSize {
    Small,
    Medium,
    Large
  }
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    children: Snippet;
    sectionClass?: ClassValue;
    size?: HeroSize;
  }

  const { children, sectionClass, size }: Props = $props();

  let sizeClass = $derived.by(() => {
    switch (size) {
      case HeroSize.Small:
        return "is-small";
      case HeroSize.Medium:
        return "is-medium";
      case HeroSize.Large:
        return "is-large";
      default:
        return "";
    }
  });
</script>

<template>
  <section class={["hero", sectionClass, sizeClass]}>
    <div class="hero-body">
      {@render children?.()}
    </div>
  </section>
</template>

<style>
</style>
