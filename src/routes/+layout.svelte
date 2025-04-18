<script lang="ts">
  import { setContext, onMount } from "svelte";
  import logoBlue from "$lib/assets/logo-small-blue.png";
  import logoBlack from "$lib/assets/logo-small-black.png";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";

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

  function setupCalendly() {
    if (!browser) {
      return;
    }

    (window.Calendly as unknown).initBadgeWidget({
      url: "https://calendly.com/micaelacarmenromero/turning-house-hunters-into-homeowners",
      text: "Book a session with me",
      branding: false
    });

    document
      .querySelector(".calendly-badge-content")
      ?.classList.add("has-text-white", "has-background-link");
  }

  setContext("iconCtx", {
    size: "20" // Global Ionicon size in pixels
  });

  onMount(() => {
    showPreviewModal = ![OFFICIAL_URL, "127.0.0.1"].some((url) =>
      window.location.href.includes(url)
    );
  });
</script>

<svelte:head>
  <title>Micki Yoga</title>

  <meta charset="utf-8" />
  <meta name="title" content="Micki Yoga" />
  <meta name="description" content="Micki Romero Yoga." />
  <meta name="author" content="Micaela Romero and James Manley" />
  <meta name="language" content="english" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <meta property="og:title" content="Micki Romero Yoga" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={OFFICIAL_URL} />
  <meta property="og:image" content="{OFFICIAL_URL}/media/logo.png" />
  <meta property="og:image:alt" content="Micki Yoga Logo" />
  <meta property="og:description" content="Micki Romero Yoga." />

  <script
    src="https://assets.calendly.com/assets/external/widget.js"
    type="text/javascript"
    async
    onload={setupCalendly}
  ></script>
</svelte:head>

<template>
  <nav class="navbar is-fixed-top" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/" aria-label="Home">
        <img src={logoBlue} alt="Home" />
      </a>

      <a
        class={["navbar-burger", showMenu && "is-active"]}
        onclick={toggleBurger}
        role="button"
        aria-label="menu"
        aria-expanded="false"
        href="#top"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class={["navbar-menu", showMenu && "is-active"]}>
      <div class="navbar-start">
        <a class="navbar-item" href="/about"> About Me </a>
        <a class="navbar-item" href="/yin"> Yin Yoga </a>
        <a class="navbar-item" href="/longevity"> Longevity </a>
        <a class="navbar-item" href="/transformation"> Transformation Coach </a>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" href="#top"> More </a>
          <div class="navbar-dropdown">
            <a class="navbar-item" href="/yoga"> Yoga </a>
            <a class="navbar-item" href="/nlp"> NLP & Hypnotherapy </a>
            <!-- <a class="navbar-item" href="/sound-healing">Sound Healing</a> -->
            <hr class="navbar-divider" />
            <a class="navbar-item" href="/pilates"> Pilates </a>
            <a class="navbar-item" href="/pt"> Personal Training </a>
            <a class="navbar-item" href="/myobility"> Myobility </a>
            <!-- <hr class="navbar-divider" /> -->
            <!-- <a class="navbar-item" href="/art">Art</a> -->
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <a
            class="icon is-medium"
            href="https://www.facebook.com/Micki.yogaFitness"
            aria-label="Facebook"
          >
            <i class="fab fa-xl fa-facebook"></i>
          </a>
          <a
            class="icon is-medium"
            href="https://www.instagram.com/mickiyoga_dailydose"
            aria-label="Instagram"
          >
            <i class="fab fa-xl fa-instagram"></i>
          </a>
          <a class="icon is-medium" href="/#contact" aria-label="Contact">
            <i class="fa fa-xl fa-message"></i>
          </a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Page transition effect -->
  {#key data.currentRoute}
    <main class="full-height" in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
      {@render children()}
    </main>
  {/key}

  <footer class="footer">
    <div class="container has-text-centered">
      <img src={logoBlack} alt="Micki Yoga logo" />
      <div class="is-size-7">
        © Micaela Romero {getCopyrightYear()}
      </div>
    </div>
  </footer>

  <!-- Warning modal for preview site -->
  <modal class={["modal", showPreviewModal && "is-active"]}>
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-content">
          <div class="block has-text-centered">Your are viewing an in-development preview.</div>
          <div class="level">
            <div class="level-item">
              <button onclick={goToOfficialSite}> Go to the official site </button>
            </div>
            <div class="level-item">
              <button onclick={hidePreviewModal}> Continue to the preview site </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<style>
  /* From https://fonts.google.com/selection/embed */
  @import url("https://fonts.googleapis.com/css2?family=Aboreto&display=swap");

  @import "https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css";
  @import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css";

  /* Calendly popup button styling */
  @import url("https://assets.calendly.com/assets/external/widget.css");

  :root {
    /* As per https://bulma.io/documentation/helpers/color-helpers/ */
    --bulma-family-secondary: "Aboreto", serif;
    --bulma-weight-light: 200;
    --bulma-weight-normal: 300;
    --bulma-weight-extrabold: 350;

    --bulma-primary-h: 170deg;
    --bulma-primary-s: 40%;
    --bulma-primary-l: 60%;
    --bulma-link-h: 190deg;
    --bulma-link-s: 65%;
    --bulma-link-l: 50%;

    --custom-font-branded: "Aboreto", serif;
    --custom-overlay: hsl(0, 0%, 100%, 70%);
  }

  .full-height {
    min-height: calc(100vh - var(--bulma-navbar-height));
  }

  /* TODO: Will be used for content from CMS - so add this */
  /* Content generated from CMS markdown files */
  /* There isn't a bulma var for the 768px break point??? */
  @media only screen and (min-width: 769px) {
    :global(.content.markdown-columns) {
      column-count: 2;
      column-gap: calc(var(--bulma-column-gap) + (var(--bulma-block-spacing) * 2));
    }

    :global(.content.markdown-columns h1) {
      column-span: all;
    }

    :global(.content.markdown-columns h1, h2, h3, h4, h5, h6) {
      break-after: avoid;
    }

    :global(.content.markdown-columns p, div) {
      break-inside: avoid;
    }
  }
</style>
