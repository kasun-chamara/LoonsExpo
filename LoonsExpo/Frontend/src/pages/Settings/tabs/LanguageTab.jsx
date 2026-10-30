import React, { useState } from 'react';
import { Box } from '@mui/material';
import { SectionCard, SettingList, SelectField, ProgressBar, Toggle, Tag, OutlineButton, PrimaryButton } from 'components';
import { LANGUAGE_REGION, EVENT_LANGUAGES, OUTGOING_LANGUAGE } from 'mockDb';

const LanguageTab = () => {
  const [enabled, setEnabled] = useState(Object.fromEntries(EVENT_LANGUAGES.map(l => [l.id, l.on])));
  const [outgoing, setOutgoing] = useState({ email: OUTGOING_LANGUAGE.email.value, badge: OUTGOING_LANGUAGE.badge.value });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.55fr) minmax(0, 1fr)' }, gap: 2.5, alignItems: 'start' }}>
        <SectionCard title="Language and region" subtitle="How dates, times and money appear for your team">
          <SettingList items={LANGUAGE_REGION} gap={2.5} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 2.5 }}>
            <OutlineButton>Cancel</OutlineButton>
            <PrimaryButton>Save changes</PrimaryButton>
          </Box>
        </SectionCard>

        <SectionCard title="Event languages" subtitle="Languages exhibitors and visitors can pick">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {EVENT_LANGUAGES.map(l => (
              <Box key={l.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.75 }}>
                <Box sx={{ width: 42, height: 42, flex: 'none', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, bgcolor: 'action.hover', border: theme => `1px solid ${theme.palette.border.main}` }}>
                  {l.flag}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box component="b" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 14 }}>
                    {l.name} {l.isDefault && <Tag tone="blue">Default</Tag>}
                  </Box>
                  <Box component="small" sx={{ fontSize: 12.5, color: 'text.secondary' }}>{l.percent}% translated</Box>
                </Box>
                <ProgressBar value={l.percent} color={l.color} width={72} label={`${l.name} translated`} />
                <Toggle checked={enabled[l.id]} onChange={v => setEnabled(s => ({ ...s, [l.id]: v }))} label={`${l.name} enabled`} />
              </Box>
            ))}
          </Box>
        </SectionCard>
      </Box>

      <SectionCard title="Emails and badges" subtitle="Language used when messages and printed items are sent out">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5 }}>
          <SelectField label={OUTGOING_LANGUAGE.email.label} value={outgoing.email} onChange={v => setOutgoing(s => ({ ...s, email: v }))} options={OUTGOING_LANGUAGE.email.options} />
          <SelectField label={OUTGOING_LANGUAGE.badge.label} value={outgoing.badge} onChange={v => setOutgoing(s => ({ ...s, badge: v }))} options={OUTGOING_LANGUAGE.badge.options} />
        </Box>
      </SectionCard>
    </Box>
  );
};

export default LanguageTab;
