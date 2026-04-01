// ================= TAB SWITCH =================
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// ================= MODALS =================
const applicantsModal = document.getElementById("applicantsModal");
const progressModal = document.getElementById("progressModal");
const resultsModal = document.getElementById("resultsModal");

document.querySelectorAll(".open-applicants").forEach(btn => {
  btn.addEventListener("click", () => {
    applicantsModal.style.display = "flex";
  });
});

document.querySelectorAll(".open-progress").forEach(btn => {
  btn.addEventListener("click", () => {
    progressModal.style.display = "flex";
  });
});

document.querySelectorAll(".open-results").forEach(btn => {
  btn.addEventListener("click", () => {
    resultsModal.style.display = "flex";
  });
});

// ================= CLOSE MODALS =================
document.querySelectorAll(".close-applicants, .close-progress, .close-results").forEach(btn => {
  btn.addEventListener("click", e => {
    e.target.closest(".applications-modal").style.display = "none";
  });
});

// ================= CLOSE ON BACKGROUND CLICK =================
[applicantsModal, progressModal, resultsModal].forEach(modal => {
  modal.addEventListener("click", e => {
    if(e.target === modal) modal.style.display = "none";
  });
});

// ================= APPROVE / REJECT PLAYERS =================
document.querySelectorAll(".approve").forEach(btn => {
  btn.addEventListener("click", e => {
    const card = e.target.closest(".applicant-card");
    card.querySelector(".action-icons").remove();
    const span = document.createElement("span");
    span.classList.add("approval-status", "approved");
    span.textContent = "Approved";
    card.appendChild(span);
  });
});

document.querySelectorAll(".reject").forEach(btn => {
  btn.addEventListener("click", e => {
    const card = e.target.closest(".applicant-card");
    card.remove();
  });
});
