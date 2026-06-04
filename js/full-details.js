function openCompleted() {
  closeAll();
  document.getElementById("completedOverlay").style.display = "flex";
}

function openProgress() {
  closeAll();
  document.getElementById("progressOverlay").style.display = "flex";
}

function openSchedule() {
  closeAll();
  document.getElementById("scheduleOverlay").style.display = "flex";
}

function closeAll() {
  document.getElementById("completedOverlay").style.display = "none";
  document.getElementById("progressOverlay").style.display = "none";
  document.getElementById("scheduleOverlay").style.display = "none";
}
