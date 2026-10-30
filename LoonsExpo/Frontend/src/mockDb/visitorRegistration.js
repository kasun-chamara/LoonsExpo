// Mock data for visitor registration: the organiser setup screen and the public registration flow.

export const VR_HEADER = {
  title: 'Visitor registration setup',
  subtitle: 'Choose what visitors fill in, how they pay and what ticket they get',
  previewLabel: 'Preview registration page',
  publishLabel: 'Publish changes',
};

export const VR_KPIS = [
  { id: 'registrations', value: '6,240', label: 'Registrations', delta: '+412 today', note: 'since opening', tone: 'up', color: '#F4320B', icon: 'M16 20v-1.5a3.5 3.5 0 00-3.5-3.5h-5A3.5 3.5 0 004 18.5V20M10 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM20 20v-1.5a3.5 3.5 0 00-2.5-3.3M16 5.2a3.5 3.5 0 010 6.6' },
  { id: 'paid', value: '5,974', label: 'Paid and issued', delta: '96%', note: 'of registrations', tone: 'up', color: '#12A150', icon: 'M5 12l4 4 10-10' },
  { id: 'awaiting', value: '142', label: 'Awaiting payment', delta: '18 expiring', note: 'within 15 minutes', tone: 'warn', color: '#D97706', icon: 'M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z' },
  { id: 'free', value: '3,200', label: 'Free tickets', delta: 'Trade visitor', note: 'no payment needed', tone: 'neutral', color: '#2F6FED', icon: 'M3 9V7h18v2a2 2 0 000 6v2H3v-2a2 2 0 000-6zM14 7v10' },
];

export const VR_FLOW = [
  { n: 1, color: '#2F6FED', title: 'Visitor details', text: 'Visitors answer the questions you choose below.' },
  { n: 2, color: '#D97706', title: 'Payment', text: 'Card, bank transfer or online banking.' },
  { n: 3, color: '#12A150', title: 'Ticket with QR code', text: 'Ticket issued and sent by email and SMS.' },
];

// asked: null means the field is always required and cannot be switched off.
export const VR_FORM_FIELDS = [
  { id: 'name', title: 'Full name', description: 'Shown on the badge', asked: null, show: true },
  { id: 'email', title: 'Email address', description: 'Ticket and receipt are sent here', asked: null, show: true },
  { id: 'mobile', title: 'Mobile number', description: 'For the SMS ticket link', asked: null, show: true },
  { id: 'company', title: 'Company', description: 'Printed under the name on the badge', asked: 'Required', show: true },
  { id: 'jobTitle', title: 'Job title', description: 'Helps exhibitors prepare', asked: 'Optional', show: true },
  { id: 'industry', title: 'Industry', description: 'Used to recommend exhibitors', asked: 'Optional', show: true },
  { id: 'country', title: 'Country', description: 'For visitor statistics', asked: 'Required', show: true },
  { id: 'address', title: 'Address', description: 'Street and city', asked: 'Optional', show: true },
  { id: 'source', title: 'How did you hear about us?', description: 'Marketing source', asked: 'Optional', show: false },
];

export const VR_ASKED_OPTIONS = ['Required', 'Optional'];

export const VR_PAYMENT_SETTINGS = [
  { id: 'currency', title: 'Currency', description: 'Shown on tickets and receipts', control: { type: 'select', options: ['LKR', 'USD'], value: 'LKR' } },
  { id: 'card', title: 'Card payments', description: 'Visa and Mastercard through PayHere', control: { type: 'toggle', on: true } },
  { id: 'bank', title: 'Bank transfer', description: 'You approve each transfer by hand', control: { type: 'toggle', on: true } },
  { id: 'online', title: 'Online banking', description: 'Sampath, BOC and Commercial Bank', control: { type: 'toggle', on: true } },
  { id: 'skipFree', title: 'Skip payment for free tickets', description: 'Trade visitor and 100% promo codes', control: { type: 'toggle', on: true } },
  { id: 'hold', title: 'Hold the seat while paying', description: 'Released if payment is not finished', control: { type: 'select', options: ['10 minutes', '15 minutes', '30 minutes'], value: '15 minutes' } },
];

