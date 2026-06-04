document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  // Avoid tab-btn clicks executing if they are the Add Event button
  tabButtons.forEach((btn) => {
    if (btn.id === "addEventBtn") return;
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      btn.classList.add("active");
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add("active");
    });
  });

  const clubName = window.EventFlow
    ? window.EventFlow.getCurrentUserName()
    : "Manchester United FC";
  let selectedEventIdForApplication = null;

  function renderAll() {
    if (!window.EventFlow) return;
    const events = EventFlow.getEvents();

    // 1. Tournaments
    const tournContainer = document.querySelector("#tournaments .event-grid");
    if (tournContainer) {
      tournContainer.innerHTML = "";
      const tournaments = events.filter(
        (e) => e.type === "tournament" || e.eventType === "tournament",
      );
      if (tournaments.length === 0) {
        tournContainer.innerHTML =
          '<div class="event-card"><h3>No Tournaments</h3><p>No tournaments scheduled.</p></div>';
      } else {
        tournaments.forEach((e) => {
          const applicant = e.applicants?.find(
            (a) =>
              a.name === clubName ||
              a.playerId === clubName ||
              a.clubId === clubName,
          );
          let btnText = "Apply Now";
          let btnStyle =
            "background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: #020617; border: none;";
          let btnAttr = `data-event-id="${e.id}" class="apply-tourn-btn"`;
          if (applicant) {
            btnText =
              applicant.status === "Approved"
                ? "Approved"
                : "Applied (Pending)";
            btnStyle =
              "opacity: 0.6; pointer-events: none; background: #1e293b; color: #cbd5f5; border: 1px solid #334155;";
            btnAttr = "";
          }

          const posterHtml = e.poster
            ? `
            <div class="event-poster-container" style="cursor: zoom-in; margin: -20px -20px 15px -20px; border-radius: 18px 18px 0 0; overflow: hidden; height: 180px; background: #020617; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #1e293b; width: calc(100% + 40px);">
              <img src="${e.poster}" alt="Event Poster" class="view-poster-trigger" data-poster-url="${e.poster}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="display: flex; gap: 15px; margin-bottom: 12px; align-items: center;">
              <button class="view-poster-btn" data-poster-url="${e.poster}" style="background: transparent; border: none; color: #38bdf8; font-size: 13px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 0;"><i class="bi bi-eye"></i> View Poster</button>
              <a href="${e.poster}" download="${e.title.replace(/\s+/g, "_")}_poster.png" class="download-poster-btn" style="display: inline-flex; align-items: center; gap: 6px; color: #38bdf8; font-size: 13px; font-weight: 600; text-decoration: none;"><i class="bi bi-download"></i> Download Poster</a>
            </div>
          `
            : "";

          const card = document.createElement("div");
          card.className = "event-card";
          card.innerHTML = `
            ${posterHtml}
            <h3>${e.title}</h3>
            <p class="event-meta">📍 ${e.location || e.venue} • 📅 ${e.date}</p>
            <p>Category: ${e.category || "Football"}</p>
            <p>${e.description}</p>
            <button ${btnAttr} style="${btnStyle} padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; display: inline-block; margin-top: 10px;">${btnText}</button>
          `;
          tournContainer.appendChild(card);
        });
      }
    }

    // 2. Trials
    const trialsContainer = document.querySelector("#trials .event-grid");
    if (trialsContainer) {
      trialsContainer.innerHTML = "";
      const trials = events.filter(
        (e) =>
          (e.type === "club_trial" || e.eventType === "trial") &&
          e.createdBy === clubName,
      );
      if (trials.length === 0) {
        trialsContainer.innerHTML =
          '<div class="event-card"><h3>No Trials</h3><p>No trials scheduled.</p></div>';
      } else {
        trials.forEach((e) => {
          const posterHtml = e.poster
            ? `
            <div class="event-poster-container" style="cursor: zoom-in; margin: -20px -20px 15px -20px; border-radius: 18px 18px 0 0; overflow: hidden; height: 180px; background: #020617; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #1e293b; width: calc(100% + 40px);">
              <img src="${e.poster}" alt="Event Poster" class="view-poster-trigger" data-poster-url="${e.poster}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="display: flex; gap: 15px; margin-bottom: 12px; align-items: center;">
              <button class="view-poster-btn" data-poster-url="${e.poster}" style="background: transparent; border: none; color: #38bdf8; font-size: 13px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 0;"><i class="bi bi-eye"></i> View Poster</button>
              <a href="${e.poster}" download="${e.title.replace(/\s+/g, "_")}_poster.png" class="download-poster-btn" style="display: inline-flex; align-items: center; gap: 6px; color: #38bdf8; font-size: 13px; font-weight: 600; text-decoration: none;"><i class="bi bi-download"></i> Download Poster</a>
            </div>
          `
            : "";

          const card = document.createElement("div");
          card.className = "event-card";
          card.innerHTML = `
            ${posterHtml}
            <h3>${e.title}</h3>
            <span class="status ${e.status === "Live" ? "ongoing" : "upcoming"}">${e.status}</span>
            <p class="event-meta">📅 ${e.date}</p>
            <p>${e.description}</p>
            <a href="./players.html?eventId=${e.id}" class="view-btn" target="_blank">View Applications</a>
          `;
          trialsContainer.appendChild(card);
        });
      }
    }

    // 3. Camps
    const campsContainer = document.querySelector("#camps .event-grid");
    if (campsContainer) {
      campsContainer.innerHTML = "";
      const camps = events.filter(
        (e) =>
          (e.type === "club_event" || e.eventType === "camp") &&
          e.createdBy === clubName,
      );
      if (camps.length === 0) {
        campsContainer.innerHTML =
          '<div class="event-card"><h3>No Camps</h3><p>No camps scheduled.</p></div>';
      } else {
        camps.forEach((e) => {
          const posterHtml = e.poster
            ? `
            <div class="event-poster-container" style="cursor: zoom-in; margin: -20px -20px 15px -20px; border-radius: 18px 18px 0 0; overflow: hidden; height: 180px; background: #020617; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #1e293b; width: calc(100% + 40px);">
              <img src="${e.poster}" alt="Event Poster" class="view-poster-trigger" data-poster-url="${e.poster}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="display: flex; gap: 15px; margin-bottom: 12px; align-items: center;">
              <button class="view-poster-btn" data-poster-url="${e.poster}" style="background: transparent; border: none; color: #38bdf8; font-size: 13px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 0;"><i class="bi bi-eye"></i> View Poster</button>
              <a href="${e.poster}" download="${e.title.replace(/\s+/g, "_")}_poster.png" class="download-poster-btn" style="display: inline-flex; align-items: center; gap: 6px; color: #38bdf8; font-size: 13px; font-weight: 600; text-decoration: none;"><i class="bi bi-download"></i> Download Poster</a>
            </div>
          `
            : "";

          const card = document.createElement("div");
          card.className = "event-card";
          card.innerHTML = `
            ${posterHtml}
            <h3>${e.title}</h3>
            <span class="status ${e.status === "Live" ? "ongoing" : "upcoming"}">${e.status}</span>
            <p class="event-meta">📅 ${e.date}</p>
            <p>${e.description}</p>
            <a href="./players.html?eventId=${e.id}" class="view-btn" target="_blank">View Members Joined</a>
          `;
          campsContainer.appendChild(card);
        });
      }
    }
  }

  // Initial Load and render
  if (window.EventFlow) {
    EventFlow.renderNotifications("club", {
      dropdownSelector: ".notification-dropdown",
      triggerSelector: ".notify-btn",
    });
  }
  renderAll();

  // Mobile navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.style.display =
        mobileMenu.style.display === "block" ? "none" : "block";
    });
  }

  // ==========================================
  // ADD EVENT MODAL LOGIC
  // ==========================================
  const addEventBtn = document.getElementById("addEventBtn");
  const addEventModal = document.getElementById("addEventModal");
  const closeAddEvent = document.getElementById("closeAddEvent");
  const addEventForm = document.getElementById("addEventForm");

  if (addEventBtn && addEventModal && closeAddEvent) {
    addEventBtn.addEventListener("click", () => {
      addEventModal.style.display = "flex";
    });

    closeAddEvent.addEventListener("click", () => {
      addEventModal.style.display = "none";
    });

    addEventModal.addEventListener("click", (e) => {
      if (e.target === addEventModal) addEventModal.style.display = "none";
    });
  }

  if (addEventForm) {
    addEventForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!window.EventFlow) return;

      const title = document.getElementById("eventTitle").value;
      const type = document.getElementById("eventType").value;
      const location = document.getElementById("eventLocation").value;
      const date = document.getElementById("eventDate").value;
      const category = document.getElementById("eventCategory").value;
      const description = document.getElementById("eventDescription").value;
      const posterInput = document.getElementById("eventPoster");

      const createEvent = (posterData = "") => {
        // Map "camp" selection to club_event and "trial" to club_trial
        let mappedType = "club_event";
        if (type === "trial") {
          mappedType = "club_trial";
        }

        const newEvent = {
          title,
          type: mappedType,
          eventType: type,
          location,
          venue: location,
          date,
          category,
          description,
          createdBy: clubName,
          visibleTo: ["player", "coach"],
          status: "Upcoming",
          applicants: [],
          poster: posterData,
        };

        EventFlow.addEvent(newEvent);
        addEventModal.style.display = "none";
        addEventForm.reset();
        renderAll();
      };

      if (posterInput && posterInput.files && posterInput.files[0]) {
        const file = posterInput.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
          createEvent(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        createEvent("");
      }
    });
  }

  // ==========================================
  // TOURNAMENT APPLICATION FORM HANDLING
  // ==========================================
  const applyModal = document.getElementById("applyModal");
  const closeApply = document.getElementById("closeApply");

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("apply-tourn-btn")) {
      e.preventDefault();
      selectedEventIdForApplication = e.target.dataset.eventId;
      if (applyModal) {
        // Pre-fill fields if possible
        const currentUser = window.EventFlow
          ? window.EventFlow.getCurrentUser()
          : null;
        const inputs = applyModal.querySelectorAll("input, textarea");
        if (inputs.length >= 6) {
          inputs[0].value = clubName;
          inputs[1].value = currentUser
            ? currentUser.admin || "Club Admin"
            : "Club Admin";
          inputs[2].value = currentUser ? currentUser.email || "" : "";
          inputs[3].value = currentUser ? currentUser.phone || "" : "";
          inputs[4].value = "18";
          inputs[5].value = "Senior";
        }
        applyModal.style.display = "flex";
      }
    }
  });

  if (closeApply && applyModal) {
    closeApply.addEventListener("click", () => {
      applyModal.style.display = "none";
    });
    applyModal.addEventListener("click", (e) => {
      if (e.target === applyModal) applyModal.style.display = "none";
    });
  }

  if (applyModal) {
    const applyForm = applyModal.querySelector("form");
    if (applyForm) {
      applyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (selectedEventIdForApplication && window.EventFlow) {
          window.EventFlow.applyToEvent(
            selectedEventIdForApplication,
            clubName,
            "Club Application",
            "club_cert.pdf",
          );
          applyModal.style.display = "none";
          renderAll();
        }
      });
    }
  }
});
