gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, DrawSVGPlugin);

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

// RELOAD AT THE TOP
$(window).on("beforeunload", function () {
  history.scrollRestoration = "manual";
});

// LOAD COMPLETE
function loadComplete() {
  $(".c-body").removeClass("no-scroll");
  window.Scroll.start();
}

// NAV LINK HOVER
function navLinkHover() {
  $(".c-nav-link").each(function () {
    let tl = gsap.timeline({ paused: true });

    let navHover = $(this).find(".c-nav-link_hover");

    tl.fromTo(
      navHover,
      { width: "0%", autoAlpha: 0 },
      { width: "100%", autoAlpha: 1, duration: 0.8, ease: "power3.inOut" },
      0
    );

    $(this).on("mouseenter", function () {
      tl.restart();
    });

    $(this).on("mouseleave", function () {
      tl.reverse();
    });
  });
}

// NAV LINK CLONE
function navLinkHoverClone() {
  $(".c-dd-link").each(function () {
    let tl = gsap.timeline({ paused: true });
    let navHoverClone = $(this).find(".c-nav-link_hover-clone");

    gsap.set(navHoverClone, { transformOrigin: "left left" });

    tl.fromTo(
      navHoverClone,
      { scaleX: "0%", autoAlpha: 0 },
      { scaleX: "100%", autoAlpha: 1, duration: 0.6, ease: "power3.inOut" },
      0
    );

    $(this).on("mouseenter", function () {
      tl.restart();
    });

    $(this).on("mouseleave", function () {
      tl.reverse();
    });
  });
}

// HEADER BG
function headerBG() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".c-body",
      start: "10 top",
      end: "+=1",
      onEnter: () => {
        tl.play();
        $(".c-nav-link_hover").addClass("reverse");
        // $(".c-nav-link_hover-clone").addClass("reverse");
        $(".c-body").addClass("scrolled");
      },
      onLeaveBack: () => {
        tl.reverse();
        $(".c-nav-link_hover").removeClass("reverse");
        // $(".c-nav-link_hover-clone").removeClass("reverse");
        $(".c-body").removeClass("scrolled");
      },
    },
    defaults: {
      duration: 1,
      ease: "power3.inOut",
    },
  });

  tl.to(".c-header-bg", { y: 0 });
  tl.to(".c-header", { height: "4.5em" }, 0);
  tl.to(".c-nav-shop_num", { backgroundColor: "#FED141" }, 0);
}

// HEADER BG MOBILE
function headerBGMobile() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".c-body",
      start: "10 top",
      end: "+=1",
      onEnter: () => {
        tl.play();
        $(".c-nav-link_hover").addClass("reverse");
        // $(".c-nav-link_hover-clone").addClass("reverse");
        $(".c-body").addClass("scrolled");
      },
      onLeaveBack: () => {
        tl.reverse();
        $(".c-nav-link_hover").removeClass("reverse");
        // $(".c-nav-link_hover-clone").removeClass("reverse");
        $(".c-body").removeClass("scrolled");
      },
    },
    defaults: {
      duration: 1,
      ease: "power3.inOut",
    },
  });

  tl.to(".c-header-bg", { y: 0 });
  tl.to(".c-header", { height: "4em" }, 0);
  tl.to(".c-nav-shop_num", { backgroundColor: "#FED141" }, 0);
}

// RESERVE HEADER COLORS
function headerReverse() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".c-body",
      start: "150 top",
      end: "+=1",
      onEnter: () => {
        $(".c-header").removeClass("reverse");
      },
      onLeaveBack: () => {
        $(".c-header").addClass("reverse");
      },
    },
  });
}

// STICKER ROTATION
function fullRotation() {
  let tl = gsap.timeline({ repeat: -1 });
  tl.to("[sticker-rotation]", { ease: "none", duration: 60, rotation: 360 });
}
fullRotation();

// Span background
$(".span-wrap").each(function (index) {
  let relatedEl = $(".span-bg").eq(index);
  relatedEl.appendTo($(this));
});

//  Parallax
function parallax() {
  $("[parallax]").each(function (index) {
    let tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: $(this),
        scrub: true,
      },
    });
    tl.fromTo($(this).find(".c-img"), { yPercent: -8 }, { yPercent: 8 });
  });
}
parallax();

// Expand Circle
function expandCircle() {
  $("[expand-trigger]").each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "10% bottom",
        scrub: true,
        endTrigger: "[expand-endtrigger]",
      },
    });

    tl.fromTo(
      "[expand-el]",
      { scale: 0, transformOrigin: "50% 50%" },
      { scale: 1.9 }
    );
  });
}
expandCircle();

// Image Radius
function imgRadius() {
  $("[img-radius]").each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top bottom",
        end: "center center",
        scrub: true,
      },
    });

    tl.from($(this), {
      borderRadius: "2em",
      scale: 0.9,
    });
  });
}
imgRadius();

