document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("show");
    });
  }

  const notificationBtn = document.querySelector(".bi-bell-fill")?.parentElement || document.querySelector(".notify-only");
  const dropdown = document.getElementById("notificationDropdown");
  const overlay = document.getElementById("overlay");

  if (notificationBtn && dropdown && overlay) {
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
  }

  const seeAllBtn = document.getElementById("seeAll");
  const suggestionsModal = document.getElementById("suggestionsModal");
  const closeSuggestions = document.getElementById("closeSuggestions");

  if (seeAllBtn && suggestionsModal && closeSuggestions) {
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
  }

  // Populate Coach Card details dynamically from localStorage
  const coachId = window.EventFlow ? window.EventFlow.getCurrentUserId() : 'coach-mike';
  if (window.EventFlow) {
    const coach = EventFlow.getCoaches().find(c => c.id === coachId);
    if (coach) {
      const nameEl = document.getElementById("player-name");
      const sportEl = document.getElementById("sport-name");
      const skillsEl = document.getElementById("skills");
      const achievementsEls = document.querySelectorAll("[id='achievements']");

      if (nameEl) nameEl.textContent = coach.name;
      if (sportEl) sportEl.textContent = `${coach.sport} - Coach`;
      if (skillsEl) skillsEl.textContent = coach.skills || 'Dribbling, Tactical Strategy, Attacking';
      if (achievementsEls.length >= 2) {
        achievementsEls[0].textContent = `${coach.experience} Years`;
        achievementsEls[1].textContent = coach.connectTarget || 'N/A';
      }
    }

    // Render coach notifications dropdown
    EventFlow.renderNotifications('coach', {
      dropdownSelector: '#notificationDropdown',
      triggerSelector: '.notify-only'
    });
  }
});
