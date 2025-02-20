<script lang="ts">

</script>

<template lang="pug">
  header.section.opal.is-flex.is-flex-direction-column.is-justify-content-center
    .box.frosted
      .block
        | I am based in the San Francisco Bay Area.
      .block
        | My style and own view of teaching asanas (yoga poses) can be described as
      .block.has-text-centered
        p martial arts meets yogi,
        p healing, gentle ray of sunshine,
        p challenging with a focus on alignment & breath,
        p mellow and wise,
        p soulful and sweaty,
        p focused and grounding,
        p playful flows,
        p strong and calming,
        p peaceful moving meditation,
        p powerful, deep and nourishing,
        p enthusiastic, playful and energetic,
        p knowledgeable,
        p calm & centred with a new perception.
      .block
        | Try various ranges from my cool-as-a-cucumber
        |
        a(href="/yoga")
          yoga
        |
        | cardio yoga, or powerhouse 
        |
        a(href="/pt")
          | personal training
        |.
      .block
        | Instruction in Spanish is also available.
      .block
        | See you on your mat!

</template>

<style>
  header {
    min-height: calc(100vh - var(--bulma-navbar-height)); 
  }

  .opal {
    background-image: url('$lib/assets/white_opal.jpg');
    background-size: cover;
    background-position-x: center;
    background-position-y: 50%;
    height: 100vh;
  }

  .frosted {
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(5px);
  }
</style>
