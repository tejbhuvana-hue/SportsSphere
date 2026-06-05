document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");

  const addPostBtn = document.querySelector(".club-btn:nth-child(3)") || document.getElementById("addPostBtn"); // Add Post button
  const addPostModal = document.getElementById("addPostModal");
  const closeAddPost = document.getElementById("closeAddPost");

  const postEventBtn = document.getElementById("postEventBtn");
  const eventModal = document.getElementById("eventModal");
  const closeEvent = document.getElementById("closeEvent");

  const viewMembersBtn = document.getElementById("viewMembersBtn");
  const membersModal = document.getElementById("membersModal");
  const closeMembers = document.getElementById("closeMembers");

  const editBtn = document.querySelector(".club-btn:nth-child(2)") || document.getElementById("editBtn");
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

  if (viewMembersBtn && membersModal) {
    viewMembersBtn.addEventListener("click", () => openModal(membersModal));
  }
  if (closeMembers && membersModal) {
    closeMembers.addEventListener("click", () => closeModal(membersModal));
  }

  if (editBtn && editModal) {
    editBtn.addEventListener("click", () => {
      if (window.EventFlow) {
        const currentUserId = EventFlow.getCurrentUserId();
        const allClubs = EventFlow.getClubs();
        const club = allClubs.find(c => c.id === currentUserId);
        if (club) {
          const editForm = editModal.querySelector("form");
          const editNameInput = editForm?.querySelector('input[type="text"]');
          const editDescInput = editForm?.querySelector("textarea");
          if (editNameInput) editNameInput.value = club.name || "";
          if (editDescInput) editDescInput.value = club.description || `${club.sport} • Official Club`;
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
      [addPostModal, eventModal, membersModal, editModal].forEach((modal) => {
        if (modal) modal.classList.remove("show");
      });
      overlay.style.display = "none";
    });
  }

  // --- DYNAMIC RENDERING LOGIC ---
  function renderProfile() {
    if (!window.EventFlow) return;

    const currentUserId = EventFlow.getCurrentUserId();
    const allClubs = EventFlow.getClubs();
    const club = allClubs.find(c => c.id === currentUserId);

    if (!club) return;

    // Update Club Card details
    const picEl = document.querySelector(".club-logo img");
    const nameEl = document.querySelector(".profile-card h3");
    const descEl = document.querySelector(".profile-card p");

    if (picEl) picEl.src = club.image;
    if (nameEl) nameEl.textContent = club.name;
    if (descEl) descEl.textContent = club.description || `${club.sport} • Official Club`;

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
  // Edit Club Details
  if (editModal) {
    const editForm = editModal.querySelector("form");
    if (editForm) {
      editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const currentUserId = EventFlow.getCurrentUserId();
        const allClubs = EventFlow.getClubs();
        const clubIndex = allClubs.findIndex(c => c.id === currentUserId);
        if (clubIndex === -1) return;

        const updatedClub = { ...allClubs[clubIndex] };
        const editNameInput = editForm.querySelector('input[type="text"]');
        const editDescInput = editForm.querySelector("textarea");
        const editFileInput = editForm.querySelector('input[type="file"]');

        if (editNameInput) updatedClub.name = editNameInput.value.trim();
        if (editDescInput) updatedClub.description = editDescInput.value.trim();

        const file = editFileInput && editFileInput.files ? editFileInput.files[0] : null;

        const saveAndReload = (clubObj) => {
          allClubs[clubIndex] = clubObj;
          EventFlow.saveClubs(allClubs);

          // Update follow data name & avatar if it exists
          if (window.FollowSystem) {
            const slugId = FollowSystem.slugify(clubObj.name);
            const followData = FollowSystem.loadFollowData();
            if (followData.users[slugId]) {
              followData.users[slugId].name = clubObj.name;
              followData.users[slugId].avatar = clubObj.image;
              FollowSystem.saveFollowData(followData);
            }
          }

          closeModal(editModal);
          renderProfile();
        };

        if (file) {
          const reader = new FileReader();
          reader.onload = function (evt) {
            updatedClub.image = evt.target.result;
            saveAndReload(updatedClub);
          };
          reader.readAsDataURL(file);
        } else {
          saveAndReload(updatedClub);
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
        const allClubs = EventFlow.getClubs();
        const club = allClubs.find(c => c.id === currentUserId);
        if (!club) return;

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
          authorName: club.name,
          authorRole: "club",
          authorImage: club.image,
          sport: club.sport,
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
        const allClubs = EventFlow.getClubs();
        const club = allClubs.find(c => c.id === currentUserId);
        if (!club) return;

        const eventType = eventModal.querySelector("select")?.value || "trial";
        const date = eventModal.querySelector('input[type="date"]')?.value || "";
        const description = eventModal.querySelector('input[placeholder*="Requirements"]')?.value || eventModal.querySelector('input[type="text"]')?.value || "";
        const location = eventModal.querySelector("textarea")?.value || "";
        const contact = eventModal.querySelector('input[type="tel"]')?.value || "";
        const title = eventType === "camp" ? "Club Camp: " + location : "Club Trial: " + location;

        if (window.EventFlow) {
          EventFlow.addEvent({
            id: `event-${currentUserId}-${Date.now()}`,
            title,
            type: eventType === "camp" ? "club_event" : "club_trial",
            eventType,
            createdBy: club.name,
            status: "Live",
            location,
            venue: location,
            date,
            category: club.sport,
            description: description || (eventType === "camp" ? "Club training camp event." : "Club trial event."),
            contact,
            applicants: [],
            poster: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800",
            visibleTo: ["player", "coach"]
          });

          EventFlow.createNotification(
            "player",
            `New ${eventType} announced by ${club.name}`,
            `A new club ${eventType} has been posted at ${location} on ${date}.`
          );

          EventFlow.renderNotifications("club", {
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

  function adjustProfileLink() {
    const profileDropBtn = document.querySelector(".profile-dropbtn");
    const mobileProfileLink = mobileMenu?.querySelector("a[href='#']");

    if (window.innerWidth <= 991) {
      if (profileDropBtn) profileDropBtn.style.display = "none";
      if (mobileProfileLink) mobileProfileLink.style.display = "flex";
    } else {
      if (profileDropBtn) profileDropBtn.style.display = "flex";
      if (mobileProfileLink) mobileProfileLink.style.display = "none";
    }
  }

  window.addEventListener("resize", adjustProfileLink);
  window.addEventListener("load", adjustProfileLink);
});
