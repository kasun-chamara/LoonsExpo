import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import {
  SectionCard,
  FormField,
  ChoiceChips,
  OptionCard,
  SettingRow,
  Toggle,
  Tag,
} from 'components';
import { BASICS_FORM, BASICS_OPTIONS } from 'mockDb';

const sub = (text) => (
  <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'text.secondary', mt: 0.75 }}>
    {text}
  </Typography>
);

const grid = (cols) => ({ display: 'grid', gridTemplateColumns: { xs: '1fr', md: `repeat(${cols}, minmax(0, 1fr))` }, gap: 2.5 });

const divider = { borderTop: theme => `1px solid ${theme.palette.border.main}`, pt: 2.5, mt: 0.75 };

const BasicsStep = () => {
  const [form, setForm] = useState(BASICS_FORM);
  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));
  const put = (key) => (value) => setForm(f => ({ ...f, [key]: value }));
  const typeLabel = (BASICS_OPTIONS.types.find(t => t.value === form.type) || {}).title;

  return (
    <>
      <SectionCard title="Exhibition identity" action={{ label: '3 fields need details' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.25 }}>
          <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center', flexWrap: 'wrap', p: '16px 18px', borderRadius: '14px', border: theme => `1.5px solid ${theme.palette.brand.main}`, bgcolor: 'brand.light' }}>
            <Box sx={{ width: 150, height: 84, flex: 'none', borderRadius: '12px', bgcolor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary', fontSize: 12 }}>
              {BASICS_OPTIONS.brandingSlots[1]}
            </Box>
            <Box sx={{ flex: 1, minWidth: 220 }}>
              <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'text.secondary' }}>
                How visitors will see it
              </Typography>
              <Typography sx={{ fontSize: 20, fontWeight: 700, letterSpacing: '-.02em', color: 'text.primary' }}>{form.name || 'Exhibition name'}</Typography>
              <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1.25 }}>{form.tagline}</Typography>
              <Tag tone="brand">{typeLabel}</Tag>
            </Box>
          </Box>

          {sub('Name and address')}
          <Box sx={grid(2)}>
            <FormField label="Exhibition name" required value={form.name} onChange={set('name')} helper="Shown on the public page, tickets, badges and emails" counter={`${form.name.length} / 80`} />
            <FormField label="Edition" value={form.edition} onChange={set('edition')} placeholder="Edition [YEAR]" helper="For example 2027 or 5th edition" />
            <FormField label="Short name" value={form.shortName} onChange={set('shortName')} helper="Used on badges and emails where space is tight" counter={`${form.shortName.length} / 12`} />
            <FormField label="Web address" required value={form.slug} onChange={set('slug')} helper="Lowercase letters, numbers and dashes" />
          </Box>

          {sub('Type of exhibition')}
          <Box sx={{ ...grid(3), gap: 1.25 }}>
            {BASICS_OPTIONS.types.map(t => (
              <OptionCard key={t.value} title={t.title} description={t.description} selected={form.type === t.value} onClick={() => put('type')(t.value)} />
            ))}
          </Box>

          <Box sx={divider}>
            {sub('About the exhibition')}
            <Box sx={{ ...grid(2), mt: 1.75, alignItems: 'start' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormField label="Tagline" value={form.tagline} onChange={set('tagline')} helper="One line shown under the name on the public page" counter={`${form.tagline.length} / 90`} />
                <FormField label="Description" multiline rows={7} value={form.description} onChange={set('description')} helper="Shown on the public page and in search results. Say who it is for and why to join." counter={`${form.description.length} / 600`} />
                <FormField label="Main button text" value={form.cta} onChange={set('cta')} helper="Label on the call-to-action button" counter={`${form.cta.length} / 20`} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormField label="Who it is for" helper="Used to match visitors with exhibitors">
                  <ChoiceChips multiple options={BASICS_OPTIONS.audience} value={form.audience} onChange={put('audience')} sx={{ py: 0.75 }} />
                </FormField>
                <FormField label="Highlight 1" value={form.highlight1} onChange={set('highlight1')} helper="Short point shown as a badge on the page" counter={`${form.highlight1.length} / 40`} />
                <FormField label="Highlight 2" value={form.highlight2} onChange={set('highlight2')} helper="Shown as a badge on the page" counter={`${form.highlight2.length} / 40`} />
                <FormField label="Highlight 3" value={form.highlight3} onChange={set('highlight3')} helper="Shown as a badge on the page" counter={`${form.highlight3.length} / 40`} />
              </Box>
            </Box>
          </Box>

          <Box sx={divider}>
            {sub('Organiser and contact')}
            <Box sx={{ ...grid(2), mt: 1.75 }}>
              <FormField label="Organiser name" required value={form.organiser} onChange={set('organiser')} placeholder="[ORGANISER]" helper="Shown as the host. Add co-organisers later" />
              <FormField label="Contact email" required type="email" value={form.email} onChange={set('email')} placeholder="[EMAIL]" helper="Where exhibitors and visitors send questions" />
              <FormField label="Contact phone" value={form.phone} onChange={set('phone')} placeholder="[PHONE]" helper="Include the country code" />
              <FormField label="Support hours" value={form.hours} onChange={set('hours')} helper="Shown on the help section" />
            </Box>
          </Box>

          <Box sx={divider}>
            {sub('Expectations and links')}
            <Box sx={{ ...grid(2), mt: 1.75 }}>
              <FormField label="Expected exhibitors" type="number" value={form.expectedExhibitors} onChange={set('expectedExhibitors')} placeholder="[NUMBER]" helper="Used to size halls and reports" />
              <FormField label="Expected visitors" type="number" value={form.expectedVisitors} onChange={set('expectedVisitors')} placeholder="[NUMBER]" helper="Used for capacity planning" />
              <FormField label="Hashtag" value={form.hashtag} onChange={set('hashtag')} helper="Shown on social share cards" />
              <FormField label="Social links" value={form.social} onChange={set('social')} helper="Add the full links" />
            </Box>
          </Box>
        </Box>
      </SectionCard>

      <SectionCard title="Dates and venue">
        <Box sx={grid(2)}>
          <FormField label="Start date" type="date" value={form.startDate} onChange={set('startDate')} />
          <FormField label="End date" type="date" value={form.endDate} onChange={set('endDate')} />
          <FormField label="Daily opening hours" value={form.opening} onChange={set('opening')} />
          <FormField label="Time zone" value={form.timeZone} onChange={set('timeZone')} />
          <FormField label="Venue" value={form.venue} onChange={set('venue')} placeholder="[VENUE]" />
          <FormField label="City and country" value={form.city} onChange={set('city')} />
        </Box>
      </SectionCard>

      <Box sx={grid(2)}>
        <SectionCard title="Languages and currency">
          <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1 }}>Languages</Typography>
          <ChoiceChips multiple options={BASICS_OPTIONS.languages} value={form.languages} onChange={put('languages')} />
          <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 2, mb: 1 }}>Currencies</Typography>
          <ChoiceChips multiple options={BASICS_OPTIONS.currencies} value={form.currencies} onChange={put('currencies')} />
          <SettingRow sx={{ mt: 2 }} title="Tax / VAT on invoices" description="Applied to stalls and tickets">
            <Toggle checked={form.tax} onChange={put('tax')} label="Tax / VAT on invoices" />
          </SettingRow>
        </SectionCard>

        <SectionCard title="Branding">
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {BASICS_OPTIONS.brandingSlots.map(label => (
              <Box key={label} sx={{ height: 120, borderRadius: '12px', bgcolor: 'brand.light', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary', fontSize: 12 }}>
                {label}
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mt: 2 }}>
            {BASICS_OPTIONS.brandColours.map(c => (
              <Box key={c} sx={{ width: 38, height: 38, borderRadius: '50%', bgcolor: c }} />
            ))}
            <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>Brand colours</Typography>
          </Box>
        </SectionCard>
      </Box>

      <SectionCard title="Visibility">
        <ChoiceChips options={BASICS_OPTIONS.visibility} value={form.visibility} onChange={put('visibility')} />
        <SettingRow sx={{ mt: 2 }} title="White-label" description="Use your own domain and branding">
          <Toggle checked={form.whiteLabel} onChange={put('whiteLabel')} label="White-label" />
        </SettingRow>
      </SectionCard>
    </>
  );
};

export default BasicsStep;
