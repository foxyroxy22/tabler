document.addEventListener("DOMContentLoaded", function () {
  var sidebar = document.getElementById("sidebar");
  var hamBtn = document.querySelector(".ham");
  var header = document.getElementById("header");
  var isOpen = false;

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
    sidebar.style.display = "block";
    sidebar.offsetHeight; // force reflow so transition fires
    sidebar.style.transform = "translateX(0)";
    hamBtn.classList.add("is-open");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (header) header.style.backgroundColor = "#FFF9F1";
  }

  function closeSidebar() {
    isOpen = false;
    sidebar.style.transform = "translateX(-100%)";
    hamBtn.classList.remove("is-open");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    setTimeout(function () {
      if (!isOpen) sidebar.style.display = "none";
    }, 350);
    // Clear inline bg and restore based on scroll (mobile only)
    if (header) {
      header.style.backgroundColor = "";
      if (window.innerWidth <= 1024) {
        if (window.scrollY > 10) {
          header.classList.add("is-scrolled");
        } else {
          header.classList.remove("is-scrolled");
        }
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

  window.addEventListener("pageshow", function (e) {
    if (e.persisted && isOpen) closeSidebar();
  });
});
