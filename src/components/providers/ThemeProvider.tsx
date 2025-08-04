'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { type ComponentProps } from 'react'

type ThemeProviderProps = ComponentProps<typeof NextThemeProvider>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemeProvider>
  )
}