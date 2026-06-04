import { initModule, createStatusBadge } from './modules-logic.js';
import adminDataManager from './data-manager.js';
import { UI } from './ui-components.js';

document.addEventListener('DOMContentLoaded', () => {
    initModule({
        storageKey: 'EVENTS',
        tableId: 'events-table',
        entityName: 'Event',
        renderRow: (event) => `
            <tr>
                <td>
                    <div style="font-weight: 600;">${event.title}</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary);">ID: ${event.id}</div>
                </td>
                <td>${event.organizer}</td>
                <td>
                    <div>${event.date}</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary);">${event.location}</div>
                </td>
                <td>${event.participants} registered</td>
                <td>${createStatusBadge(event.status)}</td>
                <td>
                    <div style="display: flex; gap: 8px;">
                        <button class="icon-btn" title="View Details" onclick="viewEventDetails('${event.id}')"><i class="bi bi-info-circle-fill"></i></button>
                        ${event.status === 'Pending Approval' ? `
                            <button class="icon-btn" style="color: var(--success);" title="Approve" onclick="handleAction('approve', '${event.id}')"><i class="bi bi-check-circle-fill"></i></button>
                        ` : ''}
                        <button class="icon-btn" title="Edit" onclick="handleAction('edit', '${event.id}')"><i class="bi bi-pencil-square"></i></button>
                        <button class="icon-btn" title="Delete" onclick="handleAction('delete', '${event.id}')" style="color: var(--danger);"><i class="bi bi-trash"></i></button>
                    </div>
                </td>
            </tr>
        `
    });

    document.getElementById('add-event-btn')?.addEventListener('click', () => {
        UI.showModal({
            title: 'Create New Event',
            body: `
                <form id="add-event-form">
                    <div class="form-group"><label>Event Title</label><input type="text" class="form-control" name="title" placeholder="Event name"></div>
                    <div class="form-group"><label>Organizer</label><input type="text" class="form-control" name="organizer" placeholder="Club or Org name"></div>
                    <div class="preview-details">
                        <div class="form-group"><label>Date</label><input type="date" class="form-control" name="date"></div>
                        <div class="form-group"><label>Location</label><input type="text" class="form-control" name="location" placeholder="Venue/City"></div>
                    </div>
                </form>
            `,
            footer: [{ label: 'Cancel', className: 'icon-btn' }, { label: 'Create Event', className: 'icon-btn', style: 'background: var(--accent-indigo); border: none;', onClick: (e, overlay) => {
                const data = Object.fromEntries(new FormData(overlay.querySelector('#add-event-form')).entries());
                data.participants = 0;
                adminDataManager.addItem('EVENTS', data);
                UI.showToast('Event created!', 'success');
                location.reload();
            }}]
        });
    });
});

window.viewEventDetails = (id) => {
    const event = adminDataManager.getItemById('EVENTS', id);
    UI.showModal({
        title: 'Event Intelligence Preview',
        size: 'lg',
        body: `
            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 25px;">
                <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 20px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <i class="bi bi-calendar-check-fill" style="font-size: 3rem; color: var(--accent-indigo);"></i>
                        <h3 style="margin-top: 10px;">${event.title}</h3>
                    </div>
                    <div class="detail-item" style="margin-bottom: 15px;"><label>Status</label><span>${event.status}</span></div>
                    <div class="detail-item" style="margin-bottom: 15px;"><label>Total Capacity</label><span>500 Participants</span></div>
                    <div class="detail-item" style="margin-bottom: 15px;"><label>Revenue Projection</label><span>$12,500</span></div>
                </div>
                <div>
                    <h4 style="margin-bottom: 15px;">Registration Trends</h4>
                    <div style="height: 150px; background: rgba(255,255,255,0.05); border-radius: 15px; display: flex; align-items: flex-end; padding: 15px; gap: 5px; margin-bottom: 20px;">
                        ${[20, 50, 80, 40, 90, 70, 100].map(h => `<div style="flex: 1; height: ${h}%; background: var(--accent-indigo); border-radius: 3px; opacity: 0.6;"></div>`).join('')}
                    </div>
                    <h4 style="margin-bottom: 15px;">Quick Roster Preview</h4>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        ${[1, 2, 3].map(() => `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: rgba(255,255,255,0.02); border-radius: 10px;">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(adminDataManager.getRandomData('name'))}&size=30" style="border-radius: 50%;">
                                    <span style="font-size: 0.9rem;">${adminDataManager.getRandomData('name')}</span>
                                </div>
                                <span style="font-size: 0.75rem; color: var(--text-secondary);">Registered 2h ago</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `,
        footer: [
            { label: 'Export Roster', className: 'icon-btn', onClick: () => UI.showToast('Exporting participants list...', 'info') },
            { label: 'Close', className: 'icon-btn' }
        ]
    });
};
