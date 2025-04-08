function showModal() {
  const modal = document.querySelector(".c-nw-modal");
  if (!modal) return;

  modal.classList.add("is-open");
  window.Scroll.stop();

  const closeButton = document.querySelector(".c-icon.nw-modal-close");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      modal.classList.remove("is-open");
      sessionStorage.setItem("nwModalShown", "true");
      window.Scroll.start();
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Auto-show logic
  if (!sessionStorage.getItem("nwModalShown") && window.innerWidth <= 767) {
    setTimeout(() => {
      showModal();
    }, 4000);
  }

  // Footer button event
  const button = document.querySelector(".c-img-contain.footer-signup");
  if (button) {
    button.addEventListener("click", () => {
      if (window.innerWidth <= 767) {
        showModal();
      }
    });
  }
});
