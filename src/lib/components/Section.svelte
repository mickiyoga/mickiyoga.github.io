<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    children: Snippet;
    id?: string;
    class?: ClassValue;
    backgroundImage?: string;
  }

  const props: Props = $props();
</script>

<template>
  <section
    id={props.id}
    class={["section", props.class]}
    style="background-image: url({props.backgroundImage}); background-size: cover;"
  >
    {@render props.children?.()}
  </section>
</template>

<style>
</style>
