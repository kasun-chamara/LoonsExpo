import React from 'react';
import { Box } from '@mui/material';
import { SectionCard, SettingList } from 'components';
import { PAYMENT_METHODS, MESSAGE_SETTINGS } from 'mockDb';

const PaymentsStep = () => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5 }}>
    <SectionCard title="Payments"><SettingList items={PAYMENT_METHODS} /></SectionCard>
    <SectionCard title="Messages and reminders"><SettingList items={MESSAGE_SETTINGS} /></SectionCard>
  </Box>
);

export default PaymentsStep;
