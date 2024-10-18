document.addEventListener("DOMContentLoaded", function () {
  // --- LOOP SLIDER
  function loopSlider() {
    let thumbSlider = new Swiper(".swiper.pdp-thumb-loop", {
      slidesPerView: "auto",
      spaceBetween: 12,
      speed: 400,
      slideToClickedSlide: true,
      loop: true,
      centeredSlides: true,
    });

    let mainSlider = new Swiper(".swiper.pdp-main", {
      speed: 400,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      thumbs: {
        swiper: thumbSlider,
      },
    });

    thumbSlider.on("click", function () {
      setTimeout(() => {
        thumbSlider.slideNext();
      }, 300);
    });
  }
  loopSlider();

  // --- IMAGE ZOOM
  jQuery(function () {
    $(".c-img-contain.pdp-main .c-img").imagezoomsl({
      innerzoommagnifier: true,
      classmagnifier: "c-magnifier",
      magnifiersize: [180, 180],
      disablewheel: false,
    });
  });
});
