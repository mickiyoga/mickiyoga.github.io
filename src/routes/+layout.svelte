<script lang="ts">
	import { setContext, onMount } from 'svelte';
  import logoBlue from "$lib/assets/logo-small-blue.png";
  import logoBlack from "$lib/assets/logo-small-black.png";
  import { fade } from 'svelte/transition';
  import { page } from '$app/state';

  // Useful for showing a reminder for clients hitting the preview site
  const OFFICIAL_URL = "https://micki.yoga";

	let { children, data } = $props();

	let showMenu = $state<boolean>(false);
  let showPreviewModal = $state<boolean>(false);

	function toggleBurger() {
		showMenu = !showMenu;
	}

  function getCopyrightYear(): string {
    return new Date(Date.now()).getFullYear().toString();
  }

  function hidePreviewModal(): void {
    showPreviewModal = false;
  }

  function goToOfficialSite(): void {
    window.location.href = OFFICIAL_URL;
  }

	setContext('iconCtx', {
		size: '20' // Global Ionicon size in pixels
	});

  onMount(() => {
    showPreviewModal = ![OFFICIAL_URL, "127.0.0.1"].some(url => window.location.href.includes(url));
  });

</script>

<template lang="pug">
  svelte:head
    title Micki Yoga

    meta(charset="utf-8")
    meta(name="title" content="Micki Yoga")
    meta(name="description" content="Micki Romero yoga and hypnotherapy.")
    meta(name="author" content="James Manley and Micaela Romero")
    meta(name="language" content="english")
    meta(name="viewport" content="width=device-width, initial-scale=1")

    meta(property="og:title" content="Micki Romero yoga and hypnotherapy")
    meta(property="og:type" content="website")
    meta(property="og:url" content!="{OFFICIAL_URL}")
    meta(property="og:image" content!="{OFFICIAL_URL}/media/logo.png")
    meta(property="og:image:alt" content="Micki Yoga Logo")
    meta(property="og:description" content="Micki Romero yoga and hypnotherapy.")

  nav.navbar.is-fixed-top(role="navigation" aria-label="main navigation")
    .navbar-brand
      a.navbar-item(href="/")
        img(src!="{logoBlue}")

      a.navbar-burger(
        onclick!="{toggleBurger}" 
        class:is-active!="{showMenu}"
        role="button"
        aria-label="menu" 
        aria-expanded="false" 
      )
        span(aria-hidden="true")
        span(aria-hidden="true")
        span(aria-hidden="true")
        span(aria-hidden="true")

    .navbar-menu(class:is-active!="{showMenu}")
      .navbar-start
        a.navbar-item(href="/about") About Me
        a.navbar-item(href="/longevity") Longevity
        a.navbar-item Executive Performance
        a.navbar-item Transformation Coach
        .navbar-item.has-dropdown.is-hoverable
          a.navbar-link More
          .navbar-dropdown
            a.navbar-item(href="/yoga") Yoga
            a.navbar-item(href="/nlp") NLP & Hypnotherapy
            a.navbar-item Sound Healing
            hr.navbar-divider
            a.navbar-item(href="/pilates") Pilates
            a.navbar-item(href="/pt") Personal Training
            a.navbar-item Spin Cycling
            a.navbar-item Myobility
            hr.navbar-divider
            a.navbar-item Art

      .navbar-end
        .navbar-item
          a(href="https://www.facebook.com/Micki.yogaFitness")
            span.icon.is-large.has-text-link
              ion-icon(name="logo-facebook" size="large")
        .navbar-item
          a(href="https://www.instagram.com/mickiyoga_dailydose")
            span.icon.is-large.has-text-link
              ion-icon(name="logo-instagram" size="large")
        .navbar-item
          a(href="/#contact")
            span.icon.is-large.has-text-link
              ion-icon(name="mail-outline" size="large")

  //- Page transition effect
  +key("data.currentRoute")
    main.full-height(in:fade!="{{ duration: 150, delay: 150 }}", out:fade!="{{ duration: 150 }}")
      | {@render children()}

  .footer 
    .container.has-text-centered
      img(src!="{logoBlack}" alt="Micki Yoga logo")
      .is-size-7 © Micaela Romero {getCopyrightYear()}

  //- Warning modal for preview site
  .modal(class:is-active!="{showPreviewModal}")
    .modal-background
    .modal-content
      .card
        .card-content
          .block.has-text-centered
            | Your are viewing an in-development preview.
          .level
            .level-item
              .button(onclick!="{goToOfficialSite}")
                | Go to the official site
            .level-item
              .button(onclick!="{hidePreviewModal}")
                | Continue to the preview site
</template>

<style>
	/* From https://fonts.google.com/selection/embed */
	@import url('https://fonts.googleapis.com/css2?family=Aboreto&display=swap');

	@import 'https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css';

	:root {
		/* As per https://bulma.io/documentation/helpers/color-helpers/ */
		--bulma-family-secondary: 'Aboreto', serif;
    --bulma-weight-light: 200;
    --bulma-weight-normal: 300;
    --bulma-weight-extrabold: 350;

		--bulma-primary-h: 170deg;
		--bulma-primary-s: 40%;
		--bulma-primary-l: 60%;
    --bulma-link-h: 190deg;
    --bulma-link-s: 65%;
    --bulma-link-l: 50%;

		--custom-font-branded: 'Aboreto', serif;
		--custom-overlay: hsl(0, 0%, 100%, 70%);
	}

	.full-height {
		min-height: calc(100vh - var(--bulma-navbar-height)); 
	}

</style>
