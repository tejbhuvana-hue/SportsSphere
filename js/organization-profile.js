const overlay = document.getElementById("overlay");

// ADD POST MODAL
const addPostBtn = document.getElementById("addPostBtn");
const addPostModal = document.getElementById("addPostModal");
const closeAddPost = document.getElementById("closeAddPost");

// EVENT MODAL
const postEventBtn = document.getElementById("postEventBtn");
const eventModal = document.getElementById("eventModal");
const closeEvent = document.getElementById("closeEvent");

// EDIT MODAL
const editBtn = document.querySelector(".club-btn"); // first button = Edit
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

// ================= EVENT LISTENERS =================

// Add Post
addPostBtn.addEventListener("click", () => openModal(addPostModal));
closeAddPost.addEventListener("click", () => closeModal(addPostModal));

// Event Modal
postEventBtn.addEventListener("click", () => openModal(eventModal));
closeEvent.addEventListener("click", () => closeModal(eventModal));

// Edit Modal
editBtn.addEventListener("click", () => openModal(editModal));
closeEdit.addEventListener("click", () => closeModal(editModal));

// Overlay click closes all
overlay.addEventListener("click", () => {
  [addPostModal, eventModal, editModal].forEach((modal) =>
    modal.classList.remove("show")
  );
  overlay.style.display = "none";
});
const notifyBtn = document.querySelector(".notify-btn");
const notifyBox = document.querySelector(".notification-dropdown");

notifyBtn.addEventListener("click", () => {
  notifyBox.style.display =
    notifyBox.style.display === "block" ? "none" : "block";
  mobileMenu.style.display = "none";
});

