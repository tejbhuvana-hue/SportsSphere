import { initModule, createStatusBadge } from './modules-logic.js';
import adminDataManager from './data-manager.js';

document.addEventListener('DOMContentLoaded', () => {
    initModule({
        storageKey: 'PLAYERS',
        tableId: 'players-table',
        renderRow: (player) => `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=random" style="width: 35px; height: 35px; border-radius: 8px;">
                        <div>
                            <div style="font-weight: 600;">${player.name}</div>
                            <div style="font-size: 0.75rem; color: var(--text-secondary);">${player.email}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <div>${player.sport}</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary);">${player.role || 'N/A'}</div>
                </td>
                <td>${player.location}</td>
                <td>${player.regDate}</td>
                <td>${createStatusBadge(player.status)}</td>
                <td>
                    <div style="display: flex; gap: 8px;">
                        <button class="icon-btn" title="View Profile" onclick="handleAction('view', '${player.id}')"><i class="bi bi-eye"></i></button>
                        <button class="icon-btn" title="Edit Player" onclick="handleAction('edit', '${player.id}')"><i class="bi bi-pencil-square"></i></button>
                        <button class="icon-btn" title="Delete Player" onclick="handleAction('delete', '${player.id}')" style="color: var(--danger);"><i class="bi bi-trash"></i></button>
                    </div>
                </td>
            </tr>
        `
    });


    document.getElementById('add-player-btn')?.addEventListener('click', () => {
        UI.showModal({
            title: 'Add New Player',
            body: `
                <form id="add-player-form">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" class="form-control" name="name" placeholder="Enter player name">
                    </div>
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" class="form-control" name="email" placeholder="email@example.com">
                    </div>
                    <div class="preview-details">
                        <div class="form-group">
                            <label>Primary Sport</label>
                            <input type="text" class="form-control" name="sport" placeholder="e.g. Football">
                        </div>
                        <div class="form-group">
                            <label>Location</label>
                            <input type="text" class="form-control" name="location" placeholder="City, State">
                        </div>
                    </div>
                </form>
            `,
            footer: [
                { label: 'Cancel', className: 'icon-btn' },
                { 
                    label: 'Create Player', 
                    className: 'icon-btn', 
                    style: 'background: var(--accent-blue); border: none;',
                    onClick: (e, overlay) => {
                        const formData = new FormData(overlay.querySelector('#add-player-form'));
                        const newData = Object.fromEntries(formData.entries());
                        if (!newData.name || !newData.email) return UI.showToast('Name and Email are required', 'warning');
                        adminDataManager.addItem('PLAYERS', newData);
                        UI.showToast('New player registered!', 'success');
                        location.reload(); 
                    }
                }
            ]
        });
    });
});
