<script lang="ts">
	import type { BlogPost } from './+page';
	import { showDate } from '$lib/utils';

	let { data } = $props();

	const { title, date, author, Content } = data as BlogPost;

	let prettyDate = $derived(showDate(date));
</script>

<template lang="pug">
  
  article.container
    section.section
      .title {title}
      .subtitle {prettyDate}
      .block.is-italic {author}
    section.section
      Content

</template>

<style>
</style>
