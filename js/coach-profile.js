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

  // Inject Edit Profile Modal CSS & HTML dynamically if missing
  function injectEditModal() {
    if (document.getElementById("editProfileModal")) return;

    // Inject CSS
    const style = document.createElement("style");
    style.textContent = `
      .editprofile-overlay {
        position: fixed;
        inset: 0;
        background: rgba(2, 6, 23, 0.6);
        backdrop-filter: blur(6px);
        z-index: 2000;
        display: none;
      }
      .editprofile-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.9);
        width: 450px;
        background: linear-gradient(145deg, #020617, #111827);
        border-radius: 18px;
        padding: 22px;
        box-shadow: 0 20px 45px rgba(56, 189, 248, 0.35);
        z-index: 2001;
        display: none;
        transition: all 0.3s ease;
      }
      .editprofile-modal.show {
        display: block;
        transform: translate(-50%, -50%) scale(1);
      }
      .editprofile-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .editprofile-header h3 {
        color: #38bdf8;
      }
      .editprofile-header i {
        font-size: 20px;
        cursor: pointer;
        color: #94a3b8;
      }
      .editprofile-header i:hover {
        color: #f87171;
      }
      .editprofile-form {
        display: flex;
        flex-direction: column;
        gap: 14px;
        margin-top: 15px;
      }
      .editprofile-form label {
        font-size: 13px;
        color: #94a3b8;
        margin-bottom: -5px;
      }
      .editprofile-form input,
      .editprofile-form textarea {
        background: #020617;
        border: 1px solid #1e293b;
        padding: 10px;
        border-radius: 10px;
        color: #e5e7eb;
        outline: none;
      }
      .editprofile-form textarea {
        resize: none;
        height: 80px;
      }
      .editprofile-form input:focus,
      .editprofile-form textarea:focus {
        border-color: #38bdf8;
        box-shadow: 0 0 8px rgba(56, 189, 248, 0.5);
      }
      .editprofile-form button {
        margin-top: 10px;
        padding: 12px;
        border: none;
        border-radius: 12px;
        background: linear-gradient(135deg, #38bdf8, #0ea5e9);
        color: #020617;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      .editprofile-form button:hover {
        box-shadow: 0 0 18px rgba(56, 189, 248, 0.8);
      }
      @media (max-width: 576px) {
        .editprofile-modal {
          width: 90%;
        }
      }
    `;
    document.head.appendChild(style);

    // Inject Overlay & Modal Markup
    const overlayDiv = document.createElement("div");
    overlayDiv.className = "editprofile-overlay";
    overlayDiv.id = "editProfileOverlay";
    document.body.appendChild(overlayDiv);

    const modalDiv = document.createElement("div");
    modalDiv.className = "editprofile-modal";
    modalDiv.id = "editProfileModal";
    modalDiv.innerHTML = `
      <div class="editprofile-header">
        <h3>Edit Coach Profile</h3>
        <i class="bi bi-x-lg" id="closeEditProfile"></i>
      </div>
      <form class="editprofile-form">
        <label>Profile Image</label>
        <input type="file" accept="image/*" />

        <label>Coach Name</label>
        <input type="text" placeholder="Enter name" required />

        <label>Sport</label>
        <input type="text" placeholder="Sport" required />

        <label>Experience (Years)</label>
        <input type="number" placeholder="Experience" required />

        <label>Connected Club</label>
        <input type="text" placeholder="Manchester United" required />

        <label>Skills</label>
        <textarea placeholder="Skills..." required></textarea>

        <button type="submit">
          <i class="bi bi-check-circle-fill"></i> Save Changes
        </button>
      </form>
    `;
    document.body.appendChild(modalDiv);
  }

  // --- DYNAMIC RENDERING LOGIC ---
  function renderProfile() {
    if (!window.EventFlow) return;

    const currentUserId = EventFlow.getCurrentUserId();
    const allCoaches = EventFlow.getCoaches();
    const coach = allCoaches.find(c => c.id === currentUserId);

    if (!coach) return;

    // Update Coach Card details
    const picEl = document.getElementById("profile-pic");
    const nameEl = document.getElementById("player-name");
    const sportEl = document.getElementById("sport-name");
    const skillsEl = document.getElementById("skills");

    // Select duplicate id achievements: first is Experience, second is Club
    const achievementsEls = document.querySelectorAll("#achievements");
    const experienceEl = achievementsEls[0];
    const clubEl = achievementsEls[1];

    if (picEl) picEl.src = coach.image;
    if (nameEl) nameEl.textContent = coach.name;
    if (sportEl) sportEl.textContent = `${coach.sport} - Coach`;
    if (skillsEl) skillsEl.textContent = coach.skills || "N/A";
    if (experienceEl) experienceEl.textContent = `${coach.experience || 0} Years`;
    if (clubEl) clubEl.textContent = coach.connectTarget || "None";

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

  // Inject modal and initial rendering
  injectEditModal();
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
        const allCoaches = EventFlow.getCoaches();
        const coach = allCoaches.find(c => c.id === currentUserId);

        if (!coach) return;

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
          authorName: coach.name,
          authorRole: "coach",
          authorImage: coach.image,
          sport: coach.sport,
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
    const editSportInput = editForm?.querySelector('input[placeholder*="Sport"]');
    const editExperienceInput = editForm?.querySelector('input[placeholder*="Experience"]');
    const editClubInput = editForm?.querySelector('input[placeholder*="Club"]');
    const editSkillsInput = editForm?.querySelector('textarea[placeholder*="Skills"]');

    editProfileBtn.addEventListener("click", () => {
      const currentUserId = EventFlow.getCurrentUserId();
      const allCoaches = EventFlow.getCoaches();
      const coach = allCoaches.find(c => c.id === currentUserId);

      if (coach) {
        if (editNameInput) editNameInput.value = coach.name || "";
        if (editSportInput) editSportInput.value = coach.sport || "";
        if (editExperienceInput) editExperienceInput.value = coach.experience || 0;
        if (editClubInput) editClubInput.value = coach.connectTarget || "";
        if (editSkillsInput) editSkillsInput.value = coach.skills || "";
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
        const allCoaches = EventFlow.getCoaches();
        const coachIndex = allCoaches.findIndex(c => c.id === currentUserId);

        if (coachIndex === -1) return;

        const updatedCoach = { ...allCoaches[coachIndex] };
        if (editNameInput) updatedCoach.name = editNameInput.value.trim();
        if (editSportInput) updatedCoach.sport = editSportInput.value.trim();
        if (editExperienceInput) updatedCoach.experience = parseInt(editExperienceInput.value.trim()) || 0;
        if (editClubInput) updatedCoach.connectTarget = editClubInput.value.trim();
        if (editSkillsInput) updatedCoach.skills = editSkillsInput.value.trim();

        const file = editImageInput && editImageInput.files ? editImageInput.files[0] : null;
        const saveAndReload = (cObj) => {
          allCoaches[coachIndex] = cObj;
          EventFlow.saveCoaches(allCoaches);

          // Update follow data name & avatar if it exists
          if (window.FollowSystem) {
            const slugId = FollowSystem.slugify(cObj.name);
            const followData = FollowSystem.loadFollowData();
            if (followData.users[slugId]) {
              followData.users[slugId].name = cObj.name;
              followData.users[slugId].avatar = cObj.image;
              FollowSystem.saveFollowData(followData);
            }
          }

          closeEditModal();
          renderProfile();
        };

        if (file) {
          const reader = new FileReader();
          reader.onload = function (evt) {
            updatedCoach.image = evt.target.result;
            saveAndReload(updatedCoach);
          };
          reader.readAsDataURL(file);
        } else {
          saveAndReload(updatedCoach);
        }
      });
    }
  }
});
