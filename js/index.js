const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");

if (menuIcon) {
  menuIcon.addEventListener("click", function() {
    navLinks.classList.toggle("active");
  });
}
