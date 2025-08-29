<script lang="ts">
  import ContentPage from "$lib/components/ContentPage.svelte";

  let { data } = $props();
  const { title, subtitles, theme, Content } = data;
</script>

<template>
  <ContentPage {title} {subtitles} {theme} sectionClass="has-text-centered">
    <Content />
  </ContentPage>
</template>

<style>
</style>
