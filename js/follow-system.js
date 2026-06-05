const FOLLOW_STORAGE_KEY = "sportsphereFollowData_v2";

const defaultFollowData = {
  currentUserId: "coach-michel",
  users: {
    "coach-michel": {
      id: "coach-michel",
      name: "Michel",
      avatar: "https://static.independent.co.uk/2022/04/21/11/2c4a6cdb4c3ec8aa38652267b0dc6582Y29udGVudHNlYXJjaGFwaSwxNjUwNjIyNDMw-2.66361330.jpg",
      title: "Foot Ball - Coach",
    },
    "coach-rahul": {
      id: "coach-rahul",
      name: "Coach Rahul Sharma",
      avatar: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
      title: "Football Coach",
    },
    "novak-djokovic": {
      id: "novak-djokovic",
      name: "Novak Djokovic",
      avatar: "https://i.pravatar.cc/100?img=6",
      title: "Tennis • Player",
    },
    "rafael-nadal": {
      id: "rafael-nadal",
      name: "Rafael Nadal",
      avatar: "https://i.pravatar.cc/100?img=7",
      title: "Tennis • Player",
    },
    "usain-bolt": {
      id: "usain-bolt",
      name: "Usain Bolt",
      avatar: "https://i.pravatar.cc/100?img=8",
      title: "Athletics • Sprinter",
    },
    "lebron-james": {
      id: "lebron-james",
      name: "LeBron James",
      avatar: "https://i.pravatar.cc/100?img=9",
      title: "Basketball • Forward",
    },
    "stephen-curry": {
      id: "stephen-curry",
      name: "Stephen Curry",
      avatar: "https://i.pravatar.cc/100?img=10",
      title: "Basketball • Guard",
    },
  },
  relationships: {
    "coach-michel": {
      followers: ["coach-rahul"],
      following: ["coach-rahul"],
    },
    "coach-rahul": {
      followers: ["coach-michel"],
      following: [],
    },
    "novak-djokovic": {
      followers: [],
      following: [],
    },
    "rafael-nadal": {
      followers: [],
      following: [],
    },
    "usain-bolt": {
      followers: [],
      following: [],
    },
    "lebron-james": {
      followers: [],
      following: [],
    },
    "stephen-curry": {
      followers: [],
      following: [],
    },
  },
};

let followData;
let followModalType = "followers";

