import React, { useState } from 'react';
import { Box } from '@mui/material';
import { SectionCard, SimpleTable, Toggle, SettingList } from 'components';
import { TICKETS, PRICING_RULES, CAPACITY_RULES, EXHIBITOR_REGISTRATION } from 'mockDb';

const col2 = { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5 };

const TicketsStep = () => {
  const [visible, setVisible] = useState(Object.fromEntries(TICKETS.map(t => [t.id, t.visible])));

  return (
    <>
      <SectionCard title="Ticket types" action={{ label: 'Add ticket' }}>
        <SimpleTable
          getRowKey={r => r.id}
          columns={[
            { key: 'name', label: 'Ticket' },
            { key: 'pass', label: 'Pass' },
            { key: 'price', label: 'Price' },
            { key: 'capacity', label: 'Capacity' },
            {
              key: 'visible',
              label: 'Visible',
              render: r => (
                <Toggle checked={visible[r.id]} onChange={v => setVisible(s => ({ ...s, [r.id]: v }))} label={`${r.name} visible`} />
              ),
            },
          ]}
          rows={TICKETS}
        />
      </SectionCard>

      <Box sx={col2}>
        <SectionCard title="Pricing rules"><SettingList items={PRICING_RULES} /></SectionCard>
        <SectionCard title="Capacity"><SettingList items={CAPACITY_RULES} /></SectionCard>
      </Box>

      <SectionCard title="Exhibitor registration"><SettingList items={EXHIBITOR_REGISTRATION} /></SectionCard>
    </>
  );
};

export default TicketsStep;
