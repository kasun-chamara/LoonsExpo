import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { SectionCard, InfoNote, FormField, SelectField, InitialsAvatar, SummaryList, OutlineButton, PrimaryButton } from 'components';
import {
  VR_EVENT,
  VR_FLOW_STEPS,
  VR_TICKET_TYPES,
  VR_DETAILS_DEFAULTS,
  VR_DETAILS_OPTIONS,
  VR_PAYMENT_METHODS,
  VR_CARD_DEFAULTS,
  VR_NEXT_STEPS,
  VR_RECEIPT,
} from 'mockDb';
import TicketCard from './components/TicketCard';

const lkr = amount => `LKR ${amount.toLocaleString('en-US')}`;
const HOLD_SECONDS = 15 * 60;
const grid2 = { display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.25 };
const heading = { m: 0, fontSize: 19, fontWeight: 750, letterSpacing: '-.01em' };

const Icon = ({ path, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>
);

const Stepper = ({ current }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: 640, mx: 'auto', mb: 3.5 }}>
    {VR_FLOW_STEPS.map((label, i) => {
      const done = i < current;
      const on = i === current;
      return (
        <React.Fragment key={label}>
          {i > 0 && <Box sx={{ flex: 1, minWidth: 24, height: 2, mx: 1.5, borderRadius: 1, bgcolor: done || on ? 'brand.success' : 'action.disabled' }} />}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, whiteSpace: 'nowrap', fontWeight: 650, fontSize: 13.5, color: on ? 'text.primary' : done ? 'brand.success' : 'text.secondary' }}>
            <Box
              component="i"
              sx={{
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                fontStyle: 'normal',
                fontWeight: 800,
                fontSize: 13,
                bgcolor: on ? 'brand.main' : done ? alpha('#12A150', 0.16) : 'background.paper',
                color: on ? '#fff' : done ? 'brand.success' : 'text.secondary',
                border: theme => `2px solid ${on ? theme.palette.brand.main : done ? theme.palette.brand.success : theme.palette.border.main}`,
                boxShadow: on ? theme => `0 6px 16px ${alpha(theme.palette.brand.main, 0.3)}` : 'none',
              }}
            >
              {done ? <Icon path="M5 12l4 4 10-10" size={16} /> : i + 1}
            </Box>
            <Box component="span" sx={{ display: { xs: on ? 'inline' : 'none', sm: 'inline' } }}>{label}</Box>
          </Box>
        </React.Fragment>
      );
    })}
  </Box>
);

const CheckRow = ({ checked, onChange, children }) => (
  <Box component="label" sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', my: 0.75, fontSize: 13.5, lineHeight: 1.45, color: 'text.primary', cursor: 'pointer' }}>
    <Box
      component="input"
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      sx={{ flex: 'none', width: 20, height: 20, mt: '1px', accentColor: theme => theme.palette.brand.main }}
    />
    <span>{children}</span>
  </Box>
);

const Summary = ({ ticket, promo }) => (
  <Box sx={{ mt: 2.25, pt: 2, borderTop: theme => `1px dashed ${theme.palette.border.main}`, display: 'grid', gap: 1, fontSize: 13.5, color: 'text.secondary' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><span>{ticket.name} × 1</span><b>{lkr(ticket.price)}</b></Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><span>Service fee</span><b>{lkr(0)}</b></Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><span>Promo code</span><Box component="b" sx={{ color: 'brand.success' }}>{promo || 'None'}</Box></Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5, pt: 1.5, borderTop: theme => `1px solid ${theme.palette.border.main}`, fontSize: 17, fontWeight: 800, color: 'text.primary' }}>
      <span>Total</span><span>{lkr(ticket.price)}</span>
    </Box>
  </Box>
);

const TicketPick = ({ ticket, on, onClick }) => (
  <Box
    component="button"
    type="button"
    aria-pressed={on}
    onClick={onClick}
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.75,
      width: '100%',
      p: '14px 16px',
      mb: 1.25,
      textAlign: 'left',
      font: 'inherit',
      color: 'text.primary',
      cursor: 'pointer',
      borderRadius: '16px',
      border: theme => `2px solid ${on ? theme.palette.brand.main : theme.palette.border.main}`,
      bgcolor: on ? 'brand.light' : 'background.paper',
    }}
  >
    <Box component="span" sx={{ flex: 'none', width: 20, height: 20, borderRadius: '50%', bgcolor: 'background.paper', border: theme => `${on ? 6 : 2}px solid ${on ? theme.palette.brand.main : theme.palette.border.main}` }} />
    <Box>
      <Box component="b" sx={{ display: 'block', fontSize: 14.5 }}>{ticket.name}</Box>
      <Box component="small" sx={{ fontSize: 12.5, color: 'text.secondary' }}>{ticket.description}</Box>
    </Box>
    <Box component="span" sx={{ ml: 'auto', fontWeight: 800, fontSize: 14.5, whiteSpace: 'nowrap' }}>{lkr(ticket.price)}</Box>
  </Box>
);

const RegistrationFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(VR_DETAILS_DEFAULTS);
  const [ticketId, setTicketId] = useState(VR_TICKET_TYPES[0].id);
  const [method, setMethod] = useState(VR_PAYMENT_METHODS[0].id);
  const [card, setCard] = useState(VR_CARD_DEFAULTS);
  const [secondsLeft, setSecondsLeft] = useState(HOLD_SECONDS);

  const ticket = VR_TICKET_TYPES.find(t => t.id === ticketId);
  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }));
  const setCardValue = key => e => setCard(c => ({ ...c, [key]: e.target.value }));
  const initials = form.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  const clock = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`;

  useEffect(() => {
    if (step !== 1) return undefined;
    const timer = setInterval(() => setSecondsLeft(s => Math.max(s - 1, 0)), 1000);
    return () => clearInterval(timer);
  }, [step]);

  const go = next => {
    setStep(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const titles = [
    { title: `Register for ${VR_EVENT.name}`, text: 'Takes about two minutes. You get your QR ticket straight after paying.' },
    { title: 'Pay for your ticket', text: 'Your details are saved. One more step and your QR ticket is ready.' },
    { title: 'Your ticket', text: 'Show this QR code at the gate. We also emailed it to you.' },
  ][step];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <Box component="header" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, minHeight: 72, px: { xs: 2, md: 6 }, py: 1, bgcolor: 'background.paper', borderBottom: theme => `1px solid ${theme.palette.border.main}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 800, fontSize: 17 }}>
          <Box sx={{ width: 36, height: 36, borderRadius: '11px', bgcolor: 'brand.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <Icon path="M6 17V8a3 3 0 013-3h6a3 3 0 013 3v6a3 3 0 01-3 3z" size={20} />
          </Box>
          {VR_EVENT.brand}
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, px: 1.75, py: 0.875, borderRadius: 99, fontSize: 12.5, fontWeight: 700, color: 'brand.dark', bgcolor: 'brand.tint' }}>
          <Icon path="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" size={15} />
          {VR_EVENT.line}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.25, fontSize: 13, color: 'text.secondary' }}>
          <span>{VR_EVENT.help}</span>
          <Box component="button" type="button" onClick={() => navigate('/login')} sx={{ p: 0, border: 0, bgcolor: 'transparent', font: 'inherit', fontWeight: 700, color: 'brand.dark', cursor: 'pointer' }}>Sign in</Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1180, mx: 'auto', px: { xs: 2, md: 6 }, pt: 4, pb: 5 }}>
        <Box sx={{ textAlign: 'center', mb: 3.25 }}>
          <Typography component="h1" sx={{ m: '0 0 6px', fontSize: { xs: 24, md: 30 }, fontWeight: 800, letterSpacing: '-.02em' }}>{titles.title}</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 14.5 }}>{titles.text}</Typography>
        </Box>

        <Stepper current={step} />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) 380px' }, gap: 3, alignItems: 'start' }}>
          {step === 0 && (
            <>
              <SectionCard sx={{ p: 3.5, borderRadius: '22px' }}>
                <Typography component="h2" sx={heading}>Your details</Typography>
                <Typography sx={{ mb: 2.5, color: 'text.secondary', fontSize: 13.5 }}>We print these on your badge and your ticket</Typography>
                <Box sx={{ display: 'grid', gap: 2.25 }}>
                  <Box sx={grid2}>
                    <FormField label="Full name" required value={form.name} onChange={set('name')} />
                    <FormField label="Email address" required type="email" value={form.email} onChange={set('email')} />
                    <FormField label="Mobile number" required value={form.mobile} onChange={set('mobile')} />
                    <FormField label="Company" required value={form.company} onChange={set('company')} />
                    <FormField label="Job title" value={form.jobTitle} onChange={set('jobTitle')} />
                    <SelectField label="Industry" value={form.industry} onChange={v => setForm(f => ({ ...f, industry: v }))} options={VR_DETAILS_OPTIONS.industries} />
                    <SelectField label="Country" value={form.country} onChange={v => setForm(f => ({ ...f, country: v }))} options={VR_DETAILS_OPTIONS.countries} />
                    <SelectField label="How did you hear about us?" value={form.source} onChange={v => setForm(f => ({ ...f, source: v }))} options={VR_DETAILS_OPTIONS.sources} />
                  </Box>
                  <FormField label="Address" value={form.address} onChange={set('address')} />
                  <Box>
                    <CheckRow checked={form.shareDetails} onChange={v => setForm(f => ({ ...f, shareDetails: v }))}>
                      Let exhibitors see my name, company and contact details when they scan my badge.
                    </CheckRow>
                    <CheckRow checked={form.agreeTerms} onChange={v => setForm(f => ({ ...f, agreeTerms: v }))}>
                      I agree to the <Box component="b" sx={{ color: 'brand.dark' }}>terms and conditions</Box> and the <Box component="b" sx={{ color: 'brand.dark' }}>privacy policy</Box>.
                    </CheckRow>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1.5, mt: 3 }}>
                  <OutlineButton onClick={() => navigate('/visitor-registration')}>Cancel</OutlineButton>
                  <PrimaryButton disabled={!form.agreeTerms} onClick={() => go(1)}>Continue to payment →</PrimaryButton>
                </Box>
              </SectionCard>

              <SectionCard sx={{ p: 3.5, borderRadius: '22px' }}>
                <Typography component="h2" sx={heading}>Your ticket</Typography>
                <Typography sx={{ mb: 2.25, color: 'text.secondary', fontSize: 13.5 }}>Choose the pass that suits you</Typography>
                {VR_TICKET_TYPES.map(t => <TicketPick key={t.id} ticket={t} on={t.id === ticketId} onClick={() => setTicketId(t.id)} />)}
                <Box sx={{ display: 'flex', gap: 1.25, mt: 2 }}>
                  <FormField sx={{ flex: 1 }} placeholder="Promo code" />
                  <OutlineButton sx={{ alignSelf: 'flex-start' }}>Apply</OutlineButton>
                </Box>
                <Summary ticket={ticket} />
              </SectionCard>
            </>
          )}

          {step === 1 && (
            <>
              <Box sx={{ minWidth: 0 }}>
                <InfoNote sx={{ mb: 2.25, fontWeight: 600 }} icon="M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z">
                  {secondsLeft > 0 ? `Your ticket is held for ${clock} minutes. Finish paying to keep it.` : 'Your hold has ended. Go back and choose your ticket again.'}
                </InfoNote>
                <SectionCard sx={{ p: 3.5, borderRadius: '22px' }}>
                  <Typography component="h2" sx={heading}>Payment</Typography>
                  <Typography sx={{ mb: 2.25, color: 'text.secondary', fontSize: 13.5 }}>Choose how you want to pay</Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 1.5, mb: 2.75 }}>
                    {VR_PAYMENT_METHODS.map(m => {
                      const on = m.id === method;
                      return (
                        <Box
                          key={m.id}
                          component="button"
                          type="button"
                          aria-pressed={on}
                          onClick={() => setMethod(m.id)}
                          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.25, minHeight: 56, font: 'inherit', fontWeight: 700, fontSize: 14, cursor: 'pointer', borderRadius: '14px', color: on ? 'brand.dark' : 'text.secondary', bgcolor: on ? 'brand.light' : 'background.paper', border: theme => `2px solid ${on ? theme.palette.brand.main : theme.palette.border.main}` }}
                        >
                          <Icon path={m.icon} size={20} />{m.label}
                        </Box>
                      );
                    })}
                  </Box>

                  {method === 'card' ? (
                    <Box sx={{ display: 'grid', gap: 2.25 }}>
                      <FormField label="Name on card" required value={card.holder} onChange={setCardValue('holder')} />
                      <FormField label="Card number" required value={card.number} onChange={setCardValue('number')} />
                      <Box sx={grid2}>
                        <FormField label="Expiry date" required value={card.expiry} onChange={setCardValue('expiry')} placeholder="MM / YY" />
                        <FormField label="Security code" required value={card.code} onChange={setCardValue('code')} placeholder="CVV" type="password" />
                      </Box>
                    </Box>
                  ) : (
                    <Typography sx={{ p: 2, borderRadius: '14px', bgcolor: 'action.hover', fontSize: 13.5, color: 'text.secondary' }}>
                      {method === 'bank'
                        ? 'You will see the bank details on the next screen. Your ticket is issued once the organiser approves the transfer.'
                        : 'You will be sent to your bank to approve the payment, then brought back here.'}
                    </Typography>
                  )}

                  <InfoNote tone="green" sx={{ mt: 2.5 }} icon="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z">
                    Payments are processed securely by PayHere. We never see or store your full card number.
                  </InfoNote>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1.5, mt: 3 }}>
                    <OutlineButton onClick={() => go(0)}>Back</OutlineButton>
                    <PrimaryButton disabled={secondsLeft === 0} onClick={() => go(2)}>Pay {lkr(ticket.price)}</PrimaryButton>
                  </Box>
                </SectionCard>
              </Box>

              <SectionCard sx={{ p: 3.5, borderRadius: '22px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 2, mb: 1, borderBottom: theme => `1px solid ${theme.palette.border.main}` }}>
                  <InitialsAvatar initials={initials} size={42} />
                  <Box>
                    <Box component="b" sx={{ display: 'block', fontSize: 14.5 }}>{form.name}</Box>
                    <Box component="small" sx={{ fontSize: 12.5, color: 'text.secondary' }}>{form.email} · {form.company}</Box>
                  </Box>
                </Box>
                <Typography component="h2" sx={{ ...heading, mt: 1.75 }}>Order summary</Typography>
                <Typography sx={{ mb: 1.5, color: 'text.secondary', fontSize: 13.5 }}>{VR_EVENT.name} · {VR_EVENT.valid}</Typography>
                <TicketPick ticket={ticket} on onClick={() => {}} />
                <Summary ticket={ticket} />
              </SectionCard>
            </>
          )}

          {step === 2 && (
            <>
              <Box sx={{ minWidth: 0 }}>
                <Box sx={{ textAlign: 'center', mb: 3.25 }}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', color: 'brand.success', bgcolor: 'rgba(18,161,80,.16)', boxShadow: '0 0 0 10px rgba(18,161,80,.08)' }}>
                    <Icon path="M5 12l4 4 10-10" size={30} />
                  </Box>
                  <Typography component="h2" sx={{ m: '20px 0 6px', fontSize: { xs: 24, md: 30 }, fontWeight: 800, letterSpacing: '-.02em' }}>Payment received. You are registered!</Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: 14.5 }}>
                    We sent your ticket to <b>{form.email}</b> and an SMS link to <b>{form.mobile}</b>.
                  </Typography>
                </Box>

                <TicketCard
                  kind={ticket.name.toUpperCase()}
                  name={form.name}
                  role={`${form.jobTitle} · ${form.company}`}
                  code={VR_RECEIPT.badgeCode}
                  fields={[
                    { label: 'Valid', value: VR_EVENT.valid },
                    { label: 'Entry', value: VR_EVENT.gates },
                    { label: 'Ticket number', value: VR_RECEIPT.ticketNumber },
                    { label: 'Badge code', value: VR_RECEIPT.badgeCode },
                  ]}
                />

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 1.5, mt: 2.5 }}>
                  <PrimaryButton>Download PDF ticket</PrimaryButton>
                  <OutlineButton>Add to phone wallet</OutlineButton>
                  <OutlineButton>Email me again</OutlineButton>
                </Box>
              </Box>

              <Box sx={{ display: 'grid', gap: 2.5 }}>
                <SectionCard sx={{ p: 3.5, borderRadius: '22px' }}>
                  <Typography component="h2" sx={heading}>What happens next</Typography>
                  <Typography sx={{ mb: 1.5, color: 'text.secondary', fontSize: 13.5 }}>Three things to do before the show</Typography>
                  <Box sx={{ display: 'grid' }}>
                    {VR_NEXT_STEPS.map(n => (
                      <Box key={n.id} sx={{ display: 'flex', gap: 1.75, alignItems: 'flex-start', py: 1.5, borderBottom: theme => `1px solid ${theme.palette.border.main}`, '&:last-of-type': { borderBottom: 0 } }}>
                        <Box sx={{ flex: 'none', width: 34, height: 34, borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: n.color, bgcolor: alpha(n.color, 0.14) }}>
                          <Icon path={n.icon} size={17} />
                        </Box>
                        <Box>
                          <Box component="b" sx={{ display: 'block', fontSize: 14 }}>{n.title}</Box>
                          <Box component="small" sx={{ fontSize: 12.5, lineHeight: 1.4, color: 'text.secondary' }}>{n.text}</Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <PrimaryButton sx={{ width: '100%', mt: 2 }} onClick={() => navigate('/login')}>Plan my visit</PrimaryButton>
                </SectionCard>

                <SectionCard sx={{ p: 3.5, borderRadius: '22px' }}>
                  <Typography component="h2" sx={heading}>Receipt</Typography>
                  <Typography sx={{ mb: 1.5, color: 'text.secondary', fontSize: 13.5 }}>{VR_RECEIPT.paidOn}</Typography>
                  <SummaryList
                    items={[
                      { label: 'Order number', value: VR_RECEIPT.orderNumber },
                      { label: 'Ticket type', value: ticket.name },
                      { label: 'Amount paid', value: lkr(ticket.price) },
                      { label: 'Paid with', value: VR_RECEIPT.paidWith },
                    ]}
                  />
                  <OutlineButton sx={{ width: '100%', mt: 2 }}>Download receipt</OutlineButton>
                </SectionCard>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RegistrationFlow;
