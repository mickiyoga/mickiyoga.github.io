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

Configuration via environment (see README): PUBLIC_CONTACT_FORM_ID,
PUBLIC_CONTACT_FORM_STORAGE_KEY, PUBLIC_CONTACT_FORM_MAX_ATTEMPTS,
PUBLIC_CONTACT_FORM_EXPIRY_MS.

Styling: themed via --cf-* CSS custom properties (see README for the full
token list). Utility classes can be supplied via the class, inputClass,
labelClass and buttonClass props. Internal class names are stable and may be
targeted with :global() for deeper overrides.

Props:
- subject — subject line for the final message (optional).
- autoResponseMessage — body template for the verification email; the token
  {code} is substituted with the generated code (optional).
- class — extra class(es) on the root form element (optional).
- inputClass — applied to name, email, code and message fields (optional).
- labelClass — applied to every label (optional).
- buttonClass — applied to the action buttons (optional).
-->

<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import {
    PUBLIC_CONTACT_FORM_ID,
    PUBLIC_CONTACT_FORM_STORAGE_KEY,
    PUBLIC_CONTACT_FORM_MAX_ATTEMPTS,
    PUBLIC_CONTACT_FORM_EXPIRY_MS
  } from '$env/static/public';

  import {
    generateCode,
    formatCountdown,
    sanitizeCodeInput,
    buildAutoResponse,
    buildStorageKey,
    incorrectCodeMessage,
    intEnv,
    createPendingStore
  } from './contact-form';

  interface Props {
    autoResponseMessage?: string;
    subject?: string;
    class?: string;
    inputClass?: string;
    labelClass?: string;
    buttonClass?: string;
  }

  let {
    autoResponseMessage = 'Your verification code is: {code}\n\nEnter this code on the website to continue.',
    subject = 'Contact Form Submission',
    class: className = '',
    inputClass = '',
    labelClass = '',
    buttonClass = ''
  }: Props = $props();

  /* ---- config from env ------------------------------------------ */
  const formId      = PUBLIC_CONTACT_FORM_ID;
  const maxAttempts = intEnv(PUBLIC_CONTACT_FORM_MAX_ATTEMPTS, 3);
  const EXPIRY_MS   = intEnv(PUBLIC_CONTACT_FORM_EXPIRY_MS, 10 * 60 * 1000);
  const storageKey  = buildStorageKey(
    PUBLIC_CONTACT_FORM_STORAGE_KEY || 'contact-form:pending',
    page.url.pathname
  );

  const htmlEndpoint = `https://formsubmit.co/${formId}`;
  const ajaxEndpoint = `https://formsubmit.co/ajax/${formId}`;

  // `sessionStorage` does not exist during SSR / prerender; the store
  // degrades to a no-op there. All real usage is in client-only code paths.
  const pendingStore = createPendingStore(
    browser ? sessionStorage : null,
    storageKey,
    EXPIRY_MS
  );

  /* ---- reactive state ------------------------------------------- */
  let name = $state('');
  let email = $state('');
  let message = $state('');
  let enteredCode = $state('');
  let attempts = $state(0);
  let awaitingCode = $state(false);
  let isEmailVerified = $state(false);
  let hasSentCode = $state(false);
  let expiresAt = $state(0);
  let now = $state(Date.now());
  let isSubmitting = $state(false);
  let formError = $state('');
  let codeError = $state('');
  let successMessage = $state('');
  let announcement = $state('');

  let generatedCode = '';

  const exhausted   = $derived(attempts >= maxAttempts);
  const remainingMs = $derived(Math.max(0, expiresAt - now));
  const expired     = $derived(awaitingCode && expiresAt > 0 && now >= expiresAt);
  const locked      = $derived(exhausted || expired);

  let autoResponseInput = $state<HTMLInputElement>();
  let nextInput         = $state<HTMLInputElement>();
  let codeInput         = $state<HTMLInputElement>();

  /* ---- effects --------------------------------------------------- */
  $effect(() => {
    const pending = pendingStore.load();
    if (!pending) return;

    name = pending.name;
    email = pending.email;
    generatedCode = pending.code;
    expiresAt = pending.ts + EXPIRY_MS;
    awaitingCode = true;
    hasSentCode = true;
    announcement = 'Verification code sent. Check your email and enter the 4-digit code below.';
  });

  $effect(() => {
    if (!awaitingCode) return;
    now = Date.now();
    const id = setInterval(() => { now = Date.now(); }, 1000);
    return () => clearInterval(id);
  });

  $effect(() => {
    if (expired) {
      announcement = 'Verification code expired. Please start over to request a new one.';
    }
  });

  $effect(() => {
    if (awaitingCode) codeInput?.focus();
  });

  /* ---- handlers -------------------------------------------------- */
  function handleSubmit(e: SubmitEvent): void {
    formError = '';
    successMessage = '';

    if (isEmailVerified) {
      e.preventDefault();
      void sendMessage();
      return;
    }

    generatedCode = generateCode();

    try {
      pendingStore.save({ code: generatedCode, name, email });
    } catch {
      e.preventDefault();
      generatedCode = '';
      formError =
        'Could not save verification state. If you are using private browsing, please try a regular window.';
      return;
    }

    if (autoResponseInput) {
      autoResponseInput.value = buildAutoResponse(autoResponseMessage, generatedCode);
    }
    if (nextInput) {
      nextInput.value = window.location.href;
    }
  }

  async function sendMessage(): Promise<void> {
    if (!message.trim()) {
      formError = 'Please enter a message.';
      return;
    }

    isSubmitting = true;
    try {
      const res = await fetch(ajaxEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message, _subject: subject })
      });
      const data: { success?: string | boolean; message?: string } = await res.json();

      if (res.ok && data.success) {
        successMessage = 'Your message has been sent. Thank you!';
        resetAll();
      } else {
        formError = data.message ?? 'Failed to send message. Please try again.';
      }
    } catch {
      formError = 'Network error. Please check your connection and try again.';
    } finally {
      isSubmitting = false;
    }
  }

  function handleCodeInput(e: Event): void {
    const t = e.currentTarget as HTMLInputElement;
    t.value = sanitizeCodeInput(t.value);
    enteredCode = t.value;
    if (codeError) codeError = '';
  }

  function handleCodeKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !locked) {
      e.preventDefault();
      verifyCode();
    }
  }

  function verifyCode(): void {
    if (enteredCode.length !== 4) {
      codeError = 'Please enter all 4 digits.';
      return;
    }

    if (enteredCode === generatedCode) {
      isEmailVerified = true;
      awaitingCode = false;
      expiresAt = 0;
      pendingStore.clear();
      resetVerificationState();
      announcement = 'Email verified. You can now write your message.';
      return;
    }

    attempts++;
    enteredCode = '';
    codeError = incorrectCodeMessage(attempts, maxAttempts);
    if (!exhausted) codeInput?.focus();
  }

  function cancelVerification(): void {
    awaitingCode = false;
    generatedCode = '';
    expiresAt = 0;
    pendingStore.clear();
    resetVerificationState();
  }

  function resetVerificationState(): void {
    enteredCode = '';
    attempts = 0;
    codeError = '';
  }

  function revokeVerification(): void {
    isEmailVerified = false;
    message = '';
    generatedCode = '';
  }

  function resetAll(): void {
    name = '';
    email = '';
    message = '';
    generatedCode = '';
    isEmailVerified = false;
    awaitingCode = false;
    // hasSentCode intentionally NOT reset – suppresses the first-time notice
    expiresAt = 0;
    resetVerificationState();
    pendingStore.clear();
  }

  function clearFormFeedback(): void {
    formError = '';
    successMessage = '';
  }
