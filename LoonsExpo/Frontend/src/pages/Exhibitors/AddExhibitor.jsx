import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import {
  MainCard,
  PageHeader,
  StepStrip,
  SectionCard,
  SearchField,
  TabBar,
  InitialsAvatar,
  Tag,
  NoticeBanner,
  FormField,
  ChoiceChips,
  SettingList,
  SummaryList,
  Timeline,
  OutlineButton,
  PrimaryButton,
} from 'components';
import { CANDIDATES, STALL_PACKAGES, REGISTER_STEPS, REGISTER_FORM_DEFAULTS, REGISTER_OPTIONS, REGISTER_NEXT } from 'mockDb';

const grid2 = { display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2.5 };

const AddExhibitor = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('Past exhibitors');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(CANDIDATES['Past exhibitors'][0]);
  const [form, setForm] = useState({
    ...REGISTER_FORM_DEFAULTS,
    company: selected.name,
    sector: selected.sector,
    location: `Sri Lanka, ${selected.city}`,
  });
  const [invoiceNow, setInvoiceNow] = useState(REGISTER_OPTIONS.find(o => o.id === 'invoice').control.on);

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const candidates = (CANDIDATES[tab] || []).filter(c => c.name.toLowerCase().includes(query.trim().toLowerCase()));

  const pickCandidate = c => {
    setSelected(c);
    setForm(f => ({ ...f, company: c.name, sector: c.sector, location: `Sri Lanka, ${c.city}` }));
  };

  return (
    <MainCard sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <PageHeader
          title="Register exhibitor"
          subtitle="Find a company to pre-fill its details, check them, then register"
          actions={<OutlineButton onClick={() => navigate('/exhibitors')}>Existing exhibitors</OutlineButton>}
        />

        <StepStrip steps={REGISTER_STEPS} current={1} />

        <SectionCard title="Find a company to pre-fill its details">
          <SearchField
            sx={{ width: '100%', mb: 1.75 }}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by company name, email or registration number"
          />
          <TabBar tabs={Object.keys(CANDIDATES)} value={tab} onChange={setTab} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1.5 }}>
            {candidates.length === 0 && (
              <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>Nothing found in {tab.toLowerCase()}.</Typography>
            )}
            {candidates.map(c => {
              const on = selected && selected.id === c.id;
              return (
                <Box
                  key={c.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 1.5,
                    px: 1.75,
                    py: 1.5,
                    borderRadius: '14px',
                    border: theme => `${on ? 1.5 : 1}px solid ${on ? theme.palette.brand.main : theme.palette.border.main}`,
                    bgcolor: on ? 'brand.light' : 'background.paper',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                    <InitialsAvatar initials={c.initials} />
                    <Box>
                      <Box component="b" sx={{ display: 'block', color: 'text.primary' }}>{c.name}</Box>
                      <Box component="small" sx={{ fontSize: 13, color: 'text.secondary' }}>{c.sector} · {c.city}</Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                    <Tag tone="blue">{c.source}</Tag>
                    {on ? <Tag tone="green">Selected</Tag> : <OutlineButton sx={{ minHeight: 38 }} onClick={() => pickCandidate(c)}>Use these details</OutlineButton>}
                  </Box>
                </Box>
              );
            })}
            <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
              Cannot find it?{' '}
              <Box component="b" sx={{ color: 'brand.dark' }}>Enter the details manually</Box>
            </Typography>
          </Box>
        </SectionCard>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) 320px' }, gap: 2.5, alignItems: 'start' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, minWidth: 0 }}>
            {selected && (
              <NoticeBanner
                tone="success"
                title={`Details pre-filled from ${selected.name}`}
                icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>}
              >
                {selected.source}. Check every field and change anything that is out of date.
              </NoticeBanner>
            )}

            <SectionCard title="Company details" action={<Tag tone="green">Pre-filled</Tag>}>
              <Box sx={grid2}>
                <FormField label="Company name" required value={form.company} onChange={set('company')} />
                <FormField label="Sector" required value={form.sector} onChange={set('sector')} />
                <FormField label="Country and city" value={form.location} onChange={set('location')} />
                <FormField label="Website" value={form.website} onChange={set('website')} />
                <FormField label="Business registration number" value={form.regNumber} onChange={set('regNumber')} placeholder="[NUMBER]" />
                <FormField label="Number of staff" type="number" value={form.staff} onChange={set('staff')} placeholder="[NUMBER]" helper="Used for badges" />
              </Box>
            </SectionCard>

            <SectionCard title="Primary contact" action={<Tag tone="green">Pre-filled</Tag>}>
              <Box sx={grid2}>
                <FormField label="Full name" required value={form.contactName} onChange={set('contactName')} placeholder="[NAME]" />
                <FormField label="Job title" value={form.jobTitle} onChange={set('jobTitle')} placeholder="[TITLE]" />
                <FormField label="Email" required type="email" value={form.email} onChange={set('email')} placeholder="[EMAIL]" helper="The invitation and setup link go here" />
                <FormField label="Mobile and WhatsApp" value={form.phone} onChange={set('phone')} placeholder="[PHONE]" helper="Used for the WhatsApp and Call buttons" />
              </Box>
            </SectionCard>

            <SectionCard title="Stall and package">
              <Box sx={{ mb: 1.75 }}>
                <ChoiceChips options={STALL_PACKAGES} value={form.pkg} onChange={v => setForm(f => ({ ...f, pkg: v }))} />
              </Box>
              <Box sx={grid2}>
                <FormField label="Hall" value={form.hall} onChange={set('hall')} />
                <FormField label="Stall" value={form.stall} onChange={set('stall')} helper="Same stall as last edition, if free" />
                <FormField label="Price" value={form.price} onChange={set('price')} placeholder="[PRICE]" helper="Leave blank to use the package price" />
                <FormField label="Notes for the team" value={form.notes} onChange={set('notes')} placeholder="Optional note" />
              </Box>
            </SectionCard>

            <SectionCard title="Registration and payment">
              <SettingList items={REGISTER_OPTIONS} onChange={(id, value) => id === 'invoice' && setInvoiceNow(value)} />
            </SectionCard>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
              <OutlineButton onClick={() => navigate('/exhibitors')}>Cancel</OutlineButton>
              <Box sx={{ display: 'flex', gap: 1.25, flexWrap: 'wrap' }}>
                <OutlineButton>Save as draft</OutlineButton>
                <PrimaryButton onClick={() => navigate('/exhibitors')}>Register exhibitor</PrimaryButton>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <SectionCard title="Summary">
              <SummaryList
                items={[
                  { label: 'Company', value: form.company || '—' },
                  { label: 'Source', value: selected ? selected.source : 'Entered manually' },
                  { label: 'Stall', value: form.stall || '—' },
                  { label: 'Package', value: form.pkg },
                  { label: 'Invoice', value: invoiceNow ? 'Created on register' : 'Not created' },
                ]}
              />
            </SectionCard>
            <SectionCard title="What happens next">
              <Timeline items={REGISTER_NEXT} />
            </SectionCard>
          </Box>
        </Box>
      </Box>
    </MainCard>
  );
};

export default AddExhibitor;
