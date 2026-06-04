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

  // Populate Player Card details dynamically from localStorage
  const playerId = window.EventFlow ? window.EventFlow.getCurrentUserId() : 'P001';
  if (window.EventFlow) {
    const player = EventFlow.getPlayers().find(p => p.id === playerId);
    if (player) {
      const nameEl = document.getElementById("player-name");
      const sportEl = document.getElementById("sport-name");
      const clubEl = document.getElementById("club-name");
      const skillsEl = document.getElementById("skills");
      const achievementsEl = document.getElementById("achievements");

      if (nameEl) nameEl.textContent = player.name;
      if (sportEl) sportEl.textContent = `${player.sport} - ${player.position || 'Forward'}`;
      if (clubEl) clubEl.textContent = `Club - ${player.club}`;
      if (skillsEl) skillsEl.textContent = player.skills || 'N/A';
      // Note: in original HTML there are multiple achievement fields or duplicate achievements ID. We update the first one.
      if (achievementsEl) achievementsEl.textContent = player.achievements || 'N/A';
    }

    // Render player notifications dropdown
    EventFlow.renderNotifications('player', {
      dropdownSelector: '#notificationDropdown',
      triggerSelector: '.notify-only'
    });
  }
});
