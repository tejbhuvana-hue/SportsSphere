import { initModule, createStatusBadge } from './modules-logic.js';
import adminDataManager from './data-manager.js';

document.addEventListener('DOMContentLoaded', () => {
    initModule({
        storageKey: 'CLUBS',
        tableId: 'clubs-table',
        renderRow: (club) => `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(club.name)}&background=random" style="width: 35px; height: 35px; border-radius: 8px;">
                        <div>
                            <div style="font-weight: 600;">${club.name}</div>
                            <div style="font-size: 0.75rem; color: var(--text-secondary);">${club.email}</div>
                        </div>
                    </div>
                </td>
                <td>${club.type}</td>
                <td>${club.sport}</td>
                <td>${club.admin}</td>
                <td>${createStatusBadge(club.status)}</td>
                <td>
                    <div style="display: flex; gap: 8px;">
                        <button class="icon-btn" title="View Details" onclick="handleAction('view', '${club.id}')"><i class="bi bi-info-circle-fill"></i></button>
                        <button class="icon-btn" title="Edit" onclick="handleAction('edit', '${club.id}')"><i class="bi bi-pencil-square"></i></button>
                        <button class="icon-btn" title="Delete" onclick="handleAction('delete', '${club.id}')" style="color: var(--danger);"><i class="bi bi-trash"></i></button>
                    </div>
                </td>
            </tr>
        `
    });


    document.getElementById('add-club-btn')?.addEventListener('click', () => {
        UI.showModal({
            title: 'Register New Club',
            body: `
                <form id="add-club-form">
                    <div class="form-group"><label>Club Name</label><input type="text" class="form-control" name="name" placeholder="Club name"></div>
                    <div class="form-group"><label>Official Email</label><input type="email" class="form-control" name="email" placeholder="club@example.com"></div>
                    <div class="preview-details">
                        <div class="form-group"><label>Club Type</label><input type="text" class="form-control" name="type" placeholder="e.g. Academy"></div>
                        <div class="form-group"><label>Admin Name</label><input type="text" class="form-control" name="admin" placeholder="Primary admin"></div>
                    </div>
                </form>
            `,
            footer: [{ label: 'Cancel', className: 'icon-btn' }, { label: 'Register Club', className: 'icon-btn', style: 'background: var(--accent-indigo); border: none;', onClick: (e, overlay) => {
                const data = Object.fromEntries(new FormData(overlay.querySelector('#add-club-form')).entries());
                adminDataManager.addItem('CLUBS', data);
                UI.showToast('Club registered!', 'success');
                location.reload();
            }}]
        });
    });
});
