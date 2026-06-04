import { UI } from './ui-components.js';

export function initModule(config) {
    const { 
        storageKey, 
        tableId, 
        renderRow,
        entityName = 'Record'
    } = config;

    const renderTable = () => {
        const data = adminDataManager.getData(storageKey);
        const tbody = document.querySelector(`#${tableId} tbody`);
        if (!tbody) return;

        const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
        const statusFilter = document.getElementById('status-filter')?.value || 'All';

        const filteredData = data.filter(item => {
            const matchesSearch = (item.name || item.title || '').toLowerCase().includes(searchTerm) || 
                                (item.email || '').toLowerCase().includes(searchTerm) ||
                                (item.id || '').toLowerCase().includes(searchTerm);
            const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
            return matchesSearch && matchesStatus;
        });

        tbody.innerHTML = filteredData.map(item => renderRow(item)).join('');
        
        const countEl = document.getElementById(`${storageKey.toLowerCase().replace('ss_', '').slice(0,-1)}-count`);
        if (countEl) countEl.textContent = filteredData.length;
    };


    document.getElementById('search-input')?.addEventListener('input', renderTable);
    document.getElementById('status-filter')?.addEventListener('change', renderTable);

    window.handleAction = (action, id) => {
        const item = adminDataManager.getItemById(storageKey, id);
        if (!item) return;

        if (action === 'delete') {
            UI.showModal({
                title: `Delete ${entityName}`,
                body: `
                    <div style="text-align: center; padding: 20px;">
                        <i class="bi bi-exclamation-triangle" style="font-size: 3rem; color: var(--danger);"></i>
                        <p style="margin-top: 20px; font-size: 1.1rem;">Are you sure you want to delete <strong>${item.name || item.title}</strong>?</p>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">This action cannot be undone and will remove all associated data.</p>
                    </div>
                `,
                footer: [
                    { label: 'Cancel', className: 'icon-btn' },
                    { 
                        label: 'Delete Permanently', 
                        className: 'icon-btn', 
                        onClick: () => {
                            adminDataManager.deleteItem(storageKey, id);
                            renderTable();
                            UI.showToast(`${entityName} deleted successfully`, 'error');
                        },
                        style: 'background: var(--danger); border: none;'
                    }
                ]
            });
        } else if (action === 'view') {
            UI.showModal({
                title: `${entityName} Details`,
                size: 'lg',
                body: `
                    <div class="preview-grid">
                        <div class="preview-sidebar">
                            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(item.name || item.title)}&background=random&size=120" class="preview-avatar">
                            <h3>${item.name || item.title}</h3>
                            <span class="status-badge status-${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span>
                            <p style="color: var(--text-secondary); font-size: 0.85rem;">Member since ${item.regDate}</p>
                        </div>
                        <div class="preview-details">
                            <div class="detail-item"><label>Email</label><span>${item.email || 'N/A'}</span></div>
                            <div class="detail-item"><label>Phone</label><span>${item.phone || 'N/A'}</span></div>
                            <div class="detail-item"><label>Sport</label><span>${item.sport || 'N/A'}</span></div>
                            <div class="detail-item"><label>Location</label><span>${item.location || 'N/A'}</span></div>
                            ${item.type ? `<div class="detail-item"><label>Type</label><span>${item.type}</span></div>` : ''}
                            ${item.admin ? `<div class="detail-item"><label>Admin</label><span>${item.admin}</span></div>` : ''}
                            ${item.experience ? `<div class="detail-item"><label>Experience</label><span>${item.experience} Years</span></div>` : ''}
                        </div>
                    </div>
                `
            });
        } else if (action === 'edit') {
            UI.showModal({
                title: `Edit ${entityName}`,
                body: `
                    <form id="edit-form">
                        <div class="form-group">
                            <label>Full Name / Title</label>
                            <input type="text" class="form-control" name="name" value="${item.name || item.title}">
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" class="form-control" name="email" value="${item.email || ''}">
                        </div>
                        <div class="preview-details">
                             <div class="form-group">
                                <label>Sport</label>
                                <input type="text" class="form-control" name="sport" value="${item.sport || ''}">
                            </div>
                            <div class="form-group">
                                <label>Status</label>
                                <select class="form-control" name="status">
                                    <option value="Pending" ${item.status === 'Pending' ? 'selected' : ''}>Pending</option>
                                    <option value="Approved" ${item.status === 'Approved' ? 'selected' : ''}>Approved</option>
                                    <option value="Rejected" ${item.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                                    <option value="Suspended" ${item.status === 'Suspended' ? 'selected' : ''}>Suspended</option>
                                </select>
                            </div>
                        </div>
                    </form>
                `,
                footer: [
                    { label: 'Cancel', className: 'icon-btn' },
                    { 
                        label: 'Save Changes', 
                        className: 'icon-btn', 
                        onClick: (e, overlay) => {
                            const formData = new FormData(overlay.querySelector('#edit-form'));
                            const updates = Object.fromEntries(formData.entries());
                            adminDataManager.updateItem(storageKey, id, updates);
                            renderTable();
                            UI.showToast(`${entityName} updated successfully`, 'success');
                        },
                        style: 'background: var(--accent-blue); border: none;'
                    }
                ]
            });
        }
    };

    
    renderTable();
}

export function createStatusBadge(status) {
    const statusClass = status.toLowerCase().replace(' ', '-');
    return `<span class="status-badge status-${statusClass}">${status}</span>`;
}
