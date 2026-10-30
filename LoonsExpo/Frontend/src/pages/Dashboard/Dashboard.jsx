import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import {
  MainCard,
  SectionCard,
  SegmentedControl,
  OutlineButton,
  ActivityFeed,
  KpiCard,
  InitialsAvatar,
  SimpleTable,
} from 'components';
import {
  HeroBanner,
  Sparkline,
  ChartLegend,
  InsightStrip,
  DataDetails,
  BarRow,
  LineChart,
  BarChart,
  DonutChart,
  Heatmap,
  formatNumber,
} from './components';
import {
  DASHBOARD_RANGES,
  DASHBOARD_HEADER,
  DASHBOARD_HERO,
  DASHBOARD_KPIS,
  CHECKINS,
  DASHBOARD_HALLS,
  HALL_NOTE,
  TICKET_SALES,
  CHECKIN_TYPES,
  GATE_TRAFFIC,
  VISITOR_JOURNEY,
  LIVE_ACTIVITY,
  TOP_EXHIBITORS,
} from 'mockDb';

const row = (columns) => ({ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: columns }, gap: 2.5, alignItems: 'stretch' });
const pct = (part, whole) => Math.round((part / whole) * 100);

const Dashboard = () => {
  const navigate = useNavigate();
  const [range, setRange] = useState(DASHBOARD_RANGES[0]);

  const hallTotals = DASHBOARD_HALLS.reduce((t, h) => ({ booked: t.booked + h.booked, total: t.total + h.total }), { booked: 0, total: 0 });
  const typeTotal = CHECKIN_TYPES.parts.reduce((s, p) => s + p.value, 0);
  const maxLeads = Math.max(...TOP_EXHIBITORS.map(e => e.leads));
  const hero = { ...DASHBOARD_HERO, actions: DASHBOARD_HERO.actions.map(a => ({ ...a, onClick: () => navigate(a.path) })) };

  return (
    <MainCard sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <HeroBanner
          {...hero}
          topRight={
            <>
              <SegmentedControl variant="glass" label="Date range" options={DASHBOARD_RANGES} value={range} onChange={setRange} />
              <OutlineButton sx={{ color: 'brand.dark', bgcolor: '#fff', border: '1px solid #fff', '&:hover': { bgcolor: 'rgba(255,255,255,.9)', color: 'brand.dark', borderColor: '#fff' } }}>
                {DASHBOARD_HEADER.exportLabel}
              </OutlineButton>
            </>
          }
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' }, gap: 2 }}>
          {DASHBOARD_KPIS.map(k => <KpiCard key={k.id} label={k.label} value={k.value} delta={k.delta} note={k.deltaNote} tone={k.up ? 'up' : 'warn'} icon={k.icon} color={k.color} trend={<Sparkline values={k.spark} color={k.color} />} />)}
        </Box>

        <Box sx={row('minmax(0, 1.55fr) minmax(0, 1fr)')}>
          <SectionCard title="Visitor check-ins" subtitle="Check-ins per hour, today compared with Day 1">
            <ChartLegend items={[{ label: CHECKINS.todayLabel, color: '#F4320B' }, { label: CHECKINS.previousLabel, color: '#FFB233' }]} />
            <LineChart
              labels={CHECKINS.hours}
              summary={CHECKINS.summary}
              series={[
                { name: CHECKINS.todayLabel, color: '#F4320B', values: CHECKINS.today },
                { name: CHECKINS.previousLabel, color: '#FFB233', values: CHECKINS.previous },
              ]}
            />
            <InsightStrip items={CHECKINS.insights} />
            <DataDetails
              columns={[
                { key: 'hour', label: 'Hour' },
                { key: 'today', label: 'Day 2', render: r => formatNumber(r.today) },
                { key: 'previous', label: 'Day 1', render: r => formatNumber(r.previous) },
              ]}
              rows={CHECKINS.hours.map((hour, i) => ({ hour, today: CHECKINS.today[i], previous: CHECKINS.previous[i] }))}
            />
          </SectionCard>

          <SectionCard title="Hall occupancy" subtitle="Stalls booked in each hall" action={{ label: 'Manage halls', onClick: () => navigate('/exhibition-setup') }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.25, mb: 2 }}>
              <Typography component="b" sx={{ fontSize: 36, fontWeight: 800, letterSpacing: '-.02em', lineHeight: 1 }}>{pct(hallTotals.booked, hallTotals.total)}%</Typography>
              <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{hallTotals.booked} of {hallTotals.total} stalls booked</Typography>
            </Box>
            <Box sx={{ display: 'grid', gap: 2 }}>
              {DASHBOARD_HALLS.map(h => (
                <BarRow
                  key={h.name}
                  title={h.name}
                  caption={`${h.total - h.booked} stalls free`}
                  value={`${h.booked} / ${h.total}`}
                  valueCaption={`${pct(h.booked, h.total)}% booked`}
                  percent={pct(h.booked, h.total)}
                  color={h.color}
                  tooltip={`${h.name}: ${h.booked} of ${h.total} stalls booked`}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start', mt: 2.5, p: 1.5, borderRadius: '12px', bgcolor: 'brand.light', fontSize: 13, color: 'text.primary' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none', marginTop: 1 }}><path d="M12 3a9 9 0 100 18 9 9 0 000-18zM12 8v5M12 16v.5" /></svg>
              <span><b>{HALL_NOTE.title}</b> {HALL_NOTE.text}</span>
            </Box>
          </SectionCard>
        </Box>

        <Box sx={row('minmax(0, 1.55fr) minmax(0, 1fr)')}>
          <SectionCard title="Tickets sold per day" subtitle="Last 7 days by ticket type">
            <ChartLegend square items={TICKET_SALES.series} />
            <BarChart categories={TICKET_SALES.days} series={TICKET_SALES.series} summary={TICKET_SALES.summary} />
            <InsightStrip items={TICKET_SALES.insights} />
            <DataDetails
              columns={[
                { key: 'label', label: 'Day' },
                ...TICKET_SALES.series.map(s => ({ key: s.key, label: s.label, render: r => formatNumber(r[s.key]) })),
              ]}
              rows={TICKET_SALES.days}
            />
          </SectionCard>

          <SectionCard title="Check-ins by ticket type" subtitle="Share of today's check-ins" sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, py: 1 }}>
              <DonutChart size={224} parts={CHECKIN_TYPES.parts} total={CHECKIN_TYPES.total} caption={CHECKIN_TYPES.caption} summary={CHECKIN_TYPES.summary} />
              <Box sx={{ width: '100%', display: 'grid', gap: 1.5 }}>
                {CHECKIN_TYPES.parts.map(p => (
                  <Box key={p.label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box component="i" sx={{ width: 12, height: 12, borderRadius: '4px', bgcolor: p.color, flex: 'none' }} />
                    <Box sx={{ flex: 1 }}>
                      <Box component="span" sx={{ fontSize: 14, fontWeight: 600 }}>{p.label} · {pct(p.value, typeTotal)}%</Box>
                      <Box component="small" sx={{ display: 'block', fontSize: 12, color: 'text.secondary' }}>{formatNumber(p.value)} visitors</Box>
                    </Box>
                    <Box component="b">{formatNumber(p.value)}</Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </SectionCard>
        </Box>

        <Box sx={row('minmax(0, 1.55fr) minmax(0, 1fr)')}>
          <SectionCard title="Gate traffic" subtitle="Check-ins by gate and hour, today">
            <Heatmap columns={GATE_TRAFFIC.hours} rows={GATE_TRAFFIC.gates} summary={GATE_TRAFFIC.summary} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, fontSize: 12, color: 'text.secondary' }}>
              Fewer
              <Box sx={{ width: 90, height: 8, borderRadius: 4, background: theme => `linear-gradient(90deg, ${theme.palette.brand.light}, ${theme.palette.brand.main})` }} />
              More check-ins
              <Box component="span" sx={{ ml: 'auto' }}>Hours shown from 09 to 18</Box>
            </Box>
          </SectionCard>

          <SectionCard title="Visitor journey" subtitle="From registration to meetings">
            <Box sx={{ display: 'grid', gap: 1.5 }}>
              {VISITOR_JOURNEY.map((step, i) => {
                const prev = VISITOR_JOURNEY[i - 1];
                return (
                  <React.Fragment key={step.label}>
                    {prev && (
                      <Typography sx={{ fontSize: 12, color: 'text.secondary', pl: 0.5 }}>
                        ↓ {formatNumber(prev.value - step.value)} did not continue ({pct(prev.value - step.value, prev.value)}%)
                      </Typography>
                    )}
                    <BarRow
                      title={step.label}
                      value={formatNumber(step.value)}
                      valueCaption={`${pct(step.value, VISITOR_JOURNEY[0].value)}%`}
                      percent={pct(step.value, VISITOR_JOURNEY[0].value)}
                      color={step.color}
                      tooltip={`${step.label}: ${formatNumber(step.value)}`}
                    />
                  </React.Fragment>
                );
              })}
            </Box>
          </SectionCard>
        </Box>

        <Box sx={row('minmax(0, 1fr) minmax(0, 1.4fr)')}>
          <SectionCard title="Live activity" subtitle="What is happening right now">
            <ActivityFeed items={LIVE_ACTIVITY.map(a => ({ ...a, detail: a.detail }))} />
          </SectionCard>

          <SectionCard title="Top exhibitors" subtitle="Most leads scanned today" action={{ label: 'View all exhibitors', onClick: () => navigate('/exhibitors') }}>
            <SimpleTable
              getRowKey={e => e.id}
              columns={[
                {
                  key: 'exhibitor',
                  label: 'Exhibitor',
                  render: e => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <InitialsAvatar initials={e.initials} size={36} />
                      <Box>
                        <Box component="b" sx={{ display: 'block', fontSize: 14 }}>{e.name}</Box>
                        <Box component="small" sx={{ fontSize: 12.5, color: 'text.secondary' }}>{e.stall}</Box>
                      </Box>
                    </Box>
                  ),
                },
                {
                  key: 'leads',
                  label: 'Leads today',
                  render: e => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 140 }}>
                      <Box sx={{ flex: 1, height: 8, borderRadius: 4, bgcolor: 'brand.light' }}>
                        <Box sx={{ width: `${pct(e.leads, maxLeads)}%`, height: '100%', borderRadius: 4, bgcolor: 'brand.main' }} />
                      </Box>
                      <b>{e.leads}</b>
                    </Box>
                  ),
                },
                { key: 'meetings', label: 'Meetings' },
              ]}
              rows={TOP_EXHIBITORS}
            />
          </SectionCard>
        </Box>
      </Box>
    </MainCard>
  );
};

export default Dashboard;
