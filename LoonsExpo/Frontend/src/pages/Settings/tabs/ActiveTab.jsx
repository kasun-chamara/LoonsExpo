import React, { useState } from 'react';
import { Box } from '@mui/material';
import { SectionCard, StatCard, ActivityFeed, Tag, OutlineButton } from 'components';
import { ACTIVE_KPIS, SESSIONS, LIVE_FEED } from 'mockDb';

const ActiveTab = () => {
  const [sessions, setSessions] = useState(SESSIONS);
  const signOut = id => setSessions(list => list.filter(s => s.id !== id));
  const signOutOthers = () => setSessions(list => list.filter(s => s.current));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }, gap: 2 }}>
        {ACTIVE_KPIS.map(k => <StatCard key={k.id} icon={k.icon} color={k.color} value={k.value} label={k.label} />)}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.55fr) minmax(0, 1fr)' }, gap: 2.5, alignItems: 'start' }}>
        <SectionCard title="Active sessions" subtitle="Devices currently signed in to your organisation">
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {sessions.map(s => (
              <Box key={s.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.75, py: 2, borderBottom: theme => `1px solid ${theme.palette.border.main}`, '&:first-of-type': { pt: 0 }, '&:last-of-type': { borderBottom: 0, pb: 0 } }}>
                <Box sx={{ width: 44, height: 44, flex: 'none', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary', bgcolor: 'action.hover', border: theme => `1px solid ${theme.palette.border.main}` }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={s.icon} /></svg>
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box component="b" sx={{ display: 'block', fontSize: 14 }}>{s.device}</Box>
                  <Box component="small" sx={{ fontSize: 12.5, color: 'text.secondary' }}>{s.detail}</Box>
                </Box>
                {s.current
                  ? <Tag tone="green">This device</Tag>
                  : (
                    <>
                      <Box component="small" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>{s.activity}</Box>
                      <OutlineButton sx={{ minHeight: 36 }} onClick={() => signOut(s.id)}>Sign out</OutlineButton>
                    </>
                  )}
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2.5 }}>
            <OutlineButton onClick={signOutOthers}>Sign out all other sessions</OutlineButton>
          </Box>
        </SectionCard>

        <SectionCard title="Live activity" subtitle="What your team is doing right now">
          <ActivityFeed items={LIVE_FEED} />
        </SectionCard>
      </Box>
    </Box>
  );
};

export default ActiveTab;
