document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  // Tab switching
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

  const applicantsModal = document.getElementById("applicantsModal");
  const progressModal = document.getElementById("progressModal");
  const resultsModal = document.getElementById("resultsModal");
  let activeEventId = null;
  const assocName = window.EventFlow
    ? window.EventFlow.getCurrentUserName()
    : "School Games Federation Of India";

  function renderAll() {
    if (!window.EventFlow) return;
    const events = EventFlow.getEvents();

    // 1. Render Association Events
    const eventsContainer = document.querySelector("#events .event-grid");
    if (eventsContainer) {
      eventsContainer.innerHTML = "";
      const assocEvents = events.filter(
        (e) => (e.type === "association_event" || e.eventType === "association") && e.createdBy === assocName,
      );
      if (assocEvents.length === 0) {
        eventsContainer.innerHTML =
          '<div class="event-card"><h3>No Events</h3><p>No events registered.</p></div>';
      } else {
        assocEvents.forEach((e) => {
          const card = document.createElement("div");
          card.className = "event-card";

          let btnHtml = "";
          if (e.status === "Completed") {
            btnHtml = `<button class="view-btn open-results" style="background: linear-gradient(135deg, #22c55e, #4caf50);">View Details</button>`;
          } else if (e.status === "Live") {
            btnHtml = `<button class="view-btn open-progress" style="background: linear-gradient(135deg, #22c55e, #4caf50);">View Progress</button>`;
          } else {
            btnHtml = `<button class="view-btn open-applicants" data-event-id="${e.id}" style="background: linear-gradient(135deg, #22c55e, #4caf50);">View Applications</button>`;
          }

          const posterHtml = e.poster
            ? `
            <div class="event-poster-container" style="cursor: zoom-in; margin: -20px -20px 15px -20px; border-radius: 18px 18px 0 0; overflow: hidden; height: 180px; background: #020617; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #1e293b; width: calc(100% + 40px);">
              <img src="${e.poster}" alt="Event Poster" class="view-poster-trigger" data-poster-url="${e.poster}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="display: flex; gap: 15px; margin-bottom: 12px; align-items: center;">
              <button class="view-poster-btn" data-poster-url="${e.poster}" style="background: transparent; border: none; color: #22c55e; font-size: 13px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 0;"><i class="bi bi-eye"></i> View Poster</button>
              <a href="${e.poster}" download="${e.title.replace(/\s+/g, "_")}_poster.png" class="download-poster-btn" style="display: inline-flex; align-items: center; gap: 6px; color: #22c55e; font-size: 13px; font-weight: 600; text-decoration: none;"><i class="bi bi-download"></i> Download Poster</a>
            </div>
          `
            : "";

          card.innerHTML = `
            ${posterHtml}
            <h3>${e.title}</h3>
            <span class="status ${e.status.toLowerCase()}">${e.status}</span>
            <p class="event-meta">📍 ${e.location || e.venue} • 📅 ${e.date}</p>
            <p>Progress: ${e.status === "Completed" ? "Finished" : e.status === "Live" ? "Ongoing" : "Not Started"}</p>
            ${btnHtml}
          `;
          eventsContainer.appendChild(card);
        });
      }
    }

    // 2. Render Tournaments
    const tournContainer = document.querySelector("#tournaments .event-grid");
    if (tournContainer) {
      tournContainer.innerHTML = "";
      const tournaments = events.filter(
        (e) => (e.type === "tournament" || e.eventType === "tournament") && e.createdBy === assocName,
      );
      if (tournaments.length === 0) {
        tournContainer.innerHTML =
          '<div class="event-card"><h3>No Tournaments</h3><p>No tournaments registered.</p></div>';
      } else {
        tournaments.forEach((e) => {
          const card = document.createElement("div");
          card.className = "event-card";

          let btnHtml = "";
          if (e.status === "Completed") {
            btnHtml = `<button class="view-btn open-results" style="background: linear-gradient(135deg, #22c55e, #4caf50);">View Details</button>`;
          } else if (e.status === "Live") {
            btnHtml = `<button class="view-btn open-progress" style="background: linear-gradient(135deg, #22c55e, #4caf50);">View Progress</button>`;
          } else {
            btnHtml = `<button class="view-btn open-applicants" data-event-id="${e.id}" style="background: linear-gradient(135deg, #22c55e, #4caf50);">View Applications</button>`;
          }

          const posterHtml = e.poster
            ? `
            <div class="event-poster-container" style="cursor: zoom-in; margin: -20px -20px 15px -20px; border-radius: 18px 18px 0 0; overflow: hidden; height: 180px; background: #020617; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #1e293b; width: calc(100% + 40px);">
              <img src="${e.poster}" alt="Event Poster" class="view-poster-trigger" data-poster-url="${e.poster}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="display: flex; gap: 15px; margin-bottom: 12px; align-items: center;">
              <button class="view-poster-btn" data-poster-url="${e.poster}" style="background: transparent; border: none; color: #22c55e; font-size: 13px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 0;"><i class="bi bi-eye"></i> View Poster</button>
              <a href="${e.poster}" download="${e.title.replace(/\s+/g, "_")}_poster.png" class="download-poster-btn" style="display: inline-flex; align-items: center; gap: 6px; color: #22c55e; font-size: 13px; font-weight: 600; text-decoration: none;"><i class="bi bi-download"></i> Download Poster</a>
            </div>
          `
            : "";

          card.innerHTML = `
            ${posterHtml}
            <h3>${e.title}</h3>
            <span class="status ${e.status.toLowerCase()}">${e.status}</span>
            <p class="event-meta">📍 ${e.location || e.venue} • 📅 ${e.date}</p>
            <p>Progress: ${e.status === "Completed" ? "Finished" : e.status === "Live" ? "Ongoing" : "Not Started"}</p>
            ${btnHtml}
          `;
          tournContainer.appendChild(card);
        });
      }
    }

    // Bind modal opening events dynamically
    document.querySelectorAll(".open-applicants").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        activeEventId = e.target.dataset.eventId;
        renderApplicants(activeEventId);
        applicantsModal.style.display = "flex";
      });
    });

    document.querySelectorAll(".open-progress").forEach((btn) => {
      btn.addEventListener("click", () => {
        progressModal.style.display = "flex";
      });
    });

    document.querySelectorAll(".open-results").forEach((btn) => {
      btn.addEventListener("click", () => {
        resultsModal.style.display = "flex";
      });
    });
  }

  // Render applicants in modal
  function renderApplicants(eventId) {
    const list = document.querySelector(".players-list");
    if (!list) return;

    const events = EventFlow.getEvents();
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    const applicants = event.applicants || [];
    list.innerHTML = "";

    if (applicants.length === 0) {
      list.innerHTML =
        '<p style="color: #cbd5f5; text-align: center; padding: 20px;">No applications for this event yet.</p>';
      return;
    }

    applicants.forEach((app) => {
      const card = document.createElement("div");
      card.className = "applicant-card";

      let statusHtml = "";
      if (app.status === "Approved") {
        statusHtml = `<span class="approval-status approved">Approved</span>`;
      } else if (app.status === "Rejected") {
        statusHtml = `<span class="approval-status rejected" style="background:#ef4444;color:white;padding:4px 10px;border-radius:12px;font-size:12px;">Rejected</span>`;
      } else {
        statusHtml = `
          <div class="action-icons">
            <i class="bi bi-check-circle approve" data-player-id="${app.playerId}" style="cursor:pointer;color:#22c55e;font-size:1.4rem;margin-right:10px;"></i>
            <i class="bi bi-x-circle reject" data-player-id="${app.playerId}" style="cursor:pointer;color:#ef4444;font-size:1.4rem;"></i>
          </div>
        `;
      }

      const profileUrl = `./organization-other-profile.html?id=${app.playerId || app.id}`;

      card.innerHTML = `
        <a href="${profileUrl}" target="_blank" style="display:flex; align-items:center; text-decoration:none; color:inherit; flex:1;">
          <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=22c55e&color=020617" style="margin-right:15px; width:50px; height:50px; border-radius:50%;" />
          <div class="applicant-info">
            <h4 style="margin:0; font-size:16px; color:#fff;">${app.name}</h4>
            <p style="margin:4px 0 0; font-size:13px; color:#94a3b8;">Position: ${app.position}</p>
          </div>
        </a>
        ${statusHtml}
      `;
      list.appendChild(card);
    });

    // Bind approve/reject inside modal
    list.querySelectorAll(".approve").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const playerId = btn.dataset.playerId;
        EventFlow.approveApplication(eventId, playerId);
        renderApplicants(eventId);
        renderAll();
      });
    });

    list.querySelectorAll(".reject").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const playerId = btn.dataset.playerId;
        const evs = EventFlow.getEvents();
        const ev = evs.find((item) => item.id === eventId);
        if (ev) {
          const app = ev.applicants.find((a) => a.playerId === playerId);
          if (app) app.status = "Rejected";
          EventFlow.saveEvents(evs);
        }
        renderApplicants(eventId);
        renderAll();
      });
    });
  }

  // Close modals
  document
    .querySelectorAll(".close-applicants, .close-progress, .close-results")
    .forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.target.closest(".applications-modal").style.display = "none";
      });
    });

  [applicantsModal, progressModal, resultsModal].forEach((modal) => {
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
      });
    }
  });

  // Mobile menu toggle
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
        let mappedType = "association_event";
        let visibleTo = ["player", "coach"];
        if (type === "tournament") {
          mappedType = "tournament";
          visibleTo = ["club"];
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
          createdBy: assocName,
          visibleTo,
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

  // Load and render
  if (window.EventFlow) {
    EventFlow.renderNotifications("organization", {
      dropdownSelector: ".notification-dropdown",
      triggerSelector: ".notify-btn",
    });
  }
  renderAll();
});
