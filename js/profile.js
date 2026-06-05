document.addEventListener("DOMContentLoaded", () => {
  // Navigation & Dropdowns
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (mobileMenu.classList.contains("show") && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileMenu.classList.remove("show");
      }
    });
  }

  const notificationBtn = document.querySelector(".notify-only");
  const dropdown = document.getElementById("notificationDropdown");
  const overlay = document.getElementById("overlay");

  if (notificationBtn && dropdown && overlay) {
    notificationBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
        overlay.style.display = "none";
      } else {
        dropdown.style.display = "block";
        overlay.style.display = "block";
      }
    });

    overlay.addEventListener("click", () => {
      dropdown.style.display = "none";
      overlay.style.display = "none";
    });
  }

  // --- DYNAMIC RENDERING LOGIC ---
  function renderProfile() {
    if (!window.EventFlow) return;

    const currentUserId = EventFlow.getCurrentUserId();
    const allPlayers = EventFlow.getPlayers();
    const player = allPlayers.find(p => p.id === currentUserId);

    if (!player) return;

    // Update Player Card details
    const picEl = document.getElementById("profile-pic");
    const nameEl = document.getElementById("player-name");
    const sportEl = document.getElementById("sport-name");
    const clubEl = document.getElementById("club-name");
    const skillsEl = document.getElementById("skills");
    const achievementsEl = document.getElementById("achievements");

    if (picEl) picEl.src = player.image;
    if (nameEl) nameEl.textContent = player.name;
    if (sportEl) sportEl.textContent = player.position ? `${player.sport} - ${player.position}` : player.sport;
    if (clubEl) clubEl.textContent = `Club - ${player.club || "N/A"}`;
    if (skillsEl) skillsEl.textContent = player.skills || "N/A";

    if (achievementsEl) {
      const achievementsList = EventFlow.getAchievements().filter(ach => ach.playerId === currentUserId);
      if (achievementsList.length > 0) {
        achievementsEl.textContent = achievementsList.map(a => a.title).join(", ");
      } else {
        achievementsEl.textContent = player.achievements || "N/A";
      }
    }

    // Render Feed/Posts
    const feedContainer = document.querySelector(".feed");
    if (feedContainer) {
      const existingPosts = feedContainer.querySelectorAll(".post");
      existingPosts.forEach(p => p.remove());

      const userPosts = EventFlow.getPosts().filter(p => p.authorId === currentUserId);
      userPosts.forEach(post => {
        if (EventFlow.createPostElement) {
          const postEl = EventFlow.createPostElement(post);
          feedContainer.appendChild(postEl);
        }
      });

      if (userPosts.length === 0) {
        const noPostEl = document.createElement("div");
        noPostEl.className = "no-posts-placeholder";
        noPostEl.style.cssText = "text-align: center; padding: 40px; color: #94a3b8;";
        noPostEl.innerHTML = `<i class="bi bi-justify-left" style="font-size: 40px; display: block; margin-bottom: 10px;"></i>No posts shared yet.`;
        feedContainer.appendChild(noPostEl);
      }
    }

    // Refresh follow counts
    if (window.FollowSystem) {
      FollowSystem.refreshFollowUI();
    }
  }

  // Initialize Rendering
  renderProfile();

  // --- MODAL EVENT HANDLERS ---
  const addPostBtn = document.querySelector(".bi-plus-square")?.parentElement;
  const addPostModal = document.getElementById("addPostModal");
  const addPostOverlay = document.getElementById("addPostOverlay");
  const closeAddPost = document.getElementById("closeAddPost");

  if (addPostBtn && addPostModal && closeAddPost) {
    addPostBtn.addEventListener("click", () => {
      addPostModal.classList.add("show");
      if (addPostOverlay) addPostOverlay.style.display = "block";
    });

    const closeModal = () => {
      addPostModal.classList.remove("show");
      if (addPostOverlay) addPostOverlay.style.display = "none";
    };

    closeAddPost.addEventListener("click", closeModal);
    if (addPostOverlay) addPostOverlay.addEventListener("click", closeModal);

    // Bind Add Post Form
    const addPostForm = document.querySelector(".addpost-form");
    if (addPostForm) {
      addPostForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const currentUserId = EventFlow.getCurrentUserId();
        const allPlayers = EventFlow.getPlayers();
        const player = allPlayers.find(p => p.id === currentUserId);

        if (!player) return;

        const descriptionInput = addPostForm.querySelector("textarea");
        const fileInput = addPostForm.querySelector('input[type="file"]');
        const caption = descriptionInput ? descriptionInput.value.trim() : "";

        if (!caption) {
          alert("Please enter a caption/description.");
          return;
        }

        const newPost = {
          id: `post-${currentUserId}-${Date.now()}`,
          authorId: currentUserId,
          authorName: player.name,
          authorRole: "player",
          authorImage: player.image,
          sport: player.sport,
          caption: caption,
          image: "",
          likes: "0",
          comments: "0",
          date: "Just now"
        };

        const file = fileInput && fileInput.files ? fileInput.files[0] : null;
        const savePost = (post) => {
          const posts = EventFlow.getPosts();
          posts.unshift(post);
          EventFlow.savePosts(posts);
          closeModal();
          if (descriptionInput) descriptionInput.value = "";
          if (fileInput) fileInput.value = "";
          renderProfile();
        };

        if (file) {
          const reader = new FileReader();
          reader.onload = function (evt) {
            newPost.image = evt.target.result;
            savePost(newPost);
          };
          reader.readAsDataURL(file);
        } else {
          newPost.image = "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800";
          savePost(newPost);
        }
      });
    }
  }

  const editProfileBtn = document.querySelector(".bi-pencil-square")?.parentElement || document.querySelector(".edit-btn");
  const editProfileModal = document.getElementById("editProfileModal");
  const editProfileOverlay = document.getElementById("editProfileOverlay");
  const closeEditProfile = document.getElementById("closeEditProfile");

  if (editProfileBtn && editProfileModal && closeEditProfile) {
    const editForm = document.querySelector(".editprofile-form");
    const editImageInput = editForm?.querySelector('input[type="file"]');
    const editNameInput = editForm?.querySelector('input[placeholder*="name"]');
    const editSportInput = editForm?.querySelector('input[placeholder*="Position"]');
    const editSkillsInput = editForm?.querySelector('textarea[placeholder*="Dribbling"]');
    const editAchievementsInput = editForm?.querySelector('textarea[placeholder*="UAFE"]');

    editProfileBtn.addEventListener("click", () => {
      const currentUserId = EventFlow.getCurrentUserId();
      const allPlayers = EventFlow.getPlayers();
      const player = allPlayers.find(p => p.id === currentUserId);

      if (player) {
        if (editNameInput) editNameInput.value = player.name || "";
        if (editSportInput) editSportInput.value = player.position ? `${player.sport} - ${player.position}` : (player.sport || "");
        if (editSkillsInput) editSkillsInput.value = player.skills || "";
        if (editAchievementsInput) {
          const achievementsList = EventFlow.getAchievements().filter(ach => ach.playerId === currentUserId);
          if (achievementsList.length > 0) {
            editAchievementsInput.value = achievementsList.map(a => a.title).join(", ");
          } else {
            editAchievementsInput.value = player.achievements || "";
          }
        }
      }
      editProfileModal.classList.add("show");
      if (editProfileOverlay) editProfileOverlay.style.display = "block";
    });

    const closeEditModal = () => {
      editProfileModal.classList.remove("show");
      if (editProfileOverlay) editProfileOverlay.style.display = "none";
    };

    closeEditProfile.addEventListener("click", closeEditModal);
    if (editProfileOverlay) editProfileOverlay.addEventListener("click", closeEditModal);

    // Bind Edit Profile Form
    if (editForm) {
      editForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const currentUserId = EventFlow.getCurrentUserId();
        const allPlayers = EventFlow.getPlayers();
        const playerIndex = allPlayers.findIndex(p => p.id === currentUserId);

        if (playerIndex === -1) return;

        const updatedPlayer = { ...allPlayers[playerIndex] };
        if (editNameInput) updatedPlayer.name = editNameInput.value.trim();

        if (editSportInput) {
          const sportVal = editSportInput.value.trim();
          const dashIndex = sportVal.indexOf("-");
          if (dashIndex !== -1) {
            updatedPlayer.sport = sportVal.substring(0, dashIndex).trim();
            updatedPlayer.position = sportVal.substring(dashIndex + 1).trim();
          } else {
            updatedPlayer.sport = sportVal;
            updatedPlayer.position = "";
          }
        }

        if (editSkillsInput) updatedPlayer.skills = editSkillsInput.value.trim();
        if (editAchievementsInput) updatedPlayer.achievements = editAchievementsInput.value.trim();

        const file = editImageInput && editImageInput.files ? editImageInput.files[0] : null;
        const saveAndReload = (pObj) => {
          allPlayers[playerIndex] = pObj;
          EventFlow.savePlayers(allPlayers);

          // Update follow data name & avatar if it exists
          if (window.FollowSystem) {
            const slugId = FollowSystem.slugify(pObj.name);
            const followData = FollowSystem.loadFollowData();
            if (followData.users[slugId]) {
              followData.users[slugId].name = pObj.name;
              followData.users[slugId].avatar = pObj.image;
              FollowSystem.saveFollowData(followData);
            }
          }

          closeEditModal();
          renderProfile();
        };

        if (file) {
          const reader = new FileReader();
          reader.onload = function (evt) {
            updatedPlayer.image = evt.target.result;
            saveAndReload(updatedPlayer);
          };
          reader.readAsDataURL(file);
        } else {
          saveAndReload(updatedPlayer);
        }
      });
    }
  }
});
