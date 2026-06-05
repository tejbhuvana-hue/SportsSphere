document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");

  const addPostBtn = document.getElementById("addPostBtn");
  const addPostModal = document.getElementById("addPostModal");
  const closeAddPost = document.getElementById("closeAddPost");

  const postEventBtn = document.getElementById("postEventBtn");
  const eventModal = document.getElementById("eventModal");
  const closeEvent = document.getElementById("closeEvent");

  const editBtn = document.querySelector(".club-btn") || document.getElementById("editBtn"); // first button = Edit
  const editModal = document.getElementById("editModal");
  const closeEdit = document.getElementById("closeEdit");

  function openModal(modal) {
    if (modal) modal.classList.add("show");
    if (overlay) overlay.style.display = "block";
  }

  function closeModal(modal) {
    if (modal) modal.classList.remove("show");
    if (overlay) overlay.style.display = "none";
  }

  if (addPostBtn && addPostModal) {
    addPostBtn.addEventListener("click", () => openModal(addPostModal));
  }
  if (closeAddPost && addPostModal) {
    closeAddPost.addEventListener("click", () => closeModal(addPostModal));
  }

  if (postEventBtn && eventModal) {
    postEventBtn.addEventListener("click", () => openModal(eventModal));
  }
  if (closeEvent && eventModal) {
    closeEvent.addEventListener("click", () => closeModal(eventModal));
  }

  if (editBtn && editModal) {
    editBtn.addEventListener("click", () => {
      if (window.EventFlow) {
        const currentUserId = EventFlow.getCurrentUserId();
        const allAssocs = EventFlow.getAssociations();
        const org = allAssocs.find(a => a.id === currentUserId);
        if (org) {
          const editForm = editModal.querySelector("form");
          const editNameInput = editForm?.querySelector('input[type="text"]');
          const editDescInput = editForm?.querySelector("textarea");
          if (editNameInput) editNameInput.value = org.name || "";
          if (editDescInput) editDescInput.value = org.description || `${org.sport} • Official Organization`;
        }
      }
      openModal(editModal);
    });
  }
  if (closeEdit && editModal) {
    closeEdit.addEventListener("click", () => closeModal(editModal));
  }

  if (overlay) {
    overlay.addEventListener("click", () => {
      [addPostModal, eventModal, editModal].forEach((modal) => {
        if (modal) modal.classList.remove("show");
      });
      overlay.style.display = "none";
    });
  }

  // --- DYNAMIC RENDERING LOGIC ---
  function renderProfile() {
    if (!window.EventFlow) return;

    const currentUserId = EventFlow.getCurrentUserId();
    const allAssocs = EventFlow.getAssociations();
    const org = allAssocs.find(a => a.id === currentUserId);

    if (!org) return;

    // Update Org Card details
    const picEl = document.querySelector(".club-logo img");
    const nameEl = document.querySelector(".profile-card h3");
    const descEl = document.querySelector(".profile-card p");

    if (picEl) picEl.src = org.image;
    if (nameEl) nameEl.textContent = org.name;
    if (descEl) descEl.textContent = org.description || `${org.sport} • Official Organization`;

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

  renderProfile();

  // --- FORM SUBMISSIONS ---
  // Edit Organization Details
  if (editModal) {
    const editForm = editModal.querySelector("form");
    if (editForm) {
      editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const currentUserId = EventFlow.getCurrentUserId();
        const allAssocs = EventFlow.getAssociations();
        const orgIndex = allAssocs.findIndex(a => a.id === currentUserId);
        if (orgIndex === -1) return;

        const updatedOrg = { ...allAssocs[orgIndex] };
        const editNameInput = editForm.querySelector('input[type="text"]');
        const editDescInput = editForm.querySelector("textarea");
        const editFileInput = editForm.querySelector('input[type="file"]');

        if (editNameInput) updatedOrg.name = editNameInput.value.trim();
        if (editDescInput) updatedOrg.description = editDescInput.value.trim();

        const file = editFileInput && editFileInput.files ? editFileInput.files[0] : null;

        const saveAndReload = (orgObj) => {
          allAssocs[orgIndex] = orgObj;
          EventFlow.saveAssociations(allAssocs);

          // Update follow data name & avatar if it exists
          if (window.FollowSystem) {
            const slugId = FollowSystem.slugify(orgObj.name);
            const followData = FollowSystem.loadFollowData();
            if (followData.users[slugId]) {
              followData.users[slugId].name = orgObj.name;
              followData.users[slugId].avatar = orgObj.image;
              FollowSystem.saveFollowData(followData);
            }
          }

          closeModal(editModal);
          renderProfile();
        };

        if (file) {
          const reader = new FileReader();
          reader.onload = function (evt) {
            updatedOrg.image = evt.target.result;
            saveAndReload(updatedOrg);
          };
          reader.readAsDataURL(file);
        } else {
          saveAndReload(updatedOrg);
        }
      });
    }
  }

  // Add Post Form
  if (addPostModal) {
    const addPostForm = addPostModal.querySelector("form");
    if (addPostForm) {
      addPostForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const currentUserId = EventFlow.getCurrentUserId();
        const allAssocs = EventFlow.getAssociations();
        const org = allAssocs.find(a => a.id === currentUserId);
        if (!org) return;

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
          authorName: org.name,
          authorRole: "organization",
          authorImage: org.image,
          sport: org.sport,
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
          closeModal(addPostModal);
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

  // Create Event Form
  if (eventModal) {
    const eventForm = eventModal.querySelector("form");
    if (eventForm) {
      eventForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const currentUserId = EventFlow.getCurrentUserId();
        const allAssocs = EventFlow.getAssociations();
        const org = allAssocs.find(a => a.id === currentUserId);
        if (!org) return;

        const eventType = eventModal.querySelector("select")?.value || "trial";
        const date = eventModal.querySelector('input[type="date"]')?.value || "";
        const sport = eventModal.querySelector('input[placeholder*="Sport"]')?.value || org.sport;
        const requirements = eventModal.querySelector('input[placeholder*="Requirements"]')?.value || "";
        const location = eventModal.querySelector("textarea")?.value || "";
        const contact = eventModal.querySelector('input[type="tel"]')?.value || "";
        const title = eventType === "camp" ? "Association Event: " + location : "Association Tournament: " + location;

        if (window.EventFlow) {
          EventFlow.addEvent({
            id: `event-${currentUserId}-${Date.now()}`,
            title,
            type: eventType === "camp" ? "association_event" : "association_tournament",
            eventType,
            createdBy: org.name,
            status: "Live",
            location,
            venue: location,
            date,
            category: sport,
            description: requirements || (eventType === "camp" ? "Association sports event." : "Association tournament event."),
            contact,
            applicants: [],
            poster: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800",
            visibleTo: ["player", "coach", "club"]
          });

          EventFlow.createNotification(
            "player",
            `New tournament posted by ${org.name}`,
            `A new organization tournament has been posted at ${location} on ${date}.`
          );

          EventFlow.renderNotifications("organization", {
            dropdownSelector: ".notification-dropdown",
            triggerSelector: ".notify-btn",
          });
        }

        closeModal(eventModal);
        eventForm.reset();
      });
    }
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const notifyBtn = document.querySelector(".notify-btn");
  const notifyBox = document.querySelector(".notification-dropdown");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block";
      if (notifyBox) notifyBox.style.display = "none";
    });
  }

  if (notifyBtn && notifyBox) {
    notifyBtn.addEventListener("click", () => {
      notifyBox.style.display = notifyBox.style.display === "block" ? "none" : "block";
      if (mobileMenu) mobileMenu.style.display = "none";
    });
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar") && !e.target.closest(".mobile-menu") && !e.target.closest(".notification-dropdown")) {
      if (mobileMenu) mobileMenu.style.display = "none";
      if (notifyBox) notifyBox.style.display = "none";
    }
  });
});
