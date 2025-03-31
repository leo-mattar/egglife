document.addEventListener("DOMContentLoaded", () => {
  const homeSliderItem = document.querySelector(".js-home-slider");

  if (typeof homeSliderItem != "undefined" && homeSliderItem != null) {
    new homeHeroSlider().init();
  }
});

class homeHeroSlider {
  constructor() {
    this.header = document.querySelector(".c-header");
    this.sliderTarget = document.querySelector(".js-home-slider");
    this.titleTargets = document.querySelectorAll(".js-hero-slider__title");
    this.titleWrapper = document.querySelector(".c-hero-slider__title-wrapper");
    this.titleElement = document.querySelector(
      ".js-hero-slider__title-element"
    );
    this.bgTargets = document.querySelectorAll(".js-hero-slider__bg");
    this.sliderBg = document.querySelector(".js-hero-slider-bg");
    this.bgColors = [];
    this.sliderTrasitionTarget = document.querySelector(
      ".js-hero-slider-transition"
    );
    this.sliderTrasitionPlaceholderTarget = document.querySelector(
      ".js-hero-slider-transition-placeholder"
    );
    this.sliderProductsTargets = document.querySelectorAll(
      ".js-hero-slider__product"
    );
    this.sliderAnimateInTargets = document.querySelectorAll(
      ".js-home-slider-animate-in"
    );

    this.sliderInstance = null;
    this.autoPlayTimer = 5;
    this.playSpeed = 0;
    this.tweenAnimations = 1;
    this.manageResizeFn = null;
    this.tlSlidesStatus = null;
    this.tlLoad = null;
    this.ease = "power3.inOut";
    this.easeSecondary = "expo.out";
    this.firstInteraction = true;

    this.isAnimating = false;
    this.indexObject = {
      current: 0,
      next: 1,
      prev: this.titleTargets.length - 1,
    };

    this.windowSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.resizeFn = null;
  }

  // Initilize Module
  init() {
    this.markupSetup();
    this.attachListeners();
    this.sliderStatus();
    this.loadAnimation();
  }

  // First animation
  loadAnimation() {
    this.tlLoad = gsap.timeline({
      paused: true,
      onStart: _ => {
        gsap.set(this.titleElement, { opacity: 1 });
      },
      onComplete: _ => {
        this.loadComplete();

        gsap.set(
          [this.sliderTrasitionTarget, this.sliderTrasitionPlaceholderTarget],
          { clearProps: "scale" }
        );
        gsap.set(this.sliderAnimateInTargets, { clearProps: "y" });
      },
    });
    this.tlLoad.play();

    let textEl = this.titleElement.querySelectorAll(".c-hm-title");
    let typeSplit = new SplitType(textEl, {
      types: "words",
      tagName: "span",
    });

    this.tlLoad
      .add("start")

      .to(
        this.header,
        { y: 0, duration: this.tweenAnimations, ease: this.ease },
        "start"
      )

      .fromTo(
        this.titleElement.querySelectorAll(".word"),
        { autoAlpha: 0, yPercent: 135 },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: this.tweenAnimations,
          ease: this.easeSecondary,
          stagger: 0.05,
        },
        "start"
      )

