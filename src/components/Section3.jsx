import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../redux/actions';
import { Radio, RadioGroup, FormControlLabel, Checkbox, TextField, FormControl, FormLabel, FormGroup, Slider, Box, Button, Typography, Paper } from '@mui/material';

const Section3 = ({ onNext, handleBack }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formData);
  const [localData, setLocalData] = useState(formData);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    let newValue = type === 'checkbox' ? checked : value;

    if (type === 'checkbox') {
      if (checked) {
        newValue = [...(localData[name] || []), value];
      }
      else {
        newValue = (localData[name] || []).filter((item) => item !== value);
      }
    }

    setLocalData({ ...localData, [name]: newValue });
  };

  const handleSliderChange = (event, newValue) => {
    setLocalData({ ...localData, sleepImpact: newValue });
  };

  const handleNextSection = () => {
    dispatch(updateFormData(localData));
    onNext();
  };

  const validateForm = () => {
    const requiredFields = [
      'sleepImpact',
      'screenBreaks',
    ];

    for (const field of requiredFields) {
      if (!localData[field] || (Array.isArray(localData[field]) && localData[field].length === 0)) {
        return false;
      }
    }
    if (localData.screenTimeManagement.used === "true" && !localData.screenTimeManagement.appName) return false;

    return true;
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [localData]);

  return (
    <Paper elevation={1} sx={{ padding: 2, backgroundColor: 'var(--color-light)', borderRadius: 6, marginBottom: '10px' }}>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

        <Typography variant="h6" sx={{ color: 'var(--color-darkest)', marginBottom: '5px' }}>
          Digital Well-being & Screen Time
        </Typography>

        <FormControl component="fieldset">

          <FormLabel component="legend">
            Do you use any screen time management tools?
          </FormLabel>

          <RadioGroup name="screenTimeManagement.used" value={localData.screenTimeManagement.used} onChange={(e) => setLocalData({ ...localData, screenTimeManagement: { ...localData.screenTimeManagement, used: e.target.value } })}>

            <FormControlLabel value="true" control={<Radio />} label="Yes" />

            <FormControlLabel value="false" control={<Radio />} label="No" />

          </RadioGroup>
          {localData.screenTimeManagement.used === 'true' && <TextField name="screenTimeManagement.appName" label="Which one?" value={localData.screenTimeManagement.appName} onChange={(e) => setLocalData({ ...localData, screenTimeManagement: { ...localData.screenTimeManagement, appName: e.target.value } })} />}

        </FormControl>

        <FormControl>
          <FormLabel id="sleepImpact">
            Rate the impact of technology on your sleep quality.
          </FormLabel>

          <Slider aria-label="sleepImpact" value={localData.sleepImpact} onChange={handleSliderChange} valueLabelDisplay="auto" step={1} marks min={1} max={10} />
        
        </FormControl>

        <FormControl component="fieldset">

          <FormLabel component="legend">
            How often do you take breaks from screens?
          </FormLabel>

          <FormGroup>

            <FormControlLabel control={<Checkbox checked={localData.screenBreaks.includes('Every 30 minutes')} onChange={handleInputChange} name="screenBreaks" value="Every 30 minutes" />} label="Every 30 minutes" />

            <FormControlLabel control={<Checkbox checked={localData.screenBreaks.includes('Every 1-2 hours')} onChange={handleInputChange} name="screenBreaks" value="Every 1-2 hours" />} label="Every 1-2 hours" />

            <FormControlLabel control={<Checkbox checked={localData.screenBreaks.includes('Rarely')} onChange={handleInputChange} name="screenBreaks" value="Rarely" />} label="Rarely" />

            <FormControlLabel control={<Checkbox checked={localData.screenBreaks.includes('I don’t take breaks')} onChange={handleInputChange} name="screenBreaks" value="I don’t take breaks" />} label="I don’t take breaks" />

            <TextField name="otherBreaks" label="Other (specify)" value={localData.otherBreaks || ''} onChange={handleInputChange} />

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
  );
};

export default Section3;