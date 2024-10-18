document.addEventListener("DOMContentLoaded", function () {
  function nutritionAccordion() {
    const trigger = document.querySelector(".c-nutrition-toggle");
    const content = document.querySelector(".c-nutrition-content");
    let status = "closed";

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut", duration: 0.6 },
      paused: true,
    });

    tl.set(content, { opacity: 0 });

    tl.to(content, { height: "auto", marginTop: "1em", opacity: 1 });

    trigger.addEventListener("click", function () {
      if (status === "closed") {
        tl.restart();
        status = "open";
      } else {
        tl.reverse();
        status = "closed";
      }
    });
  }
  nutritionAccordion();

  // --- SLIDER
  function productSlider() {
    let thumbSlider = new Swiper(".swiper.pdp-thumb", {
      slidesPerView: "auto",
      spaceBetween: 12,
      speed: 400,
      slideToClickedSlide: true,
      loop: true,
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
        thumbSliderLoop.slideNext();
      }, 300);
    });
  }
  productSlider();

  // --- SLIDER LOOP
  function productSliderLoop() {
    let thumbSliderLoop = new Swiper(".swiper.pdp-thumb-loop", {
      slidesPerView: "auto",
      spaceBetween: 12,
      speed: 400,
      loop: true,
      slideToClickedSlide: true,
    });

    let mainSlider = new Swiper(".swiper.pdp-main-loop", {
      speed: 400,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      thumbs: {
        swiper: thumbSliderLoop,
      },
    });

    thumbSliderLoop.on("click", function () {
      setTimeout(() => {
        thumbSliderLoop.slideNext();
      }, 300);
    });
  }
  productSliderLoop();

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
