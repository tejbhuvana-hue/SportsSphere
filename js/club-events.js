// ================= MOBILE MENU =================
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.style.display =
    mobileMenu.style.display === "block" ? "none" : "block";
});

// ================= TAB SWITCHING =================
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// ================= APPLY MODAL =================
const applyModal = document.getElementById("applyModal");
const applyBtns = document.querySelectorAll(".apply-btn");
const closeApply = document.getElementById("closeApply");

applyBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault(); // prevent anchor navigation
    applyModal.style.display = "flex";
  });
});

closeApply.addEventListener("click", () => {
  applyModal.style.display = "none";
});

applyModal.addEventListener("click", (e) => {
  if (e.target === applyModal) applyModal.style.display = "none";
});
