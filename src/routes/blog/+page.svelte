<script lang="ts">
  import { showDate } from "$lib/utils";

	let { data } = $props();

  let prettyData = $derived({
    ...data,
    posts: data.posts.map(post => ({
      ...post,
      meta: {
        ...post.meta,
        date: showDate(post.meta.date)
      }
    }))
  });

</script>

<template lang="pug">

  section.section
    .title Blog

  section.section
    ul.container
      +each("prettyData.posts as post")
        li.block
          a.subtitle(href!="{post.path}")
            | {post.meta.title}
          p.is-italic Published {post.meta.date}

</template>

<style>
</style>
