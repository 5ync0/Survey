import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFormData } from '../redux/actions'
import { Radio, RadioGroup, FormControlLabel, TextField, FormControl, FormLabel, Select, MenuItem, Box, Button, Typography, Paper } from '@mui/material'

const Section2 = ({ onNext, handleBack }) => {
  const dispatch = useDispatch()
  const formData = useSelector((state) => state.formData)
  const [localData, setLocalData] = useState(formData)
  const [isFormValid, setIsFormValid] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setLocalData({ ...localData, [name]: value })
  }

  const handleNextSection = () => {
    dispatch(updateFormData(localData))
    onNext()
  }

  const validateForm = () => {
    const requiredFields = [
      'socialPlatformsCount',
      'mostUsedSocialPlatform',
      'socialMediaCheckFrequency',
      'socialMediaImpact',
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
          Social Media & Communication
        </Typography>

        <FormControl component="fieldset">

          <FormLabel component="legend">
            How many social media platforms do you actively use?
          </FormLabel>
          <RadioGroup name="socialPlatformsCount" value={localData.socialPlatformsCount} onChange={handleInputChange}>

            <FormControlLabel value="None" control={<Radio />} label="None" />

            <FormControlLabel value="1-2" control={<Radio />} label="1-2" />

            <FormControlLabel value="3-4" control={<Radio />} label="3-4" />

            <FormControlLabel value="More than 4" control={<Radio />} label="More than 4" />

          </RadioGroup>

        </FormControl>

        <FormControl>

          <FormLabel id="mostUsedSocialPlatform">
            Which social media platform do you use the most?
          </FormLabel>

          <Select labelId="mostUsedSocialPlatform" id="mostUsedSocialPlatformSelect" name="mostUsedSocialPlatform" value={localData.mostUsedSocialPlatform} onChange={handleInputChange}>

            <MenuItem value="Facebook">Facebook</MenuItem>

            <MenuItem value="Instagram">Instagram</MenuItem>

            <MenuItem value="Twitter/X">Twitter/X</MenuItem>

            <MenuItem value="TikTok">TikTok</MenuItem>

            <MenuItem value="LinkedIn">LinkedIn</MenuItem>

            <MenuItem value="Other">Other</MenuItem>

          </Select>

        </FormControl>

        <FormControl component="fieldset">

          <FormLabel component="legend">
            How often do you check social media?
          </FormLabel>

          <RadioGroup name="socialMediaCheckFrequency" value={localData.socialMediaCheckFrequency} onChange={handleInputChange}>

            <FormControlLabel value="1 (Never)" control={<Radio />} label="1 (Never)" />

            <FormControlLabel value="2 (Rarely)" control={<Radio />} label="2 (Rarely)" />

            <FormControlLabel value="3 (A few times a day)" control={<Radio />} label="3 (A few times a day)" />

            <FormControlLabel value="4 (Frequently)" control={<Radio />} label="4 (Frequently)" />

            <FormControlLabel value="5 (Almost constantly)" control={<Radio />} label="5 (Almost constantly)" />

          </RadioGroup>

        </FormControl>

        <TextField name="socialMediaImpact" label="Briefly describe social media impact" value={localData.socialMediaImpact} onChange={handleInputChange} multiline rows={4} />
        
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

export default Section2