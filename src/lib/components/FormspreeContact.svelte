<script>
  import { PUBLIC_FORMSPREE_ID } from "$env/static/public";
</script>

<div id="email-enquiry" class="box">
  <!-- Email redirection service for static sites, courtesy of https://formspree.io/ -->
  <h2 class="has-text-centered">Or send a quick enquiry</h2>
  <form action="https://formspree.io/{PUBLIC_FORMSPREE_ID}" method="POST">
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
        <textarea id="email-body" class="textarea" rows="3" name="enquiry" placeholder="Hi Micki..."
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
