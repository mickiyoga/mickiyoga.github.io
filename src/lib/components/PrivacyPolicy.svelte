<script lang="ts">
  let { url } = $props();

  const lastUpdate = "May 04, 2026";

  type Section =
    | "contents"
    | "collection"
    | "processing"
    | "sharing"
    | "keeping"
    | "safety"
    | "minors"
    | "rights"
    | "do-not-track"
    | "usa-rights"
    | "regional-rights"
    | "updates"
    | "how-to-contact"
    | "review";

  const SECTION_TITLE: [Section, string][] = [
    ["contents", "Table of Contents"],
    ["collection", "What Information Do We Collect?"],
    ["processing", "How Do We Process Your Information?"],
    ["sharing", "When and With Whom Do We Share Your Personal Information?"],
    ["keeping", "How Long Do We Keep Your Information?"],
    ["safety", "How Do We Keep Your Information Safe?"],
    ["minors", "Do We Collect Information From Minors?"],
    ["rights", "What Are Your Privacy Rights?"],
    ["do-not-track", "Controls For Do-Not-Track Features"],
    ["usa-rights", "Do United States Residents Have Specific Privacy Rights?"],
    ["regional-rights", "Do Other Regions Have Specific Privacy Rights?"],
    ["updates", "Do We Make Updates To This Notice?"],
    ["how-to-contact", "How Can You Contact Us About This Notice?"],
    ["review", "How Can You Review, Update, or Delete the Data We Collect From You?"]
  ] as const;

  function sectionIndex(section: Section) {
    return SECTION_TITLE.findIndex(([s, t]) => s === section);
  }
</script>

