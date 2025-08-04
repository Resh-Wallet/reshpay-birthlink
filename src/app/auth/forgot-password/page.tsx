'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Heart, ArrowLeft, Mail, CheckCircle, Loader2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      if (email.includes('@')) {
        setIsSuccess(true)
      } else {
        setError('Please enter a valid email address')
      }
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-primary-light flex items-center justify-center p-4">
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
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-medical rounded-full flex items-center justify-center mb-4"
          >
            <Heart className="w-8 h-8 text-medical-foreground" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Reset Password</h1>
          <p className="text-muted-foreground">Enter your email to receive reset instructions</p>
        </motion.div>

        {/* Reset Password Card */}
        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <Link href="/auth/signin">
                <Button variant="ghost" size="icon" className="hover:bg-medical-light">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <CardTitle className="text-xl font-bold">Forgot Password?</CardTitle>
                <CardDescription>
                  No worries, we'll send you reset instructions
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="healthcare.worker@hospital.gov.gh"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-medical/20"
                      required
                    />
                  </div>
                </motion.div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Alert className="border-error bg-error-light">
                      <AlertDescription className="text-error">
                        {error}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button 
                    type="submit"
                    className="w-full bg-medical hover:bg-medical-hover transition-all duration-200 hover:scale-[1.02]"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending Instructions...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Reset Instructions
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <div className="mx-auto w-16 h-16 bg-success-light rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-lg font-medium mb-2">Check Your Email</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  We've sent password reset instructions to <strong>{email}</strong>
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={() => {
                      setIsSuccess(false)
                      setEmail('')
                    }}
                    variant="outline" 
                    className="w-full"
                  >
                    Send Another Email
                  </Button>
                  <Link href="/auth/signin">
                    <Button variant="ghost" className="w-full">
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}

            {!isSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center text-sm text-muted-foreground"
              >
                Remember your password?{' '}
                <Link href="/auth/signin" className="text-medical hover:underline font-medium">
                  Sign in here
                </Link>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Help Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center space-y-3"
        >
          <div className="text-xs text-muted-foreground bg-muted/30 p-4 rounded-lg">
            <p className="font-medium mb-2">Need Help?</p>
            <p>If you don't receive the email within 5 minutes, check your spam folder or contact your system administrator.</p>
          </div>
          <div className="text-xs text-muted-foreground">
            For urgent access, contact: <strong>support@birthlink.gov.gh</strong>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}