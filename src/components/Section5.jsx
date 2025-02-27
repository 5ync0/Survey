import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFormData } from '../redux/actions'
import { TextField, FormControl, FormLabel, Rating, Box, Button, Typography, Paper } from '@mui/material'

const Section5 = ({ onNext, handleBack, validateGlobalForm }) => {
  const dispatch = useDispatch()
  const formData = useSelector((state) => state.formData)
  const [localData, setLocalData] = useState(formData)
  const [isFormValid, setIsFormValid] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setLocalData({ ...localData, [name]: value })
  }

  const handleRatingChange = (event, newValue) => {
    setLocalData({ ...localData, emergingTechInterest: newValue })
  }

  const handleNextSection = () => {
    dispatch(updateFormData(localData))
    if (validateGlobalForm()) {
      onNext()
    }
    else {
      console.log("Global form is invalid. Cannot proceed.")
    }
  }

  const validateForm = () => {
    const requiredFields = [
      'emergingTechInterest',
      'futureTechImpact',
    ]

    for (const field of requiredFields) {
      if (!localData[field]) {
        return false
      }
    }
    return true
  }

  useEffect(() => {
    setIsFormValid(validateForm())
  }, [localData])

  return (
    <Paper elevation={1} sx={{ padding: 2, backgroundColor: 'var(--color-light)', borderRadius: 6, marginBottom: '10px' }}>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

        <Typography variant="h6" sx={{ color: 'var(--color-darkest)', marginBottom: '5px' }}>
          Future Tech Trends & Preferences
        </Typography>

        <FormControl>

          <FormLabel component="legend">
            Are you interested in emerging technologies?
          </FormLabel>

          <Rating name="emergingTechInterest" value={localData.emergingTechInterest} onChange={handleRatingChange} />

        </FormControl>

        <TextField name="futureTechImpact" label="What technology will have the biggest impact?" value={localData.futureTechImpact} onChange={handleInputChange} multiline rows={4} />

        <TextField name="additionalThoughts" label="Additional thoughts on technology's impact?" value={localData.additionalThoughts} onChange={handleInputChange} multiline rows={4} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>

          <Button variant="contained" onClick={handleBack} sx={{ backgroundColor: 'var(--color-medium)' }}>
            Back
          </Button>

          <Button variant="contained" onClick={handleNextSection} disabled={!isFormValid} sx={{ backgroundColor: 'var(--color-medium)' }}>
            Next
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default Section5