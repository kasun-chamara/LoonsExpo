// Mock data for the Dashboard. Replace with API calls when the backend is ready.

export const DASHBOARD_RANGES = ['Today', 'Day 1', 'All days'];

export const DASHBOARD_HEADER = {
  exportLabel: 'Export report',
};

export const DASHBOARD_HERO = {
  eyebrow: 'SRI LANKA Expo · Colombo',
  title: 'Day 2 of 3 is going strong',
  text: '1,248 visitors are in the venue right now and Gate A is the busiest. Sales are 8% ahead of last week.',
  days: ['21 Oct', '22 Oct', '23 Oct'],
  currentDay: 1,
  actions: [
    { id: 'scan', label: 'Scan badge', primary: true, path: '/scan' },
    { id: 'badges', label: 'Issue badges', path: '/exhibitors' },
    { id: 'invoice', label: 'Create invoice', path: '/finance' },
  ],
};

export const DASHBOARD_KPIS = [
  {
    id: 'visitors', label: 'Visitors checked in', value: '6,482', delta: '12.0%', deltaNote: 'vs Day 1', up: true, color: '#F4320B',
    icon: 'M16 20v-1.5a3.5 3.5 0 00-3.5-3.5h-5A3.5 3.5 0 004 18.5V20M10 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM20 20v-1.5a3.5 3.5 0 00-2.5-3.3M16 5.2a3.5 3.5 0 010 6.6',
    spark: [20, 38, 52, 60, 47, 44, 55, 40, 30, 12],
  },
  {
    id: 'revenue', label: 'Revenue', value: 'LKR 12.84M', delta: '8.4%', deltaNote: 'this week', up: true, color: '#2F6FED',
    icon: 'M4 7h15v12H4zM4 7l12-3v3M15 13h2',
    spark: [10, 14, 18, 17, 24, 28, 36],
  },
  {
    id: 'tickets', label: 'Tickets sold', value: '9,870', delta: '5.2%', deltaNote: 'vs last week', up: true, color: '#12A150',
    icon: 'M3 9V7h18v2a2 2 0 000 6v2H3v-2a2 2 0 000-6zM14 7v10',
    spark: [8, 10, 14, 16, 20, 24, 30],
  },
  {
    id: 'exhibitors', label: 'Exhibitors on site', value: '214', delta: '24 yet to arrive', deltaNote: 'of 238', up: false, color: '#7C4DFF',
    icon: 'M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6',
    spark: [6, 12, 20, 28, 34, 38, 40],
  },
];

export const CHECKINS = {
  hours: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  today: [240, 690, 1010, 1180, 760, 640, 880, 540, 390, 152],
  previous: [210, 610, 920, 1050, 700, 590, 790, 480, 330, 108],
  todayLabel: 'Day 2 (today)',
  previousLabel: 'Day 1',
  summary: 'Visitor check-ins per hour on Day 2 compared with Day 1. Day 2 peaks at 1,180 around 12:00 and totals 6,482.',
  insights: [
    { label: 'Peak hour', value: '12:00 – 13:00', note: '1,180 check-ins' },
    { label: 'Avg. time on site', value: '3h 12m', note: '+18 min vs Day 1', good: true },
    { label: 'Busiest gate', value: 'Gate A', note: '2,510 today' },
  ],
};

export const DASHBOARD_HALLS = [
  { name: 'Hall A', booked: 74, total: 80, color: '#F4320B' },
  { name: 'Hall B', booked: 61, total: 72, color: '#FF8F47' },
  { name: 'Hall C', booked: 58, total: 64, color: '#F5A524' },
  { name: 'Hall D', booked: 45, total: 64, color: '#E83E8C' },
];

export const HALL_NOTE = { title: 'Hall D has the most space.', text: '19 stalls are still free, the best place to sell next.' };

