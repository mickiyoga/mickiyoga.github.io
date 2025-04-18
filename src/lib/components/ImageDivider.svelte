<script lang="ts">
  let props = $props();

  function getEnhancedImage() {
    const images = import.meta.glob("/src/lib/assets/abstract/*.jpg", {
      eager: true,
      query: { enhanced: true },
      import: "default"
    }) as Record<string, string>;

    return images[`/src/lib/assets/abstract/${props.image ?? "ocean"}.jpg`];
  }
</script>

<template>
  <div class="image-divider">
    <enhanced:img src={getEnhancedImage()} sizes="min(1em, 100vw)" />
  </div>
</template>

<style>
  .image-divider {
    height: 1em;
    min-width: 100vw;
    overflow: hidden;
  }
</style>
