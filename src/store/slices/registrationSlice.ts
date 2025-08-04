import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BabyInfo {
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: string
  timeOfBirth: string
  placeOfBirth: string
  gender: 'male' | 'female'
  weight: number
  length: number
  multipleBirth: boolean
  birthOrder?: number
}

interface ParentInfo {
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: string
  nationality: string
  occupation: string
  residence: string
  idType: 'ghana_card' | 'passport' | 'drivers_license'
  idNumber: string
  phoneNumber: string
  nhisNumber?: string
}

interface RegistrationData {
  baby: Partial<BabyInfo>
  mother: Partial<ParentInfo>
  father: Partial<ParentInfo>
  currentStep: number
  isComplete: boolean
  isDraft: boolean
  documentImages: string[]
}

interface RegistrationState {
  currentRegistration: RegistrationData
  savedRegistrations: RegistrationData[]
  isLoading: boolean
  error: string | null
}

const initialRegistrationData: RegistrationData = {
  baby: {},
  mother: {},
  father: {},
  currentStep: 1,
  isComplete: false,
  isDraft: false,
  documentImages: [],
}

const initialState: RegistrationState = {
  currentRegistration: initialRegistrationData,
  savedRegistrations: [],
  isLoading: false,
  error: null,
}

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    updateBabyInfo: (state, action: PayloadAction<Partial<BabyInfo>>) => {
      state.currentRegistration.baby = { ...state.currentRegistration.baby, ...action.payload }
    },
    updateMotherInfo: (state, action: PayloadAction<Partial<ParentInfo>>) => {
      state.currentRegistration.mother = { ...state.currentRegistration.mother, ...action.payload }
    },
    updateFatherInfo: (state, action: PayloadAction<Partial<ParentInfo>>) => {
      state.currentRegistration.father = { ...state.currentRegistration.father, ...action.payload }
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentRegistration.currentStep = action.payload
    },
    nextStep: (state) => {
      state.currentRegistration.currentStep += 1
    },
    previousStep: (state) => {
      if (state.currentRegistration.currentStep > 1) {
        state.currentRegistration.currentStep -= 1
      }
    },
    addDocumentImage: (state, action: PayloadAction<string>) => {
      state.currentRegistration.documentImages.push(action.payload)
    },
    removeDocumentImage: (state, action: PayloadAction<number>) => {
      state.currentRegistration.documentImages.splice(action.payload, 1)
    },
    saveDraft: (state) => {
      state.currentRegistration.isDraft = true
      const existingIndex = state.savedRegistrations.findIndex(reg => 
        reg.baby.firstName === state.currentRegistration.baby.firstName &&
        reg.mother.firstName === state.currentRegistration.mother.firstName
      )
      
      if (existingIndex >= 0) {
        state.savedRegistrations[existingIndex] = { ...state.currentRegistration }
      } else {
        state.savedRegistrations.push({ ...state.currentRegistration })
      }
    },
    loadRegistration: (state, action: PayloadAction<RegistrationData>) => {
      state.currentRegistration = action.payload
    },
    resetRegistration: (state) => {
      state.currentRegistration = initialRegistrationData
    },
    completeRegistration: (state) => {
      state.currentRegistration.isComplete = true
      state.currentRegistration.isDraft = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  updateBabyInfo,
  updateMotherInfo,
  updateFatherInfo,
  setCurrentStep,
  nextStep,
  previousStep,
  addDocumentImage,
  removeDocumentImage,
  saveDraft,
  loadRegistration,
  resetRegistration,
  completeRegistration,
  setLoading,
  setError,
} = registrationSlice.actions

export default registrationSlice.reducer