// Draggable
function dragEl() {
  let elements = document.querySelectorAll("[drag]");

  elements.forEach((element) => {
    let section = element.closest(".c-section");
    let sectionRect = section.getBoundingClientRect();
    let elementRect = element.getBoundingClientRect();

    let draggable = Draggable.create(element, {
      type: "x,y",
      inertia: true,
      x: sectionRect.left + elementRect.left,
      y: sectionRect.top + elementRect.top,
      bounds: section,
    });
  });
}

// HEADER DROPDOWN
function headerDropdown() {
  $(".c-dd-link").each(function () {
    let tl = gsap.timeline({ paused: true });

    let dropdownList = $(this).find(".c-dd-list");
    let dropdownHover = $(this).find(".c-nav-link_hover");
    let dropdownHoverClone = $(".c-nav-link_hover-clone");

    gsap.set(".c-dd-list", {
      display: "flex",
      clipPath: "inset(0% 0% 100% 0%)",
    });

    gsap.set(dropdownHover, { transformOrigin: "left left" });

    tl.to(dropdownList, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.8,
      ease: "power3.inOut",
    });

    tl.fromTo(
      dropdownHover,
      { scaleX: "0%", autoAlpha: 0 },
      { scaleX: "100%", autoAlpha: 1, duration: 0.6, ease: "power3.inOut" },
      0
    );

    $(this).on("click", function () {
      $(".c-dd-link.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      dropdownHover.addClass("reverse");
      dropdownHoverClone.addClass("dropdown");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
        dropdownHoverClone.removeClass("dropdown");

        // dropdownHoverClone.addClass("reverse");
      }
    });

    // Close dropdowns when clicking outside
    $(document).mouseup(function (e) {
      if ($(e.target).closest(".c-dd-link").length === 0) {
        $(".c-dd-link.is-open").click();
      }
    });
  });
}

// HEADER RECIPES DROPDOWN LINK HOVER
function recipesDropdownLink() {
  $(".c-dd-item").each(function () {
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 1, ease: "power1.inOut" },
    });

    let recipeThumb = $(this).find(".c-img.dd-thumb");

    tl.fromTo(recipeThumb, { scale: 1 }, { scale: 1.05 });

    $(this).on("mouseenter", function () {
      tl.restart();
    });

    $(this).on("mouseleave", function () {
      tl.reverse();
    });
  });
}

// Header dropdown all recipes placement
function desktopDOM() {
  $(".c-dd-item.all-recipes").appendTo(".c-header_dd.recipes");
}

function mobileDOM() {
  $("[logo-footer-el]").prependTo("[logo-footer-location]");
  // $("[social-footer-el]").appendTo("[social-footer]");
  $(".c-dd-item.all-recipes-mobile").appendTo(".c-header_dd.recipes");

  $("[place-el]").each(function (index) {
    let movingEl = $("[moving-el]").eq(index);
    movingEl.appendTo($(this)).eq(index);
  });
}

// Header Mobile
function headerMobile() {
  let tl = gsap.timeline({ paused: true });

  let headerEl = $(".c-header-mobile");

  gsap.set(headerEl, { visibility: "visible" });

  tl.to(headerEl, { display: "flex", duration: 0 }, 0);

  tl.fromTo(
    headerEl,
    {
      clipPath: "inset(0% 0% 0% 100%)",
    },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1,
      ease: "expo.inOut",
    }
  );

  $(".c-nav-icon").on("click", function () {
    $(".c-body").addClass("no-scroll");
    tl.restart();
  });

  $(".c-nav-close").on("click", function () {
    $(".c-body").removeClass("no-scroll");
    tl.reverse();
    $(".c-dd-link-mobile.is-open").click();
  });
}

// Dropdown mobile
function headerDropdownMobile() {
  $(".c-dd-link-mobile").each(function () {
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 1.2, ease: "expo.inOut" },
    });

    let dropdownList = $(this).find(".c-dd-list.mobile");
    let dropdownIcon = $(this).find(".c-icon.dd-icon");
    let dropdownInner = $(this).find(".c-dd-link-mobile-inner");

    gsap.set(dropdownList, { height: 0, marginTop: 0, autoAlpha: 0 });

    tl.to(dropdownList, { height: "auto", marginTop: 32, autoAlpha: 1 });

    tl.to(dropdownIcon, { rotation: 180 }, 0);

    dropdownInner.on("click", function () {
      $(".c-dd-link-mobile.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });
  });
}

// FADE
function fade() {
  gsap.set("[fade]", { opacity: 0, yPercent: 25 });

  ScrollTrigger.batch("[fade]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        yPercent: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1,
      }),
  });
}

// LINE
function line() {
  // Draw line
  gsap.set("[line]", { opacity: 1, scaleX: 0, transformOrigin: "top left" });

  ScrollTrigger.batch("[line]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        scaleX: 1,
        delay: 0.1,
        duration: 2,
        ease: "power3.out",
        stagger: 0.1,
      }),
  });
}

// SPLIT TEXT
function splitText() {
  let textEl = document.querySelectorAll("[split-text]");

  let typeSplit = new SplitType(textEl, {
    types: "lines, words",
    tagName: "span",
  });

  gsap.set(".line .word", { yPercent: 135 });
  gsap.set(".span-wrap", { clipPath: "inset(0% 100% 0% 0%)" });

  ScrollTrigger.batch(".line .word", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        yPercent: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
      }),
  });

  ScrollTrigger.batch(".span-wrap", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
      }),
  });
}

