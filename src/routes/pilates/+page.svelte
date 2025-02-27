<script lang="ts">
  import ImageDivider from "$lib/components/ImageDivider.svelte";
</script>

<template lang="pug">
  .hero
    .hero-body
      h1.title 
        | Pilates
          
  ImageDivider(image="storm")

  section.section
    article.container.is-max-desktop
      .columns
        .column
          .block
            | I am certified in Reformer Pilates.
          .block
            | I have experience instructing a variety of classes, including
          ul
            li Pilates mat work
            li Swiss ball
            li Mindful meditation
            li Hip-hop yoga

        .column
          .box
            enhanced:img(src="/src/lib/assets/ohm-studio.jpg")

</template>

<style>

</style>
