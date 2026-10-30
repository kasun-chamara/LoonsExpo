import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import {
  MainCard,
  PageHeader,
  SectionCard,
  KpiCard,
  SettingList,
  FormField,
  SelectField,
  InfoNote,
  OutlineButton,
  PrimaryButton,
} from 'components';
import {
  VR_HEADER,
  VR_KPIS,
  VR_FLOW,
  VR_FORM_FIELDS,
  VR_ASKED_OPTIONS,
  VR_PAYMENT_SETTINGS,
  VR_AFTER_PAYMENT,
  VR_TICKET_SETTINGS,
  VR_EVENT,
  VR_DETAILS_DEFAULTS,
  VR_RECEIPT,
} from 'mockDb';
import StepCards from './components/StepCards';
import FieldRow from './components/FieldRow';
import TicketCard from './components/TicketCard';

const VisitorRegistration = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState(VR_FORM_FIELDS);
  const [ticket, setTicket] = useState({
    format: VR_TICKET_SETTINGS.numberFormat,
    qr: VR_TICKET_SETTINGS.qrValue,
    valid: VR_TICKET_SETTINGS.validValue,
    gates: VR_TICKET_SETTINGS.gates,
    subject: VR_TICKET_SETTINGS.emailSubject,
  });

  const updateField = (id, patch) => setFields(list => list.map(f => (f.id === id ? { ...f, ...patch } : f)));
  const setTicketValue = key => value => setTicket(t => ({ ...t, [key]: value }));
  const openPreview = () => navigate('/register');

  return (
    <MainCard sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <PageHeader
          title={VR_HEADER.title}
          subtitle={VR_HEADER.subtitle}
          actions={
            <>
              <OutlineButton onClick={openPreview}>{VR_HEADER.previewLabel}</OutlineButton>
              <PrimaryButton>{VR_HEADER.publishLabel}</PrimaryButton>
            </>
          }
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' }, gap: 2 }}>
          {VR_KPIS.map(k => <KpiCard key={k.id} {...k} />)}
        </Box>

        <SectionCard sx={{ pb: 4, mb: 1 }} title="How visitor registration works" subtitle="Three steps from the public registration page to the entry gate">
          <StepCards steps={VR_FLOW} onPreview={openPreview} />
        </SectionCard>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.2fr) minmax(0, 1fr)' }, gap: 2.5, alignItems: 'start' }}>
          <Box sx={{ display: 'grid', gap: 2.5, minWidth: 0 }}>
            <SectionCard title="Registration form" subtitle="The questions visitors answer before they pay">
              <Box sx={{ display: { xs: 'none', md: 'grid' }, gridTemplateColumns: 'minmax(0, 1fr) 150px 64px', gap: 1.75, pb: 1, borderBottom: theme => `1px solid ${theme.palette.border.main}`, fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: 'text.secondary' }}>
                <span>Field</span><span>Asked as</span><span style={{ textAlign: 'right' }}>Show</span>
              </Box>
              {fields.map(f => (
                <FieldRow
                  key={f.id}
                  title={f.title}
                  description={f.description}
                  asked={f.asked}
                  show={f.show}
                  options={VR_ASKED_OPTIONS}
                  onAskedChange={value => updateField(f.id, { asked: value })}
                  onShowChange={value => updateField(f.id, { show: value })}
                />
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, mt: 2.5 }}>
                <OutlineButton>Add custom question</OutlineButton>
                <Box sx={{ display: 'flex', gap: 1.25 }}>
                  <OutlineButton onClick={() => setFields(VR_FORM_FIELDS)}>Cancel</OutlineButton>
                  <PrimaryButton>Save changes</PrimaryButton>
                </Box>
              </Box>
            </SectionCard>

            <SectionCard title="Ticket preview" subtitle="This is what a visitor receives after paying">
              <TicketCard
                compact
                kind="TRADE VISITOR"
                name={VR_DETAILS_DEFAULTS.name}
                role={`${VR_DETAILS_DEFAULTS.jobTitle} · ${VR_DETAILS_DEFAULTS.company}`}
                code={VR_RECEIPT.badgeCode}
                fields={[
                  { label: 'Valid', value: VR_EVENT.valid },
                  { label: 'Entry', value: ticket.gates },
                  { label: 'Ticket number', value: VR_RECEIPT.ticketNumber },
                  { label: 'Badge code', value: VR_RECEIPT.badgeCode },
                ]}
              />
              <Box sx={{ display: 'flex', gap: 1.25, justifyContent: 'flex-end', flexWrap: 'wrap', mt: 2.5 }}>
                <OutlineButton onClick={openPreview}>Full ticket page</OutlineButton>
                <OutlineButton>Send test email</OutlineButton>
              </Box>
            </SectionCard>
          </Box>

          <Box sx={{ display: 'grid', gap: 2.5, minWidth: 0 }}>
            <SectionCard title="Payment" subtitle="How visitors pay for their ticket">
              <SettingList items={VR_PAYMENT_SETTINGS} gap={2.5} />
            </SectionCard>

            <SectionCard title="After payment" subtitle="What happens the moment payment clears">
              <SettingList items={VR_AFTER_PAYMENT} gap={2.5} />
            </SectionCard>

            <SectionCard title="Ticket and QR code" subtitle="Control what is printed and what the scanner reads">
              <Box sx={{ display: 'grid', gap: 2 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <FormField label="Ticket number format" value={ticket.format} onChange={e => setTicketValue('format')(e.target.value)} />
                  <SelectField label="QR code contains" value={ticket.qr} onChange={setTicketValue('qr')} options={VR_TICKET_SETTINGS.qrOptions} />
                  <SelectField label="Valid on" value={ticket.valid} onChange={setTicketValue('valid')} options={VR_TICKET_SETTINGS.validOptions} />
                  <FormField label="Entry gates" value={ticket.gates} onChange={e => setTicketValue('gates')(e.target.value)} />
                </Box>
                <FormField label="Email subject" value={ticket.subject} onChange={e => setTicketValue('subject')(e.target.value)} />
                <InfoNote>{VR_TICKET_SETTINGS.note}</InfoNote>
              </Box>
            </SectionCard>
          </Box>
        </Box>
      </Box>
    </MainCard>
  );
};

export default VisitorRegistration;
