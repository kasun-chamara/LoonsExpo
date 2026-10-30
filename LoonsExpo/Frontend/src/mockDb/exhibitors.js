// Mock data for the exhibitors screens. Replace with API calls when the backend is ready.

export const EXHIBITORS = [
  {
    id: 'ceylon-weave',
    initials: 'CW',
    name: 'Ceylon Weave Studio',
    sector: 'Handicrafts',
    city: 'Matara',
    country: 'Sri Lanka',
    website: 'https://',
    registrationNumber: '[NUMBER]',
    contact: '[NAME]',
    email: '[EMAIL]',
    phone: '[PHONE]',
    status: 'Registered',
    stall: 'A3',
    hall: 'Hall A',
    package: 'Standard',
    payment: 'Paid',
    documents: 'Profile, registration',
    badgeLimit: 5,
    holders: [
      { initials: 'AP', name: 'Anushka Perera', role: 'Representative' },
      { initials: 'KJ', name: 'Kamal Jayasuriya', role: 'Staff' },
      { initials: 'NS', name: 'Nimali Silva', role: 'Staff' },
    ],
  },
  {
    id: 'serendib-spice',
    initials: 'ST',
    name: 'Serendib Spice Traders',
    sector: 'Food and beverage',
    city: 'Galle',
    country: 'Sri Lanka',
    website: 'https://',
    registrationNumber: '[NUMBER]',
    contact: '[NAME]',
    email: '[EMAIL]',
    phone: '[PHONE]',
    status: 'Registered',
    stall: 'B5',
    hall: 'Hall B',
    package: 'Premium',
    payment: 'Paid',
    documents: 'Profile, registration',
    badgeLimit: 8,
    holders: [
      { initials: 'DF', name: 'Dinesh Fernando', role: 'Representative' },
      { initials: 'HW', name: 'Harsha Wijesinghe', role: 'Staff' },
      { initials: 'IP', name: 'Ishara Perera', role: 'Staff' },
      { initials: 'RD', name: 'Roshan De Silva', role: 'Staff' },
    ],
  },
  {
    id: 'island-gem',
    initials: 'IG',
    name: 'Island Gem Exports',
    sector: 'Jewellery',
    city: 'Ratnapura',
    country: 'Sri Lanka',
    website: 'https://',
    registrationNumber: '[NUMBER]',
    contact: '[NAME]',
    email: '[EMAIL]',
    phone: '[PHONE]',
    status: 'In review',
    stall: 'D2',
    hall: 'Hall D',
    package: 'Island',
    payment: 'Not invoiced',
    documents: 'Profile, registration',
    badgeLimit: 10,
    holders: [
      { initials: 'GJ', name: 'Gihan Jayawardena', role: 'Representative' },
      { initials: 'MR', name: 'Malsha Ratnayake', role: 'Staff' },
    ],
  },
];

export const EXHIBITORS_TOTAL = 232;

export const STATUS_TONE = { Registered: 'teal', 'In review': 'amber' };
export const PAYMENT_TONE = { Paid: 'green', 'Not invoiced': 'neutral' };

// Companies that can be used to pre-fill the "Register exhibitor" form, grouped by source tab.
export const CANDIDATES = {
  'Past exhibitors': [
    { id: 'lanka-craft', initials: 'LC', name: 'Lanka Craft House', sector: 'Handicrafts', city: 'Matara', source: 'Last edition' },
    { id: 'serendib-foods', initials: 'SF', name: 'Serendib Foods', sector: 'Food and beverage', city: 'Jaffna', source: 'Last edition' },
  ],
  Applications: [
    { id: 'colombo-coffee', initials: 'CC', name: 'Colombo Coffee House', sector: 'Food and beverage', city: 'Colombo', source: 'Application' },
  ],
  Contacts: [],
  'Import file': [],
};

export const REGISTER_STEPS = ['Find company', 'Check details', 'Stall and package', 'Register'];

export const STALL_PACKAGES = ['Standard', 'Premium', 'Island'];

// Starting values of the "Register exhibitor" form (company fields come from the chosen candidate).
export const REGISTER_FORM_DEFAULTS = {
  website: 'https://',
  regNumber: '',
  staff: '',
  contactName: '',
  jobTitle: '',
  email: '',
  phone: '',
  pkg: 'Standard',
  hall: 'Hall A',
  stall: 'A3 · 3×3 m',
  price: '',
  notes: '',
};

export const REGISTER_OPTIONS = [
  { id: 'skipApproval', title: 'Skip approval', description: 'You are registering this exhibitor yourself', control: { type: 'toggle', on: true } },
  { id: 'contract', title: 'Send the contract to sign online', description: 'Starts the contract step', control: { type: 'toggle', on: true } },
  { id: 'invoice', title: 'Create the invoice now', description: 'They can pay online or by bank transfer', control: { type: 'toggle', on: true } },
  { id: 'checklist', title: 'Send the setup checklist', description: 'Welcome email with the next steps', control: { type: 'toggle', on: true } },
];

export const REGISTER_NEXT = [
  { title: 'Exhibitor record created', caption: 'Right after you register', color: '#F4320B' },
  { title: 'Contract sent', caption: 'If switched on', color: '#2F6FED' },
  { title: 'Invoice and payment', caption: 'Online or bank transfer', color: '#12A150' },
  { title: 'Setup checklist unlocks', caption: 'After payment', color: '#7C4DFF' },
];

export const BADGE_OPTIONS = {
  types: ['Exhibitor staff', 'Exhibitor representative', 'Speaker'],
  days: ['Day 1', 'Day 2', 'Day 3'],
  event: 'SRI LANKA Expo',
};
