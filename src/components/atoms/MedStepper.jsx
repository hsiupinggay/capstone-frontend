/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button, MobileStepper,
} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

function MedStepper({ setActiveStep, activeStep, handleSubmit }) {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <MobileStepper
      variant="dots"
      steps={3}
      position="static"
      activeStep={activeStep}
      sx={{ maxWidth: 230, flexGrow: 1 }}
      nextButton={activeStep === 2 ? (
        <Button size="small" onClick={handleSubmit}>
          Submit
          <KeyboardArrowRight />
        </Button>
      ) : (
        <Button size="small" onClick={handleNext} disabled={activeStep === 2}>
          Next
          <KeyboardArrowRight />
        </Button>

      )}
      backButton={(
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          <KeyboardArrowLeft />
          Back
        </Button>
      )}
    />
  );
}

export default MedStepper;
