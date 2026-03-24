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
    sidebar.classList.add("active");
    hamBtn.classList.add("is-open");
    document.body.style.overflow = "hidden";
    if (header) header.style.backgroundColor = "#FFF9F1";
  }

  function closeSidebar() {
    isOpen = false;
    sidebar.classList.remove("active");
    hamBtn.classList.remove("is-open");
    document.body.style.overflow = "";
    if (window.innerWidth <= 1024) {
      // ✅ 1024px 이하에서만
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
    }
  });
});
