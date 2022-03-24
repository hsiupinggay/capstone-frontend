/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button, MobileStepper,
} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';

function MedStepper({
  setActiveStep, activeStep, handleSubmit, name, setError0, setErrorMessage0,
}) {
  const navigate = useNavigate();
  const handleNext = () => {
    if (activeStep === 0 && name === '') {
      setError0(true);
      setErrorMessage0('Please fill in a medication name.');
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      return navigate(-1);
    }
    return setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <MobileStepper
      variant="dots"
      steps={3}
      position="static"
      activeStep={activeStep}
      sx={{ flexGrow: 1 }}
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
        <Button size="small" onClick={handleBack}>
          <KeyboardArrowLeft />
          Back
        </Button>
      )}
    />
  );
}

export default MedStepper;
