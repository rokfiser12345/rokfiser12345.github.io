/*
 * Vanilla-JS replacement for jquery.js + nicepage.js.
 * Provides only the two behaviors the site markup actually uses:
 *   1. Off-canvas mobile navigation (header hamburger menu)
 *   2. Bootstrap-style image carousels (blog/vehicle photo galleries)
 */

(function () {
  "use strict";

  /* ---------- Responsive mode marker ---------- */
  // nicepage.css hides `.u-menu` (opacity: 0) until one of these classes is
  // present on <html>; without it the nav is invisible at every width.
  var MODE_MAX_WIDTH = { xs: 575, sm: 767, md: 991, lg: 1199 };
  var MODE_CLASSES = Object.keys(MODE_MAX_WIDTH)
    .concat("xl")
    .map(function (mode) { return "u-responsive-" + mode; });

  function currentMode() {
    var width = document.documentElement.clientWidth;
    for (var mode in MODE_MAX_WIDTH) {
      if (width <= MODE_MAX_WIDTH[mode]) return mode;
    }
    return "xl";
  }

  function initResponsiveMode() {
    function apply() {
      var html = document.documentElement;
      html.classList.remove.apply(html.classList, MODE_CLASSES);
      html.classList.add("u-responsive-" + currentMode());
    }
    apply();
    window.addEventListener("resize", apply);
  }

  /* ---------- Mobile navigation ---------- */
  // Below this width the desktop nav switches to the hamburger + slide-in panel.
  // Matches the site's existing "MD" breakpoint used throughout the CSS.
  var MOBILE_BREAKPOINT = "(max-width: 991px)";

  function initMobileMenu() {
    var mql = window.matchMedia(MOBILE_BREAKPOINT);
    var menus = document.querySelectorAll(".u-menu");

    function syncResponsiveState() {
      menus.forEach(function (menu) {
        menu.classList.toggle("u-enable-responsive", mql.matches);
      });
    }

    syncResponsiveState();
    mql.addEventListener("change", syncResponsiveState);

    // The slide-in panel has no width of its own in the stylesheet (Nicepage
    // injects it per-instance at runtime); pin it here so the panel has a
    // size, and something to slide from. The closed/open margin is set
    // directly (not left to the "open" CSS rule) since an inline style
    // always wins over it anyway.
    menus.forEach(function (menu) {
      var sidenav = menu.querySelector(".u-sidenav");
      if (!sidenav) return;
      var width = sidenav.getAttribute("data-offcanvas-width") || 250;
      sidenav.style.flexBasis = width + "px";
      sidenav.dataset.offcanvasWidth = width;
      sidenav.style.marginLeft = "-" + width + "px";
    });

    function openMenu(menu) {
      menu.classList.add("open");
      document.body.classList.add("u-offcanvas-opened");
      document.documentElement.style.overflow = "hidden";
      var collapse = menu.querySelector(".u-nav-container-collapse");
      if (collapse) collapse.style.width = "100%";
      var overlay = menu.querySelector(".u-menu-overlay");
      if (overlay) overlay.style.display = "block";
      var sidenav = menu.querySelector(".u-sidenav");
      if (sidenav) sidenav.style.marginLeft = "0";
    }

    function closeMenu(menu) {
      menu.classList.remove("open");
      document.body.classList.remove("u-offcanvas-opened");
      document.documentElement.style.overflow = "";
      var collapse = menu.querySelector(".u-nav-container-collapse");
      if (collapse) collapse.style.width = "";
      var overlay = menu.querySelector(".u-menu-overlay");
      if (overlay) overlay.style.display = "";
      var sidenav = menu.querySelector(".u-sidenav");
      if (sidenav) sidenav.style.marginLeft = "-" + sidenav.dataset.offcanvasWidth + "px";
    }

    document.addEventListener("click", function (event) {
      var hamburger = event.target.closest(".u-menu .menu-collapse");
      if (hamburger) {
        event.preventDefault();
        var menu = hamburger.closest(".u-menu");
        menu.classList.contains("open") ? closeMenu(menu) : openMenu(menu);
        return;
      }

      var closeButton = event.target.closest(".u-menu .u-menu-close");
      if (closeButton) {
        event.preventDefault();
        closeMenu(closeButton.closest(".u-menu"));
        return;
      }

      var overlay = event.target.closest(".u-menu .u-menu-overlay");
      if (overlay) {
        closeMenu(overlay.closest(".u-menu"));
        return;
      }

      var navLink = event.target.closest(".u-nav-container-collapse .u-nav-link");
      if (navLink) {
        closeMenu(navLink.closest(".u-menu"));
      }
    });
  }

  /* ---------- Image carousels ---------- */
  var DIRECTION_LEFT = "u-carousel-item-left"; // slides forward (next)
  var DIRECTION_RIGHT = "u-carousel-item-right"; // slides backward (prev)

  function createCarousel(root) {
    var items = Array.from(root.querySelector(".u-carousel-inner").children);
    var indicators = Array.from(root.querySelectorAll("[data-u-slide-to]"));
    var interval = Number(root.getAttribute("data-interval")) || 5000;
    var timer = null;
    var isSliding = false;

    function activeIndex() {
      return items.findIndex(function (item) {
        return item.classList.contains("u-active");
      });
    }

    function setIndicator(index) {
      indicators.forEach(function (indicator, i) {
        indicator.classList.toggle("u-active", i === index);
      });
    }

    function slide(direction, targetIndex) {
      if (isSliding) return;
      var currentIndex = activeIndex();
      var current = items[currentIndex];
      var next = items[targetIndex];
      var directionalClass = direction === DIRECTION_LEFT ? "u-carousel-item-next" : "u-carousel-item-prev";

      isSliding = true;
      next.classList.add(directionalClass);
      // Force a reflow so the transform-from-offscreen start position is
      // registered before adding the direction class triggers the transition.
      void next.offsetWidth;

      current.classList.add(direction);
      next.classList.add(direction);

      function onTransitionEnd(event) {
        if (event.target !== current) return;
        current.removeEventListener("transitionend", onTransitionEnd);
        current.classList.remove("u-active", DIRECTION_LEFT, DIRECTION_RIGHT);
        next.classList.remove("u-carousel-item-next", "u-carousel-item-prev", DIRECTION_LEFT, DIRECTION_RIGHT);
        next.classList.add("u-active");
        isSliding = false;
      }
      current.addEventListener("transitionend", onTransitionEnd);

      setIndicator(targetIndex);
    }

    function next() {
      var currentIndex = activeIndex();
      slide(DIRECTION_LEFT, (currentIndex + 1) % items.length);
    }

    function prev() {
      var currentIndex = activeIndex();
      slide(DIRECTION_RIGHT, (currentIndex - 1 + items.length) % items.length);
    }

    function goTo(targetIndex) {
      var currentIndex = activeIndex();
      if (targetIndex === currentIndex) return;
      slide(targetIndex > currentIndex ? DIRECTION_LEFT : DIRECTION_RIGHT, targetIndex);
    }

    function start() {
      stop();
      if (interval > 0) timer = setInterval(next, interval);
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    root.querySelectorAll('[data-u-slide="prev"]').forEach(function (control) {
      control.addEventListener("click", function (event) {
        event.preventDefault();
        prev();
      });
    });
    root.querySelectorAll('[data-u-slide="next"]').forEach(function (control) {
      control.addEventListener("click", function (event) {
        event.preventDefault();
        next();
      });
    });
    indicators.forEach(function (indicator, index) {
      indicator.addEventListener("click", function (event) {
        event.preventDefault();
        goTo(index);
      });
    });

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);

    start();
  }

  function initCarousels() {
    document.querySelectorAll('[data-u-ride="carousel"]').forEach(createCarousel);
  }

  /* ---------- Boot ---------- */
  initResponsiveMode();

  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initCarousels();
  });

  // Nicepage ships galleries with a "no transition" guard so the first
  // paint doesn't animate; drop it shortly after load, same as before.
  window.addEventListener("load", function () {
    setTimeout(function () {
      document.querySelectorAll(".u-gallery").forEach(function (gallery) {
        gallery.classList.remove("u-no-transition");
      });
    }, 250);
  });
})();
