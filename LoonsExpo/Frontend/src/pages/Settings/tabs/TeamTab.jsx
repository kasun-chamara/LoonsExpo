import React, { useState } from 'react';
import { Box } from '@mui/material';
import { SectionCard, StatCard, SimpleTable, InitialsAvatar, Tag, PrimaryButton } from 'components';
import { TEAM_KPIS, TEAM_MEMBERS, ROLES, ROLE_TONE, MEMBER_STATUS_TONE } from 'mockDb';
import InviteMemberDialog from '../InviteMemberDialog';

const initialsOf = name => name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();

const moreIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" />
  </svg>
);

const TeamTab = () => {
  const [members, setMembers] = useState(TEAM_MEMBERS);
  const [inviting, setInviting] = useState(false);

  const invite = form => {
    setMembers(list => [
      ...list,
      { id: `new-${list.length}`, initials: initialsOf(form.name), name: form.name, email: form.email, role: form.role, access: form.access, lastActive: 'Not joined yet', status: 'Invited' },
    ]);
    setInviting(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }, gap: 2 }}>
        {TEAM_KPIS.map(k => <StatCard key={k.id} icon={k.icon} color={k.color} value={k.value} label={k.label} />)}
      </Box>

      <SectionCard
        title="Team members"
        subtitle="People who can sign in to this organiser console"
        action={<PrimaryButton sx={{ minHeight: 38 }} onClick={() => setInviting(true)}>+ Add team member</PrimaryButton>}
      >
        <SimpleTable
          getRowKey={m => m.id}
          columns={[
            {
              key: 'member',
              label: 'Member',
              render: m => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <InitialsAvatar initials={m.initials} size={38} />
                  <Box>
                    <Box component="b" sx={{ display: 'block', fontSize: 14 }}>{m.name}</Box>
                    <Box component="small" sx={{ fontSize: 12.5, color: 'text.secondary' }}>{m.email}</Box>
                  </Box>
                </Box>
              ),
            },
            { key: 'role', label: 'Role', render: m => <Tag tone={ROLE_TONE[m.role]}>{m.role}</Tag> },
            { key: 'access', label: 'Access' },
            { key: 'lastActive', label: 'Last active' },
            { key: 'status', label: 'Status', render: m => <Tag tone={MEMBER_STATUS_TONE[m.status]}>{m.status}</Tag> },
            {
              key: 'more',
              label: '',
              render: m => (
                <Box component="button" type="button" aria-label={`More actions for ${m.name}`} sx={{ width: 34, height: 34, p: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary', bgcolor: 'background.paper', cursor: 'pointer', borderRadius: '10px', border: theme => `1px solid ${theme.palette.border.main}`, ml: 'auto' }}>
                  {moreIcon}
                </Box>
              ),
            },
          ]}
          rows={members}
        />
      </SectionCard>

      <SectionCard title="Roles" subtitle="What each role can do">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' }, gap: 2 }}>
          {ROLES.map(r => (
            <Box key={r.role} sx={{ p: 2, borderRadius: '14px', border: theme => `1px solid ${theme.palette.border.main}` }}>
              <Tag tone={ROLE_TONE[r.role]}>{r.role}</Tag>
              <Box component="small" sx={{ display: 'block', mt: 1, fontSize: 12.5, lineHeight: 1.45, color: 'text.secondary' }}>{r.description}</Box>
            </Box>
          ))}
        </Box>
      </SectionCard>

      <InviteMemberDialog open={inviting} onClose={() => setInviting(false)} onSend={invite} />
    </Box>
  );
};

export default TeamTab;
