'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Heart, Stethoscope, Users } from 'lucide-react'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4"
          >
            <Heart className="w-8 h-8 text-primary-foreground" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-2">BirthLink Ghana</h1>
          <p className="text-muted-foreground">Healthcare Birth Registration System</p>
        </motion.div>

        {/* Sign In Card */}
        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your healthcare worker account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2"
            >
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="healthcare.worker@example.com"
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-2"
            >
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button 
                className="w-full bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02]"
                size="lg"
              >
                Sign In
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="text-center text-sm text-muted-foreground"
            >
              <Link href="/auth/forgot-password" className="text-primary hover:underline font-medium">
                Forgot your password?
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center text-sm text-muted-foreground"
            >
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                Sign up here
              </Link>
            </motion.div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-secondary" />
            </div>
            <span className="text-xs text-muted-foreground">Medical Records</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-accent" />
            </div>
            <span className="text-xs text-muted-foreground">Birth Registration</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Family Records</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}