      .fromTo(
        this.sliderAnimateInTargets,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: this.tweenAnimations,
          ease: this.easeSecondary,
          stagger: 0.2,
        },
        "start+=0.5"
      )

      .fromTo(
        [this.sliderTrasitionTarget, this.sliderTrasitionPlaceholderTarget],
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: this.tweenAnimations,
          ease: this.easeSecondary,
        },
        "start+=0.3"
      );
  }

  loadComplete() {
    document.querySelector(".c-body").classList.remove("no-scroll");
    window.Scroll.start();
    this.tlSlidesStatus.play();
  }

  // Cleanup webflow markup
  markupSetup() {
    // title
    this.titleWrapper.style.position = "relative";

    for (let i = 0; i < this.titleTargets.length; i++) {
      this.titleTargets[i].querySelector(".t-display-2").style.cssText = `
        white-space: nowrap;
      `;

      // new SplitType(this.titleTargets[i], {
      //   types: 'words',
      //   tagName: 'span'
      // })

      if (i > 0) {
        this.titleTargets[i].classList.remove("hide");
        this.titleTargets[i].style.cssText = `
          display: block; 
          position: absolute;
          opacity: 0;
        `;
      }
    }

    this.setTitleWrapperWidth(
      this.titleTargets[0].querySelector(".t-display-2")
    );

    // bg
    this.sliderBg.style.cssText = `
      pointer-events: none; 
    `;

    for (let i = 0; i < this.bgTargets.length; i++) {
      this.bgColors[i] = window.getComputedStyle(
        this.bgTargets[i].querySelector(".c-slider-bg")
      ).backgroundColor;

      this.bgTargets[i].querySelector(".c-slider-bg").style.cssText = `
      display: none; 
    `;
    }

    this.sliderBg.style.backgroundColor = this.bgColors[0];
    this.bgTargets[0].parentNode.parentNode.remove();

    // products
    for (let i = 0; i < this.sliderProductsTargets.length; i++) {
      this.sliderProductsTargets[i].querySelector(
        ".c-img-contain"
      ).style.cssText = `
        display: flex; 
      `;

      if (i > 0) {
        this.sliderProductsTargets[i].style.cssText = `
          opacity: 0;
          pointer-events: none;
        `;
      }
    }
  }

  // resize
  attachListeners() {
    window.addEventListener(
      "resize",
      () => {
        this.windowSize = {
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      true
    );
  }

  // fake timeline to manage autoplay timer
  sliderStatus() {
    this.tlSlidesStatus = gsap.timeline({
      paused: true,
      onStart: _ => {},
      onComplete: _ => {
        this.nextSlide(); // comment for testing
      },
    });

    this.tlSlidesStatus.fromTo(
      this.sliderTarget,
      {
        pointerEvents: "auto",
      },
      {
        pointerEvents: "auto",
        duration: this.autoPlayTimer,
      }
    );

    this.tlSlidesStatus.play(); // comment for testing

    // uncomment for testing
    // window.addEventListener('click', () => {
    //   this.nextSlide()
    // }, true)
  }

  // main animation timeline
  animateSlider(currentIndex, nextIndex) {
    this.isAnimating = true;

    const currentTitle = this.titleTargets[currentIndex],
      nextTitle = this.titleTargets[nextIndex],
      currentBg = this.bgColors[currentIndex],
      nextBg = this.bgColors[nextIndex],
      currentProduct = this.sliderProductsTargets[currentIndex],
      nextProduct = this.sliderProductsTargets[nextIndex];

    // Add this line to get the title wrap element
    const homeTitleWrap = document.querySelectorAll("[home-title-wrap]");

    let circleScaleValue = 2.5;
    if (this.windowSize.width < 991) {
      circleScaleValue = 3;
    }

    this.animateInTl = gsap.timeline({
      onStart: _ => {
        this.tlSlidesStatus.restart();
        this.manageIndexObject(nextIndex);
        this.setTitleWrapperWidth(nextTitle.querySelector(".t-display-2"));

        // Add color change logic
        if (nextIndex === this.titleTargets.length - 1) {
          gsap.to(homeTitleWrap, {
            color: "white",
            duration: 1.4,
            ease: this.easeSecondary,
          });
        } else if (nextIndex === 0) {
          gsap.to(homeTitleWrap, {
            color: "#521fcc", // or specify your original color here
            duration: 1.6,
            ease: this.easeSecondary,
          });
        }

        gsap.set(currentTitle, {
          opacity: 1,
          yPercent: 0,
          pointerEvents: "auto",
          position: "absolute",
        });
      },
      onComplete: _ => {
        this.isAnimating = false;

        gsap.set(currentTitle, { display: "none", clearProps: "opacity, y" });
        gsap.set(nextTitle.querySelectorAll(".word"), {
          clearProps: "opacity, y",
        });
        gsap.set(currentTitle.querySelectorAll(".word"), {
          clearProps: "opacity, y",
        });
        gsap.set(this.sliderTrasitionTarget, { clearProps: "all" });

        // adjust markup of first title slide after first interaction
        if (this.firstInteraction) {
          this.titleTargets[0].style.cssText = `
            display: block; 
            position: absolute;
            opacity: 0;
          `;

          this.firstInteraction = false;
        }
      },
    });

    this.animateInTl
      .add("start")

      // title
      .fromTo(
        currentTitle.querySelectorAll(".word"),
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -60,
          duration: this.tweenAnimations,
          ease: this.easeSecondary,
          stagger: 0.2,
        },
        "start+=0.01"
      )
      .fromTo(
        nextTitle,
        {
          opacity: 0,
          yPercent: 100,
          pointerEvents: "none",
          display: "block",
          position: "relative",
        },
        {
          opacity: 1,
          yPercent: 0,
          pointerEvents: "auto",
          duration: this.tweenAnimations,
          ease: this.easeSecondary,
        },
        "start+=0.3"
      )
      .fromTo(
        nextTitle.querySelectorAll(".word"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: this.tweenAnimations,
          ease: this.easeSecondary,
          stagger: 0.2,
        },
        "start+=0.2"
      )

      // color bg
      .fromTo(
        this.sliderBg,
        { backgroundColor: currentBg },
        {
          backgroundColor: nextBg,
          duration: this.tweenAnimations,
          ease: this.ease,
        },
        "start+=0.2"
      )

      // circle
      .fromTo(
        this.sliderTrasitionTarget,
        { scale: 1, transformOrigin: "center" },
        {
          scale: circleScaleValue,
          duration: this.tweenAnimations,
          ease: this.ease,
        },
        "start+=0.1"
      )
      .fromTo(
        this.sliderTrasitionTarget,
        { opacity: 1 },
        { opacity: 0, duration: this.tweenAnimations, ease: this.ease },
        "start+=0.4"
      )

      // product
      .fromTo(
        currentProduct,
        { opacity: 1, yPercent: 0, rotation: 0 },
        {
          opacity: 0,
          yPercent: 50,
          rotation: 15,
          duration: this.tweenAnimations * 1.5,
          ease: this.easeSecondary,
        },
        "start+=0.1"
      )
      .fromTo(
        nextProduct,
        { opacity: 0, yPercent: 50, rotation: -15 },
        {
          opacity: 1,
          yPercent: 0,
          rotation: 0,
          duration: this.tweenAnimations * 1.5,
          ease: this.easeSecondary,
        },
        "start+=0.15"
      );
  }

  // keep index object updated
  manageIndexObject(nextIndex, firstTime) {
    if (!firstTime) {
      this.indexObject.current = nextIndex;

      if (nextIndex === this.titleTargets.length - 1) {
        this.indexObject.next = 0;
      } else {
        this.indexObject.next = nextIndex + 1;
      }

      if (this.indexObject.current === 0) {
        this.indexObject.prev = this.titleTargets.length - 1;
      } else {
        this.indexObject.prev = nextIndex - 1;
      }
    }
  }

  // go to next slide
  nextSlide() {
    if (!this.isAnimating) {
      this.animateSlider(this.indexObject.current, this.indexObject.next);
    }
  }

  // animate keyword slider width on change
  setTitleWrapperWidth(el) {
    let width = el.clientWidth,
      widthVW = parseFloat(((100 * width) / this.windowSize.width).toFixed(2));

    gsap.to(this.titleWrapper, {
      width: widthVW + "vw",
      duration: this.tweenAnimations,
      ease: this.easeSecondary,
      delay: 0.2,
    });
  }
}
