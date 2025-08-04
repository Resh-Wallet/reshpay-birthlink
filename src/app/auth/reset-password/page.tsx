'use client'

import { motion } from 'framer-motion'
import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Heart, ArrowLeft, Lock, CheckCircle, Loader2, Eye, EyeOff } from 'lucide-react'

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const validatePassword = (pwd: string): string[] => {
    const issues: string[] = []
    if (pwd.length < 8) issues.push('At least 8 characters long')
    if (!/[A-Z]/.test(pwd)) issues.push('At least one uppercase letter')
    if (!/[a-z]/.test(pwd)) issues.push('At least one lowercase letter')
    if (!/[0-9]/.test(pwd)) issues.push('At least one number')
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(pwd)) issues.push('At least one special character')
    return issues
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors([])

    const passwordIssues = validatePassword(password)
    const allErrors: string[] = []

    if (passwordIssues.length > 0) {
      allErrors.push('Password must have:')
      allErrors.push(...passwordIssues.map(issue => `• ${issue}`))
    }

    if (password !== confirmPassword) {
      allErrors.push('Passwords do not match')
    }

    if (!token) {
      allErrors.push('Invalid or expired reset token')
    }

    if (allErrors.length > 0) {
      setErrors(allErrors)
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
    }, 2000)
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-error-light via-background to-warning-light flex items-center justify-center p-4">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-error-light rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-error" />
            </div>
            <h3 className="text-lg font-medium mb-2">Invalid Reset Link</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This password reset link is invalid or has expired.
            </p>
            <Link href="/auth/forgot-password">
              <Button>Request New Reset Link</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-success-light via-background to-primary-light flex items-center justify-center p-4">
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
            className="mx-auto w-16 h-16 bg-success rounded-full flex items-center justify-center mb-4"
          >
            <Heart className="w-8 h-8 text-success-foreground" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Set New Password</h1>
          <p className="text-muted-foreground">Create a strong password for your account</p>
        </motion.div>

        {/* Reset Password Card */}
        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <Link href="/auth/signin">
                <Button variant="ghost" size="icon" className="hover:bg-success-light">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <CardTitle className="text-xl font-bold">Create New Password</CardTitle>
                <CardDescription>
                  Choose a strong password to secure your account
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
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-success/20"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-success/20"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </motion.div>

                {errors.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Alert className="border-error bg-error-light">
                      <AlertDescription className="text-error">
                        <div className="space-y-1">
                          {errors.map((error, index) => (
                            <div key={index}>{error}</div>
                          ))}
                        </div>
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                {/* Password Requirements */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-muted/30 p-4 rounded-lg"
                >
                  <p className="text-sm font-medium mb-2">Password Requirements:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li className={password.length >= 8 ? 'text-success' : ''}>
                      • At least 8 characters long
                    </li>
                    <li className={/[A-Z]/.test(password) ? 'text-success' : ''}>
                      • At least one uppercase letter
                    </li>
                    <li className={/[a-z]/.test(password) ? 'text-success' : ''}>
                      • At least one lowercase letter  
                    </li>
                    <li className={/[0-9]/.test(password) ? 'text-success' : ''}>
                      • At least one number
                    </li>
                    <li className={/[!@#$%^&*(),.?\":{}|<>]/.test(password) ? 'text-success' : ''}>
                      • At least one special character
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button 
                    type="submit"
                    className="w-full bg-success hover:bg-success-hover transition-all duration-200 hover:scale-[1.02]"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating Password...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Update Password
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
                <h3 className="text-lg font-medium mb-2">Password Updated!</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Your password has been successfully updated. You can now sign in with your new password.
                </p>
                <Link href="/auth/signin">
                  <Button className="w-full bg-success hover:bg-success-hover">
                    Continue to Sign In
                  </Button>
                </Link>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-info-light via-background to-primary-light flex items-center justify-center p-4">
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>
          <div className="w-full max-w-md">
            <Card className="shadow-xl border-0 bg-card/95 backdrop-blur-sm">
              <CardContent className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-info" />
              </CardContent>
            </Card>
          </div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  )
}