function slugify(text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function loadFollowData() {
  const stored = localStorage.getItem(FOLLOW_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(FOLLOW_STORAGE_KEY, JSON.stringify(defaultFollowData));
    return JSON.parse(JSON.stringify(defaultFollowData));
  }

  try {
    const parsed = JSON.parse(stored);
    if (!parsed.currentUserId || !parsed.users || !parsed.relationships) {
      throw new Error("Invalid follow data");
    }
    return parsed;
  } catch {
    localStorage.setItem(FOLLOW_STORAGE_KEY, JSON.stringify(defaultFollowData));
    return JSON.parse(JSON.stringify(defaultFollowData));
  }
}

function saveFollowData() {
  localStorage.setItem(FOLLOW_STORAGE_KEY, JSON.stringify(followData));
}

function ensureUser(userId, name) {
  if (!followData.users[userId]) {
    followData.users[userId] = {
      id: userId,
      name,
      avatar: "https://i.pravatar.cc/100?img=5",
      title: "Player",
    };
  }

  if (!followData.relationships[userId]) {
    followData.relationships[userId] = {
      followers: [],
      following: [],
    };
  }
}

function getPageProfileId() {
  const explicit = document.querySelector("[data-profile-id]")?.dataset?.profileId;
  if (explicit) {
    return explicit;
  }
  const name = (document.querySelector(".player-card #player-name") || document.querySelector(".profile-card h3"))?.textContent.trim();
  if (!name) {
    return followData.currentUserId;
  }
  const currentName = followData.users[followData.currentUserId]?.name;
  if (name === currentName) {
    return followData.currentUserId;
  }
  
  // Map common names to user IDs
  const nameMap = {
    "coach rahul sharma": "coach-rahul",
    "rahul": "coach-rahul",
    "michael": "coach-michel",
    "michel": "coach-michel",
  };
  
  const lowerName = name.toLowerCase();
  for (const [key, value] of Object.entries(nameMap)) {
    if (lowerName.includes(key)) {
      return value;
    }
  }
  
  return slugify(name);
}

function getUserDataById(userId) {
  return followData.users[userId] || {
    id: userId,
    name: userId.replace(/-/g, " "),
    avatar: "https://i.pravatar.cc/100?img=5",
    title: "Player",
  };
}

function updateCounts() {
  const profileId = getPageProfileId();
  // Only show counts on own dashboard/profile if the IDs match
  // or if we are on a page that doesn't have a follow button (meaning it's a dashboard)
  const isDashboard = !document.querySelector(".btn-follow");
  const displayId = isDashboard ? profileId : followData.currentUserId;
  
  const relationship = followData.relationships[displayId] || { followers: [], following: [] };
  const followersCount = relationship.followers.length;
  const followingCount = relationship.following.length;

  document.querySelectorAll("#followersCount").forEach((el) => {
    el.textContent = followersCount;
  });
  document.querySelectorAll("#followingCount").forEach((el) => {
    el.textContent = followingCount;
  });
}

function updateProfileCounts() {
  const profileId = getPageProfileId();
  const relationship = followData.relationships[profileId] || { followers: [], following: [] };

  const followersCount = relationship.followers.length;
  const followingCount = relationship.following.length;

  const followersCountEl = document.getElementById("profileFollowersCount");
  const followingCountEl = document.getElementById("profileFollowingCount");

  if (followersCountEl) {
    followersCountEl.textContent = followersCount;
  }
  if (followingCountEl) {
    followingCountEl.textContent = followingCount;
  }
}

function updateFollowButtons() {
  const currentFollowing = followData.relationships[followData.currentUserId]?.following || [];
  const pageProfileId = getPageProfileId();

  document.querySelectorAll(".btn-follow").forEach((button) => {
    const targetId = button.dataset.profileId || pageProfileId;
    const isFollowing = currentFollowing.includes(targetId);
    if (isFollowing) {
      button.classList.add("following");
      button.innerHTML = '<i class="bi bi-person-check-fill"></i> Following';
    } else {
      button.classList.remove("following");
      button.innerHTML = '<i class="bi bi-person-plus-fill"></i> Follow';
    }
  });

  document.querySelectorAll(".suggestion-user button").forEach((button) => {
    const userCard = button.closest(".suggestion-user");
    const name = userCard?.querySelector(".user-info strong")?.textContent.trim();
    if (!name) {
      return;
    }
    const targetId = slugify(name);
    ensureUser(targetId, name);
    const isFollowing = currentFollowing.includes(targetId);
    button.textContent = isFollowing ? "Following" : "Follow";
    button.classList.toggle("following", isFollowing);
  });
}

function toggleFollow(targetId) {
  if (targetId === followData.currentUserId) {
    return;
  }

  ensureUser(targetId, followData.users[targetId]?.name || targetId);
  const current = followData.currentUserId;
  const currentRelations = followData.relationships[current];
  const targetRelations = followData.relationships[targetId];

  if (!currentRelations.following.includes(targetId)) {
    currentRelations.following.push(targetId);
    if (!targetRelations.followers.includes(current)) {
      targetRelations.followers.push(current);
    }
  } else {
    currentRelations.following = currentRelations.following.filter((id) => id !== targetId);
    targetRelations.followers = targetRelations.followers.filter((id) => id !== current);
  }

  saveFollowData();
  refreshFollowUI();
}

function renderFollowList(type) {
  const listContainer = document.getElementById("followModalList");
  const titleElement = document.getElementById("followModalTitle");
  
  const isDashboard = !document.querySelector(".btn-follow");
  const displayId = isDashboard ? getPageProfileId() : followData.currentUserId;
  
  const relationship = followData.relationships[displayId] || { followers: [], following: [] };
  const ids = type === "followers" ? relationship.followers : relationship.following;
  const titleText = type === "followers" ? "Followers" : "Following";

  titleElement.textContent = titleText;
  listContainer.innerHTML = "";

  if (!ids.length) {
    listContainer.innerHTML = `<p class="empty-follow">No ${titleText.toLowerCase()} yet.</p>`;
    return;
  }

  ids.forEach((id) => {
    const user = getUserDataById(id);
    const item = document.createElement("div");
    item.className = "follow-modal-item";
    item.innerHTML = `
      <img src="${user.avatar}" alt="${user.name}" />
      <div>
        <strong>${user.name}</strong>
        <small>${user.title || "Player"}</small>
      </div>
    `;
    listContainer.appendChild(item);
  });
}

function openFollowModal(type) {
  followModalType = type;
  const modal = document.getElementById("followModal");
  if (!modal) {
    return;
  }
  renderFollowList(type);
  modal.classList.add("show");
}

function closeFollowModal() {
  const modal = document.getElementById("followModal");
  if (!modal) {
    return;
  }
  modal.classList.remove("show");
}

function addFollowHandlers() {
  document.querySelectorAll("[data-open-follow]").forEach((button) => {
    button.addEventListener("click", () => {
      openFollowModal(button.dataset.openFollow);
    });
  });

  const closeButton = document.getElementById("closeFollowModal");
  const modal = document.getElementById("followModal");

  if (closeButton) {
    closeButton.addEventListener("click", closeFollowModal);
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeFollowModal();
      }
    });
  }

  document.querySelectorAll(".btn-follow").forEach((button) => {
    const targetId = button.dataset.profileId || getPageProfileId();
    if (!targetId) {
      return;
    }
    button.addEventListener("click", () => toggleFollow(targetId));
  });

  document.querySelectorAll(".suggestion-user button").forEach((button) => {
    const userCard = button.closest(".suggestion-user");
    const name = userCard?.querySelector(".user-info strong")?.textContent.trim();
    if (!name) {
      return;
    }
    const targetId = slugify(name);
    ensureUser(targetId, name);
    button.addEventListener("click", () => toggleFollow(targetId));
  });
}

function refreshFollowUI() {
  updateCounts();
  updateProfileCounts();
  updateFollowButtons();
  if (document.getElementById("followModal")?.classList.contains("show")) {
    renderFollowList(followModalType);
  }
}

function initializeFollowSystem() {
  followData = loadFollowData();
  
  // Set identity if on a club or organization dashboard
  const name = (document.querySelector(".player-card #player-name") || document.querySelector(".profile-card h3"))?.textContent.trim();
  const isDashboard = !document.querySelector(".btn-follow");
  if (isDashboard && name) {
    if (name.includes("Manchister United")) {
      followData.currentUserId = "manchister-united-fc";
      ensureUser(followData.currentUserId, name);
    } else if (name.includes("School Games Federation")) {
      followData.currentUserId = "sgfi-org";
      ensureUser(followData.currentUserId, name);
    }
  }

  addFollowHandlers();
  refreshFollowUI();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeFollowSystem);
} else {
  initializeFollowSystem();
}

window.FollowSystem = {
  toggleFollow,
  refreshFollowUI,
  loadFollowData,
  saveFollowData,
  slugify,
  ensureUser,
  getPageProfileId
};
