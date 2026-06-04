document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("clubsListContainer");
  const assocName = window.EventFlow ? window.EventFlow.getCurrentUserName() : 'School Games Federation Of India';

  function render() {
    if (!container || !window.EventFlow) return;
    container.innerHTML = '';

    const clubs = EventFlow.getClubs().filter(c => c.association === assocName);
    if (clubs.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:#94a3b8;padding:20px;">No registered clubs found for this association.</p>';
      return;
    }

    clubs.forEach((club, index) => {
      const card = document.createElement("div");
      card.className = "club-card";

      let actionHtml = '';
      if (club.status === 'Approved') {
        actionHtml = `<span class="approval-status approved" style="color:#22c55e;font-weight:700;padding:6px 12px;background:rgba(34,197,94,0.15);border-radius:6px;">Approved Club</span>`;
      } else if (club.status === 'Rejected') {
        actionHtml = `<span class="approval-status rejected" style="color:#ef4444;font-weight:700;padding:6px 12px;background:rgba(239,68,68,0.15);border-radius:6px;">Rejected</span>`;
      } else {
        actionHtml = `
          <div class="actions">
            <button class="accept" data-club-id="${club.id}" style="background:#22c55e;color:black;border:none;padding:6px 14px;border-radius:6px;font-weight:600;cursor:pointer;">Accept</button>
            <button class="reject" data-club-id="${club.id}" style="background:#ef4444;color:white;border:none;padding:6px 14px;border-radius:6px;font-weight:600;cursor:pointer;margin-left:8px;">Reject</button>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="club-header">
          <div class="left">
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(club.name)}&background=22c55e&color=020617" alt="${club.name}" style="width:65px;height:65px;border-radius:12px;border:2px solid #22c55e;padding:5px;background:white;">
            <div>
              <span class="club-name">${club.name}</span>
              <div style="font-size: 0.8rem; color: #cbd5f5;">${club.sport} • ${club.type}</div>
            </div>
          </div>
          ${actionHtml}
        </div>
        <button class="details-btn" onclick="toggle('c_${index}')" style="margin-top:10px;background:#1e293b;border:none;padding:6px 12px;color:#cbd5f5;border-radius:6px;cursor:pointer;">View Details</button>
        <div class="dropdown" id="c_${index}" style="display:none;margin-top:12px;padding-left:80px;">
          <p><b>Email:</b> ${club.email}</p>
          <p><b>Phone:</b> ${club.phone || 'N/A'}</p>
          <p><b>Location:</b> ${club.location}</p>
          <p><b>Admin:</b> ${club.admin || 'N/A'}</p>
        </div>
      `;
      container.appendChild(card);
    });

    // Bind accept/reject buttons
    container.querySelectorAll(".accept").forEach(btn => {
      btn.addEventListener("click", () => {
        const clubId = btn.dataset.clubId;
        const clist = EventFlow.getClubs();
        const cObj = clist.find(c => c.id === clubId);
        if (cObj) {
          cObj.status = 'Approved';
          EventFlow.saveClubs(clist);

          // Create notification
          EventFlow.createNotification(
            "Club Joined Association Approved",
            `Club ${cObj.name} has been approved to join association ${assocName}.`,
            "club_joined_association",
            assocName,
            ["club", "organization"]
          );
        }
        render();
      });
    });

    container.querySelectorAll(".reject").forEach(btn => {
      btn.addEventListener("click", () => {
        const clubId = btn.dataset.clubId;
        const clist = EventFlow.getClubs();
        const cObj = clist.find(c => c.id === clubId);
        if (cObj) {
          cObj.status = 'Rejected';
          EventFlow.saveClubs(clist);
        }
        render();
      });
    });
  }

  // View Details toggle global function
  window.toggle = function(id) {
    const box = document.getElementById(id);
    if (box) {
      box.style.display = box.style.display === "block" ? "none" : "block";
    }
  };

  render();
});