// Recipes hub pagination anchor scroll
$(".c-pagination").on("click", function () {
  $(".c-filter-anchor").click();
});

// Freedom hand home
function freedomHand() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".c-section.hm-why",
      start: "top center",
    },
  });

  tl.from(".c-img-contain.hand", {
    rotation: -30,
    xPercent: -30,
    yPercent: 30,
    duration: 2,
    ease: "expo.out",
    autoAlpha: 0,
  });
}

// SET 2 LINE TEXT
$(".c-btn").each(function (index) {
  let mainText = $(this).find(".c-btn-label.line-1").text();
  $(this).find(".c-btn-label.line-2").text(mainText);
});

// BUTTON HOVER EFFECT
function buttonHover() {
  // BUTTON SPLIT TEXT
  let textEl = document.querySelectorAll("[btn-split-text]");
  let typeSplit = new SplitType(textEl, {
    types: "words, chars",
    tagName: "span",
  });

  $(".c-btn").each(function () {
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.4, ease: "power3.inOut" },
    });

    let buttonBG = $(this).find(".c-btn-bg");
    let buttonArrow = $(this).find(".c-btn-icon");

    let listOne = $(this).find(".c-btn-label.line-1 .char");
    let listTwo = $(this).find(".c-btn-label.line-2 .char");

    gsap.set(listTwo, { autoAlpha: 1 });

    tl.fromTo(buttonBG, { scale: 1 }, { scale: 0.94 });
    tl.to(buttonArrow, { rotation: -15 }, 0);
    tl.to(listOne, { y: "-110%", stagger: { each: 0.02 } }, 0);
    tl.from(listTwo, { y: "110%", autoAlpha: 0, stagger: { each: 0.02 } }, 0.1);

    $(this).on("mouseenter", function () {
      tl.restart();
    });

    $(this).on("mouseleave", function () {
      tl.reverse();
    });
  });
}

// FOOTER SHAPES
function footerShapes() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".c-section.footer",
      start: "center bottom",
    },
  });

  tl.from(".c-footer-shape_lt path", {
    drawSVG: 0,
    duration: 30,
    ease: "expo.out",
  });
  tl.from(
    ".c-footer-shape_rt path",
    { drawSVG: 0, duration: 30, ease: "expo.out" },
    1
  );
}

// RECIPES FILTER DROPDOWN
function recipesDropdown() {
  $(".c-filter").each(function () {
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.6, ease: "power3.inOut" },
    });

    let dropdownList = $(this).find(".c-filter_bt");
    let dropdownIcon = $(this).find(".c-icon");
    let dropdownTrigger = $(this).find(".c-filter_top");

    gsap.set(dropdownList, { height: 0, marginTop: 0, autoAlpha: 0 });

    tl.to(dropdownList, { height: "auto", marginTop: 24, autoAlpha: 1 });

    tl.to(dropdownIcon, { rotation: 180 }, 0);

    dropdownTrigger.on("click", function () {
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });
  });
}

// RECIPES FILTER DROPDOWN MOBILE
function recipesDropdownMobile() {
  let tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power3.inOut", duration: 0.6 },
  });

  let filter = $(".c-filter-wrap");
  let filterIconEl = $(".c-filter-icon");
  let filterContent = $(".c-filter-content");

  gsap.set(filterContent, { autoAlpha: 0 });

  tl.to(filter, { borderRadius: "1.5em", duration: 0.2 });
  tl.to(
    filterContent,
    { duration: 1, height: "auto", marginTop: "1.5em", autoAlpha: 1 },
    0
  );
  tl.to(filterIconEl, { rotation: 180 }, 0);

  filterIconEl.on("click", function () {
    $(this).toggleClass("is-open");
    if ($(this).hasClass("is-open")) {
      tl.restart();
    } else {
      tl.reverse();
    }
  });
}

// COMMUNITY HERO
function communityPageLoad() {
  let tl = gsap.timeline();

  let communityEl = $(".c-img-contain.community-hero");
  let communityBox = $(".c-community-hero");
  let communityBar = $(".c-community-bar");
  let careersBox = $(".o-row.careers-hero");
  let blogTitle = $(".c-section.blog-hero .t-display-2");
  let blogSubtitle = $(".c-section.blog-hero .t-body-2");
  let pressTitle = $(".c-section.blog-hero .t-display-1");

  gsap.set(communityEl, {
    scale: 1.2,
    // clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
    autoAlpha: 0,
  });
  gsap.set(communityBox, { autoAlpha: 0, yPercent: 20 });
  gsap.set(communityBar, { autoAlpha: 0, yPercent: 20 });
  gsap.set(careersBox, { autoAlpha: 0, yPercent: 20 });

  tl.to(communityEl, { autoAlpha: 1, duration: 0.3 }, 0);

  tl.to(blogTitle, { autoAlpha: 1 }, "<0.2");
  tl.to(pressTitle, { autoAlpha: 1 }, "<0.2");
  tl.to(blogSubtitle, { autoAlpha: 1 }, 0.2);

  tl.to(".c-header", { y: "0%", duration: 1, ease: "power3.out" }, "<0.5");

  tl.to(
    communityEl,
    {
      scale: 1,
      duration: 2,
      ease: "power4.out",
      // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
    },
    0
  );

  tl.call(loadComplete, null, "<0.8");

  tl.to(
    communityBox,
    {
      duration: 1,
      ease: "expo.out",
      autoAlpha: 1,
      yPercent: 0,
    },
    1
  );

  tl.to(
    communityBar,
    { autoAlpha: 1, yPercent: 0, duration: 0.4, ease: "power2.out" },
    "<0.3"
  );

  tl.to(
    careersBox,
    {
      duration: 1,
      ease: "expo.out",
      autoAlpha: 1,
      yPercent: 0,
    },
    "<-0.5"
  );
}

