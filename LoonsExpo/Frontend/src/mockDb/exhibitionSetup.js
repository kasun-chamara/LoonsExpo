// Mock data for the "Create exhibition" setup screens. Replace with API calls when the backend is ready.

export const SETUP_STEPS = [
  { key: 'basics', title: 'Basics', caption: 'Name, dates, venue', heading: 'Basics', subtitle: 'Name, dates, venue, languages and branding', next: 'Continue to halls and stalls' },
  { key: 'stalls', title: 'Halls and stalls', caption: 'Halls, floor plan, prices', heading: 'Halls and stalls', subtitle: 'Halls, floor plan, stall types, rules and prices', next: 'Continue to programme' },
  { key: 'programme', title: 'Programme', caption: 'Agenda, speakers', heading: 'Programme', subtitle: 'Sectors, agenda, speakers and rooms', next: 'Continue to tickets and registration' },
  { key: 'tickets', title: 'Tickets and registration', caption: 'Visitors, exhibitors', heading: 'Tickets and registration', subtitle: 'Visitor tickets, capacity and registration forms', next: 'Continue to payments' },
  { key: 'payments', title: 'Payments', caption: 'Gateways, messages', heading: 'Payments', subtitle: 'Payment methods, messages and reminders', next: 'Continue to review and publish' },
  { key: 'publish', title: 'Review and publish', caption: 'Readiness, go-live', heading: 'Review and publish', subtitle: 'Check readiness, then go live', next: 'Publish exhibition' },
];

// ---- 1. Basics ----

export const BASICS_FORM = {
  name: 'SRI LANKA Expo',
  edition: '',
  shortName: 'SLE',
  slug: 'sri-lanka-expo',
  type: 'trade',
  tagline: 'Meet buyers face to face',
  description:
    'SRI LANKA Expo brings exporters, manufacturers and trade buyers together for business meetings, product launches and seminars. Visitors can plan their route, book meetings and follow up after the show.',
  cta: 'Register now',
  audience: ['Trade buyers', 'Exporters', 'Manufacturers'],
  highlight1: 'Meet hosted buyers',
  highlight2: 'Book B2B meetings in advance',
  highlight3: 'Product launches and seminars',
  organiser: '',
  email: '',
  phone: '',
  hours: 'Mon–Fri, 09:00–17:00',
  expectedExhibitors: '',
  expectedVisitors: '',
  hashtag: '#SriLankaExpo',
  social: 'LinkedIn, Facebook, Instagram',
  startDate: '',
  endDate: '',
  opening: '09:00 – 18:00',
  timeZone: 'Asia/Colombo',
  venue: '',
  city: 'Colombo, Sri Lanka',
  languages: ['English'],
  currencies: ['LKR'],
  tax: true,
  visibility: 'Private draft',
  whiteLabel: false,
};

export const BASICS_OPTIONS = {
  types: [
    { value: 'trade', title: 'Trade exhibition', description: 'For business buyers. Registration is approved.' },
    { value: 'consumer', title: 'Consumer expo', description: 'Open to the public with ticket sales.' },
    { value: 'hybrid', title: 'Hybrid', description: 'Adds a virtual hall after the event.' },
  ],
  audience: ['Trade buyers', 'Exporters', 'Manufacturers', 'Media', 'General public'],
  languages: ['English', 'Sinhala', 'Tamil'],
  currencies: ['LKR', 'USD', 'JPY'],
  visibility: ['Public', 'Invite only', 'Private draft'],
  brandColours: ['#F4320B', '#2F6FED', '#12A150'],
  brandingSlots: ['Logo', 'Banner'],
};

// ---- 2. Halls and stalls ----

export const STALL_TYPES = {
  standard: { code: 'S', color: '#2F6FED', tone: 'blue', label: 'Standard', size: '3×3 m' },
  premium: { code: 'P', color: '#7C4DFF', tone: 'purple', label: 'Premium', size: '6×3 m' },
  island: { code: 'I', color: '#0E9594', tone: 'teal', label: 'Island', size: '6×6 m' },
};

export const HALLS = [
  { name: 'Hall A', area: '[AREA] m²', entrances: 2, stalls: 64, standard: 40, premium: 16, island: 8 },
  { name: 'Hall B', area: '[AREA] m²', entrances: 2, stalls: 72, standard: 46, premium: 18, island: 8 },
  { name: 'Hall C', area: '[AREA] m²', entrances: 1, stalls: 60, standard: 38, premium: 14, island: 8 },
];

