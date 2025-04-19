<script lang="ts">
  import ContentPage from "$lib/components/ContentPage.svelte";
</script>

<template>
  <ContentPage title="About Micaela" divider="spray" class="has-text-centered">
    <p>I am a California native, based in the San Francisco Bay Area.</p>
    <p>My style and own view of teaching asanas (yoga poses) can be described as -</p>
    <div class="box has-background-primary has-text-white has-text-weight-semibold">
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
    <div class="box is-clipped p-0">
      <enhanced:img class="image" src="/src/lib/assets/white_opal.jpg" />
    </div>
    <p>
      Try various ranges from my cool-as-a-cucumber
      <a href="/yoga"> yoga </a>, cardio yoga, or powerhouse
      <a href="/pt"> personal training </a>.
    </p>
    <p>Instruction in Spanish is also available.</p>
    <p>See you on your mat!</p>
  </ContentPage>
</template>

<style>
</style>
