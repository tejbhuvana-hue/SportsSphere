const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");

menuIcon.addEventListener("click", function() {
  navLinks.classList.toggle("active");
});
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent form submission

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Example credentials
    if(username === "player" && password === "123") {
        window.location.href = "player/player.html";
    }
    else if(username === "coach" && password === "123") {
        window.location.href = "coach/coach.html";
    }
    else if(username === "club" && password === "123") {
        window.location.href = "club/club.html";
    }
    else if(username === "organization" && password === "123") {
        window.location.href = "organization/organization.html";
    }
    else if(username === "admin" && password === "123") {
        window.location.href = "admin/admin.html";
    }
    else {
        alert("Invalid credentials");
    }
});