export const NEW_HALL_DEFAULTS = { name: 'Hall D', entrances: 2 };

export const NEW_STALLS_DEFAULTS = {
  hall: 'Hall A',
  type: 'standard',
  size: '3×3 m',
  count: 12,
  prefix: 'A',
  start: 1,
  position: 'Standard, Corner or Entrance',
  // Preview layout: one stall type per box, named from the prefix.
  layout: ['standard', 'standard', 'standard', 'standard', 'premium', 'premium', 'standard', 'standard', 'standard', 'standard', 'island', 'island'],
};

export const STALL_PRICING = [
  { type: 'standard', early: '[PRICE]', regular: '[PRICE]', instalments: true },
  { type: 'premium', early: '[PRICE]', regular: '[PRICE]', instalments: true },
  { type: 'island', early: '[PRICE]', regular: '[PRICE]', instalments: false },
];

export const STALL_RULES = [
  { id: 'approval', title: 'Exhibitors request, you approve', description: 'Manual approval', control: { type: 'toggle', on: true } },
];

export const SPONSORSHIPS = [
  { id: 'gold', title: 'Gold', description: '[PRICE] · 2 slots' },
  { id: 'silver', title: 'Silver', description: '[PRICE] · 4 slots' },
];

// ---- 3. Programme ----

export const SECTORS = [
  { label: 'Food and beverage', tone: 'red' },
  { label: 'ICT', tone: 'blue' },
  { label: 'Apparel', tone: 'pink' },
  { label: 'Tourism', tone: 'teal' },
  { label: 'Handicrafts', tone: 'amber' },
];

export const AGENDA = {
  'Day 1': [
    { id: 's1', title: '10:00 · Opening keynote', description: 'Main stage · Speaker to confirm', control: { type: 'tag', tone: 'green', label: 'Confirmed' } },
    { id: 's2', title: '11:30 · Buyer seminar', description: 'Room 2 · 120 seats', control: { type: 'tag', tone: 'amber', label: 'Draft' } },
    { id: 's3', title: '14:00 · Product launches', description: 'Launch stage · 4 slots open', control: { type: 'tag', tone: 'blue', label: 'Open' } },
  ],
  'Day 2': [],
  'Day 3': [],
};

export const SPEAKERS = [
  { id: 'sp1', initials: 'SP', name: 'Speaker name', detail: 'Organisation · Keynote', color: '#2F6FED' },
  { id: 'sp2', initials: 'SP', name: 'Speaker name', detail: 'Organisation · Seminar', color: '#D97706' },
];

export const ROOMS = [
  { id: 'main', title: 'Main stage', description: '400 seats' },
  { id: 'room2', title: 'Room 2', description: '120 seats' },
];

// ---- 4. Tickets and registration ----

export const TICKETS = [
  { id: 'trade', name: 'Trade visitor', pass: 'Full event', price: 'Free', capacity: '[NUMBER]', visible: true },
  { id: 'day', name: 'Day pass', pass: 'Single day', price: '[PRICE]', capacity: '[NUMBER]', visible: true },
  { id: 'vip', name: 'VIP', pass: 'Full event + lounge', price: '[PRICE]', capacity: '[NUMBER]', visible: true },
  { id: 'group', name: 'Group', pass: '10 or more', price: '[PRICE]', capacity: '[NUMBER]', visible: false },
];

export const PRICING_RULES = [
  { id: 'earlyBird', title: 'Early-bird price', description: 'Until [DATE]', control: { type: 'toggle', on: true } },
  { id: 'promo', title: 'Promo codes', description: '3 codes ready', control: { type: 'button', label: 'Manage' } },
  { id: 'refunds', title: 'Refunds', description: 'Until 7 days before', control: { type: 'toggle', on: true } },
];

export const CAPACITY_RULES = [
  { id: 'daily', title: 'Daily limit', description: '[NUMBER] people' },
  { id: 'perSession', title: 'Per session limit', description: 'Set for seminars', control: { type: 'toggle', on: true } },
  { id: 'waiting', title: 'Waiting list when full', control: { type: 'toggle', on: false } },
];

