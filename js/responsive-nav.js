/* ==========================================================================
   SPORTS SPHERE RESPONSIVE NAVIGATION & INTERACTION SCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ── 1. INITIALIZE MOBILE MENU TOGGLE ──
  const menuToggle = document.getElementById("menu-icon") || 
                     document.querySelector(".menu-icon") || 
                     document.querySelector(".menu-btn") || 
                     document.querySelector(".menu-toggle");
                     
  const mobileMenu = document.getElementById("nav-links") || 
                     document.querySelector(".mobile-menu") ||
                     document.querySelector(".nav");

  if (menuToggle && mobileMenu) {
    // Accessibility attributes
    menuToggle.setAttribute("role", "button");
    menuToggle.setAttribute("tabindex", "0");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Toggle navigation menu");

    // Dynamic overlay creation
    let overlay = document.getElementById("overlay") || 
                  document.querySelector(".mobile-nav-overlay");
                  
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "mobile-nav-overlay";
      document.body.appendChild(overlay);
    }

    // Sync functions
    function updateState(isOpen) {
      if (isOpen) {
        overlay.classList.add("show");
        menuToggle.setAttribute("aria-expanded", "true");
        
        // Update icon class to show close button
        const icon = menuToggle.querySelector("i");
        if (icon) {
          if (icon.classList.contains("bi-list")) {
            icon.classList.remove("bi-list");
            icon.classList.add("bi-x-lg");
          } else if (icon.classList.contains("fa-bars")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
          }
        }
      } else {
        overlay.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
        
        // Update icon class to show list button
        const icon = menuToggle.querySelector("i");
        if (icon) {
          if (icon.classList.contains("bi-x-lg")) {
            icon.classList.remove("bi-x-lg");
            icon.classList.add("bi-list");
          } else if (icon.classList.contains("fa-times")) {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
          }
        }
      }
    }

    // Set up MutationObserver to watch classes on mobileMenu
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isOpen = mobileMenu.classList.contains("active") || mobileMenu.classList.contains("show");
          updateState(isOpen);
        }
      });
    });

    observer.observe(mobileMenu, { attributes: true, attributeFilter: ["class"] });

    // Initial state check
    const isOpenInit = mobileMenu.classList.contains("active") || mobileMenu.classList.contains("show");
    updateState(isOpenInit);

    // Keyboard support: dispatch a click event when Enter/Space is pressed on the toggle button
    menuToggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        menuToggle.click(); // Triggers the page's original click toggle handler
      }
    });

    // Helper close function
    function closeMenu() {
      mobileMenu.classList.remove("active");
      mobileMenu.classList.remove("show");
    }

    overlay.addEventListener("click", closeMenu);

    // Close menu when clicking on any navigation link inside it
    const links = mobileMenu.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    // Close menu on Escape key press
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    });
  }

  // ── 2. WRAP OPEN CHAT FUNCTION FOR MESSAGES PAGES ──
  const originalOpenChat = window.openChat;
  window.openChat = function(name, avatar) {
    if (typeof originalOpenChat === "function") {
      originalOpenChat(name, avatar);
    } else {
      const chatName = document.getElementById("chatName");
      const chatAvatar = document.getElementById("chatAvatar");
      const chatBody = document.getElementById("chatBody");
      if (chatName) chatName.textContent = name;
      if (chatAvatar) chatAvatar.src = avatar;
      if (chatBody) chatBody.innerHTML = "";
    }
    
    // Add open class to chat app to toggle full screen on mobile
    const appContainer = document.querySelector(".app");
    if (appContainer) {
      appContainer.classList.add("chat-open");
    }
  };

  // Define global goBack function
  window.goBack = function() {
    const appContainer = document.querySelector(".app");
    if (appContainer) {
      appContainer.classList.remove("chat-open");
    }
  };
});
