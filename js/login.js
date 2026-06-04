const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");

menuIcon.addEventListener("click", function() {
  navLinks.classList.toggle("active");
});
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); 

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    let user = null;
    let role = null;

    // 1. Check Admin
    if (username === "admin" && password === "123") {
        user = { id: "admin", name: "Super Admin", role: "admin" };
        role = "admin";
    }

    // 2. Check Player
    if (!user) {
        const players = JSON.parse(localStorage.getItem('sports_players')) || [];
        const matched = players.find(p => {
            const isUsernameMatch = p.email === username || p.name === username ||
                ((username === "player" || username === "player1") && p.id === "P001") ||
                (username === "player2" && p.id === "P002") ||
                (username === "player3" && p.id === "P003");
            const isPasswordMatch = p.password === password || 
                (["player", "player1", "player2", "player3"].includes(username) && password === "123");
            return isUsernameMatch && isPasswordMatch;
        });
        if (matched) {
            user = { id: matched.id, name: matched.name, role: "player", club: matched.club };
            role = "player";
        }
    }

    // 3. Check Coach
    if (!user) {
        const coaches = JSON.parse(localStorage.getItem('sports_coaches')) || [];
        const matched = coaches.find(c => {
            const isUsernameMatch = c.email === username || c.name === username ||
                ((username === "coach" || username === "coach1") && c.id === "coach-mike") ||
                (username === "coach2" && c.id === "coach2") ||
                (username === "coach3" && c.id === "coach3");
            const isPasswordMatch = c.password === password || 
                (["coach", "coach1", "coach2", "coach3"].includes(username) && password === "123");
            return isUsernameMatch && isPasswordMatch;
        });
        if (matched) {
            user = { id: matched.id, name: matched.name, role: "coach", connectTarget: matched.connectTarget };
            role = "coach";
        }
    }

    // 4. Check Club
    if (!user) {
        const clubs = JSON.parse(localStorage.getItem('sports_clubs')) || [];
        const matched = clubs.find(cl => {
            const isUsernameMatch = cl.email === username || cl.name === username ||
                ((username === "club" || username === "club1") && cl.id === "club-mu") ||
                (username === "club2" && cl.id === "club2") ||
                (username === "club3" && cl.id === "club3");
            const isPasswordMatch = cl.password === password || 
                (["club", "club1", "club2", "club3"].includes(username) && password === "123");
            return isUsernameMatch && isPasswordMatch;
        });
        if (matched) {
            user = { id: matched.id, name: matched.name, role: "club", association: matched.association };
            role = "club";
        }
    }

    // 5. Check Association
    if (!user) {
        const associations = JSON.parse(localStorage.getItem('sports_associations')) || [];
        const matched = associations.find(a => {
            const isUsernameMatch = a.email === username || a.name === username ||
                ((username === "association" || username === "association1" || username === "organization" || username === "organization1") && a.id === "assoc-sgfi") ||
                ((username === "association2" || username === "organization2") && a.id === "organization2") ||
                ((username === "association3" || username === "organization3") && a.id === "organization3");
            const isPasswordMatch = a.password === password || 
                (["association", "association1", "association2", "association3", "organization", "organization1", "organization2", "organization3"].includes(username) && password === "123");
            return isUsernameMatch && isPasswordMatch;
        });
        if (matched) {
            user = { id: matched.id, name: matched.name, role: "organization" };
            role = "organization";
        }
    }

    if (user) {
        localStorage.setItem('sports_current_user', JSON.stringify(user));
        localStorage.setItem('current_logged_user', user.name);
        localStorage.setItem('current_role', role);
        localStorage.setItem('active_session', 'true');

        if (role === 'player') {
            let folder = 'player1';
            if (user.id === 'P002') folder = 'player2';
            else if (user.id === 'P003') folder = 'player3';
            window.location.href = `player/${folder}/player.html`;
        } else if (role === 'coach') {
            let folder = 'coach1';
            if (user.id === 'coach2') folder = 'coach2';
            else if (user.id === 'coach3') folder = 'coach3';
            window.location.href = `coach/${folder}/coach.html`;
        } else if (role === 'club') {
            let folder = 'club1';
            if (user.id === 'club2') folder = 'club2';
            else if (user.id === 'club3') folder = 'club3';
            window.location.href = `club/${folder}/club.html`;
        } else if (role === 'organization') {
            let folder = 'organization1';
            if (user.id === 'organization2') folder = 'organization2';
            else if (user.id === 'organization3') folder = 'organization3';
            window.location.href = `organization/${folder}/organization.html`;
        } else if (role === 'admin') {
            window.location.href = "admin/admin.html";
        }
    } else {
        alert("Invalid credentials");
        window.location.href = "login.html";
    }
});