export const EXHIBITOR_REGISTRATION = [
  { id: 'form', title: 'Application form and packages', description: 'Defined in Registration setup', control: { type: 'button', label: 'Open' } },
  { id: 'documents', title: 'Required documents', description: 'Business registration, company profile', control: { type: 'toggle', on: true } },
  { id: 'deadlines', title: 'Deadlines', description: 'Early-bird and final date set', control: { type: 'tag', tone: 'green', label: 'Set' } },
];

// ---- 5. Payments ----

export const PAYMENT_METHODS = [
  { id: 'local', title: 'Local cards', description: 'Gateway connected', control: { type: 'tag', tone: 'green', label: 'Ready' } },
  { id: 'intl', title: 'International cards', description: 'Gateway connected', control: { type: 'tag', tone: 'green', label: 'Ready' } },
  { id: 'bank', title: 'Bank transfer', description: 'Account details on invoices', control: { type: 'toggle', on: true } },
  { id: 'instalments', title: 'Instalments', description: 'Up to 3 payments', control: { type: 'toggle', on: true } },
];

export const MESSAGE_SETTINGS = [
  { id: 'senders', title: 'Senders', description: 'Email, SMS, WhatsApp', control: { type: 'tag', tone: 'amber', label: '2 of 3 ready' } },
  { id: 'emails', title: 'Welcome and ticket emails', description: 'Templates in 3 languages', control: { type: 'toggle', on: true } },
  { id: 'reminders', title: 'Payment-due and deadline reminders', description: 'Sent automatically', control: { type: 'toggle', on: true } },
  { id: 'deadline', title: 'Exhibitor manual deadline', description: '[DATE]' },
];

// ---- 6. Review and publish ----

export const PUBLISH_NOTICE = {
  title: 'Check and enter details before you publish',
  text: 'Review each step and fill in anything missing so your exhibition is ready to go live.',
};

export const READINESS_CHECKS = [
  {
    title: 'Basics',
    caption: 'Name, dates and venue set',
    details: [
      { label: 'Exhibition name', value: 'SRI LANKA Expo' },
      { label: 'Type', value: 'Trade exhibition' },
      { label: 'Dates', value: '[DATES]' },
      { label: 'Venue', value: '[VENUE]' },
      { label: 'Languages', value: 'English, Sinhala, Tamil' },
      { label: 'Currencies', value: 'LKR, USD, JPY' },
    ],
  },
  {
    title: 'Halls and stalls',
    caption: 'Halls, stall types and prices set',
    details: [
      { label: 'Booths', value: '[NUMBER] in total' },
      { label: 'Stall types', value: 'Standard, Premium, Island' },
      { label: 'Early-bird price', value: '[PRICE]' },
      { label: 'Stall approval', value: 'Manual review by organiser' },
      { label: 'Sponsorship', value: 'Gold and Silver packages' },
    ],
  },
  {
    title: 'Programme',
    caption: 'Sectors and agenda added',
    details: [
      { label: 'Sectors', value: 'Food and beverage, ICT, Apparel, Tourism, Handicrafts' },
      { label: 'Agenda', value: '3 days' },
      { label: 'Speakers', value: '2 added' },
      { label: 'Rooms and stages', value: 'Main stage, Room 2' },
    ],
  },
  {
    title: 'Tickets and registration',
    caption: 'Tickets and forms ready',
    details: [
      { label: 'Ticket types', value: 'Trade visitor, Day pass, VIP' },
      { label: 'Daily capacity', value: '[NUMBER] people' },
      { label: 'Promo codes', value: '3 ready' },
      { label: 'Refunds', value: 'Until 7 days before' },
      { label: 'Exhibitor registration', value: 'Form and packages set' },
      { label: 'Trade visitor approval', value: 'Manual verification' },
    ],
  },
  {
    title: 'Payments',
    caption: 'Gateways connected',
    details: [
      { label: 'Local cards', value: 'Connected' },
      { label: 'International cards', value: 'Connected' },
      { label: 'Bank transfer', value: 'On' },
      { label: 'Instalments', value: 'Up to 3 payments' },
      { label: 'Message senders', value: 'Email and SMS ready' },
      { label: 'Reminders', value: 'Payment due and deadlines' },
    ],
  },
];

export const POSTPONE_CANCEL = [
  { id: 'postpone', title: 'Postpone', description: 'Move dates and notify exhibitors and visitors', control: { type: 'button', label: 'Postpone' } },
  { id: 'cancel', title: 'Cancel', description: 'Refund tickets and stall fees with one workflow', control: { type: 'button', label: 'Cancel exhibition' } },
];
