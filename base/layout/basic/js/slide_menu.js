document.addEventListener("DOMContentLoaded", function () {
  var sidebar = document.getElementById("sidebar");
  var hamBtn = document.querySelector(".ham");
  var header = document.getElementById("header");
  var isOpen = false;
  var savedScrollY = 0;

  window.addEventListener("scroll", function () {
    if (isOpen) return;
    if (window.innerWidth > 1024) return;
    if (window.scrollY > 10) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  });

  function openSidebar() {
    isOpen = true;
    savedScrollY = window.scrollY;
    // Show element first, then animate (needed after display:none)
    sidebar.style.display = "block";
    sidebar.offsetHeight; // force reflow so transition fires
    sidebar.style.transform = "translateX(0)";
    hamBtn.classList.add("is-open");
    // Lock body scroll (iOS-safe)
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = "-" + savedScrollY + "px";
    document.body.style.width = "100%";
    if (header) header.style.backgroundColor = "#FFF9F1";
  }

  function closeSidebar() {
    isOpen = false;
    sidebar.style.transform = "translateX(-100%)";
    hamBtn.classList.remove("is-open");
    // Restore body scroll
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, savedScrollY);
    // Hide element after slide-out transition finishes
    setTimeout(function () {
      if (!isOpen) sidebar.style.display = "none";
    }, 350);
    if (window.innerWidth <= 1024) {
      if (window.scrollY > 10) {
        if (header) header.classList.add("is-scrolled");
      } else {
        if (header) header.classList.remove("is-scrolled");
      }
    }
  }

  if (hamBtn) {
    hamBtn.addEventListener("click", function () {
      if (isOpen) closeSidebar();
      else openSidebar();
    });
  }

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024) {
      header.classList.remove("is-scrolled");
      if (isOpen) closeSidebar();
    }
  });

  // Reset sidebar if restored from browser back/forward cache
  window.addEventListener("pageshow", function (e) {
    if (e.persisted && isOpen) {
      closeSidebar();
    }
  });
});
