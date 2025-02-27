import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFormData } from '../redux/actions'
import { Radio, RadioGroup, FormControlLabel, Checkbox, TextField, FormControl, FormLabel, FormGroup, Rating, Box, Button, Typography, Paper } from '@mui/material'

const Section4 = ({ onNext, handleBack }) => {
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

  const handleRatingChange = (event, newValue) => {
    setLocalData({ ...localData, privacyConcern: newValue })
  }

  const handleNextSection = () => {
    dispatch(updateFormData(localData))
    onNext()
  }

  const validateForm = () => {
    const requiredFields = [
      'privacyConcern',
      'securityMeasures',
    ]

    for (const field of requiredFields) {
      if (!localData[field] || (Array.isArray(localData[field]) && localData[field].length === 0)) {
        return false
      }
    }
    if (localData.securityBreach.experienced === "true" && !localData.securityBreach.explanation) return false

    return true
  }

  useEffect(() => {
    setIsFormValid(validateForm())
  }, [localData])

  return (
    <Paper elevation={1} sx={{ padding: 2, backgroundColor: 'var(--color-light)', borderRadius: 6, marginBottom: '10px' }}>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

        <Typography variant="h6" sx={{ color: 'var(--color-darkest)', marginBottom: '5px' }}>
          Online Privacy & Security
        </Typography>

        <FormControl>

          <FormLabel component="legend">
            How concerned are you about online privacy?
          </FormLabel>

          <Rating name="privacyConcern" value={localData.privacyConcern} onChange={handleRatingChange} />

        </FormControl>

        <FormControl component="fieldset">

          <FormLabel component="legend">
            Have you ever experienced an online security breach?
          </FormLabel>

          <RadioGroup name="securityBreach.experienced" value={localData.securityBreach.experienced} onChange={(e) => setLocalData({ ...localData, securityBreach: { ...localData.securityBreach, experienced: e.target.value } })}>

            <FormControlLabel value="true" control={<Radio />} label="Yes" />

            <FormControlLabel value="false" control={<Radio />} label="No" />

          </RadioGroup>
          {localData.securityBreach.experienced === 'true' && <TextField name="securityBreach.explanation" label="Please specify" value={localData.securityBreach.explanation} onChange={(e) => setLocalData({ ...localData, securityBreach: { ...localData.securityBreach, explanation: e.target.value } })} />}
        
        </FormControl>

        <FormControl component="fieldset">

          <FormLabel component="legend">
            What security measures do you use?
          </FormLabel>

          <FormGroup>

            <FormControlLabel control={<Checkbox checked={localData.securityMeasures.includes('Strong passwords')} onChange={handleInputChange} name="securityMeasures" value="Strong passwords" />} label="Strong passwords" />

            <FormControlLabel control={<Checkbox checked={localData.securityMeasures.includes('Two-factor authentication (2FA)')} onChange={handleInputChange} name="securityMeasures" value="Two-factor authentication (2FA)" />} label="Two-factor authentication (2FA)" />

            <FormControlLabel control={<Checkbox checked={localData.securityMeasures.includes('VPN/Privacy tools')} onChange={handleInputChange} name="securityMeasures" value="VPN/Privacy tools" />} label="VPN/Privacy tools" />
            
            <FormControlLabel control={<Checkbox checked={localData.securityMeasures.includes('I don’t take any security measures')} onChange={handleInputChange} name="securityMeasures" value="I don’t take any security measures" />} label="I don’t take any security measures" />

          </FormGroup>

        </FormControl>

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

export default Section4