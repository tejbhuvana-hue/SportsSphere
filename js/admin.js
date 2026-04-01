// ================= NOTIFICATION & OVERLAY =================
const notifyBtn = document.getElementById("notifyBtn");
const notificationBox = document.getElementById("notificationBox");
const overlay = document.getElementById("overlay");

notifyBtn.addEventListener("click", () => {
  // Toggle notification visibility
  const isVisible = notificationBox.style.display === "block";
  notificationBox.style.display = isVisible ? "none" : "block";
  overlay.style.display = isVisible ? "none" : "block";
});

// Clicking on overlay closes notification
overlay.addEventListener("click", () => {
  notificationBox.style.display = "none";
  overlay.style.display = "none";
});

// ================= TAB SWITCHING =================
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    tabButtons.forEach(b => b.classList.remove("active"));
    // Add active class to clicked button
    btn.classList.add("active");

    // Hide all tab contents
    tabContents.forEach(tc => tc.classList.remove("active"));
    // Show selected tab content
    const tabId = btn.getAttribute("data-tab");
    const activeTab = document.getElementById(tabId);
    if (activeTab) activeTab.classList.add("active");
  });
});

// ================= USER MANAGEMENT ACTIONS =================
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

// Initial stats update
document.addEventListener("DOMContentLoaded", () => {
  updateStats();
});
