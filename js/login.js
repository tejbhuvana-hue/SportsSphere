const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");

menuIcon.addEventListener("click", function() {
  navLinks.classList.toggle("active");
});
document.getElementById("loginForm").addEventListener("submit", function(e) {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Example credentials
    if(username === "player" && password === "123") {
        window.location.href = "Player/player.html";
    }
    else if(username === "coach" && password === "123") {
        window.location.href = "Coach/coach.html";
    }
    else if(username === "club" && password === "123") {
        window.location.href = "Club/club.html";
    }
    else if(username === "admin" && password === "123") {
        window.location.href = "Admin/admin.html";
    }
    else {
        alert("Invalid credentials");
    }
});