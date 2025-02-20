<script lang="ts">
	import type { ContactContent } from './+page';

  let { data } = $props();

  const { Content } = data as ContactContent; 

</script>

<template lang="pug">
  section.section
    .title Contact

  section.section
    .container
      Content

</template>

<style>
</style>
