import adminDataManager from './data-manager.js';
import { UI } from './ui-components.js';

document.addEventListener('DOMContentLoaded', () => {
    updateVerificationStats();
    renderVerifications('all');

    
    document.getElementById('btn-all')?.addEventListener('click', () => { setActiveTab('btn-all'); renderVerifications('all'); });
    document.getElementById('btn-coach')?.addEventListener('click', () => { setActiveTab('btn-coach'); renderVerifications('Coach'); });
    document.getElementById('btn-club')?.addEventListener('click', () => { setActiveTab('btn-club'); renderVerifications('Club'); });
    document.getElementById('btn-org')?.addEventListener('click', () => { setActiveTab('btn-org'); renderVerifications('Organization'); });
});

function setActiveTab(id) {
    document.querySelectorAll('.table-header .icon-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(id)?.classList.add('active');
}

function updateVerificationStats() {
    const coaches = adminDataManager.getData('COACHES').filter(c => c.status !== 'Approved');
    const clubs = adminDataManager.getData('CLUBS').filter(c => c.status !== 'Approved');
    const orgs = adminDataManager.getData('ORGANIZATIONS').filter(o => o.status !== 'Approved');

    if (document.getElementById('pending-coaches')) document.getElementById('pending-coaches').textContent = coaches.length;
    if (document.getElementById('pending-clubs')) document.getElementById('pending-clubs').textContent = clubs.length;
    if (document.getElementById('pending-orgs')) document.getElementById('pending-orgs').textContent = orgs.length;
}

function renderVerifications(filterType) {
    const coaches = adminDataManager.getData('COACHES').filter(c => c.status !== 'Approved').map(c => ({ ...c, type: 'Coach', storageKey: 'COACHES' }));
    const clubs = adminDataManager.getData('CLUBS').filter(c => c.status !== 'Approved').map(c => ({ ...c, type: 'Club', storageKey: 'CLUBS' }));
    const orgs = adminDataManager.getData('ORGANIZATIONS').filter(o => o.status !== 'Approved').map(o => ({ ...o, type: 'Organization', storageKey: 'ORGANIZATIONS' }));

    let combined = [...coaches, ...clubs, ...orgs];
    if (filterType !== 'all') {
        combined = combined.filter(item => item.type === filterType);
    }

    const tbody = document.querySelector('#verifications-table tbody');
    if (!tbody) return;

    tbody.innerHTML = combined.map(item => `
        <tr>
            <td>
                <div style="font-weight: 600;">${item.name}</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">${item.email}</div>
            </td>
            <td><span class="status-badge" style="background: rgba(255,255,255,0.05); color: var(--text-primary);">${item.type}</span></td>
            <td>
                <button class="icon-btn" style="width: auto; padding: 0 10px; font-size: 0.75rem; gap: 5px; color: var(--accent-cyan);" onclick="reviewDocuments('${item.storageKey}', '${item.id}')">
                    <i class="bi bi-file-earmark-check"></i> Review Docs
                </button>
            </td>
            <td>${item.regDate}</td>
            <td>
                <div style="display: flex; gap: 8px;">
                    <button class="icon-btn" style="color: var(--success);" title="Approve" onclick="approveRequest('${item.storageKey}', '${item.id}')"><i class="bi bi-check-lg"></i></button>
                    <button class="icon-btn" style="color: var(--danger);" title="Reject" onclick="rejectRequest('${item.storageKey}', '${item.id}')"><i class="bi bi-x-lg"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

window.reviewDocuments = (key, id) => {
    const item = adminDataManager.getItemById(key, id);
    UI.showModal({
        title: 'Document Verification',
        size: 'lg',
        body: `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <h4 style="margin-bottom: 15px; color: var(--accent-cyan);">Verification Details</h4>
                    <div class="detail-item" style="margin-bottom: 15px;"><label>Certificate ID</label><span>CERT-${id}-${Math.floor(Math.random()*10000)}</span></div>
                    <div class="detail-item" style="margin-bottom: 15px;"><label>Issuing Authority</label><span>National Sports Federation</span></div>
                    <div class="detail-item" style="margin-bottom: 15px;"><label>Issue Date</label><span>2024-10-12</span></div>
                    <div class="detail-item" style="margin-bottom: 15px;"><label>Expiry Date</label><span>2029-10-12</span></div>
                    <div class="form-group">
                        <label>Admin Remarks</label>
                        <textarea class="form-control" rows="3" placeholder="Enter verification notes..."></textarea>
                    </div>
                </div>
                <div style="background: rgba(0,0,0,0.2); border-radius: 15px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 2px dashed rgba(255,255,255,0.1);">
                    <i class="bi bi-file-earmark-pdf" style="font-size: 4rem; color: var(--danger);"></i>
                    <p style="margin-top: 15px; font-weight: 600;">${item.certificate || 'document_preview.pdf'}</p>
                    <button class="icon-btn" style="width: auto; margin-top: 10px;">Download Copy</button>
                </div>
            </div>
        `,
        footer: [
            { label: 'Cancel', className: 'icon-btn' },
            { label: 'Reject', className: 'icon-btn', style: 'background: var(--danger); border: none;', onClick: () => rejectRequest(key, id) },
            { label: 'Approve & Verify', className: 'icon-btn', style: 'background: var(--success); border: none;', onClick: () => approveRequest(key, id) }
        ]
    });
};

window.approveRequest = (key, id) => {
    const item = adminDataManager.getItemById(key, id);
    adminDataManager.updateItem(key, id, { status: 'Approved' });
    UI.showToast(`Account approved for ${item.name}`, 'success');
    updateVerificationStats();
    renderVerifications('all');
};

window.rejectRequest = (key, id) => {
    const item = adminDataManager.getItemById(key, id);
    UI.showModal({
        title: 'Reject Request',
        body: `
            <p>Please provide a reason for rejecting <strong>${item.name}</strong>:</p>
            <textarea class="form-control" id="reject-reason" rows="4" placeholder="Documents unclear, invalid ID, etc..."></textarea>
        `,
        footer: [
            { label: 'Back', className: 'icon-btn' },
            { 
                label: 'Confirm Rejection', 
                className: 'icon-btn', 
                style: 'background: var(--danger); border: none;',
                onClick: (e, overlay) => {
                    const reason = overlay.querySelector('#reject-reason').value;
                    if (!reason) return UI.showToast('Please provide a reason', 'warning');
                    adminDataManager.updateItem(key, id, { status: 'Rejected', rejectionReason: reason });
                    UI.showToast('Request rejected', 'error');
                    updateVerificationStats();
                    renderVerifications('all');
                    UI.closeModal();
                },
                preventClose: true
            }
        ]
    });
};
