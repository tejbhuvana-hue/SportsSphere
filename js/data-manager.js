

const STORAGE_KEYS = {
    PLAYERS: 'ss_players',
    COACHES: 'ss_coaches',
    CLUBS: 'ss_clubs',
    ORGANIZATIONS: 'ss_organizations',
    EVENTS: 'ss_events',
    REGISTRATIONS: 'ss_registrations',
    ACTIVITY_LOGS: 'ss_activity_logs'
};

const INITIAL_DATA = {
    PLAYERS: [
        { id: 'P001', name: 'John Doe', email: 'john@example.com', phone: '1234567890', sport: 'Football', location: 'New York, NY', status: 'Approved', role: 'Striker', regDate: '2026-05-01' },
        { id: 'P002', name: 'Jane Smith', email: 'jane@example.com', phone: '9876543210', sport: 'Basketball', location: 'Los Angeles, CA', status: 'Pending', role: 'Point Guard', regDate: '2026-05-10' }
    ],
    COACHES: [
        { id: 'C001', name: 'Mike Ross', email: 'mike@example.com', phone: '5551234567', sport: 'Football', experience: 10, status: 'Approved', certificate: 'cert_001.pdf', regDate: '2026-04-15' },
        { id: 'C002', name: 'Harvey Specter', email: 'harvey@example.com', phone: '5559876543', sport: 'Tennis', experience: 15, status: 'Under Review', certificate: 'cert_002.pdf', regDate: '2026-05-11' }
    ],
    CLUBS: [
        { id: 'CL001', name: 'Red Dragons FC', email: 'info@reddragons.com', phone: '1112223333', sport: 'Football', type: 'Professional', location: 'London, UK', status: 'Approved', admin: 'Alex Ferguson', regDate: '2026-03-20' }
    ],
    ORGANIZATIONS: [
        { id: 'O001', name: 'Global Sports Academy', email: 'contact@globalsports.org', phone: '4445556666', sport: 'Multi-sport', type: 'Academy', location: 'Dubai, UAE', status: 'Approved', admin: 'Zidane Iqbal', regDate: '2026-02-10' }
    ],
    EVENTS: [
        { id: 'E001', title: 'Summer Football Tournament', organizer: 'Red Dragons FC', date: '2026-07-15', location: 'Wembley Stadium', status: 'Upcoming', participants: 120 },
        { id: 'E002', title: 'Basketball Skills Clinic', organizer: 'Global Sports Academy', date: '2026-06-10', location: 'Madison Square Garden', status: 'Pending Approval', participants: 50 }
    ],
    ACTIVITY_LOGS: [
        { id: 1, action: 'Approved Coach Harvey Specter', admin: 'Main Admin', timestamp: new Date().toISOString() },
        { id: 2, action: 'Created New Event: Summer Tournament', admin: 'Main Admin', timestamp: new Date().toISOString() }
    ],
    NOTIFICATIONS: [
        { id: 1, title: 'New Registration', message: 'Coach Mike Ross just registered.', time: '2 mins ago', unread: true },
        { id: 2, title: 'Event Approval', message: 'Basketball Skills Clinic needs approval.', time: '1 hour ago', unread: true },
        { id: 3, title: 'System Update', message: 'Platform maintenance scheduled for Sunday.', time: '5 hours ago', unread: false }
    ]
};

const RANDOM_NAMES = ['Liam Wilson', 'Noah Miller', 'Oliver Davis', 'Elijah Rodriguez', 'James Martinez', 'William Hernandez', 'Benjamin Lopez', 'Lucas Gonzalez', 'Mason Wilson', 'Ethan Anderson'];
const RANDOM_SPORTS = ['Football', 'Basketball', 'Tennis', 'Cricket', 'Swimming', 'Athletics', 'Volleyball', 'Rugby'];
const RANDOM_LOCATIONS = ['London, UK', 'New York, USA', 'Berlin, Germany', 'Tokyo, Japan', 'Paris, France', 'Sydney, Australia'];

class DataManager {
    constructor() {
        this.init();
    }

    init() {
        Object.keys(STORAGE_KEYS).forEach(key => {
            if (!localStorage.getItem(STORAGE_KEYS[key])) {
                localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(INITIAL_DATA[key] || []));
            }
        });
    }

    getData(key) {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS[key])) || [];
    }

    setData(key, data) {
        localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data));
    }

    getItemById(key, id) {
        return this.getData(key).find(item => item.id === id);
    }

    addItem(key, item) {
        const data = this.getData(key);
        item.id = item.id || (Math.random().toString(36).substr(2, 9).toUpperCase());
        item.regDate = item.regDate || new Date().toISOString().split('T')[0];
        item.status = item.status || 'Pending';
        data.push(item);
        this.setData(key, data);
        this.logActivity(`Added new ${key.toLowerCase().replace('ss_', '')}: ${item.name || item.title}`);
        return item;
    }

    updateItem(key, id, updatedFields) {
        let data = this.getData(key);
        data = data.map(item => item.id === id ? { ...item, ...updatedFields } : item);
        this.setData(key, data);
        this.logActivity(`Updated ${key.toLowerCase().replace('ss_', '')} ${id}`);
    }

    deleteItem(key, id) {
        let data = this.getData(key);
        const item = data.find(i => i.id === id);
        data = data.filter(item => item.id !== id);
        this.setData(key, data);
        this.logActivity(`Deleted ${key.toLowerCase().replace('ss_', '')}: ${item ? (item.name || item.title) : id}`);
    }

    logActivity(action) {
        const logs = this.getData('ACTIVITY_LOGS');
        logs.unshift({
            id: Date.now(),
            action,
            admin: 'Main Admin',
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(logs.slice(0, 50)));
    }

    getStats() {
        return {
            players: this.getData('PLAYERS').length,
            coaches: this.getData('COACHES').length,
            clubs: this.getData('CLUBS').length,
            organizations: this.getData('ORGANIZATIONS').length,
            pendingVerifications: [
                ...this.getData('COACHES').filter(c => c.status !== 'Approved'),
                ...this.getData('CLUBS').filter(c => c.status !== 'Approved'),
                ...this.getData('ORGANIZATIONS').filter(o => o.status !== 'Approved')
            ].length,
            activeEvents: this.getData('EVENTS').filter(e => e.status === 'Upcoming').length
        };
    }

    getRandomData(type) {
        switch(type) {
            case 'name': return RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
            case 'sport': return RANDOM_SPORTS[Math.floor(Math.random() * RANDOM_SPORTS.length)];
            case 'location': return RANDOM_LOCATIONS[Math.floor(Math.random() * RANDOM_LOCATIONS.length)];
            default: return '';
        }
    }
}

const adminDataManager = new DataManager();
export default adminDataManager;
