import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import Card from '../../components/Card';
import CheckboxGroupField from '../../components/CheckboxGroupField';
import Button from '../../components/Button';

const CheckboxGroupFieldExample = () => {
  const [value, setValue] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Card>
      <Box p={2} mb={4}>
        <Typography variant="h6">CheckboxGroupField</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Themed checkbox group with validation, row/column layout, and controlled usage.
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <CheckboxGroupField
            name="exampleCheckbox"
            label="Select options"
            checkboxes={[
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
        {submitted && value.length === 0 && (
          <Typography color="error" sx={{ mt: 2 }}>
            Please select at least one option.
          </Typography>
        )}
        {submitted && value.length > 0 && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            You selected: {value.join(', ')}
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default CheckboxGroupFieldExample;
