<!--
  @component
  Contact form with a client-side email verification step, backed by FormSubmit.co.

  The visitor enters their name and email, receives a 4-digit code via FormSubmit's
  auto-response, and must enter it before the message field is revealed. Pending
  verification state is persisted in sessionStorage so it survives the redirect
  back from FormSubmit. The storage key is the configured base plus the current
  route's pathname, so forms on different pages are isolated automatically.

  Intended for static / prerendered sites. The code and form ID are not secret;
  this is a data-integrity aid (catching mistyped addresses), not authentication.

  Configuration via environment: PUBLIC_CONTACT_FORM_ID.
-->

<script lang="ts">
  import { browser } from "$app/environment";
  import { PUBLIC_CONTACT_FORM_ID, PUBLIC_CONTACT_FORM_STORAGE_KEY } from "$env/static/public";

  type Step = "ready" | "code" | "expired" | "exhausted" | "verified" | "submitting" | "success";

  interface Location {
    provider: string;
    ip: string;
    city: string;
    region: string;
    country: string;
  }

  const MAX_ATTEMPTS = 3;
  const EXPIRY_MS = 600_000;
  const HTML_ENDPOINT = `https://formsubmit.co/${PUBLIC_CONTACT_FORM_ID}`;
  const AJAX_ENDPOINT = `https://formsubmit.co/ajax/${PUBLIC_CONTACT_FORM_ID}`;

  // `sessionStorage` does not exist during SSR / prerender; the store
  // degrades to a no-op there. All real usage is in client-only code paths.
  const pendingStore = createPendingStore(
    browser ? sessionStorage : null,
    PUBLIC_CONTACT_FORM_STORAGE_KEY,
    EXPIRY_MS
  );

  let step: Step = $state("ready");
  let name = $state("");
  let email = $state("");
  let message = $state("");
  let enteredCode = $state("");
  let attempts = $state(0);
  let expiresAt = $state(0);
  let now = $state(Date.now());
  let formError = $state("");
  let codeError = $state("");

  let generatedCode = "";

  const remainingMs = $derived(Math.max(0, expiresAt - now));
  let locked = $state(false);

  let autoResponseInput = $state<HTMLInputElement>();
  let nextInput = $state<HTMLInputElement>();
  let codeInput = $state<HTMLInputElement>();

  $effect(() => {
    if (step === "exhausted") {
      locked = true;
      return;
    }

    if (step === "code" && expiresAt > 0 && now >= expiresAt) {
      step = "expired";
      locked = true;
    }
  });

  $effect(() => {
    const pending = pendingStore.load();
    if (!pending) return;

    name = pending.name;
    email = pending.email;
    generatedCode = pending.code;
    expiresAt = pending.ts + EXPIRY_MS;
    step = "code";
  });

  $effect(() => {
    if (step !== "code") return;

    now = Date.now();
    const id = setInterval(() => {
      now = Date.now();
    }, 1000);
    return () => clearInterval(id);
  });

  $effect(() => {
    if (step === "code") codeInput?.focus();
  });

  function onsubmit(event: SubmitEvent): void {
    clearErrors();

    if (step === "code") {
      event.preventDefault();
      verifyCode();
      return;
    }

    if (step === "verified") {
      event.preventDefault();
      void sendMessage();
      return;
    }

    generatedCode = generateCode();

    try {
      pendingStore.save({ code: generatedCode, name, email });
    } catch {
      event.preventDefault();
      generatedCode = "";
      formError =
        "Could not save verification state. If you are using private browsing, please try a regular window.";
      return;
    }

    if (autoResponseInput) {
      autoResponseInput.value = `Your verification code is: ${generatedCode}\n\nEnter this code on the website to continue.`;
    }
    if (nextInput) {
      nextInput.value = window.location.href;
    }
  }

  async function sendMessage(): Promise<void> {
    if (!message.trim()) {
      formError = "Please enter a message.";
      return;
    }

    step = "submitting";
    try {
      const location = await getLocationDescription();

      const messageWithLocation = `
${message}

==================
User location data
==================

${location}
      `;

      const result = await fetch(AJAX_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: messageWithLocation,
          _subject: "Contact Form Submission"
        })
      });

      const data: { success?: string | boolean; message?: string } = await result.json();

      if (result.ok && data.success) {
        resetAll();
      } else {
        formError = data.message ?? "Failed to send message. Please try again.";
      }
    } catch {
      formError = "Network error. Please check your connection and try again.";
      step = "verified";
    } finally {
      step = "success";
    }
  }

  async function getLocationDescription(): Promise<String> {
    const response = await fetch("https://free.freeipapi.com/api/json");
    const data = await response.json();

    return `IP Address: ${data.ipAddress}
Service Provider: ${data.asnOrganization}
City: ${data.cityName}
Region: ${data.regionName}
Country: ${data.countryName}
    `;
  }

  function handleCodeInput(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    input.value = sanitizeCodeInput(input.value);
    enteredCode = input.value;
    if (codeError) codeError = "";
  }

  function handleCodeKeydown(event: KeyboardEvent): void {
    if (event.key === "Enter" && !locked) {
      event.preventDefault();
      verifyCode();
    }
  }

  function verifyCode(): void {
    if (enteredCode.length !== 4) {
      codeError = "Please enter all 4 digits.";
      return;
    }

    if (enteredCode === generatedCode) {
      step = "verified";

      expiresAt = 0;
      pendingStore.clear();
      resetVerificationState();
      return;
    }

    attempts++;
    enteredCode = "";
    codeError = incorrectCodeMessage(attempts, MAX_ATTEMPTS);
    codeInput?.focus();
  }

  function resetVerificationState(): void {
    enteredCode = "";
    attempts = 0;
    codeError = "";
  }

  function resetAll(): void {
    name = "";
    email = "";
    message = "";
    generatedCode = "";
    step = "ready";

    expiresAt = 0;
    resetVerificationState();
    pendingStore.clear();
  }

  function clearErrors(): void {
    formError = "";
  }

  interface PendingVerification {
    code: string;
    name: string;
    email: string;
    ts: number;
  }

  function generateCode(rng: () => number = Math.random): string {
    const n = 1000 + Math.floor(rng() * 9000);
    return String(Math.min(n, 9999));
  }

  function formatCountdown(ms: number): string {
    const total = Math.ceil(Math.max(0, ms) / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  function sanitizeCodeInput(raw: string): string {
    return raw.replace(/\D/g, "").slice(0, 4);
  }

  function incorrectCodeMessage(attempts: number, max: number): string {
    if (attempts >= max) return "Too many incorrect attempts.";
    const left = max - attempts;
    return `Incorrect code. ${left} attempt${left === 1 ? "" : "s"} remaining.`;
  }

  /* ---------- sessionStorage wrapper ----------------------------------- */

  interface PendingStore {
    save(p: Omit<PendingVerification, "ts">): void;
    load(): PendingVerification | null;
    clear(): void;
  }

  /**
   * `storage` may be null/undefined (e.g. during SSR / prerender). In that
   * case all operations are no-ops and `load()` returns null.
   *
   * `save()` deliberately does NOT swallow storage errors — the component
   * relies on the exception to detect private-browsing / quota failures.
   */
  function createPendingStore(
    storage: Storage | null | undefined,
    key: string,
    expiryMs: number,
    clock: () => number = Date.now
  ): PendingStore {
    return {
      save(p) {
        if (!storage) return;
        storage.setItem(key, JSON.stringify({ ...p, ts: clock() }));
      },

      load() {
        if (!storage) return null;
        try {
          const raw = storage.getItem(key);
          if (!raw) return null;
          const p = JSON.parse(raw) as PendingVerification;
          if (
            typeof p?.code !== "string" ||
            typeof p?.ts !== "number" ||
            clock() - p.ts > expiryMs
          ) {
            this.clear();
            return null;
          }
          return p;
        } catch {
          return null;
        }
      },

      clear() {
        try {
          storage?.removeItem(key);
        } catch {
          /* storage unavailable — nothing to clear */
        }
      }
    };
  }
</script>

<div class="box">
  <form action={HTML_ENDPOINT} method="POST" {onsubmit}>
    <input
      type="text"
      name="_honey"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
      class="honeypot"
    />
    <input bind:this={autoResponseInput} type="hidden" name="_autoresponse" />
    <input bind:this={nextInput} type="hidden" name="_next" />
    <input type="hidden" name="_subject" value="Email code requested" />

    {#if step === "ready"}
      <h2 class="has-text-centered">Or send a quick enquiry</h2>
      <div class="field">
        <label class="label" for="cf-email"> Your email </label>
        <div class="control has-icons-left">
          <input
            id="cf-email"
            class="input"
            type="email"
            name="email"
            bind:value={email}
            oninput={clearErrors}
            required
            disabled={step !== "ready"}
            autocomplete="email"
          />
          <span class="icon is-small is-left">
            <i class="far fa-envelope"></i>
          </span>
        </div>
      </div>
    {/if}

    {#if step === "code"}
      <fieldset class="has-text-centered">
        <div class="notification is-primary is-light">
          <p class="block">
            Please check <strong>{email}</strong> for your verification code
          </p>

          <p class="block">
            Expires in <strong>{formatCountdown(remainingMs)}</strong>
          </p>
        </div>

        <div class="field">
          <input
            bind:this={codeInput}
            name="code"
            class="input is-large"
            type="text"
            inputmode="numeric"
            autocomplete="one-time-code"
            maxlength="4"
            placeholder="0000"
            value={enteredCode}
            oninput={handleCodeInput}
            onkeydown={handleCodeKeydown}
            disabled={locked}
            class:invalid={!!codeError && !locked}
            aria-label="4-digit verification code"
            aria-invalid={!!codeError}
            aria-describedby={codeError ? "cf-code-error" : undefined}
          />
        </div>

        {#if codeError}
          <div class="notification is-warning is-light">
            <p id="cf-code-error" role="alert">{codeError}</p>
          </div>
        {/if}
      </fieldset>
    {/if}

    {#if step === "expired"}
      <p class="notification is-primary is-light">
        Your code has expired. Start over to request a new one.
      </p>
    {/if}

    {#if step === "exhausted"}
      <p class="notification is-primary is-light">
        Too many attempts. Start over to request a new code.
      </p>
    {/if}

    {#if step === "verified"}
      <div class="field">
        <label class="label" for="cf-name">Name</label>
        <div class="control has-icons-left">
          <input
            id="cf-name"
            class="input"
            type="text"
            name="name"
            bind:value={name}
            oninput={clearErrors}
            required
            autocomplete="name"
          />
          <span class="icon is-small is-left">
            <i class="far fa-circle-user"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label" for="cf-message">Your Message</label>
        <div class="control">
          <textarea
            id="cf-message"
            class="textarea"
            rows="3"
            placeholder="Hi Micki..."
            bind:value={message}
            oninput={clearErrors}
            required
          ></textarea>
        </div>
      </div>
    {/if}

    {#if formError}
      <div class="notification is-warning is-light" role="alert">{formError}</div>
    {/if}

    {#if step === "success"}
      <div class="notification is-success is-light" role="status">
        Your message has been sent. Thank you!
      </div>
    {/if}

    <div class="field">
      <div class="control has-text-centered">
        {#if step !== "expired" && step !== "exhausted"}
          <button
            type="submit"
            class="button is-link"
            class:is-loading={step === "submitting"}
            disabled={locked || step === "submitting" || step === "success"}
          >
            {#if step === "submitting"}
              Sending…
            {:else if step === "code"}
              Verify
            {:else if step === "verified" || step === "success"}
              Send Message
            {:else}
              Verify Email
            {/if}
          </button>
        {/if}

        {#if step !== "ready"}
          <button type="button" class="button is-primary is-light" onclick={resetAll}>
            Start Over
          </button>
        {/if}
      </div>
    </div>
  </form>
</div>

<style>
  .honeypot {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  input[name="code"] {
    width: 4em;
    text-align: center;
  }
</style>
