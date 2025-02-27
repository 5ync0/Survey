import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFormData } from '../redux/actions'
import { Radio, RadioGroup, FormControlLabel, Checkbox, TextField, FormControl, FormLabel, FormGroup, Box, Button, Typography, Paper } from '@mui/material'

const Section1 = ({ onNext }) => {
  const dispatch = useDispatch()
  const formData = useSelector((state) => state.formData)
  const [localData, setLocalData] = useState(formData)
  const [isFormValid, setIsFormValid] = useState(false)

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
    let newValue = type === 'checkbox' ? checked : value

    if (type === 'checkbox') {
      if (checked) {
        newValue = [...(localData[name] || []), value]
      }
      else {
        newValue = (localData[name] || []).filter((item) => item !== value)
      }
    }
    setLocalData({ ...localData, [name]: newValue })
  }

  const handleNextSection = () => {
    dispatch(updateFormData(localData))
    onNext()
  }

  const validateForm = () => {
    const requiredFields = [
      'hoursPerDay',
      'devicesUsed',
    ]

    for (const field of requiredFields) {
      if (!localData[field] || (Array.isArray(localData[field]) && localData[field].length === 0)) {
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
          General Tech Usage
        </Typography>

        <FormControl component="fieldset">

          <FormLabel component="legend">
            How many hours per day do you spend using tech?
          </FormLabel>

          <RadioGroup name="hoursPerDay" value={localData.hoursPerDay} onChange={handleInputChange}>

            <FormControlLabel value="Less than 2 hours" control={<Radio />} label="Less than 2 hours" />

            <FormControlLabel value="2-4 hours" control={<Radio />} label="2-4 hours" />

            <FormControlLabel value="4-6 hours" control={<Radio />} label="4-6 hours" />

            <FormControlLabel value="More than 6 hours" control={<Radio />} label="More than 6 hours" />

          </RadioGroup>

        </FormControl>

        <FormControl component="fieldset">

          <FormLabel component="legend">
            Which devices do you use regularly?
          </FormLabel>

          <FormGroup>

            <FormControlLabel control={<Checkbox checked={localData.devicesUsed.includes('Smartphone')} onChange={handleInputChange} name="devicesUsed" value="Smartphone" />} label="Smartphone" />

            <FormControlLabel control={<Checkbox checked={localData.devicesUsed.includes('Laptop/Desktop')} onChange={handleInputChange} name="devicesUsed" value="Laptop/Desktop" />} label="Laptop/Desktop" />

            <FormControlLabel control={<Checkbox checked={localData.devicesUsed.includes('Tablet')} onChange={handleInputChange} name="devicesUsed" value="Tablet" />} label="Tablet" />

            <FormControlLabel control={<Checkbox checked={localData.devicesUsed.includes('Smartwatch')} onChange={handleInputChange} name="devicesUsed" value="Smartwatch" />} label="Smartwatch" />

            <TextField name="otherDevice" label="Other (specify)" value={localData.otherDevice || ''} onChange={handleInputChange} />

          </FormGroup>

        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>

          <Button variant="contained" onClick={handleNextSection} disabled={!isFormValid} sx={{ backgroundColor: 'var(--color-medium)' }}>
            Next
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default Section1