const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const playerForm = document.getElementById("playerForm");
const coachForm = document.getElementById("coachForm");
const clubForm = document.getElementById("clubForm");

document.getElementById("playerRadio").addEventListener("change", () => {
  showForm(playerForm);
});

document.getElementById("coachRadio").addEventListener("change", () => {
  showForm(coachForm);
});

document.getElementById("clubRadio").addEventListener("change", () => {
  showForm(clubForm);
});

function showForm(form) {
  playerForm.style.display = "none";
  coachForm.style.display = "none";
  clubForm.style.display = "none";
  form.style.display = "block";
}
