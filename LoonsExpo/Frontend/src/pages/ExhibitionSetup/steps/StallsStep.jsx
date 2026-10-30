import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import {
  SectionCard,
  FormField,
  ChoiceChips,
  SettingList,
  Toggle,
  SimpleTable,
  StallGrid,
  Tag,
  OutlineButton,
  PrimaryButton,
} from 'components';
import { HALLS, STALL_TYPES, NEW_HALL_DEFAULTS, NEW_STALLS_DEFAULTS, STALL_PRICING, STALL_RULES, SPONSORSHIPS } from 'mockDb';

const row4 = { display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, minmax(0, 1fr))' }, gap: 1.75, alignItems: 'end' };

const Label = ({ children }) => (
  <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'text.secondary', mb: 1 }}>{children}</Typography>
);

const typeOptions = Object.entries(STALL_TYPES).map(([value, t]) => ({ value, label: t.label }));

const StallsStep = () => {
  const [hallName, setHallName] = useState(NEW_HALL_DEFAULTS.name);
  const [hall, setHall] = useState(NEW_STALLS_DEFAULTS.hall);
  const [type, setType] = useState(NEW_STALLS_DEFAULTS.type);
  const [instalments, setInstalments] = useState(Object.fromEntries(STALL_PRICING.map(p => [p.type, p.instalments])));

  const preview = NEW_STALLS_DEFAULTS.layout.map((t, i) => ({
    label: `${NEW_STALLS_DEFAULTS.prefix}${NEW_STALLS_DEFAULTS.start + i}`,
    type: t,
  }));

  return (
    <>
      <SectionCard title="Halls" action={<OutlineButton sx={{ minHeight: 38 }}>+ Add hall</OutlineButton>}>
        <Box sx={row4}>
          <FormField label="Hall name" required value={hallName} onChange={e => setHallName(e.target.value)} />
          <FormField label="Area (m²)" placeholder="[AREA]" type="number" />
          <FormField label="Entrances" type="number" value={NEW_HALL_DEFAULTS.entrances} onChange={() => {}} />
          <PrimaryButton>+ Add hall</PrimaryButton>
        </Box>
        <Box sx={{ mt: 2 }}>
          <SimpleTable
            getRowKey={r => r.name}
            columns={[
              { key: 'name', label: 'Hall', render: r => <b>{r.name}</b> },
              { key: 'area', label: 'Area' },
              { key: 'entrances', label: 'Entrances' },
              { key: 'stalls', label: 'Stalls' },
              { key: 'edit', label: '', render: () => <OutlineButton sx={{ minHeight: 36 }}>Edit</OutlineButton> },
            ]}
            rows={HALLS}
          />
        </Box>
      </SectionCard>

      <SectionCard title="Add stalls to a hall">
        <Label>Choose the hall</Label>
        <ChoiceChips options={HALLS.map(h => h.name)} value={hall} onChange={setHall} />
        <Box sx={{ mt: 2 }}><Label>Stall type</Label></Box>
        <ChoiceChips options={typeOptions} value={type} onChange={setType} />
        <Box sx={{ ...row4, mt: 2, alignItems: 'start' }}>
          <FormField label="Size" value={NEW_STALLS_DEFAULTS.size} onChange={() => {}} />
          <FormField label="Number of stalls" required type="number" value={NEW_STALLS_DEFAULTS.count} onChange={() => {}} />
          <FormField label="Label prefix" value={NEW_STALLS_DEFAULTS.prefix} onChange={() => {}} helper={`Stalls are named ${NEW_STALLS_DEFAULTS.prefix}1, ${NEW_STALLS_DEFAULTS.prefix}2, ${NEW_STALLS_DEFAULTS.prefix}3…`} />
          <FormField label="Start number" type="number" value={NEW_STALLS_DEFAULTS.start} onChange={() => {}} />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5, mt: 2 }}>
          <FormField label="Position" value={NEW_STALLS_DEFAULTS.position} onChange={() => {}} helper="Corner and entrance stalls can cost more" />
          <FormField label="Notes" placeholder="Optional" />
        </Box>
        <Box sx={{ mt: 2 }}><Label>Preview of the new stalls</Label></Box>
        <StallGrid stalls={preview} types={STALL_TYPES} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, mt: 2 }}>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            {Object.values(STALL_TYPES).map(t => <Tag key={t.code} tone={t.tone}>{t.code}  {t.label}</Tag>)}
          </Box>
          <PrimaryButton>Add {NEW_STALLS_DEFAULTS.count} stalls to {hall}</PrimaryButton>
        </Box>
        <Box sx={{ mt: 2.5 }}>
          <SimpleTable
            getRowKey={r => r.name}
            columns={[
              { key: 'name', label: 'Hall', render: r => <b>{r.name}</b> },
              { key: 'stalls', label: 'Stalls' },
              ...Object.entries(STALL_TYPES).map(([key, t]) => ({ key, label: t.label })),
              { key: 'manage', label: '', render: () => <OutlineButton sx={{ minHeight: 36 }}>Manage</OutlineButton> },
            ]}
            rows={HALLS}
          />
        </Box>
      </SectionCard>

      <SectionCard title="Stall types and pricing" action={{ label: 'Add type' }}>
        <SimpleTable
          getRowKey={r => r.type}
          columns={[
            { key: 'type', label: 'Type', render: r => <Tag tone={STALL_TYPES[r.type].tone}>{STALL_TYPES[r.type].label}</Tag> },
            { key: 'size', label: 'Size', render: r => STALL_TYPES[r.type].size },
            { key: 'early', label: 'Early-bird' },
            { key: 'regular', label: 'Regular' },
            {
              key: 'instalments',
              label: 'Instalments',
              render: r => (
                <Toggle
                  checked={instalments[r.type]}
                  onChange={v => setInstalments(s => ({ ...s, [r.type]: v }))}
                  label={`Instalments for ${STALL_TYPES[r.type].label}`}
                />
              ),
            },
          ]}
          rows={STALL_PRICING}
        />
      </SectionCard>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5 }}>
        <SectionCard title="Stall rules">
          <SettingList items={STALL_RULES} />
        </SectionCard>
        <SectionCard title="Sponsorship packages">
          <SettingList items={SPONSORSHIPS} />
          <OutlineButton sx={{ mt: 2 }}>Add package</OutlineButton>
        </SectionCard>
      </Box>
    </>
  );
};

export default StallsStep;
