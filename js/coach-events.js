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

  function renderAll() {
    const events = EventFlow.getEvents();
    const matches = EventFlow.getMatches();

    const coachId = EventFlow.getCurrentUserId();
    const coachObj = EventFlow.getCoaches().find((c) => c.id === coachId) || {};
    const coachName = EventFlow.getCurrentUserName();
    const coachConnectTarget = coachObj.connectTarget || "";

    // Find Current Event:
    // 1. Where the coach has applied and their application is approved:
    //    e.applicants?.some(a => a.playerId === coachId && a.status === 'Approved')
    // 2. OR, if the coach is connected to a club/association, and the club/association is approved,
    //    and the event was created by that club/association (e.createdBy === coachConnectTarget).
    // And, in both cases, the event status is NOT 'Completed'.

    // Check if the connected target itself is approved:
    let isTargetApproved = false;
    if (coachConnectTarget) {
      const clubObj = EventFlow.getClubs().find(
        (c) => c.name === coachConnectTarget,
      );
      if (clubObj && clubObj.status === "Approved") {
        isTargetApproved = true;
      } else {
        const assocObj = EventFlow.getAssociations().find(
          (a) => a.name === coachConnectTarget,
        );
        if (assocObj && assocObj.status === "Approved") {
          isTargetApproved = true;
        }
      }
    }

    const currentEvent = events.find((e) => {
      if (e.status === "Completed") return false;

      const isApprovedParticipant = e.applicants?.some(
        (a) => a.playerId === coachId && a.status === "Approved",
      );
      const isCreatedByApprovedTarget =
        isTargetApproved && e.createdBy === coachConnectTarget;

      return isApprovedParticipant || isCreatedByApprovedTarget;
    });

    const currentEventSection = document.getElementById("currentEventSection");
    if (currentEventSection) {
      if (!currentEvent) {
        currentEventSection.innerHTML = `
          <div class="no-active-event-card" style="text-align: center; padding: 40px; background: #020617; border-radius: 12px; border: 1px solid #1e293b; margin: 40px 0;">
            <i class="bi bi-calendar2-x" style="font-size: 3rem; color: #64748b; display: block; margin-bottom: 15px;"></i>
            <h3 style="color: #cbd5f1; margin-bottom: 10px;">No Active Event</h3>
            <p style="color: #64748b; max-width: 400px; margin: 0 auto 20px;">Once a club or association event you are approved for becomes active, you can schedule matches, view reports, and manage the event here.</p>
          </div>
        `;
      } else {
        const posterHtml = currentEvent.poster
          ? `
          <div class="event-poster-container" style="cursor: zoom-in; margin: -25px -25px 15px -25px; border-radius: 12px 12px 0 0; overflow: hidden; height: 180px; background: #020617; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #1e293b; width: calc(100% + 50px);">
            <img src="${currentEvent.poster}" alt="Event Poster" class="view-poster-trigger" data-poster-url="${currentEvent.poster}" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <div style="display: flex; gap: 15px; margin-bottom: 15px; align-items: center;">
            <button class="view-poster-btn" data-poster-url="${currentEvent.poster}" style="background: transparent; border: none; color: #38bdf8; font-size: 13px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 0;"><i class="bi bi-eye"></i> View Poster</button>
            <a href="${currentEvent.poster}" download="${currentEvent.title.replace(/\s+/g, "_")}_poster.png" class="download-poster-btn" style="display: inline-flex; align-items: center; gap: 6px; color: #38bdf8; font-size: 13px; font-weight: 600; text-decoration: none;"><i class="bi bi-download"></i> Download Poster</a>
          </div>
        `
          : "";

        currentEventSection.innerHTML = `
          <div class="current-event-card" style="background: #020617; border-radius: 12px; padding: 25px; border: 1px solid #1e293b; margin: 30px 0; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 15px;">
              <div>
                <span class="status-badge" style="background: rgba(34,197,94,0.15); color: #22c55e; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 700; text-transform: uppercase;">ACTIVE EVENT</span>
                ${posterHtml}
                <h2 style="color: #38bdf8; font-size: 24px; margin-top: 5px; margin-bottom: 5px;">${currentEvent.title}</h2>
                <p style="color: #cbd5f5; font-size: 14px; margin: 0;">📍 ${currentEvent.location || currentEvent.venue || "N/A"} | 📅 ${currentEvent.date}</p>
              </div>
              
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <a href="./update3.html?eventId=${currentEvent.id}" target="_blank" class="event-action-btn" style="background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: #020617; text-decoration: none; padding: 10px 18px; border-radius: 20px; font-weight: 600; font-size: 13px; display: inline-flex; align-items: center; gap: 6px;"><i class="bi bi-calendar-plus"></i> Schedule Match</a>
                
                <button id="updateScoreBtn" class="event-action-btn" style="background: #1e293b; color: #cbd5f1; border: 1px solid #334155; padding: 10px 18px; border-radius: 20px; font-weight: 600; font-size: 13px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;"><i class="bi bi-clock-history"></i> Update Score</button>
                
                <a href="./coach-updates.html?eventId=${currentEvent.id}" target="_blank" class="event-action-btn" style="background: #1e293b; color: #cbd5f1; border: 1px solid #334155; padding: 10px 18px; border-radius: 20px; font-weight: 600; font-size: 13px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;"><i class="bi bi-file-earmark-bar-graph"></i> Match Report</a>
                
                <button id="endEventBtn" class="event-action-btn" style="background: linear-gradient(135deg, #ef4444, #f87171); color: #fff; border: none; padding: 10px 18px; border-radius: 20px; font-weight: 600; font-size: 13px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;"><i class="bi bi-stop-circle"></i> End Event</button>
              </div>
            </div>
            
            <div class="match-tabs-container" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 15px; border-top: 1px solid #1e293b; padding-top: 20px;">
              <div class="match-tabs" style="margin: 0; display: flex; gap: 10px;">
                <button class="match-tab active" data-target="ongoingMatches">Ongoing Matches</button>
                <button class="match-tab" data-target="upcomingMatches">Upcoming Matches</button>
                <button class="match-tab" data-target="completedMatches">Completed Matches</button>
              </div>
            </div>

            <div class="match-section show" id="ongoingMatches">
              <div class="clubs"></div>
            </div>

            <div class="match-section" id="upcomingMatches">
              <div class="clubs"></div>
            </div>

            <div class="match-section" id="completedMatches">
              <div class="clubs"></div>
            </div>
          </div>
        `;

        // Bind tabs dynamically
        const matchTabs = currentEventSection.querySelectorAll(".match-tab");
        const matchSections =
          currentEventSection.querySelectorAll(".match-section");
        matchTabs.forEach((tab) => {
          tab.addEventListener("click", () => {
            matchTabs.forEach((t) => t.classList.remove("active"));
            matchSections.forEach((s) => s.classList.remove("show"));

            tab.classList.add("active");
            const targetS = currentEventSection.querySelector(
              "#" + tab.dataset.target,
            );
            if (targetS) targetS.classList.add("show");
          });
        });

        // Bind End Event button
        const endEventBtn = currentEventSection.querySelector("#endEventBtn");
        if (endEventBtn) {
          endEventBtn.addEventListener("click", () => {
            if (
              confirm(
                `Are you sure you want to end the event "${currentEvent.title}"? This will archive the event for all players, coach, club, and organization.`,
              )
            ) {
              EventFlow.endEvent(currentEvent.id);
              alert("Event successfully completed and archived.");
              location.reload();
            }
          });
        }

        // Bind Update Score button
        const updateScoreBtn =
          currentEventSection.querySelector("#updateScoreBtn");
        if (updateScoreBtn) {
          updateScoreBtn.addEventListener("click", () => {
            const ongoingTab = currentEventSection.querySelector(
              "[data-target='ongoingMatches']",
            );
            if (ongoingTab) ongoingTab.click();
            alert(
              "Please find the live match below and click 'Update Score'. If no match is live, please schedule one first.",
            );
          });
        }
      }
    }

    // 1. Club Events / Tournaments Tab
    const clubContainer = document.querySelector("#clubEvents .clubs");
    if (clubContainer) {
      const clubEvents = events.filter((e) => {
        if (e.status === "Completed") return false;

        const isClubEvent = e.type === "club_event" || e.eventType === "camp";
        const isTrial = e.type === "club_trial" || e.eventType === "trial";

        if (isClubEvent) {
          // ONLY coaches already belonging to that club can view/apply.
          return coachConnectTarget && e.createdBy === coachConnectTarget;
        }
        if (isTrial) {
          // All coaches can view/apply.
          return true;
        }
        return false;
      });

      clubContainer.innerHTML = "";
      if (clubEvents.length === 0) {
        clubContainer.innerHTML = `<div class="club-card"><h2>No Club Programs</h2><div class="club-info">No club events found.</div></div>`;
      } else {
        clubEvents.forEach((event) => {
          const isApplied = event.applicants?.some(
            (a) => a.playerId === coachId,
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
            // Trial
            const isOwnClub =
              coachConnectTarget && event.createdBy === coachConnectTarget;
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
            <div class="club-info"><strong>Type:</strong> ${isClubEvent ? "Internal Club Event" : "Open Recruitment Trial"}</div>
            <div class="club-info"><strong>Date:</strong> ${event.date}</div>
            <div class="club-info"><strong>Location:</strong> ${event.location || event.venue}</div>
            <div class="club-info"><strong>Details:</strong> ${event.description}</div>
            <button class="play-btn" data-event-id="${event.id}" ${applyBtnDisabled} style="padding: 10px 20px; border-radius: 25px; font-weight: 600; cursor: pointer;">${applyBtnText}</button>
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
          e.visibleTo.includes("coach"),
      );
      assocContainer.innerHTML = "";
      if (assocEvents.length === 0) {
        assocContainer.innerHTML = `<div class="club-card"><h2>No Association Events</h2><div class="club-info">No association events found.</div></div>`;
      } else {
        assocEvents.forEach((event) => {
          const isApplied = event.applicants?.some(
            (a) => a.playerId === coachId,
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
            <button class="play-btn" data-event-id="${event.id}" ${applyBtnDisabled} style="padding: 10px 20px; border-radius: 25px; font-weight: 600; cursor: pointer;">${applyBtnText}</button>
          `;
          assocContainer.appendChild(card);
        });
      }
    }

    // 3. Ongoing Matches
    const ongoingContainer = document.querySelector("#ongoingMatches .clubs");
    if (ongoingContainer) {
      ongoingContainer.innerHTML = "";
      const ongoing = currentEvent
        ? matches.filter(
            (m) => m.status === "Live" && m.eventId === currentEvent.id,
          )
        : [];
      if (ongoing.length === 0) {
        ongoingContainer.innerHTML = `<div class="club-card"><h2>No Ongoing Matches</h2><div class="club-info">No live matches currently.</div></div>`;
      } else {
        ongoing.forEach((match) => {
          const card = document.createElement("div");
          card.className = "club-card";
          card.innerHTML = `
            <h2>${match.teamA} vs ${match.teamB}</h2>
            <div class="club-info"><strong>Status:</strong> Live</div>
            <div class="club-info"><strong>Score:</strong> ${match.score}</div>
            <div class="club-info"><strong>Location:</strong> ${match.venue}</div>
            <a href="./update2.html?matchId=${match.id}" class="report-btn">Update Score</a>
          `;
          ongoingContainer.appendChild(card);
        });
      }
    }

    // 4. Upcoming Matches
    const upcomingContainer = document.querySelector("#upcomingMatches .clubs");
    if (upcomingContainer) {
      upcomingContainer.innerHTML = "";
      const upcoming = currentEvent
        ? matches.filter(
            (m) => m.status === "Upcoming" && m.eventId === currentEvent.id,
          )
        : [];
      if (upcoming.length === 0) {
        upcomingContainer.innerHTML = `<div class="club-card"><h2>No Upcoming Matches</h2><div class="club-info">No matches scheduled.</div></div>`;
      } else {
        upcoming.forEach((match) => {
          const card = document.createElement("div");
          card.className = "club-card";
          card.innerHTML = `
            <h2>${match.teamA} vs ${match.teamB}</h2>
            <div class="club-info"><strong>Status:</strong> Upcoming</div>
            <div class="club-info"><strong>Date:</strong> ${match.date}</div>
            <div class="club-info"><strong>Location:</strong> ${match.venue}</div>
            <a href="./update3.html?matchId=${match.id}" class="report-btn">Schedule Match</a>
          `;
          upcomingContainer.appendChild(card);
        });
      }
    }

    // 5. Completed Matches
    const completedContainer = document.querySelector(
      "#completedMatches .clubs",
    );
    if (completedContainer) {
      completedContainer.innerHTML = "";
      const completed = currentEvent
        ? matches.filter(
            (m) => m.status === "Completed" && m.eventId === currentEvent.id,
          )
        : [];
      if (completed.length === 0) {
        completedContainer.innerHTML = `<div class="club-card"><h2>No Completed Matches</h2><div class="club-info">No completed matches report yet.</div></div>`;
      } else {
        completed.forEach((match) => {
          const card = document.createElement("div");
          card.className = "club-card";
          card.innerHTML = `
            <h2>${match.teamA} vs ${match.teamB}</h2>
            <div class="club-info"><strong>Status:</strong> Completed</div>
            <div class="club-info"><strong>Result:</strong> ${match.score} (${match.winner === "Draw Match" ? "Draw" : match.winner + " Won"})</div>
            <div class="club-info"><strong>Winner:</strong> ${match.winner}</div>
            <a href="./coach-updates.html?matchId=${match.id}" class="report-btn">Make Report</a>
          `;
          completedContainer.appendChild(card);
        });
      }
    }

    // Bind event click to open apply modal dynamically
    document.querySelectorAll(".play-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        selectedEventIdForApplication = e.target.dataset.eventId;
        if (applyModal && applyOverlay) {
          applyModal.classList.add("show");
          applyOverlay.classList.add("show");
        }
      });
    });
  }

  // Load and render
  EventFlow.loadState();
  renderAll();

  // Bind close buttons for modal
  if (closeApply && applyModal && applyOverlay) {
    closeApply.addEventListener("click", () => {
      applyModal.classList.remove("show");
      applyOverlay.classList.remove("show");
    });

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
        if (applyModal && applyOverlay) {
          applyModal.classList.remove("show");
          applyOverlay.classList.remove("show");
        }
        renderAll();
      }
    });
  }

  // Render notifications dropdown
  EventFlow.renderNotifications("coach", {
    dropdownSelector: "#notificationDropdown",
    triggerSelector: ".notify-only",
  });

  // Notifications dropdown display toggle
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

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("show");
    });
  }
});
