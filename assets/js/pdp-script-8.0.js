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
      on: {
        slideChange: function () {
          let activeIndex = this.activeIndex + 1;

          let activeSlide = document.querySelector(
            `.swiper-slide.pdp-main:nth-child(${activeIndex})`
          );
          let nextSlide = document.querySelector(
            `.swiper-slide.pdp-main:nth-child(${activeIndex + 1})`
          );
          let prevSlide = document.querySelector(
            `.swiper-slide.pdp-main:nth-child(${activeIndex - 1})`
          );

          if (
            nextSlide &&
            !nextSlide.classList.contains("swiper-slide-visible")
          ) {
            this.thumbs.swiper.slideNext();
          } else if (
            prevSlide &&
            !prevSlide.classList.contains("swiper-slide-visible")
          ) {
            this.thumbs.swiper.slidePrev();
          }
        },
      },
    });

    // thumbSlider.on("click", function () {
    //   setTimeout(() => {
    //     thumbSliderLoop.slideNext();
    //   }, 300);
    // });
  }
  productSlider();

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