import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { FormField, SelectField, ChoiceChips, OutlineButton, PrimaryButton } from 'components';
import { INVITE_DEFAULTS, INVITE_OPTIONS } from 'mockDb';

/**
 * "Add team member" dialog. `onSend(form)` is called with the filled-in values.
 */
const InviteMemberDialog = ({ open, onClose, onSend }) => {
  const [form, setForm] = useState(INVITE_DEFAULTS);
  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const send = () => {
    onSend(form);
    setForm(INVITE_DEFAULTS);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: '20px' } }}>
      <DialogTitle sx={{ pb: 0.5 }}>
        <Typography component="span" sx={{ display: 'block', fontSize: 20, fontWeight: 700 }}>Add team member</Typography>
        <Typography component="span" sx={{ display: 'block', fontSize: 13, fontWeight: 400, color: 'text.secondary' }}>
          Send an invitation to join the organiser console.
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, pt: 2 }}>
          <FormField label="Full name" value={form.name} onChange={set('name')} placeholder="e.g. Chamara Perera" />
          <FormField label="Email" type="email" value={form.email} onChange={set('email')} placeholder="name@company.com" />
          <SelectField label="Role" value={form.role} onChange={v => setForm(f => ({ ...f, role: v }))} options={INVITE_OPTIONS.roles} />
          <SelectField label="Event access" value={form.access} onChange={v => setForm(f => ({ ...f, access: v }))} options={INVITE_OPTIONS.access} />
        </Box>
        <Typography sx={{ mt: 2.5, mb: 1, fontSize: 12, fontWeight: 600, color: 'text.secondary' }}>Permissions</Typography>
        <ChoiceChips multiple options={INVITE_OPTIONS.permissions} value={form.permissions} onChange={v => setForm(f => ({ ...f, permissions: v }))} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 3 }}>
          <OutlineButton onClick={onClose}>Cancel</OutlineButton>
          <PrimaryButton onClick={send} disabled={!form.name || !form.email}>Send invitation</PrimaryButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

InviteMemberDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
};

export default InviteMemberDialog;
