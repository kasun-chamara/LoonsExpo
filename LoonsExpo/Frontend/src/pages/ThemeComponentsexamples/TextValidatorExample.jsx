import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ValidatorForm from '../../components/ValidatorForm';
import TextValidator from '../../components/TextValidator';

const TextValidatorExample = () => {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <Card>
      <Box p={2} mb={4}>
        <Typography variant="h6">TextValidator</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Themed TextValidator component with built-in validation and default styling.
        </Typography>
        <ValidatorForm onSubmit={handleSubmit} autoComplete="off">
          <TextValidator
            label="Example Field"
            name="example"
            value={value}
            onChange={e => setValue(e.target.value)}
            required
            validators={["required", "minStringLength:3"]}
            errorMessages={["This field is required", "Minimum 3 characters"]}
            //autoFocus
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </ValidatorForm>
        {submitted && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            Form submitted!
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default TextValidatorExample;