// FAQ ACCORDION
function faqAccordion() {
  $(".c-accordion-item").each(function () {
    let tl = gsap.timeline({
      paused: true,
      dafaults: {
        duration: 0.8,
        ease: "power3.inOut",
      },
    });

    let accordionTxt = $(this).find(".c-accordion_bt");
    let accordionIcon = $(this).find(".c-accordion-icon");

    gsap.set(accordionTxt, { height: 0, autoAlpha: 0 });

    tl.to(accordionTxt, { height: "auto", marginTop: "2.5em", autoAlpha: 1 });
    tl.to(accordionIcon, { rotate: 180 }, 0);

    $(this).on("click", function () {
      $(".c-accordion-item.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });
  });
}
faqAccordion();

// TEAM BIO MODAL
function teamBioModal() {
  $(".c-team-item").each(function () {
    let tl = gsap.timeline({ paused: true });

    let teamEl = $(this).find(".c-team-bio");
    let teamTrigger = $(this).find(".c-team-trigger");
    let teamCloseEl = $(this).find(".c-team-bio_modal-close");
    let teamOverlay = $(this).find(".c-team-bio_overlay");
    gsap.set(teamEl, { display: "flex", autoAlpha: 0 });

    tl.to(teamEl, { autoAlpha: 1, duration: 0.4, ease: "power3.inOut" });

    teamTrigger.on("click", function () {
      window.Scroll.stop();
      tl.restart();
    });

    teamCloseEl.on("click", function () {
      window.Scroll.start();
      tl.reverse();
    });

    teamOverlay.on("click", function () {
      window.Scroll.start();
      tl.reverse();
    });
  });
}
teamBioModal();

// RESOURCES HUB PAGE LOAD
function recipesHubPageLoad() {
  let tl = gsap.timeline();

  tl.to(".c-section.recipes-hub-hero .t-display-2", { autoAlpha: 1 });
  tl.to(".c-section.recipes-hub-hero .t-body-2", { autoAlpha: 1 }, 0.2);
  tl.fromTo(
    ".c-section.recipes-hub-hero .video-el",
    { autoAlpha: 0 },
    {
      autoAlpha: 1,
      duration: 1.4,
      ease: "expo.out",
    },
    0.4
  );
  tl.to(".c-header", { y: "0%", duration: 1, ease: "power3.out" }, 0.6);

  $(".video-el").get(0).play();

  tl.call(loadComplete, null, "1");
}

// WHY WE DO IT PAGE LOAD
function whyWeDoItPageLoad() {
  let tl = gsap.timeline({ defaults: { duration: 1, ease: "power4.out" } });

  let heroTitle = $(".c-section.why-we .t-display-2");
  let modeImage = $(".c-img-contain.modern");
  let whyCircleOne = $(".c-img-contain.why-circle.is-4");
  let whyCircleTwo = $(".c-img-contain.why-circle.is-5");
  let whyCircleThree = $(".c-img-contain.why-circle.is-6");

  gsap.set(whyCircleOne, {
    autoAlpha: 0,
    scale: 0,
    xPercent: -50,
    yPercent: 150,
  });

  gsap.set(whyCircleTwo, {
    autoAlpha: 0,
    scale: 0,
    xPercent: -200,
    yPercent: -100,
  });

  gsap.set(whyCircleThree, {
    autoAlpha: 0,
    scale: 0,
    xPercent: 300,
    yPercent: -300,
  });

  tl.to(whyCircleOne, { autoAlpha: 1, duration: 0.4 }, 0);
  tl.to(whyCircleOne, { xPercent: 0, yPercent: 0, scale: 1, rotation: 0 }, 0);

  tl.to(whyCircleTwo, { autoAlpha: 1, duration: 0.4 }, "<0.2");
  tl.to(whyCircleTwo, { xPercent: 0, yPercent: 0, scale: 1, rotation: 0 }, "<");

  tl.to(whyCircleThree, { autoAlpha: 1, duration: 0.4 }, "<0.2");
  tl.to(
    whyCircleThree,
    { xPercent: 0, yPercent: 0, scale: 1, rotation: 0 },
    "<"
  );

  tl.fromTo(
    heroTitle,
    { autoAlpha: 0, y: "1em" },
    { autoAlpha: 1, duration: 1, y: "0em" },
    "<0.4"
  );

  tl.fromTo(
    ".c-section.why-we .video-el",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1.4, ease: "expo.out" },
    0.4
  );
  tl.to(".c-header", { y: "0%", duration: 1, ease: "power3.out" }, 0.6);

  $(".video-el").get(0).play();

  tl.to(modeImage, { autoAlpha: 1, duration: 0.1 });
  tl.call(loadComplete, null, "1");
}

// PRODUCTS SWIPER HOVER
function productsHover() {
  $(".c-product-link").each(function () {
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.4, ease: "power3.inOut" },
    });

    let productEgg = $(this).find(".c-product-egg");
    let productWrap = $(this).find(".product-wrap");
    let productBag = $(this).find(".product-bag");
    let productEggHover = $(this).find(".c-product-egg-hover");

    gsap.set(productWrap, { scale: 0, rotation: -35, y: "2em", x: "2em" });
    gsap.set(productEggHover, { autoAlpha: 0 });

    tl.to(productBag, {
      scale: 0,
      rotation: -15,
      autoAlpha: 0,
      duration: 0.6,
    });

    tl.to(
      productWrap,
      {
        scale: 1,
        rotation: 0,
        y: 0,
        x: 0,
      },
      "<0.1"
    );

    tl.to(productEggHover, { autoAlpha: 1 }, 0);

    // tl.fromTo(productEgg, { color: "white" }, { color: "initial" }, 0);

    $(this).on("mouseenter", function () {
      tl.restart();
    });

    $(this).on("mouseleave", function () {
      tl.reverse();
    });
  });
}

