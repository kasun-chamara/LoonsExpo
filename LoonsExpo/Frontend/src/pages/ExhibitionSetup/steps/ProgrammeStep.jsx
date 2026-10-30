import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { SectionCard, Tag, TabBar, SettingRow, SettingList, InitialsAvatar, OutlineButton } from 'components';
import { SECTORS, AGENDA, SPEAKERS, ROOMS } from 'mockDb';

const col2 = { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5 };

const ProgrammeStep = () => {
  const days = Object.keys(AGENDA);
  const [day, setDay] = useState(days[0]);
  const sessions = AGENDA[day];

  return (
    <>
      <SectionCard title="Sectors" action={<OutlineButton sx={{ minHeight: 38 }}>+ Add sector</OutlineButton>}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25 }}>
          {SECTORS.map(s => <Tag key={s.label} tone={s.tone}>{s.label}</Tag>)}
        </Box>
        <Typography sx={{ mt: 1.25, fontSize: 13, color: 'text.secondary' }}>
          Used for exhibitor directory filters and buyer matching.
        </Typography>
      </SectionCard>

      <SectionCard title="Agenda" action={{ label: 'Import from file' }}>
        <TabBar tabs={days} value={day} onChange={setDay} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1.5 }}>
          {sessions.length === 0
            ? <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>No sessions on {day} yet.</Typography>
            : <SettingList key={day} items={sessions} />}
          <OutlineButton sx={{ alignSelf: 'flex-start' }}>Add session</OutlineButton>
        </Box>
      </SectionCard>

      <Box sx={col2}>
        <SectionCard title="Speakers">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {SPEAKERS.map(s => (
              <SettingRow
                key={s.id}
                title={
                  <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                    <InitialsAvatar initials={s.initials} size={38} color={s.color} solid />
                    <Box component="span">
                      <b>{s.name}</b><br />
                      <Box component="small" sx={{ fontWeight: 400, color: 'text.secondary', fontSize: 13 }}>{s.detail}</Box>
                    </Box>
                  </Box>
                }
              >
                <OutlineButton sx={{ minHeight: 36 }}>Edit</OutlineButton>
              </SettingRow>
            ))}
            <OutlineButton sx={{ alignSelf: 'flex-start' }}>Invite speaker</OutlineButton>
          </Box>
        </SectionCard>

        <SectionCard title="Stages and rooms">
          <SettingList items={ROOMS} />
          <OutlineButton sx={{ mt: 2 }}>Add room</OutlineButton>
        </SectionCard>
      </Box>
    </>
  );
};

export default ProgrammeStep;
