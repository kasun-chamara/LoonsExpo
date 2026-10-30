import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Link } from '@mui/material';
import {
  MainCard,
  PageHeader,
  SectionCard,
  SearchField,
  FilterSelect,
  InitialsAvatar,
  Tag,
  DetailGrid,
  PrimaryButton,
  OutlineButton,
} from 'components';
import { APP_CONTENT, EXHIBITORS, EXHIBITORS_TOTAL, STATUS_TONE, PAYMENT_TONE } from 'mockDb';
import IssueBadgesDialog from './IssueBadgesDialog';

const unique = key => [...new Set(EXHIBITORS.map(e => e[key]))];

const ICONS = {
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z',
  edit: 'M4 20h4L19 9l-4-4L4 16zM14 6l4 4',
  whatsapp: 'M4 20l1.5-4.5A8 8 0 1112 20a8 8 0 01-3.8-1L4 20z',
  email: 'M3 6h18v12H3zM3 7l9 6 9-6',
};

const Icon = ({ path, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={path} />
  </svg>
);

// Round 34px icon button sitting in the top-right corner of an exhibitor card.
const cornerButton = (right, active) => ({
  position: 'absolute',
  top: 12,
  right,
  width: 34,
  height: 34,
  p: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  cursor: 'pointer',
  color: active ? 'brand.contrastText' : 'text.secondary',
  bgcolor: active ? 'brand.main' : 'background.paper',
  border: theme => `1px solid ${active ? theme.palette.brand.main : theme.palette.border.main}`,
  '&:hover': active ? undefined : { bgcolor: 'brand.light', color: 'brand.dark', borderColor: 'brand.borderHover' },
});

// Pill-style contact action (WhatsApp / Email) in the details header.
const contactAction = (tint, color) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0.875,
  minHeight: 40,
  px: 2,
  borderRadius: '10px',
  fontSize: 13,
  fontWeight: 600,
  textDecoration: 'none',
  color,
  bgcolor: tint,
  '&:hover': { filter: 'brightness(.96)' },
});

