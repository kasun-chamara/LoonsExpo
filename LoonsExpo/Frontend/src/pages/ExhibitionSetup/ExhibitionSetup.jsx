import React, { useState } from 'react';
import { Box } from '@mui/material';
import { MainCard, PageHeader, SetupSteps, FormActions, OutlineButton } from 'components';
import { SETUP_STEPS } from 'mockDb';
import BasicsStep from './steps/BasicsStep';
import StallsStep from './steps/StallsStep';
import ProgrammeStep from './steps/ProgrammeStep';
import TicketsStep from './steps/TicketsStep';
import PaymentsStep from './steps/PaymentsStep';
import PublishStep from './steps/PublishStep';

// Which screen shows for each step in `mockDb` SETUP_STEPS.
const STEP_BODIES = {
  basics: BasicsStep,
  stalls: StallsStep,
  programme: ProgrammeStep,
  tickets: TicketsStep,
  payments: PaymentsStep,
  publish: PublishStep,
};

const ExhibitionSetup = () => {
  const [current, setCurrent] = useState(0);
  const [savedAt, setSavedAt] = useState(null);

  const step = SETUP_STEPS[current];
  const StepBody = STEP_BODIES[step.key];
  const isLast = current === SETUP_STEPS.length - 1;

  const go = (index) => {
    setCurrent(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const saveDraft = () => setSavedAt(new Date());

  return (
    <MainCard sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <PageHeader
          title={`Create exhibition: ${step.heading}`}
          subtitle={step.subtitle}
          actions={<OutlineButton>Edit published exhibition details</OutlineButton>}
        />

        <SetupSteps
          steps={SETUP_STEPS}
          current={current}
          onSelect={go}
          status={savedAt ? `Draft saved at ${savedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Not saved yet'}
        />

        <StepBody />

        <FormActions
          onBack={current > 0 ? () => go(current - 1) : undefined}
          onSave={saveDraft}
          onContinue={isLast ? saveDraft : () => go(current + 1)}
          continueLabel={step.next}
        />
      </Box>
    </MainCard>
  );
};

export default ExhibitionSetup;
