
const notifyBtn = document.getElementById("notifyBtn");
const notificationBox = document.getElementById("notificationBox");
const overlay = document.getElementById("overlay");

notifyBtn.addEventListener("click", () => {
  
  const isVisible = notificationBox.style.display === "block";
  notificationBox.style.display = isVisible ? "none" : "block";
  overlay.style.display = isVisible ? "none" : "block";
});

overlay.addEventListener("click", () => {
  notificationBox.style.display = "none";
  overlay.style.display = "none";
});


const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    
    tabButtons.forEach(b => b.classList.remove("active"));
    
    btn.classList.add("active");

    
    tabContents.forEach(tc => tc.classList.remove("active"));
    
    const tabId = btn.getAttribute("data-tab");
    const activeTab = document.getElementById(tabId);
    if (activeTab) activeTab.classList.add("active");
  });
});


function approveUser(button) {
  const row = button.closest('.user-row');
  const statusBadge = row.querySelector('.badge');
  
  if (statusBadge) {
    statusBadge.className = 'badge approved';
    statusBadge.textContent = 'Approved';
  }
  
  button.disabled = true;
  updateStats();
}

function deleteUser(button) {
  if (confirm("Are you sure you want to remove this user? This action cannot be undone.")) {
    const row = button.closest('.user-row');
    row.style.transform = 'scale(0.95)';
    row.style.opacity = '0';
    setTimeout(() => {
      row.remove();
      updateStats();
    }, 300);
  }
}

function updateStats() {
  const allRows = document.querySelectorAll('.user-row');
  const pendingBadges = document.querySelectorAll('.badge.pending');
  
  const statsBadges = document.querySelectorAll('.stat-badge strong');
  
  if (statsBadges.length >= 2) {
    statsBadges[0].textContent = allRows.length;
    statsBadges[1].textContent = pendingBadges.length;
  }
}


document.addEventListener("DOMContentLoaded", () => {
  updateStats();
});
