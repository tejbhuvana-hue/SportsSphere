
// ===== MOBILE MENU =====
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

// Toggle menu when clicking the menu icon
menuToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent click from bubbling up
  mobileMenu.classList.toggle("show");
});

// Close the menu if clicking outside
document.addEventListener("click", (e) => {
  if (mobileMenu.classList.contains("show") && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    mobileMenu.classList.remove("show");
  }
});


// ===== NOTIFICATIONS =====
const notificationBtn = document.querySelector(".notify-only");
const dropdown = document.getElementById("notificationDropdown");
const overlay = document.getElementById("overlay");

notificationBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  // Toggle dropdown and overlay
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
    overlay.style.display = "none";
  } else {
    dropdown.style.display = "block";
    overlay.style.display = "block";
  }
});

// Hide dropdown when clicking outside
overlay.addEventListener("click", () => {
  dropdown.style.display = "none";
  overlay.style.display = "none";
});


  /* ================= ADD POST MODAL JS ================= */

const addPostBtn = document.querySelector(".bi-plus-square").parentElement;
const addPostModal = document.getElementById("addPostModal");
const addPostOverlay = document.getElementById("addPostOverlay");
const closeAddPost = document.getElementById("closeAddPost");

addPostBtn.addEventListener("click", () => {
  addPostModal.classList.add("show");
  addPostOverlay.style.display = "block";
});

closeAddPost.addEventListener("click", closeModal);
addPostOverlay.addEventListener("click", closeModal);

function closeModal() {
  addPostModal.classList.remove("show");
  addPostOverlay.style.display = "none";
}
/* ================= EDIT PROFILE MODAL JS ================= */

const editProfileBtn = document.querySelector(".edit-btn"); // first Edit Profile button
const editProfileModal = document.getElementById("editProfileModal");
const editProfileOverlay = document.getElementById("editProfileOverlay");
const closeEditProfile = document.getElementById("closeEditProfile");

editProfileBtn.addEventListener("click", () => {
  editProfileModal.classList.add("show");
  editProfileOverlay.style.display = "block";
});

closeEditProfile.addEventListener("click", closeEditProfileModal);
editProfileOverlay.addEventListener("click", closeEditProfileModal);

function closeEditProfileModal() {
  editProfileModal.classList.remove("show");
  editProfileOverlay.style.display = "none";
}

