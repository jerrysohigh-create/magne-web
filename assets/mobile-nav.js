(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var existingBtn = document.querySelector(".mobile-menu-btn");
    if (existingBtn) return; // Button already exists in HTML

    var menuBtn = document.createElement("button");
    menuBtn.className = "mobile-menu-btn";
    menuBtn.type = "button";
    menuBtn.setAttribute("aria-label", "Toggle navigation menu");
    menuBtn.innerHTML = "<span></span>";

    var nav = document.querySelector("nav");
    if (!nav) return;

    var navBrand = nav.querySelector(".nav-brand");
    if (navBrand) {
      nav.insertBefore(menuBtn, navBrand.nextSibling);
    } else {
      nav.insertBefore(menuBtn, nav.firstChild);
    }

    var btn = document.querySelector(".mobile-menu-btn");
    
    btn.addEventListener("click", function () {
      var isOpen = document.body.classList.toggle("mobile-nav-open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });

    var navLinks = nav.querySelector(".nav-links");
    if (navLinks) {
      navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          document.body.classList.remove("mobile-nav-open");
          btn.setAttribute("aria-expanded", "false");
        });
      });
    }

    document.addEventListener("click", function (e) {
      if (!e.target.closest("nav") && document.body.classList.contains("mobile-nav-open")) {
        document.body.classList.remove("mobile-nav-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  });
})();
