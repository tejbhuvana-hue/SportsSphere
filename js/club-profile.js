const overlay = document.getElementById("overlay");

// ================= MODALS =================
// Add Post Modal
const addPostBtn = document.querySelector(".club-btn:nth-child(3)"); // Add Post button
const addPostModal = document.getElementById("addPostModal");
const closeAddPost = document.getElementById("closeAddPost");

// Event Modal
const postEventBtn = document.getElementById("postEventBtn");
const eventModal = document.getElementById("eventModal");
const closeEvent = document.getElementById("closeEvent");

// Members Modal
const viewMembersBtn = document.getElementById("viewMembersBtn");
const membersModal = document.getElementById("membersModal");
const closeMembers = document.getElementById("closeMembers");

// Edit Modal
const editBtn = document.querySelector(".club-btn:nth-child(2)");
const editModal = document.getElementById("editModal");
const closeEdit = document.getElementById("closeEdit");

// ================= FUNCTIONS =================
function openModal(modal) {
  modal.classList.add("show");
  overlay.style.display = "block";
}

function closeModal(modal) {
  modal.classList.remove("show");
  overlay.style.display = "none";
}

// ================= MODAL EVENT LISTENERS =================
addPostBtn.addEventListener("click", () => openModal(addPostModal));
closeAddPost.addEventListener("click", () => closeModal(addPostModal));

postEventBtn.addEventListener("click", () => openModal(eventModal));
closeEvent.addEventListener("click", () => closeModal(eventModal));

viewMembersBtn.addEventListener("click", () => openModal(membersModal));
closeMembers.addEventListener("click", () => closeModal(membersModal));

editBtn.addEventListener("click", () => openModal(editModal));
closeEdit.addEventListener("click", () => closeModal(editModal));

overlay.addEventListener("click", () => {
  [addPostModal, eventModal, membersModal, editModal].forEach((modal) =>
    modal.classList.remove("show")
  );
  overlay.style.display = "none";
});

// ================= NAVBAR TOGGLE =================
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
  if (!e.target.closest(".navbar") && !e.target.closest(".mobile-menu") && !e.target.closest(".notification-dropdown")) {
    mobileMenu.style.display = "none";
    notifyBox.style.display = "none";
  }
});

// ================= RESPONSIVE PROFILE LINK =================
function adjustProfileLink() {
  const profileDropBtn = document.querySelector(".profile-dropbtn");
  const mobileProfileLink = mobileMenu.querySelector("a[href='#']"); // profile in mobile menu

  if (window.innerWidth <= 991) {
    if (profileDropBtn) profileDropBtn.style.display = "none";
    if (mobileProfileLink) mobileProfileLink.style.display = "flex";
  } else {
    if (profileDropBtn) profileDropBtn.style.display = "flex";
    if (mobileProfileLink) mobileProfileLink.style.display = "none";
  }
}

window.addEventListener("resize", adjustProfileLink);
window.addEventListener("load", adjustProfileLink);