export const VR_AFTER_PAYMENT = [
  { id: 'issue', title: 'Issue the ticket with a QR code', description: 'Created automatically, one per visitor', control: { type: 'toggle', on: true } },
  { id: 'email', title: 'Email the PDF ticket', description: 'Sent to the address they entered', control: { type: 'toggle', on: true } },
  { id: 'sms', title: 'Send an SMS ticket link', description: 'Sent to the mobile number', control: { type: 'toggle', on: true } },
  { id: 'wallet', title: 'Add to phone wallet', description: 'Apple Wallet and Google Wallet', control: { type: 'toggle', on: true } },
  { id: 'reminder', title: 'Reminder the day before', description: 'Includes the QR code and gate', control: { type: 'toggle', on: false } },
];

export const VR_TICKET_SETTINGS = {
  numberFormat: 'SLE-2026-######',
  qrOptions: ['Badge code', 'Ticket number', 'Order number'],
  qrValue: 'Badge code',
  validOptions: ['All 3 days', 'Pick days at checkout'],
  validValue: 'All 3 days',
  gates: 'Gate B or Gate C',
  emailSubject: 'Your ticket for SRI LANKA Expo',
  note: "Exhibitors scan this QR code to collect the visitor's details. Visitors can switch sharing off in their profile.",
};

// ---- Public registration flow ----

export const VR_EVENT = {
  name: 'SRI LANKA Expo',
  brand: 'LoonsExpo',
  line: 'SRI LANKA Expo · 21 to 23 Oct 2026 · BMICH, Colombo',
  help: 'Need help? events@loonslab.lk',
  valid: '21 to 23 Oct 2026',
  gates: 'Gate B or Gate C',
};

export const VR_FLOW_STEPS = ['Your details', 'Payment', 'Your ticket'];

export const VR_TICKET_TYPES = [
  { id: 'trade', name: 'Trade visitor', description: 'All 3 days · Business visitors', price: 2500 },
  { id: 'day', name: 'Day pass', description: 'Single day · Pick a day next', price: 1200 },
  { id: 'vip', name: 'VIP', description: 'All 3 days · Lounge and fast lane', price: 8000 },
];

export const VR_DETAILS_DEFAULTS = {
  name: 'Hiranya Fernando',
  email: 'hiranya@dialog.lk',
  mobile: '+94 77 123 4567',
  company: 'Dialog Axiata',
  jobTitle: 'Head of IT',
  industry: 'Telecommunications',
  country: 'Sri Lanka',
  source: 'Email from the organiser',
  address: 'No. 475, Union Place, Colombo 02, Sri Lanka',
  shareDetails: true,
  agreeTerms: true,
};

export const VR_DETAILS_OPTIONS = {
  industries: ['Telecommunications', 'Software', 'Retail', 'Banking'],
  countries: ['Sri Lanka', 'India', 'Maldives', 'United Kingdom'],
  sources: ['Email from the organiser', 'Social media', 'A friend or colleague', 'Other'],
};

export const VR_PAYMENT_METHODS = [
  { id: 'card', label: 'Card', icon: 'M3 6h18v12H3zM3 10h18M7 15h3' },
  { id: 'bank', label: 'Bank transfer', icon: 'M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18' },
  { id: 'online', label: 'Online banking', icon: 'M8 3h8v18H8zM11 18h2' },
];

export const VR_CARD_DEFAULTS = { holder: 'Hiranya Fernando', number: '4242 4242 4242 4242', expiry: '08 / 28', code: '' };

export const VR_NEXT_STEPS = [
  { id: 'n1', color: '#2F6FED', icon: 'M8 3h8v18H8zM11 18h2', title: 'Keep the ticket on your phone', text: 'Turn your screen brightness up so the gate scanner reads the QR fast.' },
  { id: 'n2', color: '#12A150', icon: 'M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6', title: 'Go to Gate B or Gate C', text: 'Show the QR code. Your badge is printed on the spot.' },
  { id: 'n3', color: '#D97706', icon: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4', title: 'Plan your visit', text: 'Sign in with this email to save sessions and book meetings with exhibitors.' },
];

export const VR_RECEIPT = { paidOn: 'Paid on 22 Oct 2026, 09:52', orderNumber: '#48213', paidWith: 'Visa ending 4242', ticketNumber: 'SLE-2026-048213', badgeCode: 'LX-48213' };