// RECIPES MARQUE
function recipesMarquee() {
  let object = { value: 1 };

  let tl = gsap.timeline({ repeat: -1 });
  tl.fromTo(
    ".c-marquee-wrap",
    { xPercent: 0 },
    { xPercent: -100, duration: 50, ease: "none" }
  );

  $(".c-marquee-wrap").on("mouseenter", function () {
    gsap.fromTo(
      object,
      { value: 1 },
      {
        value: 0,
        duration: 1.2,
        onUpdate: () => {
          tl.timeScale(object.value);
        },
      }
    );
  });

  $(".c-marquee-wrap").on("mouseleave", function () {
    gsap.fromTo(
      object,
      { value: 0 },
      {
        value: 1,
        duration: 1.2,
        onUpdate: () => {
          tl.timeScale(object.value);
        },
      }
    );
  });
}

// RECIPES MARQUEE HOVER
function recipesMarqueHover() {
  $(".c-recipe").each(function () {
    let tl = gsap.timeline({ paused: true });

    let recipeThumb = $(this).find(".c-img.recipe");

    tl.fromTo(
      recipeThumb,
      { scale: 1 },
      { scale: 1.05, duration: 1, ease: "power1.inOut" }
    );

    $(this).on("mouseenter", function () {
      tl.restart();
    });

    $(this).on("mouseleave", function () {
      tl.reverse();
    });
  });
}

// WHY EGG WHITES FLIP CARDS
function quimicalCard() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".c-section.health",
      start: "top center",
    },
  });

  gsap.set(".c-health-card", {
    duration: 1.2,
    ease: "expo.out",
    autoAlpha: 0,
    y: "-4em",
  });

  let cardOne = $(".c-health-card:nth-child(1)");
  let cardTwo = $(".c-health-card:nth-child(2)");
  let cardThree = $(".c-health-card:nth-child(3)");
  let cardFour = $(".c-health-card:nth-child(4)");
  let cardFive = $(".c-health-card:nth-child(5)");
  let cardSix = $(".c-health-card:nth-child(6)");
  let cardSeven = $(".c-health-card:nth-child(7)");
  let cardEight = $(".c-health-card:nth-child(8)");
  let cardNine = $(".c-health-card:nth-child(9)");

  tl.to(".c-health-card", { y: 0, autoAlpha: 1, stagger: 0.1 });
  tl.to(cardThree, { rotation: -3 }, 0.3);
  tl.to(cardFour, { rotation: -3, y: "3em" }, 0.4);
  tl.to(cardSix, { rotation: 5 }, 0.6);
  tl.to(cardSeven, { y: "6em" }, 0.7);
  tl.to(cardEight, { rotation: 4 }, 0.8);
  tl.to(cardNine, { rotation: -4, y: "3em" }, 0.9);
}

// SCALE SECTION
function scaleSection() {
  $("[scale-section-trigger]").each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top bottom",
        end: "30% bottom",
        scrub: true,
      },
    });
    tl.fromTo(
      $(this),
      { scale: 0.92, borderRadius: "2.5em" },
      { scale: 1, borderRadius: "0em" }
    );
  });
}

// SCALE SECTION
function formScaleSection() {
  $("[form-scale]").each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top bottom",
        end: "80% bottom",
        scrub: true,
      },
    });
    tl.fromTo($(this), { scale: 0.9 }, { scale: 1 });
  });
}

