import React from 'react';
import { Box } from '@mui/material';
import { SectionCard, SettingList, SettingRow, OutlineButton } from 'components';
import { SETTINGS_PAYMENT_METHODS, PAYOUT_ACCOUNT, PAYOUT_SETTINGS } from 'mockDb';

const PaymentsTab = () => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5, alignItems: 'start' }}>
    <SectionCard title="Payment methods" subtitle="What exhibitors and visitors can use to pay">
      <SettingList items={SETTINGS_PAYMENT_METHODS} gap={2.5} />
    </SectionCard>

    <SectionCard title="Payout account" subtitle="Where collected money is sent">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <SettingRow
          title={PAYOUT_ACCOUNT.name}
          description={<>{PAYOUT_ACCOUNT.bank}<br />{PAYOUT_ACCOUNT.account}</>}
        >
          <OutlineButton sx={{ minHeight: 36 }}>Change</OutlineButton>
        </SettingRow>
        <SettingList items={PAYOUT_SETTINGS} gap={2.5} />
      </Box>
    </SectionCard>
  </Box>
);

export default PaymentsTab;
