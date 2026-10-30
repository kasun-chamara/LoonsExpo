// Mock data for the profile page and the account menu. Replace with API calls when the backend is ready.

export const PROFILE_DEFAULTS = {
  name: 'Admin User',
  email: 'admin@example.com',
  phone: '+94 77 123 4567',
  location: 'Colombo, Sri Lanka',
  department: 'Event team',
  joinDate: 'January 15, 2023',
};

// The rows shown on the profile card. `icon` is a 24x24 stroke path.
export const PROFILE_FIELDS = [
  { key: 'name', label: 'Name', icon: 'M16 20v-1.5a3.5 3.5 0 00-3.5-3.5h-5A3.5 3.5 0 004 18.5V20M10 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7z', editable: true },
  { key: 'email', label: 'Email', icon: 'M3 6h18v12H3zM3 7l9 6 9-6', editable: true, type: 'email' },
  { key: 'phone', label: 'Phone', icon: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z', editable: true, type: 'tel' },
  { key: 'location', label: 'Location', icon: 'M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z', editable: true },
  { key: 'department', label: 'Department', icon: 'M4 8h16v11H4zM9 8V5h6v3', editable: true },
  { key: 'joinDate', label: 'Join date', icon: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4', editable: false },
];

export const PROFILE_STATS = [
  { label: 'Exhibitions managed', value: '3' },
  { label: 'Badges issued', value: '128' },
  { label: 'Meetings arranged', value: '24' },
];

export const PROFILE_PREFERENCES = [
  { id: 'twofactor', title: 'Two-factor sign-in', description: 'Ask for a code each time you sign in', control: { type: 'toggle', on: true } },
  { id: 'emails', title: 'Email notifications', description: 'Daily summary of registrations and payments', control: { type: 'toggle', on: true } },
  { id: 'sms', title: 'SMS alerts', description: 'Only for gate and payment problems', control: { type: 'toggle', on: false } },
];

export const ACCOUNT_MENU_DEFAULT_ROLE = 'User';
