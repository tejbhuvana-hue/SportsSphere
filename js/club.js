document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const notifyBtn = document.querySelector(".notify-btn");
  const notifyBox = document.querySelector(".notification-dropdown");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.style.display =
        mobileMenu.style.display === "block" ? "none" : "block";
      if (notifyBox) notifyBox.style.display = "none";
    });
  }

  if (notifyBtn && notifyBox) {
    notifyBtn.addEventListener("click", () => {
      notifyBox.style.display =
        notifyBox.style.display === "block" ? "none" : "block";
      if (mobileMenu) mobileMenu.style.display = "none";
    });
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar")) {
      if (mobileMenu) mobileMenu.style.display = "none";
      if (notifyBox) notifyBox.style.display = "none";
    }
  });

  const clubName = window.EventFlow ? window.EventFlow.getCurrentUserName() : 'Manchester United FC';

  // Update dynamic count statistics on Club sidebar
  const statsContainer = document.querySelector(".stats");
  if (statsContainer && window.EventFlow) {
    const strongs = statsContainer.querySelectorAll("strong");
    if (strongs.length >= 2) {
      // 1. Members count: count of approved players registered to this club
      const members = EventFlow.getPlayers().filter(p => p.club === clubName && p.status === 'Approved').length;
      strongs[0].textContent = 2400 + members; // Base stat 2.4k offset

      // 2. Events count: trials + camps created by this club
      const events = EventFlow.getEvents().filter(e => e.createdBy === clubName).length;
      strongs[1].textContent = 120 + events; // Base stat 120 offset
    }
  }

  // Render club notifications dropdown
  if (window.EventFlow) {
    EventFlow.renderNotifications('club', {
      dropdownSelector: '.notification-dropdown',
      triggerSelector: '.notify-btn'
    });

    // Render Events Remainder dynamically
    const remainderCard = document.getElementById("eventsRemainderCard") || document.querySelector(".rightbar .card");
    if (remainderCard) {
      const events = EventFlow.getEvents().filter(e => e.createdBy === clubName || (e.visibleTo && e.visibleTo.includes('club')));
      const upcoming = events.filter(e => e.status !== 'Completed').slice(0, 3);
      if (upcoming.length === 0) {
        remainderCard.innerHTML = '<h4>Events Remainder</h4><p style="padding: 10px; font-size: 14px; color: #94a3b8;">No upcoming events</p>';
      } else {
        remainderCard.innerHTML = '<h4>Events Remainder</h4>' + upcoming.map(e => {
          let icon = '⚽';
          if (e.eventType === 'camp') icon = '🏃';
          else if (e.eventType === 'trial') icon = '👟';
          else if (e.eventType === 'tournament') icon = '🏆';
          const displayDate = e.date.split('–')[0].split('-')[0].trim();
          return `<p style="padding: 8px 10px; margin: 4px 0; font-size: 14px; border-radius: 8px; transition: 0.3s;">${icon} ${e.title} – ${displayDate}</p>`;
        }).join('');
      }
    }
  }
});
