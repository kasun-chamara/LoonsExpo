import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import Card from '../../components/Card';
import DatePicker from '../../components/DatePicker';
import TimePicker from '../../components/TimePicker';
import DateTimePicker from '../../components/DateTimePicker';
import Button from '../../components/Button';
import ValidatorForm from '../../components/ValidatorForm';

const DateTimePickersExample = () => {
  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [dateTimeValue, setDateTimeValue] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Card>
      <Box p={2} mb={4}>
        <Typography variant="h6">Date & Time Pickers</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Themed date, time, and date-time pickers with validation and custom formats.
        </Typography>
        <ValidatorForm onSubmit={handleSubmit} autoComplete="off">
          <DatePicker
            name="date"
            label="Select Date"
            value={dateValue}
            onChange={setDateValue}
            required
            format="MM/dd/yyyy"
            sx={{ mb: 2 }}
          />
          <TimePicker
            name="time"
            label="Select Time"
            value={timeValue}
            onChange={setTimeValue}
            required
            format="HH:mm"
            sx={{ mb: 2 }}
          />
          <DateTimePicker
            name="datetime"
            label="Select Date & Time"
            value={dateTimeValue}
            onChange={setDateTimeValue}
            required
            format="MM/dd/yyyy HH:mm"
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </ValidatorForm>
        {submitted && (
          <Box mt={2}>
            {dateValue && (
              <Typography color="success.main" sx={{ mb: 1 }}>
                Date: {dateValue.toLocaleDateString()}
              </Typography>
            )}
            {timeValue && (
              <Typography color="success.main" sx={{ mb: 1 }}>
                Time: {timeValue.toLocaleTimeString()}
              </Typography>
            )}
            {dateTimeValue && (
              <Typography color="success.main" sx={{ mb: 1 }}>
                Date & Time: {dateTimeValue.toLocaleString()}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default DateTimePickersExample;