// EGG CHICKEN ANIMATION
function chickenHover() {
  $(".c-animated-egg").each(function () {
    let tl = gsap.timeline({
      repeat: -1,
      delay: 1.5,
      repeatDelay: 4,
      yoyo: true,
      defaults: { duration: 1, ease: "elastic.inOut" },
    });
    let eggTop = $(this).find(".egg-top");
    let eggChicken = $(this).find(".egg-chicken");
    tl.to(eggTop, { y: "-3em" });
    tl.to(eggChicken, { y: "-0.75em" }, 0);
  });
}

// OUR WRAPS PAGE LOAD
function ourWrapsPageLoad() {
  let tl = gsap.timeline({ defaults: { duration: 1.2, ease: "power4.out" } });

  let wrapFive = $(".c-img-contain.wrap-5");
  let wrapFour = $(".c-img-contain.wrap-4");
  let wrapThree = $(".c-img-contain.wrap-3");
  let wrapTwo = $(".c-img-contain.wrap-2");
  let wrapOne = $(".c-img-contain.wrap-1");
  let heroTitle = $(".c-section.wraps-hero .t-display-2");
  let heroSubtitle = $(".c-section.wraps-hero .t-body-1");
  let wrapMobile = $(".wrap-mobile");

  gsap.set(wrapFive, { autoAlpha: 0, scale: 0, rotation: 30 });
  gsap.set(wrapFour, { autoAlpha: 0, scale: 0, rotation: -30 });
  gsap.set(wrapThree, { autoAlpha: 0, scale: 0, rotation: 15 });
  gsap.set(wrapTwo, { autoAlpha: 0, scale: 0, rotation: -20 });
  gsap.set(wrapOne, { autoAlpha: 0, scale: 0, rotation: 15 });
  gsap.set(wrapMobile, { autoAlpha: 0, scale: 0, rotation: 30 });

  tl.to(wrapFive, { autoAlpha: 1, duration: 0.6 }, 0);
  tl.to(
    wrapFive,
    {
      xPercent: -200,
      yPercent: -85,
      scale: 1,
      rotation: 0,
    },
    0
  );
  tl.to(wrapFour, { autoAlpha: 1, duration: 0.4 }, "<0.2");
  tl.to(
    wrapFour,
    { xPercent: 190, yPercent: -118, scale: 1, rotation: 0 },
    "<"
  );
  tl.to(wrapThree, { autoAlpha: 1, duration: 0.4 }, "<0.2");
  tl.to(wrapThree, { xPercent: -125, yPercent: 4, scale: 1, rotation: 0 }, "<");
  tl.to(wrapTwo, { autoAlpha: 1, duration: 0.4 }, "<0.2");
  tl.to(wrapTwo, { xPercent: 175, yPercent: -35, scale: 1, rotation: 0 }, "<");
  tl.to(wrapOne, { autoAlpha: 1, duration: 0.4 }, "<0.2");
  tl.to(wrapOne, { xPercent: 30, yPercent: 5, scale: 1, rotation: 0 }, "<");

  tl.fromTo(
    heroTitle,
    { autoAlpha: 0, y: "4em" },
    { autoAlpha: 1, duration: 1, y: 0 },
    "<0.2"
  );

  tl.fromTo(
    heroSubtitle,
    { autoAlpha: 0, y: "4em" },
    { autoAlpha: 1, duration: 1, y: 0 },
    "<0.2"
  );

  tl.to(wrapMobile, { autoAlpha: 1, duration: 0.4 }, "<0.2");
  tl.to(wrapMobile, { xPercent: 0, yPercent: 0, scale: 1, rotation: 0 }, "<");

  tl.to(".c-header", { y: "0%", duration: 1, ease: "power3.out" }, "<-0.2");

  tl.call(loadComplete, null, "<0.5");
}

