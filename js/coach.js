const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
});

  const notificationBtn = document.querySelector(".bi-bell-fill").parentElement;
  const dropdown = document.getElementById("notificationDropdown");
  const overlay = document.getElementById("overlay");

  notificationBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
    overlay.style.display =
      overlay.style.display === "block" ? "none" : "block";
  });

  overlay.addEventListener("click", () => {
    dropdown.style.display = "none";
    overlay.style.display = "none";
  });
  // ================= SEE ALL SUGGESTIONS =================
const seeAllBtn = document.getElementById("seeAll");
const suggestionsModal = document.getElementById("suggestionsModal");
const closeSuggestions = document.getElementById("closeSuggestions");

seeAllBtn.addEventListener("click", (e) => {
  e.preventDefault();
  suggestionsModal.style.display = "flex";
});

closeSuggestions.addEventListener("click", () => {
  suggestionsModal.style.display = "none";
});

suggestionsModal.addEventListener("click", (e) => {
  if (e.target === suggestionsModal) {
    suggestionsModal.style.display = "none";
  }
});

