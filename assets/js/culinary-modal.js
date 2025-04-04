document.addEventListener("DOMContentLoaded", function () {
  function showModal() {
    const modal = document.querySelector(".c-nw-modal");
    if (!modal) return;

    if (sessionStorage.getItem("nwModalShown")) return;
    if (window.innerWidth > 767) return;

    setTimeout(() => {
      modal.classList.add("is-open");
    }, 4000);

    const closeButton = document.querySelector(".c-icon.nw-modal-close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        modal.classList.remove("is-open");
        sessionStorage.setItem("nwModalShown", "true");
      });
    }
  }

  showModal();
});
