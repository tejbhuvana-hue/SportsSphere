document.addEventListener("DOMContentLoaded", function () {

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobileMenu");

  menuToggle.addEventListener("click", function () {
    mobileMenu.classList.toggle("show");
  });

});

document.addEventListener("DOMContentLoaded", function () {

  const notificationBtn = document.querySelector(".notify-only");
  const dropdown = document.getElementById("notificationDropdown");
  const overlay = document.getElementById("overlay");

  notificationBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
      overlay.style.display = "none";
    } else {
      dropdown.style.display = "block";
      overlay.style.display = "block";
    }
  });

  overlay.addEventListener("click", function () {
    dropdown.style.display = "none";
    overlay.style.display = "none";
  });

}); 

overlay.addEventListener("click", () => {
  dropdown.style.display = "none";
  overlay.style.display = "none";
});

const chatBody = document.getElementById("chatBody");
const messageInput = document.getElementById("messageInput");
const chatName = document.getElementById("chatName");
const chatAvatar = document.getElementById("chatAvatar");

function openChat(name, avatar) {
  chatName.textContent = name;
  chatAvatar.src = avatar;
  chatBody.innerHTML = "";
}
document.addEventListener("click", function (e) {
  if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    mobileMenu.classList.remove("show");
  }
});
