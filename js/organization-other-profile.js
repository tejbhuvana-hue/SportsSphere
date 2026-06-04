document.addEventListener("DOMContentLoaded", () => {
  // Navigation & Dropdowns
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("show");
    });
  }

  const notificationBtn = document.querySelector(".bi-bell-fill")?.parentElement;
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

  // --- DYNAMIC PROFILE LOADING ---
  const urlParams = new URLSearchParams(window.location.search);
  const targetId = urlParams.get("id") || "P002"; // Fallback to P002 (Virat Kohli)

  if (window.EventFlow) {
    const allPlayers = EventFlow.getPlayers();
    const allCoaches = EventFlow.getCoaches();
    const allClubs = EventFlow.getClubs();
    const allAssocs = EventFlow.getAssociations();

    const user = allPlayers.find(p => p.id === targetId) ||
                 allCoaches.find(c => c.id === targetId) ||
                 allClubs.find(c => c.id === targetId) ||
                 allAssocs.find(a => a.id === targetId);

    if (user) {
      // 1. Populate sidebar card
      const nameEl = document.getElementById("player-name") || document.querySelector(".profile-card h3");
      const picEl = document.getElementById("profile-pic") || document.querySelector(".club-logo img");
      const sportEl = document.getElementById("sport-name");
      const clubEl = document.getElementById("club-name");
      const skillsEl = document.getElementById("skills");
      const achievementsEl = document.getElementById("achievements");

      if (nameEl) nameEl.textContent = user.name;
      if (picEl) picEl.src = user.image;

      if (sportEl) {
        if (user.position) {
          sportEl.textContent = `${user.sport} - ${user.position}`;
        } else if (targetId.startsWith("coach")) {
          sportEl.textContent = `${user.sport} - Coach`;
        } else {
          sportEl.textContent = user.sport || "";
        }
      }

      if (clubEl) {
        clubEl.textContent = user.club ? `Club - ${user.club}` : (user.association ? `Association - ${user.association}` : "");
      }

      if (skillsEl) {
        skillsEl.textContent = user.skills || "N/A";
      }

      if (achievementsEl) {
        const achievementsList = EventFlow.getAchievements().filter(ach => ach.playerId === targetId);
        if (achievementsList.length > 0) {
          achievementsEl.textContent = achievementsList.map(a => a.title).join(", ");
        } else {
          achievementsEl.textContent = user.achievements || "N/A";
        }
      }

      // 2. Set Follow Button ID
      const followBtn = document.querySelector(".btn-follow");
      if (followBtn && window.FollowSystem) {
        const slugId = FollowSystem.slugify(user.name);
        followBtn.setAttribute("data-profile-id", slugId);
      }

      // 3. Render target user's posts
      const feedContainer = document.getElementById("feed-content");
      if (feedContainer) {
        // Remove hardcoded posts
        const existingPosts = feedContainer.querySelectorAll(".post");
        existingPosts.forEach(p => p.remove());

        // Get target user's posts
        const userPosts = EventFlow.getPosts().filter(p => p.authorId === targetId);
        userPosts.forEach(post => {
          if (EventFlow.createPostElement) {
            const postEl = EventFlow.createPostElement(post);
            feedContainer.appendChild(postEl);
          }
        });

        if (userPosts.length === 0) {
          feedContainer.innerHTML = `<div style="text-align: center; padding: 40px; color: #94a3b8;"><i class="bi bi-justify-left" style="font-size: 40px; display: block; margin-bottom: 10px;"></i>No posts shared yet.</div>`;
        }
      }
    }
  }
});
