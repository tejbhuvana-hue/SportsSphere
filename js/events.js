document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const sections = document.querySelectorAll(".events-section");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      sections.forEach((sec) => sec.classList.remove("show"));

      btn.classList.add("active");
      const targetSec = document.getElementById(btn.dataset.target);
      if (targetSec) targetSec.classList.add("show");
    });
  });

  const applyModal = document.getElementById("applyModal");
  const applyOverlay = document.getElementById("applyOverlay");
  const closeApply = document.getElementById("closeApply");
  let selectedEventIdForApplication = null;

  // Render events lists dynamically
  function renderAll() {
    if (!window.EventFlow) return;
    const events = EventFlow.getEvents();
    const matches = EventFlow.getMatches();

    const playerId = window.EventFlow
      ? window.EventFlow.getCurrentUserId()
      : "P001"; // Dynamic logged-in player ID
    const playersList = window.EventFlow ? window.EventFlow.getPlayers() : [];
    const playerObj = playersList.find((p) => p.id === playerId) || {};
    const playerClub = playerObj.club || null;

    // 1. Club Tournaments Tab (Shows Club Trials and Club Camps visible to player)
    const clubContainer = document.querySelector("#clubEvents .clubs");
    if (clubContainer) {
      const clubEvents = events.filter((e) => {
        if (e.status === "Completed") return false;

        const isClubEvent = e.type === "club_event" || e.eventType === "camp";
        const isTrial = e.type === "club_trial" || e.eventType === "trial";

        if (isClubEvent) {
          // ONLY players already belonging to that club can view/apply.
          return playerClub && e.createdBy === playerClub;
        }
        if (isTrial) {
          // All players can view/apply.
          return true;
        }
        return false;
      });

      clubContainer.innerHTML = "";
      if (clubEvents.length === 0) {
        clubContainer.innerHTML = `<div class="club-card"><h2>No Club Programs</h2><div class="club-info">No active club trials or camps found.</div></div>`;
      } else {
        clubEvents.forEach((event) => {
          const isApplied = event.applicants?.some(
            (a) => a.playerId === playerId,
          );
          const isClubEvent =
            event.type === "club_event" || event.eventType === "camp";

          let applyBtnText = "Apply Now";
          let applyBtnDisabled = "";

          if (isClubEvent) {
            applyBtnText = isApplied ? "Joined" : "Join Event";
            applyBtnDisabled = isApplied
              ? 'disabled style="opacity: 0.6; pointer-events: none;"'
              : "";
          } else {
            // It's a trial
            const isOwnClub = playerClub && event.createdBy === playerClub;
            if (isOwnClub) {
              applyBtnText = "Already a Member";
              applyBtnDisabled =
                'disabled style="opacity: 0.6; pointer-events: none; background: #1e293b; color: #94a3b8;"';
            } else {
              applyBtnText = isApplied ? "Applied" : "Apply Now";
              applyBtnDisabled = isApplied
                ? 'disabled style="opacity: 0.6; pointer-events: none;"'
                : "";
            }
          }

          const posterHtml = event.poster
            ? `
            <div class="event-poster-container" style="cursor: zoom-in; margin: -16px -16px 15px -16px; border-radius: 16px 16px 0 0; overflow: hidden; height: 180px; background: #020617; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #1e293b; width: calc(100% + 32px);">
              <img src="${event.poster}" alt="Event Poster" class="view-poster-trigger" data-poster-url="${event.poster}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="display: flex; gap: 15px; margin-bottom: 12px; align-items: center;">
              <button class="view-poster-btn" data-poster-url="${event.poster}" style="background: transparent; border: none; color: #38bdf8; font-size: 13px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 0;"><i class="bi bi-eye"></i> View Poster</button>
              <a href="${event.poster}" download="${event.title.replace(/\s+/g, "_")}_poster.png" class="download-poster-btn" style="display: inline-flex; align-items: center; gap: 6px; color: #38bdf8; font-size: 13px; font-weight: 600; text-decoration: none;"><i class="bi bi-download"></i> Download Poster</a>
            </div>
          `
            : "";

          const card = document.createElement("div");
          card.className = "club-card";
          card.innerHTML = `
            ${posterHtml}
            <h2>${event.title}</h2>
            <div class="club-info"><strong>Club:</strong> ${event.createdBy}</div>
            <div class="club-info"><strong>Sport:</strong> ${event.category || "Football"}</div>
            <div class="club-info"><strong>Type:</strong> ${isClubEvent ? "Internal Club Event" : "Open Selection Trial"}</div>
            <div class="club-info"><strong>Date:</strong> ${event.date}</div>
            <div class="club-info"><strong>Location:</strong> ${event.location || event.venue}</div>
            <div class="club-info"><strong>Details:</strong> ${event.description}</div>
            <button class="play-btn" data-event-id="${event.id}" ${applyBtnDisabled}>${applyBtnText}</button>
          `;
          clubContainer.appendChild(card);
        });
      }
    }

    // 2. Association Events Tab
    const assocContainer = document.querySelector("#associationEvents .clubs");
    if (assocContainer) {
      const assocEvents = events.filter(
        (e) =>
          (e.type === "association_event" || e.eventType === "association") &&
          e.status !== "Completed" &&
          e.visibleTo &&
          e.visibleTo.includes("player"),
      );
      assocContainer.innerHTML = "";
      if (assocEvents.length === 0) {
        assocContainer.innerHTML = `<div class="club-card"><h2>No Association Events</h2><div class="club-info">No active association events found.</div></div>`;
      } else {
        assocEvents.forEach((event) => {
          const isApplied = event.applicants?.some(
            (a) => a.playerId === playerId,
          );
          const applyBtnText = isApplied ? "Applied" : "Apply Now";
          const applyBtnDisabled = isApplied
            ? 'disabled style="opacity: 0.6; pointer-events: none;"'
            : "";

          const posterHtml = event.poster
            ? `
            <div class="event-poster-container" style="cursor: zoom-in; margin: -16px -16px 15px -16px; border-radius: 16px 16px 0 0; overflow: hidden; height: 180px; background: #020617; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #1e293b; width: calc(100% + 32px);">
              <img src="${event.poster}" alt="Event Poster" class="view-poster-trigger" data-poster-url="${event.poster}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="display: flex; gap: 15px; margin-bottom: 12px; align-items: center;">
              <button class="view-poster-btn" data-poster-url="${event.poster}" style="background: transparent; border: none; color: #38bdf8; font-size: 13px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 0;"><i class="bi bi-eye"></i> View Poster</button>
              <a href="${event.poster}" download="${event.title.replace(/\s+/g, "_")}_poster.png" class="download-poster-btn" style="display: inline-flex; align-items: center; gap: 6px; color: #38bdf8; font-size: 13px; font-weight: 600; text-decoration: none;"><i class="bi bi-download"></i> Download Poster</a>
            </div>
          `
            : "";

          const card = document.createElement("div");
          card.className = "club-card";
          card.innerHTML = `
            ${posterHtml}
            <h2>${event.title}</h2>
            <div class="club-info"><strong>Sport:</strong> ${event.category || "Football"}</div>
            <div class="club-info"><strong>Date:</strong> ${event.date}</div>
            <div class="club-info"><strong>Location:</strong> ${event.location || event.venue}</div>
            <div class="club-info"><strong>Details:</strong> ${event.description}</div>
            <button class="play-btn" data-event-id="${event.id}" ${applyBtnDisabled}>${applyBtnText}</button>
          `;
          assocContainer.appendChild(card);
        });
      }
    }

    // Get events player is approved/selected in
    const selectedEvents = events.filter((e) =>
      e.applicants?.some(
        (a) => a.playerId === playerId && a.status === "Approved",
      ),
    );
    const selectedEventIds = selectedEvents.map((e) => e.id);

    // 3. Current/Ongoing Events Tab (with Next Upcoming Match)
    const currentContainer = document.querySelector("#currentEvents .clubs");
    if (currentContainer) {
      currentContainer.innerHTML = "";

      // Calculate Next Upcoming Match (nearest upcoming match in the player's selected events)
      const upcomingMatches = matches.filter(
        (m) =>
          selectedEventIds.includes(m.eventId) &&
          (m.status === "Upcoming" || m.status === "Live"),
      );
      upcomingMatches.sort(
        (a, b) =>
          new Date(a.date + "T" + (a.time || "00:00")) -
          new Date(b.date + "T" + (b.time || "00:00")),
      );

      if (upcomingMatches.length > 0) {
        const nextMatch = upcomingMatches[0];
        const nextMatchCard = document.createElement("div");
        nextMatchCard.style.cssText =
          "grid-column: 1/-1; background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: #020617; padding: 25px; border-radius: 16px; margin-bottom: 25px; position: relative; box-shadow: 0 10px 25px rgba(56,189,248,0.4);";
        nextMatchCard.innerHTML = `
          <span style="position: absolute; top: 15px; right: 15px; background: #020617; color: #38bdf8; border: 1px solid #38bdf8; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 700; text-transform: uppercase;">NEXT MATCH</span>
          <h2 style="color: #020617; font-size: 24px; margin-bottom: 15px; font-weight: 800;">${nextMatch.teamA} vs ${nextMatch.teamB}</h2>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 15px;">
            <div><strong>Date:</strong> ${nextMatch.date}</div>
            <div><strong>Time:</strong> ${nextMatch.time || "TBD"}</div>
            <div><strong>Venue:</strong> ${nextMatch.venue}</div>
            <div><strong>Event Type:</strong> ${nextMatch.type}</div>
            <div><strong>Assigned Coach:</strong> ${nextMatch.assignedCoach || "Mike Ross"}</div>
          </div>
        `;
        currentContainer.appendChild(nextMatchCard);
      }

      // Render Selected/Approved events sorted by nearest date first (latest timestamp)
      if (selectedEvents.length === 0) {
        const emptyCard = document.createElement("div");
        emptyCard.className = "club-card";
        emptyCard.innerHTML = `<h2>No Selected Events</h2><div class="club-info">You are not selected in any event yet. Apply to events to get selected.</div>`;
        currentContainer.appendChild(emptyCard);
      } else {
        selectedEvents.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
        );
        selectedEvents.forEach((event) => {
          // Lookup match details for this event
          const eventMatches = matches.filter((m) => m.eventId === event.id);
          const firstMatch = eventMatches[0] || {};
          const opponent = firstMatch.teamB
            ? firstMatch.teamA === "GK Academy"
              ? firstMatch.teamB
              : firstMatch.teamA
            : "TBD";
          const time = firstMatch.time || "TBD";
          const coach = firstMatch.assignedCoach || "Mike Ross";
          const status = event.status || "Upcoming";

          const posterHtml = event.poster
            ? `
            <div class="event-poster-container" style="cursor: zoom-in; margin: -16px -16px 15px -16px; border-radius: 16px 16px 0 0; overflow: hidden; height: 180px; background: #020617; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #1e293b; width: calc(100% + 32px);">
              <img src="${event.poster}" alt="Event Poster" class="view-poster-trigger" data-poster-url="${event.poster}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="display: flex; gap: 15px; margin-bottom: 12px; align-items: center;">
              <button class="view-poster-btn" data-poster-url="${event.poster}" style="background: transparent; border: none; color: #38bdf8; font-size: 13px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 0;"><i class="bi bi-eye"></i> View Poster</button>
              <a href="${event.poster}" download="${event.title.replace(/\s+/g, "_")}_poster.png" class="download-poster-btn" style="display: inline-flex; align-items: center; gap: 6px; color: #38bdf8; font-size: 13px; font-weight: 600; text-decoration: none;"><i class="bi bi-download"></i> Download Poster</a>
            </div>
          `
            : "";

          const card = document.createElement("div");
          card.className = "club-card";
          card.innerHTML = `
            ${posterHtml}
            <h2>${event.title}</h2>
            <div class="club-info"><strong>Opponent/Team:</strong> ${opponent}</div>
            <div class="club-info"><strong>Venue:</strong> ${event.location}</div>
            <div class="club-info"><strong>Date:</strong> ${event.date}</div>
            <div class="club-info"><strong>Time:</strong> ${time}</div>
            <div class="club-info"><strong>Coach:</strong> ${coach}</div>
            <div class="club-info"><strong>Status:</strong> <span class="status-badge status-${status.toLowerCase()}" style="padding:4px 8px;border-radius:6px;font-size:11px;font-weight:700;background:rgba(56,189,248,0.2);color:#38bdf8;">${status}</span></div>
          `;
          currentContainer.appendChild(card);
        });
      }
    }

    // 4. Match Schedule Tab
    const scheduleContainer = document.querySelector("#matchSchedule .clubs");
    if (scheduleContainer) {
      scheduleContainer.innerHTML = "";
      const playerMatches = matches.filter(
        (m) =>
          (selectedEventIds.includes(m.eventId) ||
            (playerClub &&
              (m.teamA === playerClub || m.teamB === playerClub))) &&
          m.status !== "Completed",
      );
      if (playerMatches.length === 0) {
        scheduleContainer.innerHTML = `<div class="club-card"><h2>No Match Schedule</h2><div class="club-info">No upcoming matches scheduled.</div></div>`;
      } else {
        playerMatches.forEach((match) => {
          const card = document.createElement("div");
          card.className = "club-card";
          card.innerHTML = `
            <h2>${match.teamA} vs ${match.teamB}</h2>
            <div class="club-info"><strong>Event:</strong> ${match.eventTitle}</div>
            <div class="club-info"><strong>Status:</strong> ${match.status}</div>
            <div class="club-info"><strong>Score:</strong> ${match.score}</div>
            <div class="club-info"><strong>Venue:</strong> ${match.venue}</div>
            <div class="club-info"><strong>Date/Time:</strong> ${match.date} ${match.time || "TBD"}</div>
            <div class="club-info"><strong>Coach:</strong> ${match.assignedCoach || "Mike Ross"}</div>
          `;
          scheduleContainer.appendChild(card);
        });
      }
    }

    // 5. Past Match Results Tab
    const pastContainer = document.querySelector("#pastMatches .clubs");
    if (pastContainer) {
      pastContainer.innerHTML = "";
      const playerPastMatches = matches.filter(
        (m) =>
          (selectedEventIds.includes(m.eventId) ||
            (playerClub &&
              (m.teamA === playerClub || m.teamB === playerClub))) &&
          m.status === "Completed",
      );
      if (playerPastMatches.length === 0) {
        pastContainer.innerHTML = `<div class="club-card"><h2>No Past Matches</h2><div class="club-info">No completed match results found.</div></div>`;
      } else {
        playerPastMatches.forEach((match) => {
          const card = document.createElement("div");
          card.className = "club-card";
          card.innerHTML = `
            <h2>${match.teamA} vs ${match.teamB}</h2>
            <div class="club-info"><strong>Event:</strong> ${match.eventTitle}</div>
            <div class="club-info"><strong>Score/Result:</strong> ${match.score} (${match.winner === "Draw Match" ? "Draw" : match.winner + " Won"})</div>
            <div class="club-info"><strong>Statistics:</strong> ${match.stats || "N/A"}</div>
            <div class="club-info"><strong>Completion Date:</strong> ${match.completionDate || match.date}</div>
          `;
          pastContainer.appendChild(card);
        });
      }
    }

    // Bind event click to open apply modal
    document.querySelectorAll(".play-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        selectedEventIdForApplication = e.target.dataset.eventId;
        applyModal.classList.add("show");
        applyOverlay.classList.add("show");
      });
    });
  }

  // Bind close buttons
  if (closeApply) {
    closeApply.addEventListener("click", () => {
      applyModal.classList.remove("show");
      applyOverlay.classList.remove("show");
    });
  }

  if (applyOverlay) {
    applyOverlay.addEventListener("click", () => {
      applyModal.classList.remove("show");
      applyOverlay.classList.remove("show");
    });
  }

  // Handle Apply Form submission
  const applyForm = document.querySelector(".apply-form");
  if (applyForm) {
    applyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = applyForm.querySelectorAll("input");
      const name = inputs[0].value;
      const position = inputs[1].value;

      if (selectedEventIdForApplication && window.EventFlow) {
        EventFlow.applyToEvent(
          selectedEventIdForApplication,
          name,
          position,
          "cert.pdf",
        );
        applyModal.classList.remove("show");
        applyOverlay.classList.remove("show");
        renderAll();
      }
    });
  }

  // Load state and render everything
  renderAll();

  // Render notifications dropdown
  if (window.EventFlow) {
    EventFlow.renderNotifications("player", {
      dropdownSelector: "#notificationDropdown",
      triggerSelector: ".notify-only",
    });
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("show");
    });
  }

  // Notifications dropdown display
  const notifyBtn = document.querySelector(".notify-only");
  const notificationDropdown = document.getElementById("notificationDropdown");
  const overlay = document.getElementById("overlay");

  if (notifyBtn && notificationDropdown && overlay) {
    notifyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      notificationDropdown.classList.toggle("show");
      overlay.classList.toggle("show");
    });

    overlay.addEventListener("click", () => {
      notificationDropdown.classList.remove("show");
      overlay.classList.remove("show");
    });
  }
});
