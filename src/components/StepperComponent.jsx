import React, { useState, useEffect } from 'react'
import { Stepper, Step, StepLabel, Typography, Box, Paper } from '@mui/material'
import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'
import Section4 from './Section4'
import Section5 from './Section5'
import Report from './Report'
import { useSelector } from 'react-redux'

const steps = ['General Tech Usage', 'Social Media', 'Digital Well-being', 'Privacy & Security', 'Future Tech', 'Report']

const StepperComponent = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [canAccessReport, setCanAccessReport] = useState(false)
  const formData = useSelector((state) => state.formData)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepClick = (stepIndex) => {
    if (stepIndex === 5 && !canAccessReport) {
      return
    }
    setActiveStep(stepIndex)
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Section1 onNext={handleNext} />
      case 1:
        return <Section2 onNext={handleNext} handleBack={handleBack} />
      case 2:
        return <Section3 onNext={handleNext} handleBack={handleBack} />
      case 3:
        return <Section4 onNext={handleNext} handleBack={handleBack} />
      case 4:
        return <Section5 onNext={handleNext} validateGlobalForm={isFormValid} handleBack={handleBack} />
      case 5:
        return <Report handleBack={handleBack} />
      default:
        return 'Unknown step'
    }
  }

  const isFormValid = () => {
    const requiredFields = [
      'hoursPerDay',
      'devicesUsed',
      'socialPlatformsCount',
      'mostUsedSocialPlatform',
      'socialMediaCheckFrequency',
      'socialMediaImpact',
      'sleepImpact',
      'screenBreaks',
      'privacyConcern',
      'securityMeasures',
      'emergingTechInterest',
      'futureTechImpact',
    ]

    for (const field of requiredFields) {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        return false
      }
    }

    if (formData.screenTimeManagement && formData.screenTimeManagement.used === "true" && !formData.screenTimeManagement.appName) {
      return false
    }

    if (formData.securityBreach && formData.securityBreach.experienced === "true" && !formData.securityBreach.explanation) {
      return false
    }

    return true
  }

  useEffect(() => {
    setCanAccessReport(isFormValid())
  }, [formData])

  return (
    <Paper elevation={2} sx={{ width: '100%', maxWidth: 3000, padding: 2, borderRadius: 8, margin: '20px' }}>

      <Stepper nonLinear activeStep={activeStep} sx={{ mb: 3, backgroundColor: 'var(--color-light)', padding: 1, minHeight: '100px', borderRadius: 4 }}>

        {steps.map((label, index) => (

          <Step key={label} onClick={() => handleStepClick(index)} sx={{ cursor: 'pointer', pointerEvents: (index === 5 && !canAccessReport) ? 'none' : 'auto' }}>
            
            <StepLabel>

              {label}

            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mb: 1 }}>

        <Typography variant="body1">

          {getStepContent(activeStep)}

        </Typography>
      </Box>
    </Paper>
  )
}

export default StepperComponent