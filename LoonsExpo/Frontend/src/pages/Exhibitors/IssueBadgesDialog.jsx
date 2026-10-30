import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { BADGE_OPTIONS } from 'mockDb';
import { BadgeCard, InitialsAvatar, Tag, ChoiceChips, SettingRow, Toggle, OutlineButton, PrimaryButton } from 'components';

const { types: BADGE_TYPES, days: DAYS, event: EVENT_NAME } = BADGE_OPTIONS;

const label = { fontSize: 13, fontWeight: 600, color: 'text.secondary', mb: 1 };

/**
 * Dialog for issuing badges to an exhibitor's team. `exhibitor` is a record from `mockDb`.
 */
const IssueBadgesDialog = ({ exhibitor, onClose }) => {
  const [badgeType, setBadgeType] = useState(BADGE_TYPES[0]);
  const [days, setDays] = useState(DAYS);
  const [email, setEmail] = useState(true);

  if (!exhibitor) return null;
  const { holders, badgeLimit } = exhibitor;
  const lead = holders[0];
  const stallText = `Stall ${exhibitor.stall} · ${exhibitor.hall}`;

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md" PaperProps={{ sx: { borderRadius: '20px' } }}>
      <DialogTitle sx={{ pb: 0.5 }}>
        <Typography component="span" sx={{ display: 'block', fontSize: 20, fontWeight: 700 }}>Issue badges</Typography>
        <Typography component="span" sx={{ display: 'block', fontSize: 13, fontWeight: 400, color: 'text.secondary' }}>
          {exhibitor.name} · {stallText} · {exhibitor.package} package
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '260px minmax(0, 1fr)' }, gap: 3, pt: 2 }}>
          <Box>
            <Typography sx={label}>Badge preview</Typography>
            <BadgeCard
              event={EVENT_NAME}
              initials={lead.initials}
              name={lead.name}
              company={exhibitor.name}
              stall={stallText}
              code={`${exhibitor.initials}-0001 · ${days.length === 3 ? 'Day 1 to 3' : days.join(', ')}`}
            />
          </Box>

          <Box>
            <Typography sx={label}>
              Badge holders <Box component="span" sx={{ fontWeight: 400 }}>· {holders.length} of {badgeLimit} used</Box>
            </Typography>
            <Box sx={{ height: 8, borderRadius: 9, bgcolor: 'brand.light', overflow: 'hidden', mb: 1.5 }}>
              <Box sx={{ height: '100%', width: `${(holders.length / badgeLimit) * 100}%`, bgcolor: 'brand.main', borderRadius: 9 }} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              {holders.map(h => (
                <Box key={h.name} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1.5, py: 1, borderRadius: '12px', border: theme => `1px solid ${theme.palette.border.main}` }}>
                  <InitialsAvatar initials={h.initials} size={38} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box component="b" sx={{ display: 'block', fontSize: 14 }}>{h.name}</Box>
                    <Box component="small" sx={{ fontSize: 12, color: 'text.secondary' }}>{h.role}</Box>
                  </Box>
                  <Tag tone="green">QR ready</Tag>
                </Box>
              ))}
            </Box>

            <Box component="button" type="button" sx={{ mt: 1.5, p: 0, border: 0, bgcolor: 'transparent', font: 'inherit', fontWeight: 600, color: 'brand.dark', cursor: 'pointer' }}>
              + Add person
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 2 }}>
              <Box>
                <Typography component="label" htmlFor="badge-type" sx={{ ...label, display: 'block' }}>Badge type</Typography>
                <Box
                  component="select"
                  id="badge-type"
                  value={badgeType}
                  onChange={e => setBadgeType(e.target.value)}
                  sx={{ width: '100%', minHeight: 44, px: 1.5, font: 'inherit', color: 'text.primary', bgcolor: 'background.paper', borderRadius: '10px', border: theme => `1px solid ${theme.palette.border.main}` }}
                >
                  {BADGE_TYPES.map(t => <option key={t}>{t}</option>)}
                </Box>
              </Box>
              <Box>
                <Typography sx={label}>Valid on</Typography>
                <ChoiceChips multiple options={DAYS} value={days} onChange={setDays} />
              </Box>
            </Box>

            <SettingRow sx={{ mt: 2 }} title="Email badges to holders" description="Each person gets their QR code by email">
              <Toggle checked={email} onChange={setEmail} label="Email badges to holders" />
            </SettingRow>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.25, mt: 3 }}>
          <OutlineButton sx={{ mr: 'auto' }}>Download PDF</OutlineButton>
          <OutlineButton onClick={onClose}>Cancel</OutlineButton>
          <OutlineButton>Print badges</OutlineButton>
          <PrimaryButton onClick={onClose}>Issue {holders.length} badges</PrimaryButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

IssueBadgesDialog.propTypes = {
  exhibitor: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default IssueBadgesDialog;
