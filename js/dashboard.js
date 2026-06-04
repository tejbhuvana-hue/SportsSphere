import adminDataManager from './data-manager.js';
import { UI } from './ui-components.js';

document.addEventListener('DOMContentLoaded', () => {
    updateDashboardStats();
    renderRecentRegistrations();
    renderActivityLogs();
    setupDashboardInteractions();
    renderNotifications();
});

function updateDashboardStats() {
    const stats = adminDataManager.getStats();
    
    document.getElementById('total-players').textContent = stats.players;
    document.getElementById('total-coaches').textContent = stats.coaches;
    document.getElementById('total-clubs').textContent = stats.clubs;
    document.getElementById('active-events').textContent = stats.activeEvents;
}

function renderRecentRegistrations() {
    const players = adminDataManager.getData('PLAYERS');
    const coaches = adminDataManager.getData('COACHES');
    const clubs = adminDataManager.getData('CLUBS');
    
    const combined = [
        ...players.map(p => ({ ...p, type: 'Player' })),
        ...coaches.map(c => ({ ...c, type: 'Coach' })),
        ...clubs.map(cl => ({ ...cl, type: 'Club' }))
    ].sort((a, b) => new Date(b.regDate) - new Date(a.regDate)).slice(0, 5);

    const tbody = document.querySelector('#recent-registrations tbody');
    if (!tbody) return;

    tbody.innerHTML = combined.map(user => `
        <tr>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random" style="width: 32px; height: 32px; border-radius: 50%;">
                    <div>
                        <div style="font-weight: 600;">${user.name}</div>
                        <div style="font-size: 0.75rem; color: var(--text-secondary);">${user.email}</div>
                    </div>
                </div>
            </td>
            <td>${user.type}</td>
            <td>${user.regDate}</td>
            <td>
                <span class="status-badge status-${user.status.toLowerCase().replace(' ', '-')}">${user.status}</span>
            </td>
            <td>
                <button class="icon-btn" onclick="UI.showToast('Viewing detailed profile for ${user.name}', 'info')"><i class="bi bi-eye"></i></button>
            </td>
        </tr>
    `).join('');
}

function renderActivityLogs() {
    const logs = adminDataManager.getData('ACTIVITY_LOGS');
    const container = document.getElementById('activity-logs');
    if (!container) return;

    container.innerHTML = logs.slice(0, 5).map(log => {
        const time = new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `
            <div style="display: flex; gap: 15px; padding: 10px; background: rgba(255,255,255,0.02); border-radius: 10px; border-left: 3px solid var(--accent-cyan); cursor: pointer;" onclick="UI.showToast('Log Details: ${log.action}', 'info')">
                <div style="font-size: 0.8rem; font-weight: 600; color: var(--accent-cyan); min-width: 60px;">${time}</div>
                <div>
                    <div style="font-size: 0.9rem;">${log.action}</div>
                    <div style="font-size: 0.7rem; color: var(--text-secondary);">by ${log.admin}</div>
                </div>
            </div>
        `;
    }).join('');
}

function setupDashboardInteractions() {

    document.querySelectorAll('.stat-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const label = card.querySelector('.stat-label').textContent;
            UI.showModal({
                title: `${label} Analytics`,
                size: 'lg',
                body: `
                    <div style="padding: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
                            <div class="stat-card" style="flex: 1; margin-right: 15px;">
                                <div class="stat-label">Growth (This Month)</div>
                                <div class="stat-value" style="color: var(--success);">+24%</div>
                            </div>
                            <div class="stat-card" style="flex: 1; margin-right: 15px;">
                                <div class="stat-label">Engagement Rate</div>
                                <div class="stat-value" style="color: var(--accent-cyan);">88%</div>
                            </div>
                            <div class="stat-card" style="flex: 1;">
                                <div class="stat-label">Active Users</div>
                                <div class="stat-value" style="color: var(--accent-indigo);">1.2k</div>
                            </div>
                        </div>
                        <div style="height: 200px; background: rgba(255,255,255,0.05); border-radius: 20px; display: flex; align-items: flex-end; padding: 20px; gap: 10px;">
                            ${[40, 70, 45, 90, 65, 80, 95].map(h => `<div style="flex: 1; height: ${h}%; background: var(--accent-cyan); border-radius: 5px 5px 0 0; opacity: 0.7;"></div>`).join('')}
                        </div>
                        <p style="text-align: center; color: var(--text-secondary); margin-top: 15px;">Interactive Data Visualization (Simulation)</p>
                    </div>
                `
            });
        });
    });


    document.querySelector('.admin-profile')?.addEventListener('click', () => {
        UI.showModal({
            title: 'Admin Profile Settings',
            body: `
                <div style="text-align: center; margin-bottom: 25px;">
                    <img src="https://ui-avatars.com/api/?name=Admin&background=06b6d4&color=fff&size=100" style="border-radius: 50%; border: 3px solid var(--accent-cyan);">
                    <h2 style="margin-top: 15px;">Super Admin</h2>
                    <p style="color: var(--text-secondary);">admin@sportssphere.com</p>
                </div>
                <div class="form-group">
                    <label>Display Name</label>
                    <input type="text" class="form-control" value="Super Admin">
                </div>
                <div class="form-group">
                    <label>Notification Preferences</label>
                    <div style="display: flex; gap: 10px; margin-top: 10px;">
                        <button class="icon-btn active" style="width: auto; font-size: 0.8rem;">Email</button>
                        <button class="icon-btn active" style="width: auto; font-size: 0.8rem;">Push</button>
                        <button class="icon-btn" style="width: auto; font-size: 0.8rem;">SMS</button>
                    </div>
                </div>
            `,
            footer: [
                { label: 'Cancel', className: 'icon-btn' },
                { label: 'Save Profile', className: 'icon-btn', style: 'background: var(--accent-blue); border: none;', onClick: () => UI.showToast('Profile updated!', 'success') }
            ]
        });
    });
}

function renderNotifications() {
    const notifyBtn = document.querySelector('.icon-btn i.bi-bell-fill')?.parentElement;
    if (!notifyBtn) return;

    notifyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const notifications = adminDataManager.getData('NOTIFICATIONS');
        UI.showModal({
            title: 'Platform Notifications',
            size: 'sm',
            body: notifications.map(n => `
                <div style="padding: 15px; background: ${n.unread ? 'rgba(6, 182, 212, 0.05)' : 'transparent'}; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer;" onclick="UI.showToast('Notification marked as read', 'info')">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <strong style="${n.unread ? 'color: var(--accent-cyan)' : ''}">${n.title}</strong>
                        <span style="font-size: 0.7rem; color: var(--text-secondary);">${n.time}</span>
                    </div>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 5px;">${n.message}</p>
                </div>
            `).join('') || '<p style="text-align: center; padding: 20px;">No notifications</p>',
            footer: [
                { label: 'Mark All as Read', className: 'icon-btn', onClick: () => UI.showToast('All caught up!', 'success') }
            ]
        });
    });
}
