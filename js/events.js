/* ================= EVENT TAB SWITCHING ================= */

const tabButtons = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".events-section");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    tabButtons.forEach(b => b.classList.remove("active"));
    sections.forEach(sec => sec.classList.remove("show"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.target).classList.add("show");

  });
});


/* ================= APPLY MODAL ================= */

const applyButtons = document.querySelectorAll(".play-btn");
const applyModal = document.getElementById("applyModal");
const applyOverlay = document.getElementById("applyOverlay");
const closeApply = document.getElementById("closeApply");

applyButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    applyModal.classList.add("show");
    applyOverlay.classList.add("show");

  });
});

closeApply.addEventListener("click", () => {

  applyModal.classList.remove("show");
  applyOverlay.classList.remove("show");

});

applyOverlay.addEventListener("click", () => {

  applyModal.classList.remove("show");
  applyOverlay.classList.remove("show");

});


/* ================= MATCH TABS ================= */

const matchTabs = document.querySelectorAll(".match-tab");
const matchSections = document.querySelectorAll(".match-section");

matchTabs.forEach(tab => {
  tab.addEventListener("click", () => {

    matchTabs.forEach(t => t.classList.remove("active"));
    matchSections.forEach(s => s.classList.remove("show"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.target).classList.add("show");

  });
});


/* ================= MOBILE MENU ================= */

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

menuToggle.addEventListener("click", () => {

  mobileMenu.classList.toggle("show");

});


/* ================= NOTIFICATION DROPDOWN ================= */

const notifyBtn = document.querySelector(".notify-only");
const notificationDropdown = document.getElementById("notificationDropdown");
const overlay = document.getElementById("overlay");

notifyBtn.addEventListener("click", (e) => {

  e.preventDefault();

  notificationDropdown.classList.toggle("show");
  overlay.classList.toggle("show");

});


/* CLOSE NOTIFICATION WHEN CLICKING OUTSIDE */

overlay.addEventListener("click", () => {

  notificationDropdown.classList.remove("show");
  overlay.classList.remove("show");

});