{#snippet webLink()}
  <a href={url}>{url}</a>
{/snippet}

{#snippet sectionLink(section: Section, alt?: string)}
  {@const n = sectionIndex(section)}
  <a href="#{section}">{alt ?? SECTION_TITLE[n][1]}</a>
{/snippet}

{#snippet sectionTitle(section: Section)}
  {@const n = sectionIndex(section)}
  <h2 id={section}>{n}. {SECTION_TITLE[n][1]}</h2>
{/snippet}

<div class="content">
  <!-- Header -->

  <p>
    <em>Last updated {lastUpdate}</em>
  </p>

  <p>
    This Privacy Notice for Micki Yoga ("we," "us," or "our"), describes how and why we might
    access, collect, store, use, and/or share ("process") your personal information when you use our
    services ("Services"), including when you:
  </p>

  <ul>
    <li>
      Visit our website at {@render webLink()} or any website of ours that links to this Privacy Notice
    </li>
    <li>Engage with us in other related ways, including any marketing or events</li>
  </ul>

  <p>
    <em>Questions or concerns?</em> Reading this Privacy Notice will help you understand your
    privacy rights and choices. We are responsible for making decisions about how your personal
    information is processed. If you do not agree with our policies and practices, please do not use
    our Services. If you still have any questions or concerns, please contact us at {@render webLink()}.
  </p>

  <!-- Summary -->

  <h2>Summary of Key Points</h2>

  <p>
    <em>
      This summary provides key points from our Privacy Notice, but you can find out more details
      about any of these topics by clicking the link following each key point or by using our table
      of contents below to find the section you are looking for.
    </em>
  </p>

  <h4>What personal information do we process?</h4>
  <p>
    When you visit, use, or navigate our Services, we may process personal information depending on
    how you interact with us and the Services, the choices you make, and the products and features
    you use. Learn more about {@render sectionLink(
      "collection",
      "personal information you disclose to us"
    )}.
  </p>

  <h4>Do we process any sensitive personal information?</h4>
  <p>
    Some of the information may be considered "special" or "sensitive" in certain jurisdictions, for
    example your racial or ethnic origins, sexual orientation, and religious beliefs. We do not
    process sensitive personal information.
  </p>

  <h4>Do we collect any information from third parties?</h4>
  <p>We do not collect any information from third parties.</p>

  <h4>How do we process your information?</h4>
  <p>
    We process your information to provide, improve, and administer our Services, communicate with
    you, for security and fraud prevention, and to comply with law. We may also process your
    information for other purposes with your consent. We process your information only when we have
    a valid legal reason to do so. Learn more about {@render sectionLink(
      "processing",
      "how we process your information"
    )}.
  </p>

  <h4>In what situations and with which parties do we share personal information?</h4>
  <p>
    We may share information in specific situations and with specific third parties. Learn more
    about {@render sectionLink("sharing", "when and with whom we share your personal information")}.
  </p>

  <h4>How do we keep your information safe?</h4>
  <p>
    We have adequate organizational and technical processes and procedures in place to protect your
    personal information. However, no electronic transmission over the internet or information
    storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that
    hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our
    security and improperly collect, access, steal, or modify your information. Learn more about
    {@render sectionLink("keeping", "how we keep your information safe")}.
  </p>

  <h4>What are your rights?</h4>
  <p>
    Depending on where you are located geographically, the applicable privacy law may mean you have
    certain rights regarding your personal information. Learn more about
    {@render sectionLink("rights", "your privacy rights")}.
  </p>

  <h4>How do you exercise your rights?</h4>
  <p>
    The easiest way to exercise your rights is by visiting {@render webLink()}, or by contacting us.
    We will consider and act upon any request in accordance with applicable data protection laws.
  </p>

  Want to learn more about what we do with any information we collect?
  {@render sectionLink("contents", "Review the Privacy Notice in full")}.

  <!-- Contents -->

  <h2 id="contents">Table of Contents</h2>

  <ol>
    {#each SECTION_TITLE.slice(1) as [section, title]}
      <li>
        {@render sectionLink(section)}
      </li>
    {/each}
  </ol>

  <!-- Collection -->

  {@render sectionTitle("collection")}

  <h4>Personal information you disclose to us</h4>

  <p>
    We collect personal information that you voluntarily provide to us when you express an interest
    in obtaining information about us or our products and Services, when you participate in
    activities on the Services, or otherwise when you contact us.
  </p>

  <h5>Personal Information Provided by You</h5>
  <p>
    The personal information that we collect depends on the context of your interactions with us and
    the Services, the choices you make, and the products and features you use. The personal
    information we collect may include the following:
  </p>

  <ul>
    <li>names</li>
    <li>email addresses</li>
    <li>IP address</li>
  </ul>

  <h5>Sensitive Information</h5>
  <p>We do not process sensitive information.</p>

  <p>
    All personal information that you provide to us must be true, complete, and accurate, and you
    must notify us of any changes to such personal information.
  </p>

  <h4>Information automatically collected</h4>

  <p>
    We automatically collect certain information when you visit, use, or navigate the Services. This
    information does not reveal your specific identity (like your name or contact information) but
    may include device and usage information, such as your IP address, browser and device
    characteristics, operating system, language preferences, referring URLs, device name, country,
    location, information about how and when you use our Services, and other technical information.
    This information is primarily needed to maintain the security and operation of our Services, and
    for our internal analytics and reporting purposes.
  </p>

  <p>
    The information we collect includes location data. We collect location data such as information
    about your device's location, which can be either precise or imprecise. How much information we
    collect depends on the type and settings of the device you use to access the Services. For
    example, we may use GPS and other technologies to collect geolocation data that tells us your
    current location (based on your IP address). You can opt out of allowing us to collect this
    information either by refusing access to the information or by disabling your Location setting
    on your device. However, if you choose to opt out, you may not be able to use certain aspects of
    the Services.
  </p>

  <!-- Processing -->

  {@render sectionTitle("processing")}

  <p>
    We process your personal information for a variety of reasons, depending on how you interact
    with our Services, including to respond to user inquiries/offer support to users. We may process
    your information to respond to your inquiries and solve any potential issues you might have with
    the requested service.
  </p>

  <!-- Sharing -->

  {@render sectionTitle("sharing")}

  <p>We will not share your personal information.</p>

  <!-- Keeping -->

  {@render sectionTitle("keeping")}

  <p>
    We will only keep your personal information for as long as it is necessary for the purposes set
    out in this Privacy Notice, unless a longer retention period is required or permitted by law
    (such as tax, accounting, or other legal requirements).
  </p>
  <p>
    When we have no ongoing legitimate business need to process your personal information, we will
    either delete or anonymize such information, or, if this is not possible (for example, because
    your personal information has been stored in backup archives), then we will securely store your
    personal information and isolate it from any further processing until deletion is possible.
  </p>

  <!-- Safety -->

  {@render sectionTitle("safety")}

  <p>
    We have implemented appropriate and reasonable technical and organizational security measures
    designed to protect the security of any personal information we process. However, despite our
    safeguards and efforts to secure your information, no electronic transmission over the Internet
    or information storage technology can be guaranteed to be 100% secure, so we cannot promise or
    guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to
    defeat our security and improperly collect, access, steal, or modify your information. Although
    we will do our best to protect your personal information, transmission of personal information
    to and from our Services is at your own risk. You should only access the Services within a
    secure environment.
  </p>

  <!-- Minors -->

  {@render sectionTitle("minors")}

  <p>
    We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor
    do we knowingly sell such personal information. By using the Services, you represent that you
    are at least 18 or that you are the parent or guardian of such a minor and consent to such minor
    dependent’s use of the Services. If we learn that personal information from users less than 18
    years of age has been collected, we will deactivate the account and take reasonable measures to
    promptly delete such data from our records. If you become aware of any data we may have
    collected from children under age 18, please contact us at {@render webLink()}.
  </p>

  <!-- Rights -->

  {@render sectionTitle("rights")}

  <h5>Withdrawing your consent</h5>
  <p>
    If we are relying on your consent to process your personal information, which may be express
    and/or implied consent depending on the applicable law, you have the right to withdraw your
    consent at any time. You can withdraw your consent at any time by contacting us by using the
    contact details provided in the section {@render sectionLink("how-to-contact")} below.
  </p>

  <p>
    However, please note that this will not affect the lawfulness of the processing before its
    withdrawal nor, when applicable law allows, will it affect the processing of your personal
    information conducted in reliance on lawful processing grounds other than consent.
  </p>

  <p>
    If you have questions or comments about your privacy rights, you may contact us at {@render webLink()}.
  </p>

  <!-- Do Not Track -->

  {@render sectionTitle("do-not-track")}

  <p>
    Most web browsers and some mobile operating systems and mobile applications include a
    Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not
    to have data about your online browsing activities monitored and collected. At this stage, no
    uniform technology standard for recognizing and implementing DNT signals has been finalized. As
    such, we do not currently respond to DNT browser signals or any other mechanism that
    automatically communicates your choice not to be tracked online. If a standard for online
    tracking is adopted that we must follow in the future, we will inform you about that practice in
    a revised version of this Privacy Notice.
  </p>

  <p>
    California law requires us to let you know how we respond to web browser DNT signals. Because
    there currently is not an industry or legal standard for recognizing or honoring DNT signals, we
    do not respond to them at this time.
  </p>

  <!-- USA rights -->

  {@render sectionTitle("usa-rights")}

  <h4>Categories of Personal Information We Collect</h4>

  <p>
    The table below shows the categories of personal information we have collected in the past
    twelve (12) months. The table includes illustrative examples of each category and does not
    reflect the personal information we collect from you. For a comprehensive inventory of all
    personal information we process, please refer to the section {@render sectionLink(
      "collection"
    )}.
  </p>

  <table>
    <thead
      ><tr>
        <th>Category</th>
        <th>Examples</th>
        <th>Collected</th>
      </tr></thead
    >
    <tbody>
      <tr>
        <td> A. Identifiers </td>
        <td>
          Contact details, such as real name, alias, postal address, telephone or mobile contact
          number, unique personal identifier, online identifier, Internet Protocol address, email
          address, and account name
        </td>
        <td> YES </td>
      </tr>
      <tr>
        <td> B. Personal information as defined in the California Customer Records statute </td>
        <td>
          Name, contact information, education, employment, employment history, and financial
          information
        </td>
        <td> YES </td>
      </tr>
      <tr>
        <td> C. Protected classification characteristics under state or federal law </td>
        <td>
          Gender, age, date of birth, race and ethnicity, national origin, marital status, and other
          demographic data
        </td>
        <td> NO </td>
      </tr>
      <tr>
        <td> D. Commercial information </td>
        <td>
          Transaction information, purchase history, financial details, and payment information
        </td>
        <td> NO </td>
      </tr>
      <tr>
        <td> E. Biometric information </td>
        <td> Fingerprints and voiceprints </td>
        <td> NO </td>
      </tr>
      <tr>
        <td> F. Internet or other similar network activity </td>
        <td>
          Browsing history, search history, online behavior, interest data, and interactions with
          our and other websites, applications, systems, and advertisements
        </td>
        <td> NO </td>
      </tr>
      <tr>
        <td> G. Geolocation data </td>
        <td> Device location </td>
        <td> YES </td>
      </tr>
      <tr>
        <td> H. Audio, electronic, sensory, or similar information </td>
        <td>
          Images and audio, video or call recordings created in connection with our business
          activities
        </td>
        <td> NO </td>
      </tr>
      <tr>
        <td> I. Professional or employment-related information </td>
        <td>
          Business contact details in order to provide you our Services at a business level or job
          title, work history, and professional qualifications if you apply for a job with us
        </td>
        <td> NO </td>
      </tr>
      <tr>
        <td> J. Education Information </td>
        <td> Student records and directory information </td>
        <td> NO </td>
      </tr>
      <tr>
        <td> K. Inferences drawn from collected personal information </td>
        <td>
          Inferences drawn from any of the collected personal information listed above to create a
          profile or summary about, for example, an individual’s preferences and characteristics
        </td>
        <td> NO </td>
      </tr>
      <tr>
        <td> L. Sensitive personal Information </td>
        <td> </td>
        <td> NO </td>
      </tr>
    </tbody>
  </table>

  <p>
    We may also collect other personal information outside of these categories through instances
    where you interact with us in person, online, or by phone or mail in the context of:
  </p>
  <ul>
    <li>Receiving help through our customer support channels;</li>
    <li>Participation in customer surveys or contests; and</li>
    <li>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
  </ul>

  <p>
    We will use and retain the collected personal information as needed to provide the Services.
  </p>

  <h4>Sources of Personal Information</h4>
  <p>
    Learn more about the sources of personal information we collect in {@render sectionLink(
      "collection"
    )}.
  </p>

  <h4>How We Use and Share Personal Information</h4>
  <p>
    Learn more about how we use your personal information in the section, {@render sectionLink(
      "processing"
    )}.
  </p>

  <h4>Will your information be shared with anyone else?</h4>
  <p>
    We may disclose your personal information with our service providers pursuant to a written
    contract between us and each service provider. Learn more about how we disclose personal
    information to in the section, {@render sectionLink("sharing")}.
  </p>

  <p>
    We may use your personal information for our own business purposes, such as for undertaking
    internal research for technological development and demonstration. This is not considered to be
    "selling" of your personal information.
  </p>

  <p>
    We have not disclosed, sold, or shared any personal information to third parties for a business
    or commercial purpose in the preceding twelve (12) months. We will not sell or share personal
    information in the future belonging to website visitors, users, and other consumers.
  </p>

  <h4>Your Rights</h4>
  <p>
    You have rights under certain US state data protection laws. However, these rights are not
    absolute, and in certain cases, we may decline your request as permitted by law. These rights
    include:
  </p>

  <ul>
    <li>Right to know whether or not we are processing your personal data</li>
    <li>Right to access your personal data</li>
    <li>Right to correct inaccuracies in your personal data</li>
    <li>Right to request the deletion of your personal data</li>
    <li>Right to obtain a copy of the personal data you previously shared with us</li>
    <li>Right to non-discrimination for exercising your rights</li>
    <li>
      Right to opt out of the processing of your personal data if it is used for targeted
      advertising (or sharing as defined under California’s privacy law), the sale of personal data,
      or profiling in furtherance of decisions that produce legal or similarly significant effects
      ("profiling")
    </li>
  </ul>

  <p>Depending upon the state where you live, you may also have the following rights:</p>
  <ul>
    <li>
      Right to obtain a list of the categories of third parties to which we have disclosed personal
      data (as permitted by applicable law, including the privacy law in California)
    </li>
    <li>
      Right to limit use and disclosure of sensitive personal data (as permitted by applicable law,
      including the privacy law in California)
    </li>
  </ul>

  <h4>How to Exercise Your Rights</h4>
  <p>
    To exercise these rights, you can contact us by visiting {@render webLink()}.
  </p>
  <p>
    Under certain US state data protection laws, you can designate an authorized agent to make a
    request on your behalf. We may deny a request from an authorized agent that does not submit
    proof that they have been validly authorized to act on your behalf in accordance with applicable
    laws.
  </p>

  <h4>Request Verification</h4>
  <p>
    Upon receiving your request, we will need to verify your identity to determine you are the same
    person about whom we have the information in our system. We will only use personal information
    provided in your request to verify your identity or authority to make the request. However, if
    we cannot verify your identity from the information already maintained by us, we may request
    that you provide additional information for the purposes of verifying your identity and for
    security or fraud-prevention purposes.
  </p>
  <p>
    If you submit the request through an authorized agent, we may need to collect additional
    information to verify your identity before processing your request and the agent will need to
    provide a written and signed permission from you to submit such request on your behalf.
  </p>

  <h4>California "Shine The Light" Law</h4>
  <p>
    California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our
    users who are California residents to request and obtain from us, once a year and free of
    charge, information about categories of personal information (if any) we disclosed to third
    parties for direct marketing purposes and the names and addresses of all third parties with
    which we shared personal information in the immediately preceding calendar year. If you are a
    California resident and would like to make such a request, please submit your request in writing
    to us by using the contact details provided in the section {@render sectionLink(
      "how-to-contact"
    )}.
  </p>

  <!-- Regional rights -->

  {@render sectionTitle("regional-rights")}

  <h4>Australia</h4>
  <p>
    We collect and process your personal information under the obligations and conditions set by
    Australia's Privacy Act 1988 (Privacy Act).
  </p>
  <p>
    This Privacy Notice satisfies the notice requirements defined in the Privacy Act, in particular:
    what personal information we collect from you, from which sources, for which purposes, and other
    recipients of your personal information.
  </p>
  <p>
    If you do not wish to provide the personal information necessary to fulfill their applicable
    purpose, it may affect our ability to provide our services, in particular:
  </p>
  <ul>
    <li>offer you the products or services that you want</li>
    <li>respond to or help with your requests</li>
  </ul>
  <p>
    At any time, you have the right to request access to or correction of your personal information.
    You can make such a request by contacting us by using the contact details provided in the
    section {@render sectionLink("review")}.
  </p>
  <p>
    If you believe we are unlawfully processing your personal information, you have the right to
    submit a complaint about a breach of the Australian Privacy Principles to the
    <a href="https://www.oaic.gov.au/privacy/privacy-complaints/lodge-a-privacy-complaint-with-us">
      Office of the Australian Information Commissioner
    </a>.
  </p>

  <!-- updates -->

  {@render sectionTitle("updates")}

  <p>
    We may update this Privacy Notice from time to time. The updated version will be indicated by an
    updated "Revised" date at the top of this Privacy Notice. If we make material changes to this
    Privacy Notice, we may notify you either by prominently posting a notice of such changes or by
    directly sending you a notification. We encourage you to review this Privacy Notice frequently
    to be informed of how we are protecting your information.
  </p>

  <!-- Contact -->

  {@render sectionTitle("how-to-contact")}

  <p>
    If you have questions or comments about this notice, you may contact us at {@render webLink()}.
  </p>

  <!-- Review -->

  {@render sectionTitle("review")}

  <p>
    You have the right to request access to the personal information we collect from you, details
    about how we have processed it, correct inaccuracies, or delete your personal information. You
    may also have the right to withdraw your consent to our processing of your personal information.
    These rights may be limited in some circumstances by applicable law. To request to review,
    update, or delete your personal information, please visit: {@render webLink()}.
  </p>

  <!-- Fin -->
</div>

<style>
</style>