export const TICKET_SALES = {
  series: [
    { key: 'visitor', label: 'Visitor', color: '#F5A524' },
    { key: 'trade', label: 'Trade', color: '#F4320B' },
    { key: 'vip', label: 'VIP', color: '#E83E8C' },
  ],
  days: [
    { label: 'Thu 15 Oct', short: 'Thu 15', visitor: 420, trade: 180, vip: 40 },
    { label: 'Fri 16 Oct', short: 'Fri 16', visitor: 510, trade: 210, vip: 55 },
    { label: 'Sat 17 Oct', short: 'Sat 17', visitor: 690, trade: 260, vip: 70 },
    { label: 'Sun 18 Oct', short: 'Sun 18', visitor: 780, trade: 310, vip: 90 },
    { label: 'Mon 19 Oct', short: 'Mon 19', visitor: 910, trade: 350, vip: 110 },
    { label: 'Tue 20 Oct', short: 'Tue 20', visitor: 1020, trade: 400, vip: 130 },
    { label: 'Wed 21 Oct', short: 'Wed 21', visitor: 1240, trade: 470, vip: 160 },
  ],
  summary: 'Tickets sold per day from 15 to 21 October, shown as separate bars for visitor, trade and VIP. Today, 21 October, is the highest at 1,870 tickets in total.',
  insights: [
    { label: 'Best day', value: 'Wed 21', note: '1,870 tickets' },
    { label: '7-day total', value: '8,405', note: 'tickets sold' },
    { label: 'Top type', value: 'Visitor · 66%', note: 'of all tickets' },
  ],
};

export const CHECKIN_TYPES = {
  total: '6,482',
  caption: 'checked in',
  summary: '6,482 visitors checked in today: 58 percent visitor, 33 percent trade and 9 percent VIP tickets',
  parts: [
    { label: 'Visitor', value: 3760, color: '#F5A524' },
    { label: 'Trade', value: 2140, color: '#F4320B' },
    { label: 'VIP', value: 582, color: '#E83E8C' },
  ],
};

export const GATE_TRAFFIC = {
  hours: ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
  gates: [
    { name: 'Gate A', values: [96, 269, 374, 448, 304, 262, 343, 200, 156, 58] },
    { name: 'Gate B', values: [72, 214, 323, 354, 220, 192, 273, 178, 117, 49] },
    { name: 'Gate C', values: [48, 138, 212, 260, 160, 122, 185, 108, 82, 30] },
    { name: 'Gate D', values: [24, 69, 101, 118, 76, 64, 79, 54, 35, 15] },
  ],
  summary: 'Check-ins by gate and hour. Gate A is the busiest with 2,510 check-ins, peaking at 11:00 to 12:00.',
};

export const VISITOR_JOURNEY = [
  { label: 'Registered', value: 11240, color: '#F4320B' },
  { label: 'Bought a ticket', value: 9870, color: '#FF8F47' },
  { label: 'Checked in', value: 6482, color: '#F5A524' },
  { label: 'Booked a B2B meeting', value: 1310, color: '#E83E8C' },
];

export const LIVE_ACTIVITY = [
  { id: 'a1', tone: 'green', icon: 'M5 12l4 4 10-10', title: 'Invoice paid', detail: 'Ceylon Weave Studio · LKR 245,000', time: '2 min ago' },
  { id: 'a2', tone: 'amber', icon: 'M3 9V7h18v2a2 2 0 000 6v2H3v-2a2 2 0 000-6zM14 7v10', title: 'VIP pass issued', detail: 'Hiranya Fernando · Gate B', time: '6 min ago' },
  { id: 'a3', tone: 'blue', icon: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4', title: 'Meeting confirmed', detail: 'Lanka Tech Works · Day 3, 10:00', time: '11 min ago' },
  { id: 'a4', tone: 'red', icon: 'M12 4l9 16H3zM12 10v4M12 17v.5', title: 'Gate D scanner is offline', detail: 'Switch to the backup scanner', time: '18 min ago' },
  { id: 'a5', tone: 'purple', icon: 'M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6', title: 'New exhibitor registered', detail: 'Coral Craft Studio · Stall A9', time: '24 min ago' },
];

export const TOP_EXHIBITORS = [
  { id: 'lt', initials: 'LT', name: 'Lanka Tech Works', stall: 'Stall C2 · Hall C', leads: 312, meetings: 18 },
  { id: 'cs', initials: 'CS', name: 'Ceylon Spice Co.', stall: 'Stall B4 · Hall B', leads: 268, meetings: 14 },
  { id: 'ib', initials: 'IB', name: 'Island Build Mart', stall: 'Stall D1 · Hall D', leads: 241, meetings: 11 },
  { id: 'cw', initials: 'CW', name: 'Ceylon Weave Studio', stall: 'Stall A3 · Hall A', leads: 219, meetings: 9 },
  { id: 'tl', initials: 'TL', name: 'Tea Leaf Traders', stall: 'Stall B7 · Hall B', leads: 187, meetings: 12 },
];
