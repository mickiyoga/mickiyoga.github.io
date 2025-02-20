<script lang="ts">

</script>

<template lang="pug">
  header.mountain.is-flex
    .columns.is-flex-grow-1
      .column.is-one-third.is-flex
        .tinted.is-flex.is-flex-grow-1
          .section.is-flex.is-flex-direction-column.is-justify-content-space-between
            .block
              h1.title.is-size-1.has-text-white Micki Yoga
              h2.subtitle.has-text-white Micaela 'Micki' Romero
            //- .block
            //-   h2
            //-     a.has-text-white(href="#longevity")
            //-       | Mental Independence and Longevity Sherpa
            //-   h2
            //-     a.has-text-white(href="#performance")
            //-       | Executive Life and Performance Coach
            //- .block
            //-   ion-list  
            //-     ion-item.has-text-white
            //-       ion-icon(name="link-outline" item-start)
            //-       a.has-text-white(href="#longevity")
            //-         | Mental Independence and Longevity Sherpa
            //- .block
            //-   ul.fancy-list.has-text-white
            //-     li
            //-       a.has-text-white(href="/longevity")
            //-         | Mental Independence and Longevity Sherpa
            //-     li
            //-       a.has-text-white(href="/performance")
            //-         | Executive Life and Performance Coach
            .block
              a.block-link(href="/longevity")
                | Mental Independence and Longevity Sherpa
              a.block-link(href="/performance")
                | Executive Life and Performance Coach

  section#contact.section
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
  section.section.has-background-primary
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
                ion-icon.text-soft(name="person-circle-outline")
          .field
            label.label(for="email-address")
              | Email
            .control.has-icons-left
              input#email-address.input(type="email" name="_replyto")
              span.icon.is-small.is-left
                ion-icon.text-soft(name="mail-outline")
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
  header {
    min-height: calc(100vh - var(--bulma-navbar-height)); 
  }

	/* .font-branded {
		font-family: var(--custom-font-branded);
	} */

  .mountain {
    background-image: url('$lib/assets/mountain.jpg');
    background-attachment: fixed;
    background-position-x: center;
    background-position-y: 50%;
    background-size: cover;
  }

  /* Bulma's mobile break point (columns stacked) */
  @media only screen and (max-width: 769px) {
    .mountain {
      background-size: 120vh;
      background-position-y: top;
    }
  }

  .tinted {
    background-image: linear-gradient(transparent, transparent, hsla(182, 59%, 11%, 0.5));
    backdrop-filter: blur(0.5ex);
  }

  .fancy-list {
    padding-left: 2ex;
    list-style-type: circle;
    list-style-position: outside;
    /* list-style-image: url('$lib/assets/logo-small-white.png'); */
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

</style>
