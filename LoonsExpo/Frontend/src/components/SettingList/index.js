import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import SettingRow from '../SettingRow';
import Toggle from '../Toggle';
import Tag from '../Tag';
import { OutlineButton } from '../FormActions';
import SelectField from '../SelectField';
import SegmentedControl from '../SegmentedControl';

/**
 * Data-driven list of settings. Each item is
 * `{ id, title, description?, control?: { type: 'toggle', on } | { type: 'tag', tone, label } | { type: 'button', label }
 *   | { type: 'select', options, value } | { type: 'segment', options, value } }`.
 * Toggle, select and segment state is kept here; `onChange(id, nextValue)` reports changes, `onAction(id)` reports button clicks.
 */
const SettingList = ({ items, onChange, onAction, gap = 2 }) => {
  const [values, setValues] = useState(() => Object.fromEntries(
    items
      .filter(i => i.control && ['toggle', 'select', 'segment'].includes(i.control.type))
      .map(i => [i.id, i.control.type === 'toggle' ? i.control.on : i.control.value])
  ));

  const change = id => value => {
    setValues(state => ({ ...state, [id]: value }));
    if (onChange) onChange(id, value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap }}>
      {items.map(item => {
        const control = item.control;
        return (
          <SettingRow key={item.id} title={item.title} description={item.description}>
            {control && control.type === 'toggle' && <Toggle checked={!!values[item.id]} onChange={change(item.id)} label={item.title} />}
            {control && control.type === 'select' && (
              <SelectField ariaLabel={item.title} value={values[item.id]} onChange={change(item.id)} options={control.options} sx={{ width: 200, flex: 'none' }} />
            )}
            {control && control.type === 'segment' && (
              <SegmentedControl label={item.title} options={control.options} value={values[item.id]} onChange={change(item.id)} />
            )}
            {control && control.type === 'tag' && <Tag tone={control.tone}>{control.label}</Tag>}
            {control && control.type === 'button' && (
              <OutlineButton sx={{ minHeight: 36 }} onClick={() => onAction && onAction(item.id)}>{control.label}</OutlineButton>
            )}
          </SettingRow>
        );
      })}
    </Box>
  );
};

SettingList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.node.isRequired,
    description: PropTypes.node,
    control: PropTypes.object,
  })).isRequired,
  onChange: PropTypes.func,
  onAction: PropTypes.func,
  gap: PropTypes.number,
};

export default SettingList;
