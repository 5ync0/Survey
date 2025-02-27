import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Typography, Paper } from '@mui/material';

const Report = ({ handleBack }) => {
  const formData = useSelector((state) => state.formData);

  return (

    <Paper elevation={1} sx={{ padding: 2, backgroundColor: 'var(--color-light)', borderRadius: 6, marginBottom: '10px' }}>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

        <Typography variant="h5" sx={{ color: 'var(--color-darkest)' }}>
          Survey Report
        </Typography>

        <Typography variant="body1">

          <strong>
            Hours per day spent on tech:
          </strong>
          {formData.hoursPerDay}

        </Typography>

        <Typography variant="body1">

          <strong>
            Devices used:
          </strong>
          {formData.devicesUsed.join(', ')}
          {formData.otherDevice && `, ${formData.otherDevice}`}

        </Typography>

        <Typography variant="body1">

          <strong>
            Number of social platforms:
          </strong>
          {formData.socialPlatformsCount}

        </Typography>

        <Typography variant="body1">

          <strong>
            Most used social platform:
          </strong>
          {formData.mostUsedSocialPlatform}

        </Typography>

        <Typography variant="body1">

          <strong>
            Social media check frequency:
          </strong>
          {formData.socialMediaCheckFrequency}

        </Typography>

        <Typography variant="body1">

          <strong>
            Social media impact:
          </strong>
          {formData.socialMediaImpact}

        </Typography>

        <Typography variant="body1">

          <strong>
            Technology impact on sleep:
          </strong>
          {formData.sleepImpact}

        </Typography>

        <Typography variant="body1">

          <strong>
            Screen time management tools:
          </strong>
          {formData.screenTimeManagement.used === 'true' ? `Yes, ${formData.screenTimeManagement.appName}` : 'No'}

        </Typography>

        <Typography variant="body1">

          <strong>
            Screen breaks:
          </strong>
          {formData.screenBreaks.join(', ')}
          {formData.otherBreaks && `, ${formData.otherBreaks}`}

        </Typography>

        <Typography variant="body1">

          <strong>
            Privacy concern:
          </strong>
          {formData.privacyConcern}

        </Typography>
        
        <Typography variant="body1">

          <strong>
            Security breach experienced:
          </strong>
          {formData.securityBreach.experienced === 'true' ? `Yes, ${formData.securityBreach.explanation}` : 'No'}

        </Typography>

        <Typography variant="body1">

          <strong>
            Security measures:
          </strong>
          {formData.securityMeasures.join(', ')}

        </Typography>

        <Typography variant="body1">

          <strong>
            Interest in emerging technologies:
          </strong>
          {formData.emergingTechInterest}

        </Typography>

        <Typography variant="body1">

          <strong>
            Future tech impact:
          </strong>
          {formData.futureTechImpact}
        </Typography>

        <Typography variant="body1">

          <strong>
            Additional thoughts:
          </strong>
          {formData.additionalThoughts}

        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>

          <Button variant="contained" onClick={handleBack} sx={{ backgroundColor: 'var(--color-medium)' }}>
            Back
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Report;