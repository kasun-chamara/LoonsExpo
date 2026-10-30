import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import {
  MainCard,
  PageHeader,
  SectionCard,
  FormField,
  SettingList,
  InitialsAvatar,
  Tag,
  OutlineButton,
  PrimaryButton,
} from 'components';
import { PROFILE_DEFAULTS, PROFILE_FIELDS, PROFILE_STATS, PROFILE_PREFERENCES, ACCOUNT_MENU_DEFAULT_ROLE } from 'mockDb';

const initialsOf = name => name.split(' ').map(p => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const initial = {
    ...PROFILE_DEFAULTS,
    name: user?.name || PROFILE_DEFAULTS.name,
    email: user?.email || PROFILE_DEFAULTS.email,
  };
  const [data, setData] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const [editing, setEditing] = useState(false);

  const startEdit = () => {
    setDraft(data);
    setEditing(true);
  };
  const save = () => {
    setData(draft);
    // Keep the name and email in the signed-in user so the header shows them too.
    dispatch({ type: 'UPDATE_USER', payload: { name: draft.name, email: draft.email } });
    setEditing(false);
  };

  const role = user?.role || ACCOUNT_MENU_DEFAULT_ROLE;

  return (
    <MainCard sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <PageHeader title="My profile" subtitle="Your account details and sign-in preferences" />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '320px minmax(0, 1fr)' }, gap: 2.5, alignItems: 'start' }}>
          <SectionCard sx={{ textAlign: 'center', p: 3 }}>
            <InitialsAvatar initials={initialsOf(data.name)} size={96} solid color="#F4320B" sx={{ mx: 'auto', fontSize: 34, borderRadius: '28px' }} />
            <Typography component="h2" sx={{ mt: 2, fontSize: 20, fontWeight: 800, letterSpacing: '-.01em' }}>{data.name}</Typography>
            <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1.5 }}>{data.department}</Typography>
            <Tag tone={role === 'admin' ? 'red' : 'brand'}>{role}</Tag>

            <Box sx={{ mt: 2.5, pt: 2, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, borderTop: theme => `1px solid ${theme.palette.border.main}` }}>
              {PROFILE_STATS.map(s => (
                <Box key={s.label}>
                  <Box component="b" sx={{ display: 'block', fontSize: 20 }}>{s.value}</Box>
                  <Box component="small" sx={{ display: 'block', fontSize: 11, lineHeight: 1.3, color: 'text.secondary' }}>{s.label}</Box>
                </Box>
              ))}
            </Box>
          </SectionCard>

          <Box sx={{ display: 'grid', gap: 2.5, minWidth: 0 }}>
            <SectionCard
              title="Personal information"
              subtitle="Shown to your team in the organiser console"
              action={
                editing
                  ? (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <OutlineButton sx={{ minHeight: 38 }} onClick={() => setEditing(false)}>Cancel</OutlineButton>
                      <PrimaryButton sx={{ minHeight: 38 }} onClick={save}>Save changes</PrimaryButton>
                    </Box>
                  )
                  : <OutlineButton sx={{ minHeight: 38 }} onClick={startEdit}>Edit</OutlineButton>
              }
            >
              {editing ? (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                  {PROFILE_FIELDS.filter(f => f.editable).map(f => (
                    <FormField key={f.key} label={f.label} type={f.type} value={draft[f.key]} onChange={e => setDraft(d => ({ ...d, [f.key]: e.target.value }))} />
                  ))}
                </Box>
              ) : (
                <Box>
                  {PROFILE_FIELDS.map(f => (
                    <Box key={f.key} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.75, borderBottom: theme => `1px solid ${theme.palette.border.main}`, '&:last-of-type': { borderBottom: 0, pb: 0 }, '&:first-of-type': { pt: 0 } }}>
                      <Box sx={{ flex: 'none', width: 40, height: 40, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'brand.main', bgcolor: 'brand.tint' }}>
                        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={f.icon} /></svg>
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Box component="small" sx={{ display: 'block', fontSize: 12, color: 'text.secondary' }}>{f.label}</Box>
                        <Box component="b" sx={{ fontSize: 14.5, color: 'text.primary', overflowWrap: 'anywhere' }}>{data[f.key]}</Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </SectionCard>

            <SectionCard title="Sign-in and alerts" subtitle="How you want to be protected and notified">
              <SettingList items={PROFILE_PREFERENCES} gap={2.5} />
            </SectionCard>
          </Box>
        </Box>
      </Box>
    </MainCard>
  );
};

export default Profile;
