const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const notifyBtn = document.querySelector(".notify-btn");
const notifyBox = document.querySelector(".notification-dropdown");

menuToggle.addEventListener("click", () => {
  mobileMenu.style.display =
    mobileMenu.style.display === "block" ? "none" : "block";
  notifyBox.style.display = "none";
});

notifyBtn.addEventListener("click", () => {
  notifyBox.style.display =
    notifyBox.style.display === "block" ? "none" : "block";
  mobileMenu.style.display = "none";
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".navbar")) {
    mobileMenu.style.display = "none";
    notifyBox.style.display = "none";
  }
});
