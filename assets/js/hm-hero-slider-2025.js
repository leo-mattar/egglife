class homeHeroSliderV2 {
  constructor() {
    this.sliderTarget = document.querySelector(
      ".js-home-hero__animate-wrapper"
    );
    this.titleTargets = document.querySelectorAll(
      ".js-home-hero__animate-title"
    );
    this.titleElement = document.querySelector(
      ".js-home-hero__animate-title-wrapper"
    );
    this.animateImageTargets = document.querySelectorAll(
      ".js-home-hero__animate-image"
    );
    this.animateImageElement = document.querySelector(
      ".js-home-hero__animate-image-wrapper"
    );

    this.sliderInstance = null;
    this.autoPlayTimer = 5;
    this.playSpeed = 0;
    this.tweenAnimations = 0.9;
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
    this.splitPatched = false;
    this.windowSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.resizeFn = null;
    this.isMobile = false;
  }

  init({ isMobile = false }) {
    this.isMobile = isMobile;

    this.markupSetup();
    this.attachListeners();
    this.sliderStatus();
    this.loadAnimation();
  }

  loadAnimation() {
    this.tlLoad = gsap.timeline({
      paused: true,
      onStart: _ => {
        gsap.set(this.titleElement, { opacity: 1 });
      },
      onComplete: _ => {
        this.loadComplete();
      },
    });
    this.tlLoad.play();

    let textEl = this.titleElement.querySelectorAll(".heading-style-h1");

    let typeSplit = new SplitType(textEl, {
      types: "words",
      tagName: "span",
      wordClass: "word",
    });

    (() => {
      if (this.splitPatched) return;
      const addSpacesBetweenWords = () => {
        try {
          textEl.forEach(el => {
            const words = el.querySelectorAll(".word");
            words.forEach((word, i) => {
              if (i < words.length - 1) {
                const next = word.nextSibling;
                if (
                  next &&
                  next.nodeType === Node.TEXT_NODE &&
                  /\s/.test(next.nodeValue)
                ) {
                  return;
                }
                if (
                  !(
                    next &&
                    next.nodeType === Node.TEXT_NODE &&
                    next._isInsertedBySplitPatch
                  )
                ) {
                  const spaceNode = document.createTextNode(" ");
                  spaceNode._isInsertedBySplitPatch = true;
                  word.parentNode.insertBefore(spaceNode, word.nextSibling);
                }
              }
            });
          });

          this.splitPatched = true;
        } catch (err) {}
      };

      const observer = new MutationObserver((mutations, obs) => {
        const allReady = Array.from(textEl).every(
          el => el.querySelectorAll(".word").length > 0
        );
        if (allReady) {
          addSpacesBetweenWords();
          obs.disconnect();
        }
      });

      try {
        observer.observe(this.titleElement, { childList: true, subtree: true });
      } catch (err) {}

      Promise.resolve()
        .then(() =>
          requestAnimationFrame(() => {
            if (!this.splitPatched) addSpacesBetweenWords();
          })
        )
        .catch(() => {
          setTimeout(() => {
            if (!this.splitPatched) addSpacesBetweenWords();
          }, 50);
        });

      setTimeout(() => {
        if (!this.splitPatched) {
          addSpacesBetweenWords();
          observer.disconnect();
        }
      }, 250);
    })();

    let firstSvgPath = this.animateImageTargets?.[0]
      ?.querySelector?.(
        `.c-hero-image-masked${
          this.isMobile ? ".is-mobile" : ".is-desktop"
        } svg path`
      )
      ?.getAttribute?.("d");
    let firstSvgInitPath = this.animateImageTargets?.[0]
      ?.querySelector?.(
        `.c-hero-image-masked${
          this.isMobile ? ".is-mobile" : ".is-desktop"
        } svg path`
      )
      ?.getAttribute?.("data-init-path");

    this.tlLoad
      .add("start")
      .fromTo(
        this.titleElement.querySelectorAll(".word"),
        { autoAlpha: 0, yPercent: 135, force3D: true },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: this.tweenAnimations,
          ease: this.easeSecondary,
          stagger: 0.05,
          force3D: true,
        },
        "start"
      )
      .fromTo(
        this.titleElement.querySelectorAll("[split-campaign-text-transition]"),
        { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" },
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.6,
          ease: this.easeSecondary,
          stagger: 0.12,
        },
        "start+=0.01"
      )
      .fromTo(
        this.animateImageTargets?.[0]?.querySelector?.(
          `.c-hero-image-masked${
            this.isMobile ? ".is-mobile" : ".is-desktop"
          } svg path`
        ),
        {
          morphSVG: firstSvgInitPath,
        },
        {
          morphSVG: {
            shape: firstSvgPath,
          },
          duration: this.tweenAnimations * 1.2,
          ease: this.easeSecondary,
        },
        "start+=0.3"
      )
      .fromTo(
        this.animateImageElement.querySelectorAll(".c-img.hero-badge"),
        {
          scale: 0,
          rotate: "-18deg",
        },
        {
          scale: 1,
          rotate: 0,
          duration: this.tweenAnimations,
          ease: this.easeSecondary,
        },
        "start+=0.3"
      );
  }

  loadComplete() {
    document.querySelector(".c-body").classList.remove("no-scroll");
    if (window.Scroll && typeof window.Scroll.start === "function") {
      window.Scroll.start();
    }
    this.tlSlidesStatus.play();
  }

  markupSetup() {
    for (let i = 0; i < this.titleTargets.length; i++) {
      const el = this.titleTargets[i];
      const isFirst = i === 0;

      const heading = el.querySelector(".heading-style-h1");

      gsap.set(el, {
        display: "block",
        position: isFirst ? "relative" : "absolute",
        top: "0",
        left: "0",
        opacity: isFirst ? 1 : 0,
        pointerEvents: isFirst ? "auto" : "none",
        willChange: "transform, opacity, clip-path",
      });

      const words = el.querySelectorAll(".word");
      if (words && words.length) {
        gsap.set(words, { transformOrigin: "50% 50%", force3D: true });
      }
    }

    let heroVideoIndex = null;
    for (let i = 0; i < this.animateImageTargets.length; i++) {
      if (this.animateImageTargets[i].querySelector(".c-hero-video")) {
        heroVideoIndex = i;
      }
    }

    let imgIndexForRelative = heroVideoIndex !== null ? heroVideoIndex : 0;

    for (let i = 0; i < this.animateImageTargets.length; i++) {
      const img = this.animateImageTargets[i];
      const isFirst = i === 0;

      gsap.set(img, {
        display: "block",
        position: i === imgIndexForRelative ? "relative" : "absolute",
        inset: 0,
        opacity: isFirst ? 1 : 0,
        pointerEvents: "none",
        willChange: "transform, opacity, clip-path",
      });

      const badge = img.querySelector(".c-img.hero-badge");
      if (badge) gsap.set(badge, { transformOrigin: "50% 50%", force3D: true });
    }
  }

  attachListeners() {
    window.addEventListener(
      "resize",
      () => {
        this.windowSize = {
          width: window.innerWidth,
          height: window.innerHeight,
        };

        const allTitleHeights = Array.from(this.titleTargets).map(
          el => el.offsetHeight || el.scrollHeight
        );
        const maxTitleHeight = Math.max(...allTitleHeights);

        gsap.set(this.titleElement, { height: maxTitleHeight });
      },
      true
    );
  }

  sliderStatus() {
    this.tlSlidesStatus = gsap.timeline({
      paused: true,
      onComplete: _ => {
        this.nextSlide();
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
  }

  animateSlider(currentIndex, nextIndex) {
    if (this.isAnimating) return;

    this.isAnimating = true;

    const currentTitle = this.titleTargets[currentIndex],
      nextTitle = this.titleTargets[nextIndex],
      currentImage = this.animateImageTargets[currentIndex],
      nextImage = this.animateImageTargets[nextIndex],
      nextSvgPath =
        nextImage
          ?.querySelector?.(
            `.c-hero-image-masked${
              this.isMobile ? ".is-mobile" : ".is-desktop"
            } svg path`
          )
          ?.getAttribute?.("data-original") ||
        nextImage
          ?.querySelector?.(
            `.c-hero-image-masked${
              this.isMobile ? ".is-mobile" : ".is-desktop"
            } svg path`
          )
          ?.getAttribute?.("d"),
      nextSvgInitPath = nextImage
        ?.querySelector?.(
          `.c-hero-image-masked${
            this.isMobile ? ".is-mobile" : ".is-desktop"
          } svg path`
        )
        ?.getAttribute?.("data-init-path"),
      nextVideo = nextImage?.querySelector?.(
        ".c-img-with-shapes .c-hero-video-element"
      );

    const wrapper = this.animateImageElement;
    const nextImageHeight = nextImage.offsetHeight || nextImage.scrollHeight;

    this.manageIndexObject(nextIndex);

    gsap.set([currentTitle, nextTitle, currentImage, nextImage], {
      pointerEvents: "none",
    });
    gsap.set(nextTitle, { pointerEvents: "none", display: "block" });

    this.animateInTl = gsap.timeline({
      onComplete: _ => {
        this.isAnimating = false;

        gsap.set(currentTitle, {
          opacity: 0,
          pointerEvents: "none",
          position: "absolute",
        });
        gsap.set(nextTitle, {
          opacity: 1,
          pointerEvents: "auto",
          position: "relative",
        });

        gsap.set(currentTitle, {
          opacity: 0,
          pointerEvents: "none",
          display: "block",
        });
        gsap.set(nextTitle, {
          opacity: 1,
          pointerEvents: "auto",
          display: "block",
        });

        gsap.set(nextTitle.querySelectorAll(".word"), {
          clearProps: "transform,opacity",
        });
        gsap.set(currentTitle.querySelectorAll(".word"), {
          clearProps: "transform,opacity",
        });

        gsap.set(currentImage, { opacity: 0, pointerEvents: "none" });
        gsap.set(nextImage, { opacity: 1, pointerEvents: "auto" });

        if (this.tlSlidesStatus) {
          this.tlSlidesStatus.restart(true);
        }

        if (this.firstInteraction) {
          gsap.set(this.titleTargets[0], {
            display: "block",
            position: "absolute",
            opacity: 0,
            pointerEvents: "none",
          });
          this.firstInteraction = false;
        }
      },
    });

    this.animateInTl
      .add("start")
      .fromTo(
        currentTitle.querySelectorAll(".word"),
        { opacity: 1, yPercent: 0, force3D: true },
        {
          opacity: 0,
          yPercent: -100,
          duration: this.tweenAnimations,
          ease: this.easeSecondary,
          stagger: 0.12,
          force3D: true,
        },
        "start"
      )
      .fromTo(
        currentTitle.querySelectorAll("[split-campaign-text-transition]"),
        { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
        {
          opacity: 0,
          clipPath: "inset(0% 100% 0% 0%)",
          duration: 0.6,
          ease: this.easeSecondary,
          stagger: 0.08,
        },
        "start+=0.02"
      )
      .fromTo(
        nextTitle,
        {
          opacity: 0,
          yPercent: 8,
          pointerEvents: "none",
          display: "block",
        },
        {
          opacity: 1,
          yPercent: 0,
          duration: this.tweenAnimations,
          ease: this.easeSecondary,
          pointerEvents: "auto",
        },
        "start+=0.25"
      )
      .fromTo(
        nextTitle.querySelectorAll(".word"),
        { opacity: 0, yPercent: 20, force3D: true },
        {
          opacity: 1,
          yPercent: 0,
          duration: this.tweenAnimations,
          ease: this.easeSecondary,
          stagger: 0.12,
          force3D: true,
        },
        "start+=0.35"
      )
      .fromTo(
        nextTitle.querySelectorAll("[split-campaign-text-transition]"),
        { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" },
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.6,
          ease: this.easeSecondary,
          stagger: 0.08,
        },
        "start+=0.35"
      )
      .fromTo(
        currentImage,
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: this.tweenAnimations * 1.2,
          ease: this.easeSecondary,
        },
        "start+=0.45"
      )
      .fromTo(
        nextImage,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: this.tweenAnimations * 1.2,
          ease: this.easeSecondary,
        },
        "start+=0.6"
      )
      .fromTo(
        currentImage.querySelector(".c-img.hero-badge"),
        {
          scale: 1,
          rotate: 0,
          force3D: true,
        },
        {
          scale: 0,
          rotate: -18,
          duration: this.tweenAnimations * 0.9,
          ease: this.ease,
          force3D: true,
        },
        "start+=0.5"
      )
      .fromTo(
        nextImage.querySelector(".c-img.hero-badge"),
        {
          scale: 0,
          rotate: -18,
          force3D: true,
        },
        {
          scale: 1,
          rotate: 0,
          duration: this.tweenAnimations * 0.9,
          ease: this.easeSecondary,
          force3D: true,
        },
        "start+=0.8"
      )
      .fromTo(
        nextImage.querySelector(
          `.c-hero-image-masked${
            this.isMobile ? ".is-mobile" : ".is-desktop"
          } svg path`
        ),
        {
          morphSVG: nextSvgInitPath,
        },
        {
          morphSVG: nextSvgPath,
          duration: this.tweenAnimations * 1.2,
          ease: this.easeSecondary,
          delay: 0.2,
        },
        "start+=0.45"
      )
      .fromTo(
        nextVideo,
        {
          //   borderRadius: "0%",
        },
        {
          //   borderRadius: "100%",
          duration: 1.4,
          ease: this.ease,
        },
        "start+=0.7"
      );
  }

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

  nextSlide() {
    if (!this.isAnimating) {
      this.animateSlider(this.indexObject.current, this.indexObject.next);
    }
  }
}
