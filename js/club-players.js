document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("eventId");

  const titleEl = document.getElementById("playersPageTitle");
  const container = document.getElementById("playersListContainer");
  const clubName = window.EventFlow
    ? window.EventFlow.getCurrentUserName()
    : "Manchester United FC";

  function render() {
    if (!container || !window.EventFlow) return;
    container.innerHTML = "";

    if (eventId) {
      // 1. Render event applicants
      const events = EventFlow.getEvents();
      const event = events.find((e) => e.id === eventId);
      if (!event) {
        container.innerHTML =
          '<p style="text-align:center;color:#94a3b8;padding:20px;">Event not found.</p>';
        return;
      }

      if (titleEl) titleEl.textContent = `Applicants for ${event.title}`;

      const applicants = event.applicants || [];
      if (applicants.length === 0) {
        container.innerHTML =
          '<p style="text-align:center;color:#94a3b8;padding:20px;">No applications for this event yet.</p>';
        return;
      }

      applicants.forEach((app, index) => {
        const card = document.createElement("div");
        card.className = "player-card";

        let actionHtml = "";
        if (app.status === "Approved") {
          actionHtml = `<span class="approval-status approved" style="color:#22c55e;font-weight:700;padding:6px 12px;background:rgba(34,197,94,0.15);border-radius:6px;">Approved</span>`;
        } else if (app.status === "Rejected") {
          actionHtml = `<span class="approval-status rejected" style="color:#ef4444;font-weight:700;padding:6px 12px;background:rgba(239,68,68,0.15);border-radius:6px;">Rejected</span>`;
        } else {
          actionHtml = `
            <div class="actions">
              <button class="accept" data-player-id="${app.playerId}">Accept</button>
              <button class="reject" data-player-id="${app.playerId}">Reject</button>
            </div>
          `;
        }

        // Fetch skills/achievements from registered players if available, else fallback
        const playerObj =
          EventFlow.getPlayers().find((p) => p.id === app.playerId) || {};
        const skills = playerObj.skills || "N/A";
        const achievements = playerObj.achievements || "N/A";

        const profileUrl = `./club-other-profile.html?id=${app.playerId || app.id}`;

        card.innerHTML = `
          <div class="player-header">
            <a class="left" href="${profileUrl}" target="_blank">
              <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=38bdf8&color=020617" alt="${app.name}">
              <div>
                <span class="player-name">${app.name}</span>
                <div style="font-size: 0.8rem; color: #cbd5f5;">Applied Role: ${app.position}</div>
              </div>
            </a>
            ${actionHtml}
          </div>
          <button class="details-btn" onclick="toggle('p_${index}')">View Details</button>
          <div class="dropdown" id="p_${index}">
            <p><b>Skills:</b> ${skills}</p>
            <p><b>Achievements:</b> ${achievements}</p>
          </div>
        `;
        container.appendChild(card);
      });

      // Bind accept/reject buttons
      container.querySelectorAll(".accept").forEach((btn) => {
        btn.addEventListener("click", () => {
          const pId = btn.dataset.playerId;
          EventFlow.approveApplication(eventId, pId);
          render();
        });
      });

      container.querySelectorAll(".reject").forEach((btn) => {
        btn.addEventListener("click", () => {
          const pId = btn.dataset.playerId;
          const evs = EventFlow.getEvents();
          const ev = evs.find((e) => e.id === eventId);
          if (ev) {
            const applicant = ev.applicants?.find((a) => a.playerId === pId);
            if (applicant) applicant.status = "Rejected";
            EventFlow.saveEvents(evs);
          }
          render();
        });
      });
    } else {
      // 2. Render club registrations (members)
      if (titleEl) titleEl.textContent = `Registered Players for ${clubName}`;

      const players = EventFlow.getPlayers().filter((p) => p.club === clubName);
      if (players.length === 0) {
        container.innerHTML =
          '<p style="text-align:center;color:#94a3b8;padding:20px;">No registered players found for this club.</p>';
        return;
      }

      players.forEach((player, index) => {
        const card = document.createElement("div");
        card.className = "player-card";

        let actionHtml = "";
        if (player.status === "Approved") {
          actionHtml = `<span class="approval-status approved" style="color:#22c55e;font-weight:700;padding:6px 12px;background:rgba(34,197,94,0.15);border-radius:6px;">Approved Member</span>`;
        } else if (player.status === "Rejected") {
          actionHtml = `<span class="approval-status rejected" style="color:#ef4444;font-weight:700;padding:6px 12px;background:rgba(239,68,68,0.15);border-radius:6px;">Rejected</span>`;
        } else {
          actionHtml = `
            <div class="actions">
              <button class="accept" data-player-id="${player.id}">Accept</button>
              <button class="reject" data-player-id="${player.id}">Reject</button>
            </div>
          `;
        }

        card.innerHTML = `
          <div class="player-header">
            <a class="left" href="./club-other-profile.html?id=${player.id}" target="_blank">
              <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=38bdf8&color=020617" alt="${player.name}">
              <div>
                <span class="player-name">${player.name}</span>
                <div style="font-size: 0.8rem; color: #cbd5f5;">${player.sport} • ${player.position || "N/A"}</div>
              </div>
            </a>
            ${actionHtml}
          </div>
          <button class="details-btn" onclick="toggle('p_${index}')">View Details</button>
          <div class="dropdown" id="p_${index}">
            <p><b>Email:</b> ${player.email}</p>
            <p><b>Phone:</b> ${player.phone || "N/A"}</p>
            <p><b>Skills:</b> ${player.skills || "N/A"}</p>
            <p><b>Achievements:</b> ${player.achievements || "N/A"}</p>
          </div>
        `;
        container.appendChild(card);
      });

      // Bind accept/reject buttons
      container.querySelectorAll(".accept").forEach((btn) => {
        btn.addEventListener("click", () => {
          const pId = btn.dataset.playerId;
          const plist = EventFlow.getPlayers();
          const pObj = plist.find((p) => p.id === pId);
          if (pObj) {
            pObj.status = "Approved";
            EventFlow.savePlayers(plist);

            // Create notification
            EventFlow.createNotification(
              "Player Joined Club Approved",
              `Player ${pObj.name} has been approved to join ${clubName}.`,
              "player_joined_club",
              clubName,
              ["player", "coach", "club", "organization"],
            );
          }
          render();
        });
      });

      container.querySelectorAll(".reject").forEach((btn) => {
        btn.addEventListener("click", () => {
          const pId = btn.dataset.playerId;
          const plist = EventFlow.getPlayers();
          const pObj = plist.find((p) => p.id === pId);
          if (pObj) {
            pObj.status = "Rejected";
            EventFlow.savePlayers(plist);
          }
          render();
        });
      });
    }
  }

  // View Details toggle global function
  window.toggle = function (id) {
    const box = document.getElementById(id);
    if (box) {
      box.style.display = box.style.display === "block" ? "none" : "block";
    }
  };

  render();
});
