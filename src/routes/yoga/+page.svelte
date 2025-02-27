<script lang="ts">
  import ImageDivider from "$lib/components/ImageDivider.svelte";
</script>

<template lang="pug">
  .hero
    .hero-body
      h1.title 
        | Yoga
      h2.subtitle
        ul
          li Kids
          li Individuals
          li Groups
        
  ImageDivider(image="rockpool")

  section.section
    article.container.is-max-desktop
      .columns
        .column
          .block.
            On offer is a unique hatha class focusing on a water-flow approach to your health, fitness and
            wellness. My style integrates the physical, mental, emotional and spiritual aspect of wellness to
            create a satisfying session of complete mind and body fitness.
          .block
            | I have over 20 years experience as a practitioner of yoga and martial arts, with an RYT-200
            | instructor certification from
            |
            a(href="https://santoshayogainstitute.edu.au/yoga-teacher-training/200-hour-ytt-bali/")
              | Santosha Yoga Institute
            | .

          .block.
            My yoga
            journey started whilst seeking relaxation and rest from the busyness of living in a
            fast paced world of study and work. My martial arts practice ranges,
            from Aikido to Brazilian Jiu Jitsu to Muay Thai.
          .block.
            I am passionate about breathing in and living in the present moment, using yoga to encourage
            peaceful meditation. My classes are full of joyful variations suitable for practitioners
            of any experience level, at any stage of life.

          | For the most junior yogis, I'm certified in children's yoga with
          |
          a(href="https://www.itsyogakids.com/training")
            | It's Yoga Kids
          | ,
          | and have a Working With Children Check. Other classes include teenagers, couples, friend groups,
          | mama-baby, special needs, senior, yoga for cyclists and runners, and more.

        .column
          .box
            enhanced:img(src="/src/lib/assets/tabletop.jpg")

</template>

<style>

</style>
