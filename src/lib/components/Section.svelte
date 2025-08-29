<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    children: Snippet;
    id?: string;
    sectionClass?: ClassValue;
    backgroundImage?: string;
  }

  const { children, id, sectionClass, backgroundImage }: Props = $props();
</script>

<template>
  <section
    {id}
    class={["section", sectionClass]}
    style="background-image: url({backgroundImage}); background-size: cover;"
  >
    {@render children?.()}
  </section>
</template>

<style>
</style>