// OUR WRAPS PAGE LOAD - ADDED GARDEN SALSA
function ourWrapsPageLoad2() {
  let tl = gsap.timeline({ defaults: { duration: 1.2, ease: "power4.out" } });

  let wrapSix = $(".c-img-contain.wrap-6");
  let wrapFive = $(".c-img-contain.wrap-5");
  let wrapFour = $(".c-img-contain.wrap-4");
  let wrapThree = $(".c-img-contain.wrap-3");
  let wrapTwo = $(".c-img-contain.wrap-2");
  let wrapOne = $(".c-img-contain.wrap-1");
  let heroTitle = $(".c-section.wraps-hero .t-display-2");
  let heroSubtitle = $(".c-section.wraps-hero .t-body-1");
  let wrapMobile = $(".wrap-mobile");

  gsap.set(wrapSix, { autoAlpha: 0, scale: 0, rotation: 15 });
  gsap.set(wrapFive, { autoAlpha: 0, scale: 0, rotation: 30 });
  gsap.set(wrapFour, { autoAlpha: 0, scale: 0, rotation: -30 });
  gsap.set(wrapThree, { autoAlpha: 0, scale: 0, rotation: 15 });
  gsap.set(wrapTwo, { autoAlpha: 0, scale: 0, rotation: -20 });
  gsap.set(wrapOne, { autoAlpha: 0, scale: 0, rotation: 15 });
  gsap.set(wrapMobile, { autoAlpha: 0, scale: 0, rotation: 30 });

  tl.to(wrapFive, { autoAlpha: 1, duration: 0.6 }, 0);
  tl.to(
    wrapFive,
    {
      xPercent: -200,
      yPercent: -115,
      scale: 1,
      rotation: 0,
    },
    0
  );
  tl.to(wrapFour, { autoAlpha: 1, duration: 0.4 }, "<0.2");
  tl.to(
    wrapFour,
    { xPercent: 190, yPercent: -118, scale: 1, rotation: 0 },
    "<"
  );

  tl.to(wrapSix, { autoAlpha: 1, duration: 0.4 }, "<0.2");
  tl.to(wrapSix, { xPercent: -185, yPercent: -15, scale: 1, rotation: 0 }, "<");

  tl.to(wrapTwo, { autoAlpha: 1, duration: 0.4 }, "<0.2");
  tl.to(wrapTwo, { xPercent: 175, yPercent: -55, scale: 1, rotation: 0 }, "<");

  tl.to(wrapThree, { autoAlpha: 1, duration: 0.4 }, "<0.2");
  tl.to(wrapThree, { xPercent: -55, yPercent: 4, scale: 1, rotation: 0 }, "<");

  tl.to(wrapOne, { autoAlpha: 1, duration: 0.4 }, "<0.2");
  tl.to(wrapOne, { xPercent: 50, yPercent: 5, scale: 1, rotation: 0 }, "<");

  tl.fromTo(
    heroTitle,
    { autoAlpha: 0, y: "4em" },
    { autoAlpha: 1, duration: 1, y: 0 },
    "<0.2"
  );

  tl.fromTo(
    heroSubtitle,
    { autoAlpha: 0, y: "4em" },
    { autoAlpha: 1, duration: 1, y: 0 },
    "<0.2"
  );

  tl.to(wrapMobile, { autoAlpha: 1, duration: 0.4 }, "<0.2");
  tl.to(wrapMobile, { xPercent: 0, yPercent: 0, scale: 1, rotation: 0 }, "<");

  tl.to(".c-header", { y: "0%", duration: 1, ease: "power3.out" }, "<-0.2");

  tl.call(loadComplete, null, "<0.5");
}

// SIMPLE PAGE LOAD
function simplePageLoad() {
  let tl = gsap.timeline({ delay: 0.2 });

  tl.to(".o-page-wrapper", { autoAlpha: 1, duration: 1, ease: "power2.out" });

  tl.to(".c-header", { y: "0%", duration: 1, ease: "power3.out" }, 0.2);

  tl.call(loadComplete, null, "0.5");
}

// WHY EGG WHITES PAGE LOAD
function whyEggsPageLoad() {
  let tl = gsap.timeline({ defaults: { duration: 1, ease: "power4.out" } });

  let whyCircleOne = $(".c-img-contain.why-circle.is-1");
  let whyCircleTwo = $(".c-img-contain.why-circle.is-2");
  let whyCircleThree = $(".c-img-contain.why-circle.is-3");
  let whyEgg = $(".c-img-contain.why-egg");
  let heroTitle = $(".c-section.white-hero .t-display-1");
  let subtitle = $(".c-section.egg-white .t-display-4");

  gsap.set(whyCircleOne, {
    autoAlpha: 0,
    scale: 0,
    xPercent: -100,
    yPercent: 50,
  });

  gsap.set(whyCircleTwo, {
    autoAlpha: 0,
    scale: 0,
    xPercent: 150,
    yPercent: 100,
  });

  gsap.set(whyCircleThree, {
    autoAlpha: 0,
    scale: 0,
    xPercent: 150,
    yPercent: 100,
  });

  gsap.set(whyEgg, {
    autoAlpha: 0,
    scale: 0,
    rotation: 30,
    transformOrigin: "bottom right",
  });

  tl.to(whyCircleOne, { autoAlpha: 1, duration: 0.4 }, 0);
  tl.to(whyCircleOne, { xPercent: 0, yPercent: 0, scale: 1, rotation: 0 }, 0);

  tl.to(whyCircleTwo, { autoAlpha: 1, duration: 0.4 }, "<0.2");
  tl.to(whyCircleTwo, { xPercent: 0, yPercent: 0, scale: 1, rotation: 0 }, "<");

  tl.to(whyCircleThree, { autoAlpha: 1, duration: 0.4 }, "<0.2");
  tl.to(
    whyCircleThree,
    { xPercent: 0, yPercent: 0, scale: 1, rotation: 0 },
    "<"
  );

  tl.to(whyEgg, { autoAlpha: 1, duration: 0.4 }, "<0.2");
  tl.to(whyEgg, { xPercent: 0, scale: 1, rotation: 0 }, "<");

  tl.fromTo(
    heroTitle,
    { autoAlpha: 0, y: "4em" },
    { autoAlpha: 1, duration: 1, y: 0 },
    "<0.4"
  );

  tl.to(".c-header", { y: "0%", duration: 1, ease: "power3.out" }, "<0");

  tl.to(subtitle, { autoAlpha: 1, duration: 0.1 });
  tl.call(loadComplete, null, "<-0.5");
}

