import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { SectionCard, FormField, SelectField, ColorSwatches, SettingList, OutlineButton, PrimaryButton } from 'components';
import { ORGANISATION, COUNTRIES, BRAND_COLOURS, EVENT_DEFAULTS } from 'mockDb';

const grid2 = { display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2 };

const OrganisationTab = () => {
  const [form, setForm] = useState(ORGANISATION);
  const [colour, setColour] = useState(BRAND_COLOURS[0]);
  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.55fr) minmax(0, 1fr)' }, gap: 2.5, alignItems: 'start' }}>
      <SectionCard title="Organisation profile" subtitle="Shown on tickets, badges and emails sent to exhibitors and visitors">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.25, mb: 2.5 }}>
          <Box sx={{ width: 72, height: 72, flex: 'none', borderRadius: '18px', bgcolor: 'brand.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinejoin="round" aria-hidden="true"><path d="M6 17V8a3 3 0 013-3h6a3 3 0 013 3v6a3 3 0 01-3 3z" /></svg>
          </Box>
          <Box>
            <Typography component="b" sx={{ display: 'block', fontSize: 15 }}>Organisation logo</Typography>
            <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1.25 }}>PNG or SVG, at least 256 px square</Typography>
            <OutlineButton sx={{ minHeight: 36 }}>Upload logo</OutlineButton>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={grid2}>
            <FormField label="Organisation name" value={form.name} onChange={set('name')} />
            <FormField label="Legal name" value={form.legalName} onChange={set('legalName')} />
            <FormField label="Contact email" type="email" value={form.email} onChange={set('email')} />
            <FormField label="Phone" type="tel" value={form.phone} onChange={set('phone')} />
            <FormField label="Website" value={form.website} onChange={set('website')} />
            <FormField label="Registration number" value={form.registrationNumber} onChange={set('registrationNumber')} />
          </Box>
          <FormField label="Address" value={form.address} onChange={set('address')} />
          <Box sx={grid2}>
            <FormField label="City" value={form.city} onChange={set('city')} />
            <SelectField label="Country" value={form.country} onChange={v => setForm(f => ({ ...f, country: v }))} options={COUNTRIES} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 2.5 }}>
          <OutlineButton onClick={() => setForm(ORGANISATION)}>Cancel</OutlineButton>
          <PrimaryButton>Save changes</PrimaryButton>
        </Box>
      </SectionCard>

      <Box sx={{ display: 'grid', gap: 2.5, minWidth: 0 }}>
        <SectionCard title="Brand colour" subtitle="Used on badges, tickets and the exhibitor portal">
          <ColorSwatches colors={BRAND_COLOURS} value={colour} onChange={setColour} />
        </SectionCard>
        <SectionCard title="Event defaults" subtitle="Applied when you create a new exhibition">
          <SettingList items={EVENT_DEFAULTS} gap={2.5} />
        </SectionCard>
      </Box>
    </Box>
  );
};

export default OrganisationTab;
