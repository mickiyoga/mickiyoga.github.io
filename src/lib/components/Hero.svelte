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
    class?: ClassValue;
    size?: HeroSize;
  }

  const props: Props = $props();

  let sizeClass = $derived.by(() => {
    switch (props.size) {
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
  <section class={["hero", props.class, sizeClass]}>
    <div class="hero-body">
      {@render props.children?.()}
    </div>
  </section>
</template>

<style>
</style>
