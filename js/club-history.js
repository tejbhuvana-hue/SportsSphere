document.addEventListener('DOMContentLoaded', () => {
    
    const historyData = window.EventFlow ? window.EventFlow.getClubHistory() : [];

    const container = document.getElementById('historyCardsContainer');
    const searchInput = document.getElementById('historySearchInput');
    const sportFilter = document.getElementById('historySportFilter');
    const sortOrder = document.getElementById('historySortOrder');

    function renderHistory(data) {
        if (!container) return;
        container.innerHTML = '';
        
        if (data.length === 0) {
            container.innerHTML = `<div style="text-align: center; grid-column: 1/-1; padding: 60px 20px;"><p style="color: #94a3b8;">No records found.</p></div>`;
            return;
        }

        data.forEach(event => {
            const card = document.createElement('div');
            card.className = 'history-card';
            
            card.innerHTML = `
                <div class="history-banner-wrapper">
                    <img src="${event.image}" alt="${event.name}" class="history-banner">
                    <span class="status-badge ${event.statusClass}">${event.status}</span>
                </div>
                <div class="history-content">
                    <h3>${event.name}</h3>
                    <div class="history-info">
                        <div class="info-item">
                            <i class="bi bi-trophy"></i>
                            <span>${event.sport}</span>
                        </div>
                        <div class="info-item">
                            <i class="bi bi-calendar-event"></i>
                            <span>${event.date}</span>
                        </div>
                        <div class="info-item">
                            <i class="bi bi-geo-alt"></i>
                            <span>${event.location}</span>
                        </div>
                    </div>
                    <p class="history-description">${event.description}</p>
                    <div class="history-footer">
                        <div class="history-badges">
                            ${event.badges.map(b => `<span class="badge">${b}</span>`).join('')}
                        </div>
                        <button class="view-details-btn">
                            Reports <i class="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    function filterAndSort() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedSport = sportFilter.value;
        const selectedSort = sortOrder.value;

        let filtered = historyData.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                                item.location.toLowerCase().includes(searchTerm) ||
                                item.description.toLowerCase().includes(searchTerm);
            const matchesSport = selectedSport === 'all' || item.sport === selectedSport;
            return matchesSearch && matchesSport;
        });

        if (selectedSort === 'latest') {
            filtered.sort((a, b) => b.id.toString().localeCompare(a.id.toString()));
        } else {
            filtered.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));
        }

        renderHistory(filtered);
    }

    if (searchInput) searchInput.addEventListener('input', filterAndSort);
    if (sportFilter) sportFilter.addEventListener('change', filterAndSort);
    if (sortOrder) sortOrder.addEventListener('change', filterAndSort);

    renderHistory(historyData);
});
