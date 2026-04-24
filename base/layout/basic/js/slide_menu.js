var isOpen = false;

function openSidebar() {
  var sidebar = document.getElementById("sidebar");
  var header = document.getElementById("header");
  var hamBtn = document.querySelector(".ham");
  if (!sidebar) return;
  isOpen = true;
  sidebar.style.display = "";
  sidebar.classList.add("sidebar--open");
  if (hamBtn) hamBtn.classList.add("is-open");
  document.body.classList.add("no-scroll");
  if (header) header.classList.add("sidebar-open");
}

function closeSidebar() {
  var sidebar = document.getElementById("sidebar");
  var header = document.getElementById("header");
  var hamBtn = document.querySelector(".ham");
  if (!sidebar) return;
  isOpen = false;
  sidebar.classList.remove("sidebar--open");
  if (hamBtn) hamBtn.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
  if (header) {
    header.classList.remove("sidebar-open");
    if (window.innerWidth <= 1024) {
      if (window.scrollY > 10) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }
  }
}

document.addEventListener("click", function (e) {
  if (e.target.closest(".ham")) {
    if (isOpen) closeSidebar();
    else openSidebar();
  }
});

window.addEventListener("scroll", function () {
  if (isOpen) return;
  if (window.innerWidth > 1024) return;
  var header = document.getElementById("header");
  if (!header) return;
  if (window.scrollY > 10) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 1024 && isOpen) closeSidebar();
});

window.addEventListener("pageshow", function (e) {
  if (e.persisted && isOpen) closeSidebar();
});
