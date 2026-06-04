

export const UI = {
  
    showToast: (message, type = 'info') => {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icon = type === 'success' ? 'check-circle-fill' : type === 'error' ? 'exclamation-circle-fill' : 'info-circle-fill';
        toast.innerHTML = `
            <i class="bi bi-${icon}"></i>
            <span>${message}</span>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    
    showModal: (options) => {
        const { title, body, footer, size = 'md' } = options;
        
        let overlay = document.querySelector('.modal-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            overlay.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title"></h3>
                        <i class="bi bi-x-lg close-modal"></i>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer"></div>
                </div>
            `;
            document.body.appendChild(overlay);
        }

        const content = overlay.querySelector('.modal-content');
        content.style.maxWidth = size === 'lg' ? '800px' : size === 'sm' ? '400px' : '600px';
        overlay.querySelector('.modal-title').textContent = title;
        overlay.querySelector('.modal-body').innerHTML = body;
        
        const footerEl = overlay.querySelector('.modal-footer');
        footerEl.innerHTML = '';
        if (footer) {
            footer.forEach(btn => {
                const button = document.createElement('button');
                button.className = btn.className || 'icon-btn';
                button.style.width = 'auto';
                button.style.padding = '10px 20px';
                button.innerHTML = btn.label;
                button.onclick = (e) => {
                    if (btn.onClick) btn.onClick(e, overlay);
                    if (!btn.preventClose) UI.closeModal();
                };
                footerEl.appendChild(button);
            });
        } else {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'icon-btn';
            closeBtn.style.width = 'auto';
            closeBtn.style.padding = '10px 20px';
            closeBtn.textContent = 'Close';
            closeBtn.onclick = () => UI.closeModal();
            footerEl.appendChild(closeBtn);
        }

        overlay.classList.add('active');
        overlay.querySelector('.close-modal').onclick = () => UI.closeModal();
        overlay.onclick = (e) => { if (e.target === overlay) UI.closeModal(); };
    },

    closeModal: () => {
        const overlay = document.querySelector('.modal-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.querySelector('.modal-body').innerHTML = '';
            }, 300);
        }
    }
};

window.UI = UI; 
