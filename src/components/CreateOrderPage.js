// components/CreateOrderPage.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Stepper,Step,StepLabel,Button,Typography,Paper,Container,Grid,TextField,} from '@material-ui/core';

const steps = ['Shipping Address', 'Order Confirmation'];

const CreateOrderPage = () => {
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingAddress, setShippingAddress] = useState('');
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const handleNext = () => {
    if (activeStep === 0) {
      if (shippingAddress.trim() === '') {
        alert('Please enter a valid shipping address.');
        return;
      }
    }

    if (activeStep === 1) {
      setIsOrderConfirmed(true);
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleConfirmOrder = () => {
    console.log('Your order is confirmed.');
    history.push('/orders');
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Shipping Address"
                fullWidth
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Typography variant="h6" color="primary">
            Your order is confirmed.
          </Typography>
        );
      default:
        return 'Unknown stepIndex';
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Create Order
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              {isOrderConfirmed ? (
                <Typography variant="h5" color="primary">
                  Your order is confirmed.
                </Typography>
              ) : (
                <Typography variant="h5" color="error">
                  An error occurred while confirming the order.
                </Typography>
              )}
              <Button onClick={handleConfirmOrder} variant="contained" color="primary">
                Go to Orders
              </Button>
            </div>
          ) : (
            <div>
              {getStepContent(activeStep)}
              <div style={{ marginTop: '20px' }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Paper>
    </Container>
  );
};

export default CreateOrderPage;
