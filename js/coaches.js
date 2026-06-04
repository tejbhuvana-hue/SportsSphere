import { initModule, createStatusBadge } from './modules-logic.js';
import adminDataManager from './data-manager.js';

document.addEventListener('DOMContentLoaded', () => {
    initModule({
        storageKey: 'COACHES',
        tableId: 'coaches-table',
        renderRow: (coach) => `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(coach.name)}&background=random" style="width: 35px; height: 35px; border-radius: 8px;">
                        <div>
                            <div style="font-weight: 600;">${coach.name}</div>
                            <div style="font-size: 0.75rem; color: var(--text-secondary);">${coach.email}</div>
                        </div>
                    </div>
                </td>
                <td>${coach.sport}</td>
                <td>${coach.experience} Years</td>
                <td>
                    <a href="#" class="icon-btn" style="width: auto; padding: 0 10px; font-size: 0.75rem; gap: 5px; color: var(--accent-cyan);">
                        <i class="bi bi-file-earmark-pdf-fill"></i> ${coach.certificate || 'View Cert'}
                    </a>
                </td>
                <td>${createStatusBadge(coach.status)}</td>
                <td>
                    <div style="display: flex; gap: 8px;">
                        ${coach.status !== 'Approved' ? `
                            <button class="icon-btn" style="color: var(--success);" title="Approve" onclick="handleAction('approve', '${coach.id}')"><i class="bi bi-check-circle-fill"></i></button>
                        ` : ''}
                        <button class="icon-btn" title="Edit" onclick="handleAction('edit', '${coach.id}')"><i class="bi bi-pencil-square"></i></button>
                        <button class="icon-btn" title="Delete" onclick="handleAction('delete', '${coach.id}')" style="color: var(--danger);"><i class="bi bi-trash"></i></button>
                    </div>
                </td>
            </tr>
        `
    });

    document.getElementById('add-coach-btn')?.addEventListener('click', () => {
        UI.showModal({
            title: 'Add New Coach',
            body: `
                <form id="add-coach-form">
                    <div class="form-group"><label>Full Name</label><input type="text" class="form-control" name="name" placeholder="Coach name"></div>
                    <div class="form-group"><label>Email</label><input type="email" class="form-control" name="email" placeholder="coach@example.com"></div>
                    <div class="preview-details">
                        <div class="form-group"><label>Sport</label><input type="text" class="form-control" name="sport" placeholder="Coaching sport"></div>
                        <div class="form-group"><label>Experience</label><input type="number" class="form-control" name="experience" placeholder="Years"></div>
                    </div>
                </form>
            `,
            footer: [{ label: 'Cancel', className: 'icon-btn' }, { label: 'Register Coach', className: 'icon-btn', style: 'background: var(--accent-cyan); border: none; color: var(--bg-primary);', onClick: (e, overlay) => {
                const data = Object.fromEntries(new FormData(overlay.querySelector('#add-coach-form')).entries());
                adminDataManager.addItem('COACHES', data);
                UI.showToast('Coach registered successfully', 'success');
                location.reload();
            }}]
        });
    });
});
