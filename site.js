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

  /* ---------- Click-to-navigate tiles ---------- */
  // Nicepage lets non-link elements (the vehicle gallery tiles on Oprema.html)
  // navigate via a plain data-href attribute instead of wrapping them in <a>.
  function initDataHrefLinks() {
    document.addEventListener("click", function (event) {
      var el = event.target.closest("[data-href]:not(.u-back-to-top)");
      if (!el) return;
      var target = el.getAttribute("data-target");
      if (target) window.open(el.getAttribute("data-href"), target);
      else window.location.href = el.getAttribute("data-href");
    });
  }

  /* ---------- Contact form ---------- */
  // Nicepage renders the submit control as a styled <a href="#"> (with a
  // hidden real <input type="submit"> next to it) and normally wires the
  // click itself; that wiring never got ported here, so right now clicking
  // "Poslji" just navigates to "#" and does nothing. This restores it, and
  // submits via fetch so the existing success/error message divs can be
  // shown inline instead of leaving the page.
  function initContactForms() {
    document.querySelectorAll(".u-form form").forEach(function (form) {
      var successMsg = form.querySelector(".u-form-send-success");
      var errorMsg = form.querySelector(".u-form-send-error");

      form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (successMsg) successMsg.style.display = "none";
        if (errorMsg) errorMsg.style.display = "none";

        fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        })
          .then(function (response) {
            if (response.ok) {
              form.reset();
              if (successMsg) successMsg.style.display = "block";
            } else if (errorMsg) {
              errorMsg.style.display = "block";
            }
          })
          .catch(function () {
            if (errorMsg) errorMsg.style.display = "block";
          });
      });
    });

    document.addEventListener("click", function (event) {
      var trigger = event.target.closest(".u-btn-submit");
      if (!trigger) return;
      event.preventDefault();
      var form = trigger.closest("form");
      if (form) form.requestSubmit();
    });
  }

  /* ---------- Vehicle gallery (data-driven) ---------- */
  // Oprema.html's vehicle grid renders from window.VOZILA (vozila-data.js),
  // so the tile count always matches however many vehicles are listed there
  // - no leftover placeholder tile needed to round out the grid.
  function initVehiclesGallery() {
    var container = document.getElementById("vozila-gallery");
    if (!container || !window.VOZILA) return;

    container.innerHTML = window.VOZILA
      .map(function (vehicle, i) {
        var n = i + 1;
        return (
          '<div class="u-effect-fade u-gallery-item u-gallery-item-' + n + '" data-href="' + escapeHtml(vehicle.href) + '">' +
            '<div class="u-back-slide" data-image-width="' + vehicle.imgWidth + '" data-image-height="' + vehicle.imgHeight + '">' +
              '<img class="u-back-image u-expanded" src="' + escapeHtml(vehicle.img) + '" alt="' + escapeHtml(vehicle.title) + '">' +
            "</div>" +
            '<div class="u-align-center u-over-slide u-shading u-over-slide-' + n + '">' +
              '<h3 class="u-gallery-heading">' + escapeHtml(vehicle.title) + "</h3>" +
              '<p class="u-gallery-text"></p>' +
            "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  /* ---------- Intervencije listing (data-driven) ---------- */
  // Both blog/blog.html's table and the home page's newest-N cards render
  // from window.INTERVENCIJE (intervencije-data.js) so adding one entry
  // there updates both places - no-ops if that script isn't loaded or the
  // page has neither target container.
  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function formatDate(iso) {
    var parts = iso.split("-");
    return Number(parts[2]) + "." + Number(parts[1]) + "." + parts[0];
  }

  function sortedInterventions() {
    return window.INTERVENCIJE.slice().sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });
  }

  function initInterventionsTable() {
    var tbody = document.getElementById("intervencije-rows");
    if (!tbody || !window.INTERVENCIJE) return;

    tbody.innerHTML = sortedInterventions()
      .map(function (item) {
        // This table lives at blog/blog.html; entries are stored relative
        // to the site root ("blog/x.html"), so drop that shared prefix.
        var href = item.href.replace(/^blog\//, "");
        return (
          "<tr><td>" + formatDate(item.date) + "</td>" +
          '<td><a href="' + escapeHtml(href) + '">' + escapeHtml(item.title) + "</a></td></tr>"
        );
      })
      .join("");
  }

  function initInterventionsHome() {
    var container = document.getElementById("intervencije-home");
    if (!container || !window.INTERVENCIJE) return;
    var count = Number(container.getAttribute("data-count")) || 2;

    container.innerHTML = sortedInterventions()
      .slice(0, count)
      .map(function (item) {
        var href = escapeHtml(item.href);
        var title = escapeHtml(item.title);
        return (
          '<div class="u-blog-post u-container-style u-repeater-item">' +
            '<div class="u-container-layout u-similar-container u-container-layout-1">' +
              '<h2 class="u-blog-control u-custom-font u-font-roboto-slab u-text">' +
                '<a class="u-post-header-link" href="' + href + '">' + title + "</a>" +
              "</h2>" +
              '<a class="u-post-header-link" href="' + href + '">' +
                '<img alt="" class="u-blog-control u-expanded-width u-image u-image-default u-image-1" src="' + escapeHtml(item.img) + '">' +
              "</a>" +
              '<div class="u-blog-control u-custom-font u-font-roboto-slab u-post-content u-text u-text-3">' + escapeHtml(item.teaser) + "</div>" +
              '<div class="u-blog-control u-custom-font u-font-roboto-slab u-metadata u-metadata-1">' +
                '<span class="u-meta-date u-meta-icon">' + formatDate(item.date) + "</span>" +
              "</div>" +
              '<a href="' + href + '" class="u-active-none u-blog-control u-border-2 u-border-palette-1-base u-btn u-btn-rectangle u-button-style u-custom-font u-font-roboto-slab u-hover-none u-none u-btn-1">Preberi več</a>' +
            "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  /* ---------- Boot ---------- */
  initResponsiveMode();

  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initCarousels();
    initDataHrefLinks();
    initContactForms();
    initVehiclesGallery();
    initInterventionsTable();
    initInterventionsHome();
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
