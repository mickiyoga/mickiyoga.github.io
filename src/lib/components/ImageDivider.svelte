<script lang="ts">
	let props = $props();

	function getImage() {
		return props.image ?? 'ocean';
	}
</script>

<template lang="pug">
  .image-divider(class!="{getImage()}")
</template>

<style>
	.image-divider {
		height: 1em;
		width: 100vw;
	}

	.agua {
		background-image: url('$lib/assets/abstract/agua.jpg');
	}

	.ocean {
		background-image: url('$lib/assets/abstract/ocean.jpg');
	}

	.rockpool {
		background-image: url('$lib/assets/abstract/rockpool.jpg');
	}

	.spray {
		background-image: url('$lib/assets/abstract/spray.jpg');
	}

	.storm {
		background-image: url('$lib/assets/abstract/storm.jpg');
	}
</style>
