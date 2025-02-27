import { configureStore, createSlice } from '@reduxjs/toolkit'

const formDataSlice = createSlice({
  name: 'formData',
  initialState: {
    hoursPerDay: '',
    devicesUsed: [],
    otherDevice: '',
    socialPlatformsCount: '',
    mostUsedSocialPlatform: '',
    socialMediaCheckFrequency: '',
    socialMediaImpact: '',
    sleepImpact: 5,
    screenTimeManagement: { used: 'false', appName: '' },
    screenBreaks: [],
    otherBreaks: '',
    privacyConcern: 5,
    securityBreach: { experienced: 'false', explanation: '' },
    securityMeasures: [],
    emergingTechInterest: 5,
    futureTechImpact: '',
    additionalThoughts: '',
  },
  reducers: {
    updateFormData: (state, action) => {
      return { ...state, ...action.payload }
    },
    resetFormData: (state) => {
      return {
        hoursPerDay: '',
        devicesUsed: [],
        otherDevice: '',
        socialPlatformsCount: '',
        mostUsedSocialPlatform: '',
        socialMediaCheckFrequency: '',
        socialMediaImpact: '',
        sleepImpact: 5,
        screenTimeManagement: { used: 'false', appName: '' },
        screenBreaks: [],
        otherBreaks: '',
        privacyConcern: 5,
        securityBreach: { experienced: 'false', explanation: '' },
        securityMeasures: [],
        emergingTechInterest: 5,
        futureTechImpact: '',
        additionalThoughts: '',
      }
    },
  },
})

export const { updateFormData, resetFormData } = formDataSlice.actions

const store = configureStore({
  reducer: {
    formData: formDataSlice.reducer,
  },
})

export default store