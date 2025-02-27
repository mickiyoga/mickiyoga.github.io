<script lang="ts">
  import ImageDivider from "$lib/components/ImageDivider.svelte";
</script>

<template lang="pug">
  .hero
    .hero-body
      h1.title 
        | NLP 
      h2.subtitle 
        | and Hypnotherapy
          
  ImageDivider(image="spray")

  section.section
    article.container.is-max-desktop
      .columns
        .column
          .block
            | I am certified in hypnotherapy.
          .block.
            If you need help to break those bad habits and fully realise healthy life changes, I can
            offer neuro-linguistic programming (NLP) and hypnotherapy services for the treatment of
          ul
            li Stress and anxiety
            li Depression
            li Phobia
            li Insomnia and chronic fatigue
            li Confidence
            li Eating disorders
            li and more...

        .column
          .box
            enhanced:img(src="/src/lib/assets/bhodi.jpg")

</template>

<style>

</style>
