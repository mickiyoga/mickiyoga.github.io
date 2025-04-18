<script lang="ts">
  import ContentPage from "$lib/components/ContentPage.svelte";
</script>

<template>
  <ContentPage title="Yoga" divider="rockpool">
    {#snippet subSnippet()}
      <ul>
        <li>Kids</li>
        <li>Individuals</li>
        <li>Groups</li>
      </ul>
    {/snippet}

    <p>
      On offer is a unique hatha class focusing on a water-flow approach to your health, fitness and
      wellness. My style integrates the physical, mental, emotional and spiritual aspect of wellness
      to create a satisfying session of complete mind and body fitness.
    </p>
    <p>
      I have over 20 years experience as a practitioner of yoga and martial arts, with an RYT-200
      instructor certification from
      <a href="https://santoshayogainstitute.edu.au/yoga-teacher-training/200-hour-ytt-bali/">
        Santosha Yoga Institute
      </a>.
    </p>
    <p>
      My yoga journey started whilst seeking relaxation and rest from the busyness of living in a
      fast paced world of study and work. My martial arts practice ranges, from Aikido to Brazilian
      Jiu Jitsu to Muay Thai.
    </p>
    <p>
      I am passionate about breathing in and living in the present moment, using yoga to encourage
      peaceful meditation. My classes are full of joyful variations suitable for practitioners of
      any experience level, at any stage of life.
    </p>
    <p>
      For the most junior yogis, I'm certified in children's yoga with
      <a href="https://www.itsyogakids.com/training">It's Yoga Kids</a>, and have a Working With
      Children Check. Other classes include teenagers, couples, friend groups, mama-baby, special
      needs, senior, yoga for cyclists and runners, and more.
    </p>
    <div class="box">
      <enhanced:img src="/src/lib/assets/tabletop.jpg" />
    </div>
  </ContentPage>
</template>

<style>
</style>
