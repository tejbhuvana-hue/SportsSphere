document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu-icon");
  const navLinks = document.getElementById("nav-links");

  if (menuIcon && navLinks) {
    menuIcon.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Forms declaration
  const playerForm = document.getElementById("playerForm");
  const coachForm = document.getElementById("coachForm");
  const clubForm = document.getElementById("clubForm");
  const orgForm = document.getElementById("orgForm");

  // Radio button toggle handlers
  const playerRadio = document.getElementById("playerRadio");
  const coachRadio = document.getElementById("coachRadio");
  const clubRadio = document.getElementById("clubRadio");
  const orgRadio = document.getElementById("orgRadio");

  if (playerRadio) playerRadio.addEventListener("change", () => showForm(playerForm));
  if (coachRadio) coachRadio.addEventListener("change", () => showForm(coachForm));
  if (clubRadio) clubRadio.addEventListener("change", () => showForm(clubForm));
  if (orgRadio) orgRadio.addEventListener("change", () => showForm(orgForm));

  function showForm(form) {
    if (playerForm) playerForm.style.display = "none";
    if (coachForm) coachForm.style.display = "none";
    if (clubForm) clubForm.style.display = "none";
    if (orgForm) orgForm.style.display = "none";
    if (form) form.style.display = "block";
  }

  // // ==========================================
  // // DYNAMIC CONNECTION DROPDOWNS INJECTION
  // // ==========================================

  // if (window.EventFlow) {
  //   const clubs = EventFlow.getClubs();
  //   const associations = EventFlow.getAssociations();

  //   // 1. Inject Club Selection for Players
  //   if (playerForm) {
  //     const clubSelectGroup = document.createElement("div");
  //     clubSelectGroup.className = "form-group";
  //     clubSelectGroup.innerHTML = `
  //       <label for="playerClub">Select Club</label>
  //       <select id="playerClub" name="club" required style="width: 100%;">
  //         ${clubs.map(c => `<option value="${c.name}">${c.name}</option>`).join("")}
  //       </select>
  //     `;
  //     const pswField = document.getElementById("playerPassword");
  //     if (pswField) {
  //       playerForm.insertBefore(clubSelectGroup, pswField.parentNode);
  //     }
  //   }

  //   // 2. Inject Association Selection for Clubs
  //   if (clubForm) {
  //     const assocSelectGroup = document.createElement("div");
  //     assocSelectGroup.className = "form-group";
  //     assocSelectGroup.innerHTML = `
  //       <label for="clubAssoc">Select Association</label>
  //       <select id="clubAssoc" name="association" required style="width: 100%;">
  //         ${associations.map(a => `<option value="${a.name}">${a.name}</option>`).join("")}
  //       </select>
  //     `;
  //     const pswField = document.getElementById("clubPassword");
  //     if (pswField) {
  //       clubForm.insertBefore(assocSelectGroup, pswField.parentNode);
  //     }
  //   }

  //   // 3. Inject Club/Association Selection for Coaches
  //   if (coachForm) {
  //     const coachTypeGroup = document.createElement("div");
  //     coachTypeGroup.className = "form-group";
  //     coachTypeGroup.innerHTML = `
  //       <label for="coachConnectType">Connect To</label>
  //       <select id="coachConnectType" name="connectType" required style="width: 100%;">
  //         <option value="club">Club</option>
  //         <option value="association">Association</option>
  //       </select>
  //     `;

  //     const coachTargetGroup = document.createElement("div");
  //     coachTargetGroup.className = "form-group";
  //     coachTargetGroup.innerHTML = `
  //       <label for="coachConnectTarget">Select Target Entity</label>
  //       <select id="coachConnectTarget" name="connectTarget" required style="width: 100%;">
  //       </select>
  //     `;

  //     const pswField = document.getElementById("coachPassword");
  //     if (pswField) {
  //       coachForm.insertBefore(coachTypeGroup, pswField.parentNode);
  //       coachForm.insertBefore(coachTargetGroup, pswField.parentNode);
  //     }

  //     const typeSelect = coachTypeGroup.querySelector("#coachConnectType");
  //     const targetSelect = coachTargetGroup.querySelector("#coachConnectTarget");

  //     function updateCoachTargets() {
  //       const type = typeSelect.value;
  //       if (type === "club") {
  //         targetSelect.innerHTML = EventFlow.getClubs().map(c => `<option value="${c.name}">${c.name}</option>`).join("");
  //       } else {
  //         targetSelect.innerHTML = EventFlow.getAssociations().map(a => `<option value="${a.name}">${a.name}</option>`).join("");
  //       }
  //     }

  //     if (typeSelect && targetSelect) {
  //       typeSelect.addEventListener("change", updateCoachTargets);
  //       updateCoachTargets();
  //     }
  //   }
  // }

  // ==========================================
  // SIGNUP FORM SUBMISSIONS
  // ==========================================

  // 1. Player Submission
  if (playerForm) {
    playerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!window.EventFlow) return;

      const name = document.getElementById("playerName").value;
      const dob = document.getElementById("playerDob").value;
      const gender = document.getElementById("playerGender").value;
      const sport = document.getElementById("playerSport").value;
      const email = document.getElementById("playerEmail").value;
      const position = document.getElementById("playerPosition").value;
      const skills = document.getElementById("playerSkills").value;
      const achievements = document.getElementById("playerAchievements").value;
      const phone = document.getElementById("playerPhone").value;
      const location = document.getElementById("playerLocation").value;
      const club = document.getElementById("playerClub")?.value || "";
      const password = document.getElementById("playerPassword")?.value || "123";

      const players = EventFlow.getPlayers();
      const newPlayer = {
        id: "P-" + Date.now(),
        name,
        dob,
        gender,
        sport,
        email,
        position,
        skills,
        achievements,
        phone,
        location,
        club,
        password,
        status: "Pending" // Will be approved in club dashboard
      };

      players.push(newPlayer);
      EventFlow.savePlayers(players);

      // Create notification
      EventFlow.createNotification(
        "Player Joined Club Request",
        `Player ${name} registered and requested to join ${club}.`,
        "player_joined_club",
        name,
        ["club", "coach", "organization"]
      );

      alert("Registration submitted! Pending approval by your selected club.");
      window.location.href = "login.html";
    });
  }

  // 2. Coach Submission
  if (coachForm) {
    coachForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!window.EventFlow) return;

      const name = document.getElementById("coachName").value;
      const dob = document.getElementById("coachDob").value;
      const gender = document.getElementById("coachGender").value;
      const sport = document.getElementById("coachSport").value;
      const role = document.getElementById("coachRole").value;
      const experience = document.getElementById("coachExperience").value;
      const email = document.getElementById("coachEmail").value;
      const phone = document.getElementById("coachPhone").value;
      const location = document.getElementById("coachLocation").value;
      const connectType = document.getElementById("coachConnectType")?.value || "club";
      const connectTarget = document.getElementById("coachConnectTarget")?.value || "";
      const password = document.getElementById("coachPassword")?.value || "123";

      const coaches = EventFlow.getCoaches();
      const newCoach = {
        id: "C-" + Date.now(),
        name,
        dob,
        gender,
        sport,
        role,
        experience,
        email,
        phone,
        location,
        connectType,
        connectTarget,
        password,
        status: "Pending"
      };

      coaches.push(newCoach);
      EventFlow.saveCoaches(coaches);

      // Create notification
      EventFlow.createNotification(
        "Coach Registration",
        `Coach ${name} registered to connect with ${connectTarget}.`,
        "coach_joined_club",
        name,
        ["club", "organization"]
      );

      alert("Coach registration submitted! Pending approval.");
      window.location.href = "login.html";
    });
  }

  // 3. Club Submission
  if (clubForm) {
    clubForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!window.EventFlow) return;

      const name = document.getElementById("clubName").value;
      const type = document.getElementById("clubType").value;
      const sport = document.getElementById("clubSport").value;
      const email = document.getElementById("clubEmail").value;
      const phone = document.getElementById("clubPhone").value;
      const location = document.getElementById("clubLocation").value;
      const admin = document.getElementById("clubAdmin").value;
      const association = document.getElementById("clubAssoc")?.value || "";
      const password = document.getElementById("clubPassword")?.value || "123";

      const clubs = EventFlow.getClubs();
      const newClub = {
        id: "CL-" + Date.now(),
        name,
        type,
        sport,
        email,
        phone,
        location,
        admin,
        association,
        password,
        status: "Pending"
      };

      clubs.push(newClub);
      EventFlow.saveClubs(clubs);

      // Create notification
      EventFlow.createNotification(
        "Club Joined Association Request",
        `Club ${name} requested to connect with Association ${association}.`,
        "club_joined_association",
        name,
        ["organization"]
      );

      alert("Club registration submitted! Pending approval by the association.");
      window.location.href = "login.html";
    });
  }

  // 4. Org/Association Submission
  if (orgForm) {
    orgForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!window.EventFlow) return;

      const name = document.getElementById("orgName").value;
      const type = document.getElementById("orgType").value;
      const sport = document.getElementById("orgSport").value;
      const email = document.getElementById("orgEmail").value;
      const phone = document.getElementById("orgPhone").value;
      const location = document.getElementById("orgLocation").value;
      const admin = document.getElementById("orgAdmin").value;
      const password = document.getElementById("orgPassword")?.value || "123";

      const associations = EventFlow.getAssociations();
      const newAssoc = {
        id: "A-" + Date.now(),
        name,
        type,
        sport,
        email,
        phone,
        location,
        admin,
        password,
        status: "Approved" // Associations are approved automatically in this mock flow
      };

      associations.push(newAssoc);
      EventFlow.saveAssociations(associations);

      EventFlow.createNotification(
        "Association Registered",
        `Association ${name} is registered successfully.`,
        "coach_joined_association",
        name,
        ["player", "coach", "club", "organization"]
      );

      alert("Association registered successfully!");
      window.location.href = "login.html";
    });
  }
});
