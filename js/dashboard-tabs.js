/**
 * ==========================================
 * SPORTS SPHERE PLAYER FEED TABS SYSTEM
 * ==========================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- SESSION/VIEWED PLAYER IDENTIFICATION ---
  const urlParams = new URLSearchParams(window.location.search);
  let playerId = urlParams.get("id");
  if (!playerId) {
    playerId = window.EventFlow ? window.EventFlow.getCurrentUserId() : 'P001';
  }

  // --- SEED DEFAULT ACHIEVEMENTS ---
  const defaultAchievements = [
    {
      id: "ach-1",
      playerId: "P001",
      title: "Winner - District Football Tournament",
      organization: "Andhra Sports Association",
      date: "March 2026",
      description: "Secured first place in district-level football tournament.",
      certificate: "../../images/cert_district_winner.png",
      createdAt: "2026-03-20"
    },
    {
      id: "ach-2",
      playerId: "P001",
      title: "Best Midfielder Award",
      organization: "Elite Football Club",
      date: "January 2026",
      description: "Recognized for outstanding midfield performance.",
      certificate: "../../images/cert_best_midfielder.png",
      createdAt: "2026-01-15"
    },
    {
      id: "ach-3",
      playerId: "P001",
      title: "State Level Participation Certificate",
      organization: "State Sports Federation",
      date: "December 2025",
      description: "Successfully participated in state-level championship.",
      certificate: "../../images/cert_state_participation.png",
      createdAt: "2025-12-10"
    },
    {
      id: "ach-4",
      playerId: "P002", // Virat Kohli
      title: "Golden Boot - State Championship",
      organization: "Andhra Sports Association",
      date: "February 2026",
      description: "Secured highest individual goals in the state tournament.",
      certificate: "../../images/cert_district_winner.png",
      createdAt: "2026-02-15"
    },
    {
      id: "ach-5",
      playerId: "P002", // Virat Kohli
      title: "Best Playmaker Trophy",
      organization: "Elite Football Club",
      date: "January 2026",
      description: "Awarded for exceptional playmaking and assists in GK Football Academy.",
      certificate: "../../images/cert_best_midfielder.png",
      createdAt: "2026-01-20"
    },
    {
      id: "ach-6",
      playerId: "P003", // Neymar Jr
      title: "State Level Champion - Under 19",
      organization: "State Sports Federation",
      date: "December 2025",
      description: "Secured first place in under-19 football league.",
      certificate: "../../images/cert_state_participation.png",
      createdAt: "2025-12-10"
    },
    {
      id: "ach-7",
      playerId: "P004", // Kylian Mbappé
      title: "Winner - National Football Cup",
      organization: "Indian Football Federation",
      date: "November 2025",
      description: "Successfully claimed the national football cup trophy.",
      certificate: "../../images/cert_district_winner.png",
      createdAt: "2025-11-05"
    },
    // Coach (coach-mike) achievements
    {
      id: "ach-coach-1",
      playerId: "coach-mike",
      title: "Best Coach of the Year 2025",
      organization: "National Football Association",
      date: "October 2025",
      description: "Honored for outstanding tactical development.",
      certificate: "../../images/cert_district_winner.png",
      createdAt: "2025-10-15"
    },
    {
      id: "ach-coach-2",
      playerId: "coach-mike",
      title: "A-License Coaching Certification",
      organization: "Sports Authority of India",
      date: "December 2025",
      description: "Completed Advanced Tactical Coaching.",
      certificate: "../../images/cert_state_participation.png",
      createdAt: "2025-12-15"
    },
    {
      id: "ach-coach-3",
      playerId: "coach-mike",
      title: "Tactical Innovation Award",
      organization: "Elite Football League",
      date: "January 2026",
      description: "Recognized for creative match play strategies.",
      certificate: "../../images/cert_best_midfielder.png",
      createdAt: "2026-01-10"
    },
    // Club (club-mu) achievements
    {
      id: "ach-club-1",
      playerId: "club-mu",
      title: "Club of the Year Award",
      organization: "School Games Federation Of India",
      date: "August 2025",
      description: "Recognized for youth talent promotion.",
      certificate: "../../images/cert_district_winner.png",
      createdAt: "2025-08-20"
    },
    {
      id: "ach-club-2",
      playerId: "club-mu",
      title: "Grassroots Development Excellence",
      organization: "State Sports Board",
      date: "November 2025",
      description: "Awarded for exceptional local soccer clinics.",
      certificate: "../../images/cert_state_participation.png",
      createdAt: "2025-11-20"
    },
    {
      id: "ach-club-3",
      playerId: "club-mu",
      title: "Champion - Premier Division League",
      organization: "State Club Championship 2025",
      date: "December 2025",
      description: "Winner of the state soccer league tournament.",
      certificate: "../../images/cert_best_midfielder.png",
      createdAt: "2025-12-25"
    },
    // Association (assoc-sgfi) achievements
    {
      id: "ach-assoc-1",
      playerId: "assoc-sgfi",
      title: "National Sports Promotion Award",
      organization: "Ministry of Youth Affairs",
      date: "June 2025",
      description: "Awarded for top-tier sports infrastructure.",
      certificate: "../../images/cert_district_winner.png",
      createdAt: "2025-06-10"
    },
    {
      id: "ach-assoc-2",
      playerId: "assoc-sgfi",
      title: "Excellence in Event Organization",
      organization: "International Games Federation",
      date: "September 2025",
      description: "Awarded for successfully hosting state meets.",
      certificate: "../../images/cert_state_participation.png",
      createdAt: "2025-09-15"
    },
    {
      id: "ach-assoc-3",
      playerId: "assoc-sgfi",
      title: "Highest Talent Identification Trophy",
      organization: "National Sports Committee",
      date: "February 2026",
      description: "Recognized for uncovering regional talents.",
      certificate: "../../images/cert_best_midfielder.png",
      createdAt: "2026-02-18"
    }
  ];

  // Helper functions for reading/writing localStorage JSON data structure
  function getAchievementsFromStorage() {
    if (window.EventFlow && window.EventFlow.getAchievements) {
      return window.EventFlow.getAchievements();
    }
    const stored = localStorage.getItem("sports_achievements");
    if (!stored) {
      localStorage.setItem("sports_achievements", JSON.stringify({ achievements: defaultAchievements }));
      return defaultAchievements;
    }
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      } else if (parsed && Array.isArray(parsed.achievements)) {
        return parsed.achievements;
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  function saveAchievementsToStorage(achievementsArray) {
    if (window.EventFlow && window.EventFlow.saveAchievements) {
      window.EventFlow.saveAchievements(achievementsArray);
      return;
    }
    localStorage.setItem("sports_achievements", JSON.stringify({ achievements: achievementsArray }));
  }

  // Initialize achievements JSON structure if not present
  getAchievementsFromStorage();

  // --- DOM ELEMENTS ---
  const tabButtons = document.querySelectorAll(".feed-tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  
  const achievementsContainer = document.getElementById("achievements-list");
  const galleryContainer = document.getElementById("gallery-list");
  
  // Lightbox
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImg = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const closeLightboxBtn = document.getElementById("closeLightbox");

  // Modal elements
  const openModalBtn = document.getElementById("openAchModalBtn");
  const modalOverlay = document.getElementById("achModalOverlay");
  const modalBox = document.getElementById("achModal");
  const closeModalBtn = document.getElementById("closeAchModal");
  const achForm = document.getElementById("achForm");

  // --- TAB SWITCHING LOGIC ---
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTabId = btn.getAttribute("data-tab");

      // Deactivate all tabs & contents
      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active-content"));

      // Activate selected tab & content
      btn.classList.add("active");
      const targetContent = document.getElementById(targetTabId);
      if (targetContent) {
        targetContent.classList.add("active-content");
      }

      // Context-aware initialization
      if (targetTabId === "achievements-content") {
        renderAchievements();
      } else if (targetTabId === "gallery-content") {
        renderGallery();
      }
    });
  });

  // --- RENDER ACHIEVEMENTS SECTION ---
  function renderAchievements() {
    if (!achievementsContainer) return;
    achievementsContainer.innerHTML = "";

    // Fetch and filter from localStorage JSON database
    const allAchievements = getAchievementsFromStorage();
    const playerAchievements = allAchievements.filter(ach => ach.playerId === playerId);

    if (playerAchievements.length === 0) {
      achievementsContainer.style.display = "block"; // Make empty state span full width
      achievementsContainer.innerHTML = `
        <div class="empty-state">
          <i class="bi bi-patch-check-fill"></i>
          <h3>No achievements added yet</h3>
          <p>Certificates and tournament achievements will appear here.</p>
        </div>
      `;
      return;
    }

    achievementsContainer.style.display = "grid"; // Restore responsive grid
    playerAchievements.forEach(ach => {
      const card = document.createElement("div");
      card.className = "achievement-card";
      card.innerHTML = `
        <div class="achievement-preview" data-img="${ach.certificate}" data-caption="${ach.title} - ${ach.organization}">
          <img src="${ach.certificate}" alt="${ach.title}" loading="lazy" />
        </div>
        <div class="achievement-body">
          <h4 class="achievement-title">${ach.title}</h4>
          <div class="achievement-org">
            <i class="bi bi-building"></i>
            <span>${ach.organization}</span>
          </div>
          <div class="achievement-date">
            <i class="bi bi-calendar-event"></i>
            <span>${ach.date}</span>
          </div>
          <p class="achievement-desc">${ach.description}</p>
        </div>
        <div class="achievement-footer">
          <button class="achievement-btn view-btn" data-img="${ach.certificate}" data-caption="${ach.title} - ${ach.organization} (${ach.date})">
            <i class="bi bi-eye"></i> View
          </button>
          <a href="${ach.certificate}" download="${ach.title.replace(/\s+/g, '_')}.png" class="achievement-btn download-btn">
            <i class="bi bi-download"></i> Download
          </a>
        </div>
      `;
      achievementsContainer.appendChild(card);
    });

    // Add view listeners
    achievementsContainer.querySelectorAll(".view-btn, .achievement-preview").forEach(el => {
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        const img = el.getAttribute("data-img");
        const caption = el.getAttribute("data-caption");
        openLightbox(img, caption);
      });
    });
  }

  // --- RENDER GALLERY SECTION (AUTO SCRAPING FEED) ---
  function renderGallery() {
    if (!galleryContainer) return;
    galleryContainer.innerHTML = "";

    // Dynamic scrape of existing DOM post elements
    const feedPosts = document.querySelectorAll("#feed-content .post");
    const galleryItems = [];
    const seenImages = new Set();

    feedPosts.forEach(post => {
      const postImageEl = post.querySelector(".post-image img");
      if (postImageEl) {
        const imageSrc = postImageEl.getAttribute("src");
        // Skip duplicate images if any
        if (imageSrc && !seenImages.has(imageSrc)) {
          seenImages.add(imageSrc);

          // Scrape details for descriptive modal
          const textEl = post.querySelector(".post-text p");
          const text = textEl ? textEl.textContent.trim() : "";

          const authorImgEl = post.querySelector(".post-header img");
          const authorImg = authorImgEl ? authorImgEl.getAttribute("src") : "";

          const authorNameEl = post.querySelector(".post-header h4");
          const authorName = authorNameEl ? authorNameEl.textContent.trim() : "Player";

          const metaEl = post.querySelector(".post-header p");
          const meta = metaEl ? metaEl.textContent.trim() : "";

          galleryItems.push({
            src: imageSrc,
            text: text,
            authorImg: authorImg,
            authorName: authorName,
            meta: meta
          });
        }
      }
    });

    if (galleryItems.length === 0) {
      galleryContainer.style.display = "block"; // Make empty state span full width
      galleryContainer.innerHTML = `
        <div class="empty-state">
          <i class="bi bi-images"></i>
          <h3>No gallery images uploaded yet</h3>
          <p>Images shared in your home feed will be cataloged here.</p>
        </div>
      `;
      return;
    }

    galleryContainer.style.display = "grid"; // Restore responsive grid
    galleryItems.forEach(item => {
      const card = document.createElement("div");
      card.className = "gallery-card";
      card.setAttribute("data-img", item.src);
      card.setAttribute("data-caption", item.text || `${item.authorName}'s post`);
      card.innerHTML = `
        <div class="gallery-image-wrapper">
          <img src="${item.src}" alt="Gallery post image" loading="lazy" />
        </div>
        <div class="gallery-info">
          <p class="gallery-title">${item.text || "No description provided."}</p>
          <div class="gallery-author">
            ${item.authorImg ? `<img src="${item.authorImg}" alt="${item.authorName}" />` : '<i class="bi bi-person-circle" style="font-size:22px;color:#94a3b8;"></i>'}
            <span>${item.authorName} • ${item.meta}</span>
          </div>
        </div>
      `;
      galleryContainer.appendChild(card);
    });

    // Add click event for modal preview
    galleryContainer.querySelectorAll(".gallery-card").forEach(card => {
      card.addEventListener("click", () => {
        const img = card.getAttribute("data-img");
        const caption = card.getAttribute("data-caption");
        openLightbox(img, caption);
      });
    });
  }

  // --- LIGHTBOX INTERACTIVE VIEWER ---
  function openLightbox(imgUrl, captionText) {
    if (!lightbox || !lightboxImg || !lightboxCaption) return;

    lightboxImg.src = imgUrl;
    lightboxCaption.textContent = captionText || "";

    lightbox.style.display = "flex";
    setTimeout(() => {
      lightbox.classList.add("show");
    }, 10);
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("show");
    setTimeout(() => {
      lightbox.style.display = "none";
      if (lightboxImg) lightboxImg.src = "";
    }, 300);
  }

  if (closeLightboxBtn) closeLightboxBtn.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.classList.contains("lightbox-close")) {
        closeLightbox();
      }
    });
  }

  // --- MODAL HANDLING FOR ADD ACHIEVEMENT ---
  function openAchModal() {
    if (!modalOverlay || !modalBox) return;
    
    // Clear overlay/modal hidden display state
    modalOverlay.style.display = "block";
    modalBox.style.display = "block";
    
    // Trigger transition reflow
    setTimeout(() => {
      modalOverlay.classList.add("show");
      modalBox.classList.add("show");
    }, 10);
  }

  // Safely export helper function to open/close modal if needed
  window.openAchModal = openAchModal;

  function closeAchModal() {
    if (!modalOverlay || !modalBox) return;

    modalOverlay.classList.remove("show");
    modalBox.classList.remove("show");

    setTimeout(() => {
      modalOverlay.style.display = "none";
      modalBox.style.display = "none";
      if (achForm) achForm.reset();
    }, 300);
  }

  if (openModalBtn) openModalBtn.addEventListener("click", openAchModal);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeAchModal);
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeAchModal();
      }
    });
  }

  // ESC to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (lightbox && lightbox.classList.contains("show")) {
        closeLightbox();
      }
      if (modalBox && modalBox.classList.contains("show")) {
        closeAchModal();
      }
    }
  });

  // --- FORM SUBMISSION & PERSISTENCE ---
  if (achForm) {
    achForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("achTitle").value.trim();
      const org = document.getElementById("achOrg").value.trim();
      const date = document.getElementById("achDate").value.trim();
      const desc = document.getElementById("achDesc").value.trim();
      const fileInput = document.getElementById("achCertFile");

      const file = fileInput.files[0];
      if (!file) return;

      const reader = new FileReader();
      
      // Async reader callback
      reader.onloadend = () => {
        const base64String = reader.result;

        // Construct new Achievement object according to schema
        const newAchievement = {
          id: "ach-" + Date.now(),
          playerId: playerId,
          title: title,
          organization: org,
          date: date,
          description: desc,
          certificate: base64String, // Base64 data URI string
          createdAt: new Date().toISOString().split("T")[0]
        };

        // Sync with existing database in localStorage
        const allAchievements = getAchievementsFromStorage();
        allAchievements.push(newAchievement);
        saveAchievementsToStorage(allAchievements);

        // Dynamic visual update
        renderAchievements();
        
        // Close overlay modal & reset
        closeAchModal();
      };

      // Read selected image file as Base64 Data URL
      reader.readAsDataURL(file);
    });
  }
});

