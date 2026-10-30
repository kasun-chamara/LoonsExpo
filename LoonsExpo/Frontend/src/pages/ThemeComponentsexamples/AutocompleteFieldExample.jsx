import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import Card from '../../components/Card';
import Autocomplete from '../../components/AutocompleteField';
import Button from '../../components/Button';
import ValidatorForm from '../../components/ValidatorForm';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
];

const AutocompleteFieldExample = () => {
  const [value, setValue] = useState(null);
  const [multiValue, setMultiValue] = useState([]);
  const [freeSoloValue, setFreeSoloValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleMultiChange = (event, newValue) => {
    setMultiValue(newValue);
  };
  const handleFreeSoloChange = (event, newValue) => {
    setFreeSoloValue(newValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Card>
      <Box p={2} mb={4}>
        <Typography variant="h6">AutocompleteField</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Themed autocomplete with validation, single/multiple selection, and freeSolo.
        </Typography>
        <ValidatorForm onSubmit={handleSubmit} autoComplete="off">
          <Autocomplete
            name="fruit"
            label="Select a fruit"
            options={options}
            getOptionLabel={(option) => option.label || ''}
            isOptionEqualToValue={(opt, val) => opt.value === val?.value}
            value={value}
            onChange={handleChange}
            required
            validators={["required"]}
            errorMessages={["This field is required."]}
          />
          <Box mt={2} />
          <Autocomplete
            name="multiFruit"
            label="Select multiple fruits"
            options={options}
            getOptionLabel={(option) => option.label || ''}
            isOptionEqualToValue={(opt, val) => opt.value === val?.value}
            value={multiValue}
            onChange={handleMultiChange}
            multiple
            required
            validators={["required"]}
            errorMessages={["Select at least one."]}
          />
          <Box mt={2} />
          <Autocomplete
            name="freeSoloFruit"
            label="Type or select a fruit"
            options={options.map(o => o.label)}
            value={freeSoloValue}
            onChange={handleFreeSoloChange}
            freeSolo
            required
            validators={["required"]}
            errorMessages={["This field is required."]}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </ValidatorForm>
        {submitted && !value && (
          <Typography color="error" sx={{ mt: 2 }}>
            Please select a fruit.
          </Typography>
        )}
        {submitted && value && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            You selected: {value.label}
          </Typography>
        )}
        {submitted && multiValue.length === 0 && (
          <Typography color="error" sx={{ mt: 2 }}>
            Please select at least one fruit (multiple).
          </Typography>
        )}
        {submitted && multiValue.length > 0 && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            You selected: {multiValue.map(v => v.label).join(', ')}
          </Typography>
        )}
        {submitted && !freeSoloValue && (
          <Typography color="error" sx={{ mt: 2 }}>
            Please type or select a fruit (freeSolo).
          </Typography>
        )}
        {submitted && freeSoloValue && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            You entered: {freeSoloValue}
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default AutocompleteFieldExample;
