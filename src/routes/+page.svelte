<script lang="ts">
  import { type Client } from "./+page"

  let { data } = $props();

  const clients: Client[] = data.clients;
</script>

<template lang="pug">
  enhanced:img.backdrop(src="/src/lib/assets/dancer_pose.jpg")

  header.is-flex
    .columns.is-flex-grow-1
      .column.is-three-fifths.p-0
      .column.is-two-fifths.is-flex.has-text-right
        .tinted.is-flex.is-flex-grow-1.is-justify-content-flex-end
          .section.is-flex.is-flex-direction-column.is-justify-content-space-between
            .block
              h1.title.is-size-1.has-text-white Micki Yoga
              h2.subtitle.has-text-white Micaela 'Micki' Romero
            .block
              a.block-link(href="/longevity")
                | Mental Independence and Longevity Sherpa
              a.block-link(href="#")
                | Executive Life and Performance Coach

  section.section.has-background-white
    .container.is-max-desktop.has-text-centered
      h1.title
        | Join my other happy clients

  section.section.has-background-white
    .is-flex.is-flex-wrap-wrap.is-justify-content-space-evenly.is-align-items-center
      +each("clients as { url, logo }")
        .cell.is-grow-0
          a(href!="{url}")
            figure.image.m-5.client-logo
              enhanced:img(
                src!="{logo}" 
                sizes="(min-width:1920px) 256px, (min-width:1080px) 128px, (min-width:768px) 64px"
              )

  section#contact.section.has-background-white
    .container.is-max-desktop.has-text-centered
      h1.title
        | Contact
      h2.subtitle
        | Please email 
        |
        a(href="mailto:info@micki.yoga") 
          | info@micki.yoga
        |
        | for enquiries
        
  section.section.has-background-storm
    .container.is-max-desktop
      .box
        //- Email redirection service for static sites, courtesy of https://formspree.io/
        p.has-text-centered
          | Or contact me directly
        form#email-enquiry(action="https://formspree.io/info@micki.yoga" method="POST")
          .field
            label.label(for="email-name")
              | Name
            .control.has-icons-left
              input#email-name.input(type="text" name="name")
              span.icon.is-small.is-left
                i.far.fa-circle-user
          .field
            label.label(for="email-address")
              | Email
            .control.has-icons-left
              input#email-address.input(type="email" name="_replyto")
              span.icon.is-small.is-left
                i.far.fa-envelope
          .field
            label.label(for="email-body")
              | Enquiry
            .control
              textarea#email-body.textarea(rows="3" name="enquiry" placeholder="Hi Micki...")
          .field
            .control.has-text-centered
              button.button.is-link(type="submit" value="Send")
                | Send
          input(type="hidden" name="_subject" value="Client enquiry from micki.yoga website!")

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

  /* .fancy-list {
    padding-left: 2ex;
    list-style-type: circle;
    list-style-position: outside;
  } */

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

  .has-background-storm {
    background-image: url("$lib/assets/abstract/storm.jpg");
    background-size: cover;
  }

  .client-logo {
    max-width: 30vw;
  }

</style>
