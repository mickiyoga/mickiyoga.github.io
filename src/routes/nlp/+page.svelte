<script lang="ts">
  import ContentPage from "$lib/components/ContentPage.svelte";

  let { data } = $props();
  const { title, subtitles, theme, Content } = $derived(data);
</script>

<template>
  <ContentPage {title} {subtitles} {theme}>
    <Content />
  </ContentPage>
</template>

<style>
</style>