const ExistingExhibitors = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('');
  const [hall, setHall] = useState('');
  const [status, setStatus] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [badgesFor, setBadgesFor] = useState(null);

  const visible = useMemo(
    () => EXHIBITORS.filter(e =>
      e.name.toLowerCase().includes(query.trim().toLowerCase()) &&
      (!sector || e.sector === sector) &&
      (!hall || e.hall === hall) &&
      (!status || e.status === status)
    ),
    [query, sector, hall, status]
  );
  const selected = visible.find(e => e.id === selectedId);
  // Clicking the open card again closes its details.
  const toggle = id => setSelectedId(current => (current === id ? null : id));

  return (
    <MainCard sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <PageHeader
          title="Existing exhibitors"
          subtitle={`Companies already registered for ${APP_CONTENT.event.name}`}
          actions={<PrimaryButton onClick={() => navigate('/exhibitors/add')}>Register exhibitor</PrimaryButton>}
        />

        <SectionCard title="Existing exhibitors" action={{ label: `See all ${EXHIBITORS_TOTAL}` }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25, alignItems: 'center' }}>
            <SearchField value={query} onChange={e => setQuery(e.target.value)} placeholder="Search existing exhibitors" />
            <FilterSelect label="All sectors" value={sector} onChange={setSector} options={unique('sector')} />
            <FilterSelect label="All halls" value={hall} onChange={setHall} options={unique('hall')} />
            <FilterSelect label="All statuses" value={status} onChange={setStatus} options={unique('status')} />
          </Box>

          {visible.length === 0 ? (
            <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>No exhibitors match these filters.</Box>
          ) : (
            <>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' }, gap: 1.75, mt: 1.75 }}>
                {visible.map(e => {
                  const on = selected && selected.id === e.id;
                  return (
                    <Box
                      key={e.id}
                      role="button"
                      tabIndex={0}
                      aria-pressed={on}
                      onClick={() => toggle(e.id)}
                      onKeyDown={ev => (ev.key === 'Enter' || ev.key === ' ') && toggle(e.id)}
                      sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.25,
                        p: on ? '13px' : '14px',
                        cursor: 'pointer',
                        color: 'text.primary',
                        borderRadius: '14px',
                        border: theme => `${on ? 2 : 1}px solid ${on ? theme.palette.brand.main : theme.palette.border.main}`,
                        bgcolor: on ? 'brand.light' : 'background.paper',
                        '&:hover': { borderColor: 'brand.main' },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pr: '84px' }}>
                        <InitialsAvatar initials={e.initials} />
                        <Box sx={{ minWidth: 0 }}>
                          <Box component="b" sx={{ display: 'block', fontSize: 14, lineHeight: 1.25 }}>{e.name}</Box>
                          <Box component="small" sx={{ fontSize: 12.5, color: 'text.secondary' }}>{e.sector} · {e.city}</Box>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        <Tag tone={STATUS_TONE[e.status] || 'neutral'}>{e.status}</Tag>
                        <Tag tone={PAYMENT_TONE[e.payment] || 'neutral'}>{e.payment}</Tag>
                      </Box>
                      <Box
                        component="button"
                        type="button"
                        title="Edit exhibitor"
                        aria-label={`Edit ${e.name}`}
                        onClick={ev => ev.stopPropagation()}
                        sx={cornerButton(52, false)}
                      >
                        <Icon path={ICONS.edit} />
                      </Box>
                      <Box
                        component="button"
                        type="button"
                        title="View details"
                        aria-label={`View details of ${e.name}`}
                        onClick={ev => { ev.stopPropagation(); toggle(e.id); }}
                        sx={cornerButton(12, on)}
                      >
                        <Icon path={ICONS.eye} />
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              {selected && (
                <Box sx={{ mt: 2, px: 2.5, py: 2.25, borderRadius: '16px', border: theme => `1.5px solid ${theme.palette.brand.main}`, bgcolor: 'brand.light' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, pb: 2, mb: 2, borderBottom: theme => `1px solid ${theme.palette.brand.border}` }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <InitialsAvatar initials={selected.initials} />
                      <Box>
                        <Box component="b" sx={{ display: 'block', color: 'text.primary' }}>{selected.name}</Box>
                        <Box component="small" sx={{ fontSize: 13, color: 'text.secondary' }}>{selected.sector} · {selected.city}</Box>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1.25 }}>
                      <Link href="#" sx={contactAction('#DDF5E7', '#0B6B35')}><Icon path={ICONS.whatsapp} size={16} />WhatsApp</Link>
                      <Link href="#" sx={contactAction('#FFE9E3', '#B5240A')}><Icon path={ICONS.email} size={16} />Email</Link>
                    </Box>
                  </Box>

                  <DetailGrid
                    items={[
                      { label: 'Sector', value: selected.sector },
                      { label: 'City', value: `${selected.city}, ${selected.country}` },
                      { label: 'Website', value: selected.website },
                      { label: 'Registration number', value: selected.registrationNumber },
                      { label: 'Contact person', value: selected.contact },
                      { label: 'Email', value: selected.email },
                      { label: 'Mobile and WhatsApp', value: selected.phone },
                      { label: 'Status', value: selected.status },
                      { label: 'Stall', value: `${selected.stall} · ${selected.hall}` },
                      { label: 'Package', value: selected.package },
                      { label: 'Payment', value: selected.payment },
                      { label: 'Documents on file', value: selected.documents },
                    ]}
                  />

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25, mt: 2 }}>
                    <PrimaryButton>Open full application</PrimaryButton>
                    <OutlineButton>Message</OutlineButton>
                    <OutlineButton onClick={() => setBadgesFor(selected)}>Issue badges</OutlineButton>
                  </Box>
                </Box>
              )}
            </>
          )}
        </SectionCard>
      </Box>

      <IssueBadgesDialog exhibitor={badgesFor} onClose={() => setBadgesFor(null)} />
    </MainCard>
  );
};

export default ExistingExhibitors;
