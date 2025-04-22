<script lang="ts">
  import Section from "$lib/components/Section.svelte";
  import { type Client } from "./+page";
  import storm from "$lib/assets/abstract/storm.jpg";

  let { data } = $props();

  const clients: Client[] = data.clients;
</script>

<template>
  <enhanced:img class="backdrop" src="/src/lib/assets/dancer_pose.jpg" />

  <header class="is-flex">
    <div class="columns is-flex-grow-1">
      <div class="column is-three-fifths p-0"></div>
      <div class="column is-two-fifths is-flex has-text-right">
        <div class="tinted is-flex is-flex-grow-1 is-justify-content-flex-end">
          <div class="section is-flex is-flex-direction-column is-justify-content-space-between">
            <div class="block">
              <h1 class="title is-size-1 has-text-white">Micki Yoga</h1>
              <h2 class="subtitle has-text-white">Micaela 'Micki' Romero</h2>
            </div>
            <div class="block">
              <a class="block-link" href="/longevity"> Mental Independence and Longevity Sherpa </a>
              <a class="block-link mb-5" href="/yin">
                Yin Yoga: The Key to Deep Release and Longevity
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <Section class="has-background-white">
    <div class="container is-max-desktop has-text-centered">
      <h1 class="title">Join my other happy clients</h1>
    </div>
  </Section>

  <Section class="has-background-white">
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

  <Section id="contact" class="has-background-white">
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
      <div id="email-enquiry" class="box">
        <!-- Email redirection service for static sites, courtesy of https://formspree.io/ -->
        <h2 class="has-text-centered">Or send a quick enquiry</h2>
        <form action="https://formspree.io/info@micki.yoga" method="POST">
          <div class="field">
            <label class="label" for="email-name"> Name </label>
            <div class="control has-icons-left">
              <input id="email-name" class="input" type="text" name="name" />
              <span class="icon is-small is-left">
                <i class="far fa-circle-user"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label" for="email-address"> Email </label>
            <div class="control has-icons-left">
              <input id="email-address" class="input" type="email" name="_replyto" />
              <span class="icon is-small is-left">
                <i class="far fa-envelope"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label" for="email-body"> Enquiry </label>
            <div class="control">
              <textarea
                id="email-body"
                class="textarea"
                rows="3"
                name="enquiry"
                placeholder="Hi Micki..."
              ></textarea>
            </div>
          </div>
          <div class="field">
            <div class="control has-text-centered">
              <button class="button is-link" type="submit" value="Send"> Send </button>
            </div>
          </div>
          <input type="hidden" name="_subject" value="Client enquiry from micki.yoga website!" />
        </form>
      </div>
    </div>
  </Section>
</template>

<style>
  .backdrop {
    position: fixed;
    min-height: 100%;
    object-fit: cover;
    object-position: 30% 50%;
    z-index: -999;
  }

  header {
    min-height: calc(100vh - var(--bulma-navbar-height));
  }

  .tinted {
    background-image: linear-gradient(transparent, transparent, hsla(182, 59%, 11%, 0.5));
    backdrop-filter: blur(0.5ex);
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