</script>

<div class="box">
  <form class="contact-form {className}" action={htmlEndpoint} method="POST" onsubmit={handleSubmit}>
    <div class="sr-only" aria-live="polite" aria-atomic="true">{announcement}</div>

    <input
      type="text"
      name="_honey"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
      class="honeypot"
    />

    <div class="field">
      <label for="cf-name" class={labelClass}>Full Name</label>
      <input
        id="cf-name"
        class={inputClass}
        type="text"
        name="name"
        bind:value={name}
        oninput={clearFormFeedback}
        required
        disabled={isSubmitting || awaitingCode}
        autocomplete="name"
      />
    </div>

    <div class="field">
      <label for="cf-email" class={labelClass}>
        Email Address
        {#if isEmailVerified}<span class="badge">✓ Verified</span>{/if}
      </label>
      <input
        id="cf-email"
        class={inputClass}
        type="email"
        name="email"
        bind:value={email}
        oninput={clearFormFeedback}
        required
        disabled={isSubmitting || awaitingCode || isEmailVerified}
        autocomplete="email"
      />
      {#if isEmailVerified}
        <button type="button" class="link-btn" onclick={revokeVerification}>
          Use a different email
        </button>
      {/if}
    </div>

    {#if !isEmailVerified && !awaitingCode}
      <input bind:this={autoResponseInput} type="hidden" name="_autoresponse" />
      <input bind:this={nextInput} type="hidden" name="_next" />
      <input type="hidden" name="_subject" value="[Verification] Email code request" />

      {#if !hasSentCode}
        <p class="notice">
          We'll send a quick code to confirm this address before you write your message.
        </p>
      {/if}
    {/if}

    {#if awaitingCode}
      <fieldset class="verify-panel">
        <legend>Check your inbox</legend>

        <p class="verify-panel__lead">
          We sent a 4-digit code to <strong>{email}</strong>
        </p>

        <p class="verify-panel__countdown" class:expired>
          {#if expired}
            Code expired
          {:else}
            Expires in <strong>{formatCountdown(remainingMs)}</strong>
          {/if}
        </p>

        <div class="verify-panel__input">
          <input
            bind:this={codeInput}
            class={inputClass}
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
            aria-describedby={codeError ? 'cf-code-error' : undefined}
          />
        </div>

        {#if codeError}
          <p id="cf-code-error" class="verify-panel__error" role="alert">{codeError}</p>
        {/if}

        <div class="verify-panel__actions">
          {#if locked}
            <button
              type="button"
              class="btn btn--primary {buttonClass}"
              onclick={cancelVerification}
            >
              Start Over
            </button>
          {:else}
            <button
              type="button"
              class="btn btn--primary {buttonClass}"
              onclick={verifyCode}
              disabled={enteredCode.length !== 4}
            >
              Verify
            </button>
            <button
              type="button"
              class="btn btn--ghost {buttonClass}"
              onclick={cancelVerification}
            >
              Cancel
            </button>
          {/if}
        </div>

        <p class="verify-panel__hint">
          {#if expired}
            Your code has expired. Start over to request a new one.
          {:else if exhausted}
            Too many attempts. Start over to request a new code.
          {:else}
            Can't find it? Check spam, or cancel to try a different address.
          {/if}
        </p>
      </fieldset>
    {/if}

    {#if isEmailVerified}
      <div class="field">
        <label for="cf-message" class={labelClass}>Your Message</label>
        <textarea
          id="cf-message"
          class={inputClass}
          bind:value={message}
          oninput={clearFormFeedback}
          rows="8"
          required
          disabled={isSubmitting}
        ></textarea>
      </div>
    {/if}

    {#if formError}
      <div class="alert alert--error" role="alert">{formError}</div>
    {/if}
    {#if successMessage}
      <div class="alert alert--success" role="status">{successMessage}</div>
    {/if}

    {#if !awaitingCode}
      <button type="submit" class="submit {buttonClass}" disabled={isSubmitting}>
        {#if isSubmitting}
          <span class="spinner" aria-hidden="true"></span> Sending…
        {:else if isEmailVerified}
          Send Message
        {:else}
          Verify Email
        {/if}
      </button>
    {/if}
  </form>
</div>
<style>
  .contact-form {
    /* ---- public theme tokens --------------------------------- */
    /* typography */
    --_cf-font:    var(--cf-font, inherit);
    --_cf-fs:      var(--cf-font-size, 1rem);
    --_cf-fs-sm:   var(--cf-font-size-sm, 0.875rem);
    --_cf-fs-xs:   var(--cf-font-size-xs, 0.75rem);

    /* colour */
    --_cf-text:           var(--cf-color-text, #374151);
    --_cf-text-muted:     var(--cf-color-text-muted, #6b7280);
    --_cf-text-faint:     var(--cf-color-text-faint, #9ca3af);
    --_cf-border:         var(--cf-color-border, #d1d5db);
    --_cf-accent:         var(--cf-color-accent, #2563eb);
    --_cf-surface:        var(--cf-color-surface, #f9fafb);
    --_cf-input-bg:       var(--cf-color-input-bg, #fff);
    --_cf-input-disabled: var(--cf-color-input-disabled, #f3f4f6);

    --_cf-error:          var(--cf-color-error, #dc2626);
    --_cf-error-bg:       var(--cf-color-error-bg, #fef2f2);
    --_cf-error-border:   var(--cf-color-error-border, #fecaca);
    --_cf-success:        var(--cf-color-success, #15803d);
    --_cf-success-bg:     var(--cf-color-success-bg, #f0fdf4);
    --_cf-success-border: var(--cf-color-success-border, #bbf7d0);

    /* buttons */
    --_cf-btn-bg:       var(--cf-button-bg, #1f2937);
    --_cf-btn-bg-hover: var(--cf-button-bg-hover, #111827);
    --_cf-btn-fg:       var(--cf-button-fg, #fff);

    /* shape & layout */
    --_cf-radius:    var(--cf-radius, 0.375rem);
    --_cf-gap:       var(--cf-gap, 1.25rem);
    --_cf-input-pad: var(--cf-input-padding, 0.75rem);
    --_cf-max-width: var(--cf-max-width, 32rem);

    /* ---- root layout ---------------------------------------- */
    max-width: var(--_cf-max-width);
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: var(--_cf-gap);
    font-family: var(--_cf-font);
    font-size: var(--_cf-fs);
    color: var(--_cf-text);
  }

  .sr-only {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0 0 0 0);
    white-space: nowrap; border: 0;
  }

  .honeypot {
    position: absolute; left: -9999px;
    width: 1px; height: 1px; opacity: 0;
  }

  .field { display: flex; flex-direction: column; gap: 0.375rem; }

  label {
    font-size: var(--_cf-fs-sm); font-weight: 500;
    display: flex; align-items: center; gap: 0.5rem;
  }

  .badge {
    font-size: var(--_cf-fs-xs); font-weight: 600;
    color: var(--_cf-success);
    background: var(--_cf-success-bg);
    padding: 0.125rem 0.5rem; border-radius: 999px;
  }

  input:not([type='hidden']):not(.honeypot),
  textarea {
    padding: var(--_cf-input-pad);
    font: inherit;
    color: inherit;
    background: var(--_cf-input-bg);
    border: 1px solid var(--_cf-border);
    border-radius: var(--_cf-radius);
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  input:focus, textarea:focus {
    outline: none;
    border-color: var(--_cf-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--_cf-accent) 15%, transparent);
  }
  input:disabled, textarea:disabled {
    background: var(--_cf-input-disabled);
    cursor: not-allowed;
  }
  textarea { resize: vertical; min-height: 8rem; }

  .link-btn {
    align-self: flex-start; background: none; border: none; padding: 0.25rem 0;
    color: var(--_cf-accent); font-size: var(--_cf-fs-xs);
    text-decoration: underline; cursor: pointer;
  }
  .link-btn:hover { filter: brightness(0.85); }

  .notice {
    margin: 0; padding: 0.875rem; font-size: var(--_cf-fs-sm);
    color: var(--_cf-text-muted);
    background: var(--_cf-surface);
    border: 1px dashed var(--_cf-border);
    border-radius: var(--_cf-radius);
  }

  .verify-panel {
    margin: 0; padding: 1.25rem;
    border: 1px solid var(--_cf-border);
    border-radius: calc(var(--_cf-radius) * 1.25);
    background: var(--_cf-surface);
    animation: panel-in 0.25s ease-out;
  }
  @keyframes panel-in { from { opacity: 0; transform: translateY(-4px); } }

  .verify-panel legend {
    padding: 0 0.5rem;
    font-size: var(--_cf-fs-sm); font-weight: 600; color: var(--_cf-text);
  }
  .verify-panel__lead {
    margin: 0 0 0.5rem; text-align: center;
    font-size: var(--_cf-fs-sm); color: var(--_cf-text-muted);
  }
  .verify-panel__lead strong { color: var(--_cf-text); word-break: break-all; }

  .verify-panel__countdown {
    margin: 0 0 1rem; text-align: center;
    font-size: var(--_cf-fs-xs); color: var(--_cf-text-muted);
    font-variant-numeric: tabular-nums;
  }
  .verify-panel__countdown strong { color: var(--_cf-text); }
  .verify-panel__countdown.expired { color: var(--_cf-error); font-weight: 500; }

  .verify-panel__input { display: flex; justify-content: center; margin-bottom: 0.75rem; }
  .verify-panel__input input {
    width: 9rem; text-align: center;
    font-size: 1.5rem; font-weight: 600; letter-spacing: 0.5rem;
    border-width: 2px;
  }
  .verify-panel__input input.invalid { border-color: var(--_cf-error); }

  .verify-panel__error {
    margin: 0 0 0.75rem; text-align: center;
    font-size: var(--_cf-fs-xs); color: var(--_cf-error);
  }

  .verify-panel__actions { display: flex; gap: 0.625rem; }

  .verify-panel__hint {
    margin: 0.875rem 0 0; text-align: center;
    font-size: var(--_cf-fs-xs); color: var(--_cf-text-faint); line-height: 1.5;
  }

  .btn {
    flex: 1; padding: 0.625rem;
    font: inherit; font-weight: 500; font-size: var(--_cf-fs-sm);
    border-radius: var(--_cf-radius);
    cursor: pointer; transition: all 0.15s;
  }
  .btn--primary {
    background: var(--_cf-btn-bg); color: var(--_cf-btn-fg); border: none;
  }
  .btn--primary:hover:not(:disabled) { background: var(--_cf-btn-bg-hover); }
  .btn--primary:disabled { opacity: 0.4; cursor: not-allowed; }
  .btn--ghost {
    background: var(--_cf-input-bg); color: var(--_cf-text);
    border: 1px solid var(--_cf-border);
  }
  .btn--ghost:hover { background: var(--_cf-input-disabled); }

  .submit {
    padding: 0.875rem 1.5rem;
    font: inherit; font-weight: 500;
    background: var(--_cf-btn-bg); color: var(--_cf-btn-fg);
    border: none; border-radius: var(--_cf-radius);
    cursor: pointer;
    display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
    transition: background 0.15s;
  }
  .submit:hover:not(:disabled) { background: var(--_cf-btn-bg-hover); }
  .submit:disabled { opacity: 0.5; cursor: not-allowed; }

  .spinner {
    width: 1rem; height: 1rem;
    border: 2px solid transparent; border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .alert {
    padding: 0.75rem 1rem;
    border-radius: var(--_cf-radius);
    font-size: var(--_cf-fs-sm);
  }
  .alert--error {
    background: var(--_cf-error-bg); color: var(--_cf-error);
    border: 1px solid var(--_cf-error-border);
  }
  .alert--success {
    background: var(--_cf-success-bg); color: var(--_cf-success);
    border: 1px solid var(--_cf-success-border);
  }
</style>