// Mock data for the Settings screens. Replace with API calls when the backend is ready.

export const SETTINGS_TABS = [
  { value: 'Organisation', label: 'Organisation', icon: 'M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6' },
  { value: 'Team', label: 'Team', icon: 'M16 20v-1.5a3.5 3.5 0 00-3.5-3.5h-5A3.5 3.5 0 004 18.5V20M10 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM20 20v-1.5a3.5 3.5 0 00-2.5-3.3M16 5.2a3.5 3.5 0 010 6.6' },
  { value: 'Language', label: 'Language', icon: 'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18' },
  { value: 'Payments', label: 'Payments', icon: 'M3 6h18v12H3zM3 10h18M7 15h3' },
  { value: 'Audit log', label: 'Audit log', icon: 'M6 3h9l3 3v15H6zM9 11h6M9 15h6M9 7h3' },
  { value: 'Active logs', label: 'Active logs', icon: 'M3 12h4l3-8 4 16 3-8h4' },
];

// ---- Organisation ----

export const ORGANISATION = {
  name: 'Loons Lab',
  legalName: 'Loons Lab (Pvt) Ltd',
  email: 'events@loonslab.lk',
  phone: '+94 11 234 5678',
  website: 'https://loonslab.lk',
  registrationNumber: 'PV 00245817',
  address: 'No. 42, Galle Road, Colombo 03',
  city: 'Colombo',
  country: 'Sri Lanka',
};

export const COUNTRIES = ['Sri Lanka', 'India', 'Maldives', 'United Kingdom'];

export const BRAND_COLOURS = ['#FF0000', '#00BCD1', '#00D146', '#F59E0B', '#7C3AED'];

export const EVENT_DEFAULTS = [
  { id: 'currency', title: 'Default currency', description: 'Used for tickets and stall prices', control: { type: 'select', options: ['LKR', 'USD', 'EUR'], value: 'LKR' } },
  { id: 'days', title: 'Show days', description: 'Typical length of an exhibition', control: { type: 'select', options: ['1 day', '2 days', '3 days', '4 days', '5 days'], value: '3 days' } },
  { id: 'directory', title: 'Public exhibitor directory', description: 'List approved exhibitors on the event page', control: { type: 'toggle', on: true } },
  { id: 'visitors', title: 'Allow visitor registration', description: 'Visitors can buy tickets online', control: { type: 'toggle', on: true } },
];

// ---- Team ----

