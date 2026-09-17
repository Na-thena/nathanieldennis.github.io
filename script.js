document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     EXISTING NAVIGATION
  ========================== */

  const navLinks = document.querySelectorAll(".nav-links a");
  const buttons = document.querySelectorAll(".button");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      button.blur();
    });
  });


  /* =========================
     INBOX TRIAGE SAMPLE
  ========================== */

  const inboxCard = document.querySelector(
    '.sample-card[data-sample="inbox"]'
  );

  const sampleModal = document.getElementById("sampleModal");
  const sampleModalOverlay = document.getElementById("sampleModalOverlay");
  const sampleModalClose = document.getElementById("sampleModalClose");
  const samplePdfViewer = document.getElementById("samplePdfViewer");
  const samplePrevious = document.getElementById("samplePrevious");
  const sampleNext = document.getElementById("sampleNext");
  const samplePageIndicator = document.getElementById("samplePageIndicator");

  const inboxPdf = "inbox-triage.pdf";
  const inboxTotalPages = 3;

  let inboxCurrentPage = 1;


  function updateInboxPage() {

    samplePageIndicator.textContent =
      `${String(inboxCurrentPage).padStart(2, "0")} / ${String(inboxTotalPages).padStart(2, "0")}`;

    samplePdfViewer.src =
      `${inboxPdf}#page=${inboxCurrentPage}&zoom=page-width`;

    samplePrevious.disabled = inboxCurrentPage === 1;
    sampleNext.disabled = inboxCurrentPage === inboxTotalPages;
  }


  function openInboxSample() {

    inboxCurrentPage = 1;

    updateInboxPage();

    sampleModal.classList.add("is-open");
    sampleModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    sampleModalClose.focus();
  }


  function closeInboxSample() {

    sampleModal.classList.remove("is-open");
    sampleModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    samplePdfViewer.src = "";

    inboxCard.focus();
  }


  if (inboxCard) {

    inboxCard.addEventListener("click", openInboxSample);

    inboxCard.addEventListener("keydown", (event) => {

      if (event.key === "Enter" || event.key === " ") {

        event.preventDefault();

        openInboxSample();
      }

    });

  }


  sampleNext.addEventListener("click", () => {

    if (inboxCurrentPage < inboxTotalPages) {

      inboxCurrentPage++;

      updateInboxPage();
    }

  });


  samplePrevious.addEventListener("click", () => {

    if (inboxCurrentPage > 1) {

      inboxCurrentPage--;

      updateInboxPage();
    }

  });


  sampleModalClose.addEventListener("click", closeInboxSample);

  sampleModalOverlay.addEventListener("click", closeInboxSample);


  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      sampleModal.classList.contains("is-open")
    ) {

      closeInboxSample();
    }

  });

});