// RECIPE SINGLE GRID
function recipeSingleGrid() {
  $("[data-grid-trigger]").each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "60% bottom",
      },
    });

    let gridEl = $("[data-grid-el]");

    tl.from(gridEl, {
      duration: 1.4,
      yPercent: 30,
      autoAlpha: 0,
      ease: "power4.out",
      stagger: {
        grid: [7, 15],
        amount: 0.2,
        from: "center",
      },
    });
  });
}

// STORE MARQUE
function storeMarquee() {
  let tl = gsap.timeline({ repeat: -1 });
  tl.fromTo(
    ".c-marquee-list",
    { xPercent: 0 },
    { xPercent: -100, duration: 70, ease: "none" }
  );
  tl.fromTo(
    ".c-marquee-list.reverse",
    { xPercent: 0 },
    { xPercent: 100, duration: 70, ease: "none" },
    0
  );
}

// BLOG LINK HOVER
function blogHover() {
  $("[blog-trigger]").each(function () {
    let tl = gsap.timeline({ paused: true });

    let recipeThumb = $(this).find("[blog-thumb]");

    tl.fromTo(
      recipeThumb,
      { scale: 1 },
      { scale: 1.05, duration: 1, ease: "power1.inOut" }
    );

    $(this).on("mouseenter", function () {
      tl.restart();
    });

    $(this).on("mouseleave", function () {
      tl.reverse();
    });
  });
}

// HOME HERO - SLIDE CHANGE ANIMATION
function slideChangeAnimation() {
  gsap.set(".c-circle.transition", { yPercent: 36.5, opacity: 0 });

  gsap.to("[swiper-text-animation] .word", {
    duration: 0.4,
    yPercent: -135,
    autoAlpha: 0,
  });
  gsap.to(".c-circle.transition", {
    yPercent: 36.5,
    scale: 1,
    duration: 1,
    opacity: 1,
    ease: "power2.inOut",
  });
  gsap.to(".product-hero", {
    duration: 0.5,
    autoAlpha: 0,
    yPercent: 100,
    ease: "power3.inOut",
    onComplete: function () {
      gsap.to(".product-hero", {
        duration: 0.7,
        autoAlpha: 1,
        yPercent: 0,
        ease: "power3.inOut",
      });
      gsap.to("[swiper-text-animation] .word", {
        duration: 0.5,
        yPercent: 0,
        stagger: 0.03,
        autoAlpha: 1,
      });
      gsap.to(".c-circle.transition", {
        yPercent: -40,
        scale: 1.6,
        duration: 0.7,
        autoAlpha: 1,
      });
      gsap.to(".c-circle.transition", {
        opacity: 0,
        delay: 0.2,
      });
    },
  });
}

// TEAM BIO MODAL
function reviewsModal() {
  $(".c-reviews-item").each(function () {
    let tl = gsap.timeline({ paused: true });

    let teamEl = $(this).find(".c-team-bio");
    let teamTrigger = $(this).find(".c-team-trigger");
    let teamCloseEl = $(this).find(".c-team-bio_modal-close");
    gsap.set(teamEl, { display: "flex", autoAlpha: 0 });

    tl.to(teamEl, { autoAlpha: 1, duration: 0.4, ease: "power3.inOut" });

    teamTrigger.on("click", function () {
      tl.restart();
    });

    teamCloseEl.on("click", function () {
      tl.reverse();
    });
  });
}
reviewsModal();

// RECIPES HUB SEARCH MOBILE
function searchMobile() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: "[sticky-trigger]",
      start: "-32 top",
      end: "bottom bottom",
      pin: "[sticky-el]",
      pinSpacing: false,
    },
  });
}

// 100vh
function setFullHeight() {
  document.documentElement.style.setProperty(
    "--app-height",
    `${window.innerHeight}px`
  );
}
window.addEventListener("resize", setFullHeight);
window.addEventListener("DOMContentLoaded", (event) => {
  setFullHeight();
});

let recipesSinglePage = $(".c-body").hasClass("is-recipes-single");

// Matchmedia desktop
let mm = gsap.matchMedia();

mm.add("(min-width: 992px)", () => {
  headerBG();
  headerDropdown();
  navLinkHover();
  dragEl();
  fade();
  desktopDOM();
  splitText();
  freedomHand();
  buttonHover();
  footerShapes();
  recipesDropdown();
  productsHover();
  recipesMarqueHover();
  quimicalCard();
  recipesDropdownLink();
  scaleSection();
  formScaleSection();
  navLinkHoverClone();
  recipeSingleGrid();
  line();
  blogHover();
  return () => {
    if (!recipesSinglePage) {
      window.location.reload();
    }
  };
});

// Matchmedia tablet, landscape and mobile
mm.add("(max-width: 991px)", () => {
  mobileDOM();
  headerMobile();
  headerDropdownMobile();
  recipesDropdownMobile();
  searchMobile();
  headerBGMobile();
  return () => {
    if (!recipesSinglePage) {
      window.location.reload();
    }
  };
});
