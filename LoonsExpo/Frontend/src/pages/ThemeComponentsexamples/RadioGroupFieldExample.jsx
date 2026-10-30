import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import Card from '../../components/Card';
import RadioGroupField from '../../components/RadioGroupField';
import Button from '../../components/Button';

const RadioGroupFieldExample = () => {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Card>
      <Box p={2} mb={4}>
        <Typography variant="h6">RadioGroupField</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Themed radio button group with validation, row/column layout, and controlled usage.
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <RadioGroupField
            name="exampleRadio"
            label="Choose an option"
            radioButtons={[
              { value: 'a', label: 'Option A' },
              { value: 'b', label: 'Option B' },
              { value: 'c', label: 'Option C', disabled: true },
            ]}
            value={value}
            onChange={handleChange}
            required
            row
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
        {submitted && !value && (
          <Typography color="error" sx={{ mt: 2 }}>
            Please select an option.
          </Typography>
        )}
        {submitted && value && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            You selected: {value}
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default RadioGroupFieldExample;
