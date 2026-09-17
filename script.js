```javascript
document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     NAVIGATION
     ========================================================= */

  const navLinks = document.querySelectorAll(".nav-links a");
  const buttons = document.querySelectorAll(".button");

  // Smooth navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {

      navLinks.forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");
    });
  });


  /* =========================================================
     BUTTON INTERACTION
     ========================================================= */

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      button.blur();
    });
  });


  /* =========================================================
     SAMPLE WORK MODAL
     ========================================================= */

  const sampleModal =
    document.getElementById("sampleModal");

  const sampleModalClose =
    document.getElementById("sampleModalClose");

  const sampleModalOverlay =
    document.querySelector(".sample-modal-overlay");

  const samplePdfViewer =
    document.getElementById("samplePdfViewer");

  const samplePrevious =
    document.getElementById("samplePrevious");

  const sampleNext =
    document.getElementById("sampleNext");

  const samplePageIndicator =
    document.getElementById("samplePageIndicator");

  const inboxCard =
    document.querySelector(
      '.sample-card[data-sample="inbox"]'
    );


  /* =========================================================
     INBOX TRIAGE SETTINGS
     ========================================================= */

  const inboxPdf = "inbox-triage.pdf";

  const inboxTotalPages = 3;

  let inboxCurrentPage = 1;

  let previousBodyOverflow = "";


  /* =========================================================
     UPDATE CURRENT PAGE
     ========================================================= */

  function updateInboxPage() {

    /*
      The browser's native PDF viewer reads the page
      number from the URL fragment.

      Example:
      inbox-triage.pdf#page=2&zoom=page-width
    */

    samplePdfViewer.src =
      `${inboxPdf}#page=${inboxCurrentPage}&zoom=page-width`;


    /* Update page indicator */

    samplePageIndicator.textContent =
      `${String(inboxCurrentPage).padStart(2, "0")} / ${String(inboxTotalPages).padStart(2, "0")}`;


    /* Previous button */

    samplePrevious.disabled =
      inboxCurrentPage === 1;


    /* Next button */

    sampleNext.disabled =
      inboxCurrentPage === inboxTotalPages;
  }


  /* =========================================================
     OPEN INBOX MODAL
     ========================================================= */

  function openInboxModal() {

    if (!sampleModal) {
      return;
    }

    /*
      Always start from page 1
      whenever the sample is opened.
    */

    inboxCurrentPage = 1;

    updateInboxPage();


    /* Save current body overflow state */

    previousBodyOverflow =
      document.body.style.overflow;


    /* Open modal */

    sampleModal.classList.add("is-open");

    sampleModal.setAttribute(
      "aria-hidden",
      "false"
    );


    /* Prevent background scrolling */

    document.body.style.overflow = "hidden";


    /* Move focus to close button */

    if (sampleModalClose) {
      sampleModalClose.focus();
    }
  }


  /* =========================================================
     CLOSE SAMPLE MODAL
     ========================================================= */

  function closeSampleModal() {

    if (!sampleModal) {
      return;
    }


    /* Close modal */

    sampleModal.classList.remove("is-open");

    sampleModal.setAttribute(
      "aria-hidden",
      "true"
    );


    /* Restore background scrolling */

    document.body.style.overflow =
      previousBodyOverflow;


    /*
      Clear PDF source while the modal is closed.
      This stops the viewer from remaining active
      in the background.
    */

    samplePdfViewer.src = "";


    /*
      Return keyboard focus to the
      Inbox Triage card.
    */

    if (inboxCard) {
      inboxCard.focus();
    }
  }


  /* =========================================================
     INBOX CARD
     ========================================================= */

  if (inboxCard) {

    /*
      Mouse / pointer interaction
    */

    inboxCard.addEventListener(
      "click",
      openInboxModal
    );


    /*
      Keyboard interaction

      Enter = open
      Space = open
    */

    inboxCard.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          openInboxModal();
        }

      }
    );

  }


  /* =========================================================
     NEXT PAGE
     ========================================================= */

  if (sampleNext) {

    sampleNext.addEventListener(
      "click",
      () => {

        if (
          inboxCurrentPage <
          inboxTotalPages
        ) {

          inboxCurrentPage += 1;

          updateInboxPage();
        }

      }
    );

  }


  /* =========================================================
     PREVIOUS PAGE
     ========================================================= */

  if (samplePrevious) {

    samplePrevious.addEventListener(
      "click",
      () => {

        if (
          inboxCurrentPage >
          1
        ) {

          inboxCurrentPage -= 1;

          updateInboxPage();
        }

      }
    );

  }


  /* =========================================================
     CLOSE BUTTON
     ========================================================= */

  if (sampleModalClose) {

    sampleModalClose.addEventListener(
      "click",
      closeSampleModal
    );

  }


  /* =========================================================
     CLICK OUTSIDE MODAL
     ========================================================= */

  if (sampleModalOverlay) {

    sampleModalOverlay.addEventListener(
      "click",
      closeSampleModal
    );

  }


  /* =========================================================
     ESCAPE KEY
     ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        sampleModal &&
        sampleModal.classList.contains("is-open")
      ) {

        closeSampleModal();
      }

    }
  );

});
```
