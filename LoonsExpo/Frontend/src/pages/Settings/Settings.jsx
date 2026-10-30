import React, { useState } from 'react';
import { Box } from '@mui/material';
import { MainCard, PageHeader, TabBar } from 'components';
import { SETTINGS_TABS } from 'mockDb';
import OrganisationTab from './tabs/OrganisationTab';
import TeamTab from './tabs/TeamTab';
import LanguageTab from './tabs/LanguageTab';
import PaymentsTab from './tabs/PaymentsTab';
import AuditTab from './tabs/AuditTab';
import ActiveTab from './tabs/ActiveTab';

// Screen for each tab name in `mockDb` SETTINGS_TABS.
const TAB_BODIES = {
  Organisation: OrganisationTab,
  Team: TeamTab,
  Language: LanguageTab,
  Payments: PaymentsTab,
  'Audit log': AuditTab,
  'Active logs': ActiveTab,
};

const Settings = () => {
  const [tab, setTab] = useState(SETTINGS_TABS[0].value);
  const TabBody = TAB_BODIES[tab];

  return (
    <MainCard sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <PageHeader title="Settings" subtitle="Manage your organisation, team, language, security and logs" />
        <TabBar variant="pills" tabs={SETTINGS_TABS} value={tab} onChange={setTab} />
        <TabBody />
      </Box>
    </MainCard>
  );
};

export default Settings;