export const TEAM_KPIS = [
  { id: 'members', value: '8', label: 'Team members', color: '#F4320B', icon: 'M16 20v-1.5a3.5 3.5 0 00-3.5-3.5h-5A3.5 3.5 0 004 18.5V20M10 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM20 20v-1.5a3.5 3.5 0 00-2.5-3.3M16 5.2a3.5 3.5 0 010 6.6' },
  { id: 'admins', value: '2', label: 'Admins', color: '#2F6FED', icon: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z' },
  { id: 'pending', value: '2', label: 'Pending invites', color: '#D97706', icon: 'M3 6h18v12H3zM3 7l9 6 9-6' },
  { id: 'twofactor', value: '6 of 8', label: 'Using two-factor', color: '#12A150', icon: 'M5 11h14v9H5zM8 11V8a4 4 0 018 0v3' },
];

export const ROLE_TONE = { Owner: 'brand', Admin: 'blue', Manager: 'purple', Staff: 'neutral' };
export const MEMBER_STATUS_TONE = { Active: 'green', Invited: 'amber' };

export const TEAM_MEMBERS = [
  { id: 'kw', initials: 'KW', name: 'Kasun Wijebandara', email: 'kasun@loonslab.lk', role: 'Owner', access: 'All events', lastActive: 'Active now', status: 'Active' },
  { id: 'np', initials: 'NP', name: 'Nadeesha Perera', email: 'nadeesha@loonslab.lk', role: 'Admin', access: 'All events', lastActive: '5 min ago', status: 'Active' },
  { id: 'ms', initials: 'MS', name: 'Mahesh Silva', email: 'mahesh@loonslab.lk', role: 'Admin', access: 'All events', lastActive: '1 hour ago', status: 'Active' },
  { id: 'sw', initials: 'SW', name: 'Shalini Weerasinghe', email: 'shalini@loonslab.lk', role: 'Manager', access: 'SRI LANKA Expo', lastActive: 'Today, 09:12', status: 'Active' },
  { id: 'rj', initials: 'RJ', name: 'Ruwan Jayasena', email: 'ruwan@loonslab.lk', role: 'Manager', access: 'SRI LANKA Expo', lastActive: 'Yesterday', status: 'Active' },
  { id: 'ds', initials: 'DS', name: 'Dilini Silva', email: 'dilini@loonslab.lk', role: 'Staff', access: 'Registration desk', lastActive: '2 days ago', status: 'Active' },
  { id: 'tf', initials: 'TF', name: 'Tharindu Fernando', email: 'tharindu@loonslab.lk', role: 'Staff', access: 'Registration desk', lastActive: 'Not joined yet', status: 'Invited' },
  { id: 'ig', initials: 'IG', name: 'Ishara Gunasekara', email: 'ishara@loonslab.lk', role: 'Staff', access: 'Badge printing', lastActive: 'Not joined yet', status: 'Invited' },
];

export const ROLES = [
  { role: 'Owner', description: 'Full control, billing and deleting the organisation' },
  { role: 'Admin', description: 'Manage events, team members and settings' },
  { role: 'Manager', description: 'Run one exhibition: exhibitors, tickets, meetings' },
  { role: 'Staff', description: 'Desk work: registration, badges and check-in' },
];

export const INVITE_DEFAULTS = {
  name: '',
  email: '',
  role: 'Staff',
  access: 'All events',
  permissions: ['Manage exhibitors', 'Issue badges'],
};

export const INVITE_OPTIONS = {
  roles: ['Admin', 'Manager', 'Staff'],
  access: ['All events', 'SRI LANKA Expo'],
  permissions: ['Manage exhibitors', 'Issue badges', 'Sell tickets', 'View finance'],
};

// ---- Language ----

export const LANGUAGE_REGION = [
  { id: 'ui', title: 'Interface language', description: 'The console language for your team', control: { type: 'select', options: ['English', 'Sinhala', 'Tamil'], value: 'English' } },
  { id: 'tz', title: 'Time zone', description: 'Used for meeting times and check-in logs', control: { type: 'select', options: ['UTC+05:30 · Colombo', 'UTC+00:00 · London', 'UTC+04:00 · Dubai'], value: 'UTC+05:30 · Colombo' } },
  { id: 'date', title: 'Date format', description: 'Example: 21 Oct 2026', control: { type: 'select', options: ['21 Oct 2026', '21/10/2026', '2026-10-21', 'Oct 21, 2026'], value: '21 Oct 2026' } },
  { id: 'time', title: 'Time format', description: 'Used on schedules and tickets', control: { type: 'segment', options: ['12-hour', '24-hour'], value: '24-hour' } },
  { id: 'currency', title: 'Currency', description: 'Default for prices and invoices', control: { type: 'select', options: ['LKR · Rupee', 'USD · Dollar', 'EUR · Euro'], value: 'LKR · Rupee' } },
  { id: 'week', title: 'Week starts on', description: 'Calendars and availability pickers', control: { type: 'select', options: ['Monday', 'Sunday', 'Saturday'], value: 'Monday' } },
];

export const EVENT_LANGUAGES = [
  { id: 'en', flag: 'En', name: 'English', percent: 100, color: '#16A34A', on: true, isDefault: true },
  { id: 'si', flag: 'Si', name: 'Sinhala', percent: 94, color: '#16A34A', on: true },
  { id: 'ta', flag: 'Ta', name: 'Tamil', percent: 88, color: '#16A34A', on: true },
  { id: 'hi', flag: 'Hi', name: 'Hindi', percent: 42, color: '#F59E0B', on: false },
  { id: 'zh', flag: 'Zh', name: 'Chinese', percent: 18, color: '#E8300B', on: false },
];

export const OUTGOING_LANGUAGE = {
  email: { label: 'Email language', options: ['Match the recipient', 'English', 'Sinhala', 'Tamil'], value: 'Match the recipient' },
  badge: { label: 'Badge and ticket language', options: ['English', 'English and Sinhala', 'English and Tamil', 'All three'], value: 'English' },
};

// ---- Payments ----

export const SETTINGS_PAYMENT_METHODS = [
  { id: 'card', title: 'Card payments', description: 'Visa and Mastercard', control: { type: 'toggle', on: true } },
  { id: 'bank', title: 'Bank transfer', description: 'With payment slip upload', control: { type: 'toggle', on: true } },
  { id: 'cash', title: 'Cash at desk', description: 'Recorded by registration staff', control: { type: 'toggle', on: true } },
  { id: 'online', title: 'Online banking', description: 'Local bank gateways', control: { type: 'toggle', on: false } },
];

export const PAYOUT_ACCOUNT = {
  name: 'Loons Lab (Pvt) Ltd',
  bank: 'Commercial Bank · Colombo 03',
  account: 'Account ending 4821',
};

export const PAYOUT_SETTINGS = [
  { id: 'schedule', title: 'Payout schedule', description: 'How often collected money is sent to your bank', control: { type: 'select', options: ['Weekly', 'After each event day', 'Monthly'], value: 'After each event day' } },
  { id: 'currency', title: 'Payout currency', description: 'Currency used for transfers', control: { type: 'select', options: ['LKR · Rupee', 'USD · Dollar'], value: 'LKR · Rupee' } },
];

// ---- Audit log ----

export const AUDIT_FILTERS = {
  people: ['Kasun Wijebandara', 'Nadeesha Perera'],
  actions: ['Sign-ins', 'Tickets', 'Exhibitors', 'Team and roles'],
  ranges: ['Today', 'Last 7 days', 'Last 30 days'],
};

export const AUDIT_ROWS = [
  { id: 1, time: '14:32:08', date: '21 Oct 2026', initials: 'KW', person: 'Kasun Wijebandara', action: 'Updated ticket price', actionTone: 'blue', item: 'Tickets · Standard day pass', ip: '112.134.18.40', result: 'Success', resultTone: 'green' },
  { id: 2, time: '14:10:41', date: '21 Oct 2026', initials: 'NP', person: 'Nadeesha Perera', action: 'Issued badges', actionTone: 'purple', item: 'Ceylon Weave Studio · 3 badges', ip: '112.134.18.52', result: 'Success', resultTone: 'green' },
  { id: 3, time: '13:48:22', date: '21 Oct 2026', initials: 'MS', person: 'Mahesh Silva', action: 'Approved exhibitor', actionTone: 'green', item: 'Island Build Mart · D1', ip: '175.157.22.8', result: 'Success', resultTone: 'green' },
  { id: 4, time: '13:30:00', date: '21 Oct 2026', initials: 'SY', person: 'System', action: 'Sent meeting reminders', actionTone: 'blue', item: '36 meetings · Day 2', ip: '—', result: 'Success', resultTone: 'green' },
  { id: 5, time: '12:57:15', date: '21 Oct 2026', initials: 'RJ', person: 'Ruwan Jayasena', action: 'Sign-in attempt', actionTone: 'red', item: 'Wrong password (2nd try)', ip: '175.157.9.12', result: 'Failed', resultTone: 'red' },
  { id: 6, time: '12:20:03', date: '21 Oct 2026', initials: 'KW', person: 'Kasun Wijebandara', action: 'Invited team member', actionTone: 'blue', item: 'tharindu@loonslab.lk', ip: '112.134.18.40', result: 'Success', resultTone: 'green' },
  { id: 7, time: '11:42:50', date: '21 Oct 2026', initials: 'SW', person: 'Shalini Weerasinghe', action: 'Exported exhibitor list', actionTone: 'purple', item: 'CSV · 232 rows', ip: '112.134.18.61', result: 'Success', resultTone: 'green' },
  { id: 8, time: '11:05:27', date: '21 Oct 2026', initials: 'NP', person: 'Nadeesha Perera', action: 'Changed role', actionTone: 'blue', item: 'Dilini Silva: Manager to Staff', ip: '112.134.18.52', result: 'Success', resultTone: 'green' },
  { id: 9, time: '10:31:09', date: '21 Oct 2026', initials: 'MS', person: 'Mahesh Silva', action: 'Deleted promo code', actionTone: 'neutral', item: 'EARLY20 · 14 uses', ip: '175.157.22.8', result: 'Review', resultTone: 'amber' },
  { id: 10, time: '09:58:36', date: '21 Oct 2026', initials: 'KW', person: 'Kasun Wijebandara', action: 'Changed security setting', actionTone: 'neutral', item: 'Two-factor required for all', ip: '112.134.18.40', result: 'Success', resultTone: 'green' },
];

export const AUDIT_TOTAL = 248;

// ---- Active logs ----

export const ACTIVE_KPIS = [
  { id: 'now', value: '4', label: 'Signed in now', color: '#12A150', icon: 'M9 4H5a1 1 0 00-1 1v14a1 1 0 001 1h4M16 8l4 4-4 4M20 12H9' },
  { id: 'today', value: '18', label: 'Sign-ins today', color: '#2F6FED', icon: 'M16 20v-1.5a3.5 3.5 0 00-3.5-3.5h-5A3.5 3.5 0 004 18.5V20M10 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7z' },
  { id: 'failed', value: '2', label: 'Failed attempts', color: '#D97706', icon: 'M12 4l9 16H3zM12 10v4M12 17v.5' },
  { id: 'blocked', value: '0', label: 'Blocked today', color: '#F4320B', icon: 'M12 3a9 9 0 100 18 9 9 0 000-18zM6 6l12 12' },
];

export const SESSIONS = [
  { id: 'd1', icon: 'M3 5h18v11H3zM8 20h8M12 16v4', device: 'Windows · Chrome 141', detail: 'Kasun Wijebandara · Colombo, Sri Lanka · 112.134.18.40', current: true },
  { id: 'd2', icon: 'M8 3h8v18H8zM11 18h2', device: 'iPhone 15 · Safari', detail: 'Nadeesha Perera · Colombo, Sri Lanka · 112.134.18.52', activity: 'Active 5 min ago' },
  { id: 'd3', icon: 'M5 6h14v10H5zM2 19h20', device: 'MacBook Air · Chrome 141', detail: 'Mahesh Silva · Kandy, Sri Lanka · 175.157.22.8', activity: 'Active 1 hour ago' },
  { id: 'd4', icon: 'M5 3h14v18H5zM11 18h2', device: 'Android tablet · Registration desk', detail: 'Dilini Silva · Hall A, Colombo · 112.134.18.77', activity: 'Active 12 min ago' },
];

export const LIVE_FEED = [
  { id: 'f1', tone: 'brand', icon: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2', title: 'Badge issued', detail: 'Ceylon Weave Studio · 3 badges · Nadeesha P.', time: '2 min ago' },
  { id: 'f2', tone: 'blue', icon: 'M3 9V7h18v2a2 2 0 000 6v2H3v-2a2 2 0 000-6zM14 7v10', title: '12 tickets sold', detail: 'Standard day pass · online checkout', time: '9 min ago' },
  { id: 'f3', tone: 'green', icon: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4', title: 'Meeting confirmed', detail: 'Ceylon Spice Co. · Day 2 · 14:00 · Hall A', time: '18 min ago' },
  { id: 'f4', tone: 'purple', icon: 'M9 4H5a1 1 0 00-1 1v14a1 1 0 001 1h4M16 8l4 4-4 4M20 12H9', title: 'Signed in', detail: 'Dilini Silva · Android tablet · Hall A', time: '25 min ago' },
  { id: 'f5', tone: 'amber', icon: 'M12 4l9 16H3zM12 10v4M12 17v.5', title: 'Failed sign-in', detail: 'Ruwan Jayasena · wrong password · 175.157.9.12', time: '1 hour ago' },
];
