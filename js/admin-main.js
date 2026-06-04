

// Admin session guard check
const sessionUser = JSON.parse(localStorage.getItem('sports_current_user') || 'null');
if (!sessionUser || sessionUser.role !== 'admin') {
    window.location.href = '../login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // Intercept logout clicks
    document.addEventListener("click", (e) => {
        const anchor = e.target.closest("a");
        if (anchor) {
            const text = anchor.textContent.trim().toLowerCase();
            const href = anchor.getAttribute("href");
            if (text.includes("logout") || (href && href.includes("tejbhuvana-hue"))) {
                e.preventDefault();
                localStorage.removeItem('sports_current_user');
                localStorage.removeItem('current_logged_user');
                localStorage.removeItem('current_role');
                localStorage.removeItem('active_session');
                window.location.href = '../login.html';
            }
        }
    });
    
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'icon-btn mobile-toggle';
    toggleBtn.innerHTML = '<i class="bi bi-list"></i>';
    toggleBtn.style.display = 'none';
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.bottom = '20px';
    toggleBtn.style.right = '20px';
    toggleBtn.style.zIndex = '2000';
    
    document.body.appendChild(toggleBtn);


    const checkResponsive = () => {
        if (window.innerWidth <= 768) {
            toggleBtn.style.display = 'flex';
        } else {
            toggleBtn.style.display = 'none';
            sidebar.classList.remove('active');
        }
    };

    window.addEventListener('resize', checkResponsive);
    checkResponsive();

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        toggleBtn.innerHTML = sidebar.classList.contains('active') ? 
            '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
    });


    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !toggleBtn.contains(e.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            toggleBtn.innerHTML = '<i class="bi bi-list"></i>';
        }
    });


    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentPath.includes(href)) {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        }
    });

    document.getElementById('reports-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        UI.showModal({
            title: 'Platform Reports Generator',
            size: 'lg',
            body: `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 10px;">
                    <div class="stat-card" style="cursor: pointer;" onclick="UI.showToast('Generating User Growth Report...', 'info')">
                        <i class="bi bi-file-earmark-bar-graph" style="font-size: 2rem; color: var(--accent-cyan);"></i>
                        <h4>User Growth Report</h4>
                        <p style="font-size: 0.8rem; color: var(--text-secondary);">Monthly registration trends and demographics.</p>
                    </div>
                    <div class="stat-card" style="cursor: pointer;" onclick="UI.showToast('Generating Financial Summary...', 'info')">
                        <i class="bi bi-file-earmark-medical" style="font-size: 2rem; color: var(--success);"></i>
                        <h4>Revenue Summary</h4>
                        <p style="font-size: 0.8rem; color: var(--text-secondary);">Event ticket sales and platform fees.</p>
                    </div>
                    <div class="stat-card" style="cursor: pointer;" onclick="UI.showToast('Generating Activity Audit...', 'info')">
                        <i class="bi bi-file-earmark-lock" style="font-size: 2rem; color: var(--warning);"></i>
                        <h4>Security Audit Log</h4>
                        <p style="font-size: 0.8rem; color: var(--text-secondary);">Recent login attempts and admin actions.</p>
                    </div>
                    <div class="stat-card" style="cursor: pointer;" onclick="UI.showToast('Generating Participation Report...', 'info')">
                        <i class="bi bi-file-earmark-person" style="font-size: 2rem; color: var(--accent-indigo);"></i>
                        <h4>Engagement Report</h4>
                        <p style="font-size: 0.8rem; color: var(--text-secondary);">Event participation and user interaction stats.</p>
                    </div>
                </div>
            `,
            footer: [
                { label: 'Download All (ZIP)', className: 'icon-btn', style: 'background: var(--accent-blue); border: none;', onClick: () => UI.showToast('Preparing download...', 'success') },
                { label: 'Close', className: 'icon-btn' }
            ]
        });
    });

    document.getElementById('settings-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        UI.showToast('Redirecting to System Settings...', 'info');
    });
});
