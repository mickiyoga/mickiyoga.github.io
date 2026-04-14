<script lang="ts">
  import Section from "$lib/components/Section.svelte";
  import { type Client } from "./+page";
  import storm from "$lib/assets/abstract/storm.jpg";
  import FormspreeContact from "$lib/components/FormspreeContact.svelte";
  import ContactForm from "$lib/components/ContactForm.svelte";

  let { data } = $props();

  const clients: Client[] = $derived(data.clients);
</script>

<enhanced:img class="backdrop" src="/src/lib/assets/dancer_pose.jpg" />

<header class="is-flex is-justify-content-flex-end">
  <div class="tinted is-flex is-justify-content-flex-end has-text-right">
    <div class="section is-flex is-flex-direction-column is-justify-content-space-between">
      <div class="block">
        <h1 class="title is-size-1 has-text-white">Micki Yoga</h1>
        <h2 class="subtitle has-text-white">Micaela 'Micki' Romero</h2>
      </div>
      <div class="block">
        <a class="block-link" href="/longevity"> Mental Independence and Longevity Sherpa </a>
        <a class="block-link mb-5" href="/yin"> Yin Yoga: The Key to Deep Release and Longevity </a>
      </div>
    </div>
  </div>
</header>

<Section sectionClass="has-background-white">
  <div class="container is-max-desktop has-text-centered">
    <h1 class="title">Join my other happy clients</h1>
  </div>
</Section>

<Section sectionClass="has-background-white">
  <div class="is-flex is-flex-wrap-wrap is-justify-content-space-evenly is-align-items-center">
    {#each clients as { url, logo }}
      <div class="cell is-grow-0">
        <a href={url} aria-label="Home">
          <figure class="image m-5 client-logo">
            <enhanced:img
              src={logo}
              sizes="(min-width:1920px) 256px, (min-width:1080px) 128px, (min-width:768px) 64px"
            />
          </figure>
        </a>
      </div>
    {/each}
  </div>
</Section>

<Section id="contact" sectionClass="has-background-white">
  <div class="container is-max-desktop has-text-centered">
    <h2 class="subtitle">
      You can email me at
      <a href="mailto:info@micki.yoga">info@micki.yoga</a>
    </h2>
  </div>
</Section>

<Section backgroundImage={storm}>
  <div class="container is-max-desktop">
    <!-- TODO: Enable when zcal is set up. -->
    <!-- <div id="booking">
      <script
        type="text/javascript"
        async
        src="https://static.zcal.co/embed/v1/embed.js"
      ></script>
      <div class="zcal-inline-widget">
        <a href="https://zcal.co/i/Cr77ujp5">Book a session - Schedule a meeting</a>
      </div>
    </div> -->
    <FormspreeContact />
  </div>
  <div class="container is-max-desktop">
    <ContactForm />
  </div>
</Section>

<style>
  .backdrop {
    position: fixed;
    min-height: 100%;
    object-fit: cover;
    object-position: 15% 50%;
    z-index: -999;
  }

  header {
    min-height: calc(100vh - var(--bulma-navbar-height));
  }

  .tinted {
    background-image: linear-gradient(
      hsla(190, 70%, 50%, 0.8),
      transparent,
      transparent,
      hsla(190, 70%, 10%, 0.8)
    );
    width: 100%;
  }

  /* Desktop views can be a bit fancier with the header image. */
  /* There isn't a bulma var for the 768px break point??? */
  @media only screen and (min-width: 769px) {
    .tinted {
      backdrop-filter: blur(0.6ex);
      max-width: 40%;
    }

    .backdrop {
      object-position: 30% 50%;
    }
  }

  .block-link {
    display: block;
    border-bottom: 1px solid white;
    color: white;
    padding: 1ex;
    margin: 1ex;
  }

  .block-link:hover {
    color: var(--bulma-link);
  }

  .client-logo {
    max-width: 30vw;
  }
</style>
