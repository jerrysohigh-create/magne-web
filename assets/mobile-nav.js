(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".mobile-menu-btn");
    var menu = document.querySelector(".nav-links") || document.querySelector(".nav-menu");

    if (!toggle || !menu) return;

    // Ensure toggle is visible (it should be hidden on desktop via CSS)
    toggle.style.display = "inline-flex";

    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("active");
      toggle.classList.toggle("active", isOpen);
      document.body.classList.toggle("menu-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when clicking a link
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("active");
        toggle.classList.remove("active");
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!e.target.closest("nav") && menu.classList.contains("active")) {
        menu.classList.remove("active");
        toggle.classList.remove("active");
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
})();
