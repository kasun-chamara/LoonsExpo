import React from 'react';
import { Box } from '@mui/material';
import { SectionCard, ReadinessItem, NoticeBanner, SettingList } from 'components';
import { PUBLISH_NOTICE, READINESS_CHECKS, POSTPONE_CANCEL } from 'mockDb';

const PublishStep = () => (
  <>
    <NoticeBanner tone="warning" title={PUBLISH_NOTICE.title}>{PUBLISH_NOTICE.text}</NoticeBanner>

    <SectionCard title="Readiness checklist" action={{ label: `${READINESS_CHECKS.length} of ${READINESS_CHECKS.length} steps complete` }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        {READINESS_CHECKS.map((c, i) => <ReadinessItem key={c.title} {...c} defaultOpen={i === 0} />)}
      </Box>
    </SectionCard>

    <SectionCard title="Postpone or cancel"><SettingList items={POSTPONE_CANCEL} /></SectionCard>
  </>
);

export default PublishStep;
