<script lang="ts">
  import Section from "$lib/components/Section.svelte";
</script>

<template>
  <Section class="has-text-centered">
    <div class="container">
      <p class="block">I am based in the San Francisco Bay Area.</p>
      <p class="block">
        My style and own view of teaching asanas (yoga poses) can be described as -
      </p>
    </div>
  </Section>

  <Section class="has-background-primary has-text-white has-text-weight-semibold">
    <div class="container">
      <div class="columns">
        <div class="column is-three-fifths has-text-centered">
          <p>martial arts meets yogi,</p>
          <p>healing, gentle ray of sunshine,</p>
          <p>challenging with a focus on alignment & breath,</p>
          <p>mellow and wise,</p>
          <p>soulful and sweaty,</p>
          <p>focused and grounding,</p>
          <p>playful flows,</p>
          <p>strong and calming,</p>
          <p>peaceful moving meditation,</p>
          <p>powerful, deep and nourishing,</p>
          <p>enthusiastic, playful and energetic,</p>
          <p>knowledgeable,</p>
          <p>calm & centred with a new perception.</p>
        </div>
        <div class="column is-two-fifths">
          <div class="box is-clipped p-0">
            <enhanced:img class="image" src="/src/lib/assets/white_opal.jpg" />
          </div>
        </div>
      </div>
    </div>
  </Section>

  <Section class="has-text-centered">
    <div class="container">
      <p class="block">
        Try various ranges from my cool-as-a-cucumber
        <a href="/yoga"> yoga </a>, cardio yoga, or powerhouse
        <a href="/pt"> personal training </a>.
      </p>
      <p class="block">Instruction in Spanish is also available.</p>
      <p class="block">See you on your mat!</p>
    </div></Section
  >
</template>

<style>
</style>
