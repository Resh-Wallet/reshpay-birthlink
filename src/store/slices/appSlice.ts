import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
  theme: 'light' | 'dark'
  isOffline: boolean
  syncQueue: number
  language: 'en' | 'tw' | 'ga' | 'ee' // English, Twi, Ga, Ewe
  sidebarOpen: boolean
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
    timestamp: number
  }>
}

const initialState: AppState = {
  theme: 'light',
  isOffline: false,
  syncQueue: 0,
  language: 'en',
  sidebarOpen: false,
  notifications: [],
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
    },
    setOfflineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffline = action.payload
    },
    updateSyncQueue: (state, action: PayloadAction<number>) => {
      state.syncQueue = action.payload
    },
    setLanguage: (state, action: PayloadAction<'en' | 'tw' | 'ga' | 'ee'>) => {
      state.language = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    addNotification: (state, action: PayloadAction<Omit<AppState['notifications'][0], 'id' | 'timestamp'>>) => {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      }
      state.notifications.push(notification)
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
  },
})

export const {
  setTheme,
  setOfflineStatus,
  updateSyncQueue,
  setLanguage,
  toggleSidebar,
  setSidebarOpen,
  addNotification,
  removeNotification,
  clearNotifications,
} = appSlice.actions

export default appSlice.reducer