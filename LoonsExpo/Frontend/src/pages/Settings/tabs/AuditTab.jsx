import React, { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { SectionCard, SearchField, FilterSelect, SimpleTable, InitialsAvatar, Tag, Pager } from 'components';
import { AUDIT_FILTERS, AUDIT_ROWS, AUDIT_TOTAL } from 'mockDb';

const PAGE_SIZE = 10;

const AuditTab = () => {
  const [query, setQuery] = useState('');
  const [person, setPerson] = useState('');
  const [action, setAction] = useState('');
  const [range, setRange] = useState('');
  const [page, setPage] = useState(1);

  const rows = useMemo(
    () => AUDIT_ROWS.filter(r =>
      `${r.person} ${r.action} ${r.item}`.toLowerCase().includes(query.trim().toLowerCase()) &&
      (!person || r.person === person)
    ),
    [query, person]
  );

  return (
    <SectionCard title="Audit log" subtitle="A permanent record of who changed what, kept for 12 months">
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25, mb: 2 }}>
        <SearchField sx={{ flex: 1, minWidth: 240, width: 'auto' }} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by person, action or item" />
        <FilterSelect label="All people" value={person} onChange={setPerson} options={AUDIT_FILTERS.people} />
        <FilterSelect label="All actions" value={action} onChange={setAction} options={AUDIT_FILTERS.actions} />
        <FilterSelect label="Today" value={range} onChange={setRange} options={AUDIT_FILTERS.ranges} />
      </Box>

      <SimpleTable
        getRowKey={r => r.id}
        columns={[
          {
            key: 'time',
            label: 'Time',
            render: r => (
              <Box>
                <Box component="b" sx={{ display: 'block' }}>{r.time}</Box>
                <Box component="small" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>{r.date}</Box>
              </Box>
            ),
          },
          {
            key: 'person',
            label: 'Person',
            render: r => (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, whiteSpace: 'nowrap' }}>
                <InitialsAvatar initials={r.initials} size={32} />
                <b>{r.person}</b>
              </Box>
            ),
          },
          { key: 'action', label: 'Action', render: r => <Tag tone={r.actionTone}>{r.action}</Tag> },
          { key: 'item', label: 'Item' },
          { key: 'ip', label: 'IP address' },
          { key: 'result', label: 'Result', render: r => <Tag tone={r.resultTone}>{r.result}</Tag> },
        ]}
        rows={rows}
      />

      <Pager page={page} pageCount={3} pageSize={PAGE_SIZE} total={AUDIT_TOTAL} onChange={setPage} />
    </SectionCard>
  );
};

export default AuditTab;
