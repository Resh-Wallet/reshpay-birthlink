'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Heart, Mail, CheckCircle, Loader2, RefreshCw, AlertCircle } from 'lucide-react'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || 'user@example.com'
  const token = searchParams.get('token')
  
  const [verificationCode, setVerificationCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [canResend, setCanResend] = useState(false)

  // Auto-verify if token is provided in URL
  useEffect(() => {
    if (token) {
      setIsLoading(true)
      // Simulate auto-verification
      setTimeout(() => {
        setIsLoading(false)
        setIsSuccess(true)
      }, 2000)
    }
  }, [token])

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !isSuccess) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setCanResend(true)
    }
  }, [timeLeft, isSuccess])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      if (verificationCode === '123456' || verificationCode.length === 6) {
        setIsSuccess(true)
      } else {
        setError('Invalid verification code. Please try again.')
      }
    }, 1500)
  }

  const handleResendCode = () => {
    setTimeLeft(300)
    setCanResend(false)
    setError('')
    // Simulate resend API call
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-info-light via-background to-primary-light flex items-center justify-center p-4">
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
            className="mx-auto w-16 h-16 bg-info rounded-full flex items-center justify-center mb-4"
          >
            <Heart className="w-8 h-8 text-info-foreground" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Verify Your Email</h1>
          <p className="text-muted-foreground">Check your email for the verification code</p>
        </motion.div>

        {/* Verification Card */}
        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-bold flex items-center space-x-2">
              <Mail className="w-5 h-5 text-info" />
              <span>Email Verification</span>
            </CardTitle>
            <CardDescription>
              We sent a verification code to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isSuccess ? (
              <>
                {!token && (
                  <form onSubmit={handleVerify} className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="code">Verification Code</Label>
                      <Input
                        id="code"
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="text-center text-2xl font-mono tracking-widest transition-all duration-200 focus:ring-2 focus:ring-info/20"
                        maxLength={6}
                        required
                      />
                    </motion.div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Alert className="border-error bg-error-light">
                          <AlertCircle className="h-4 w-4" />
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
                        className="w-full bg-info hover:bg-info-hover transition-all duration-200 hover:scale-[1.02]"
                        size="lg"
                        disabled={isLoading || verificationCode.length !== 6}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Verify Email
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                )}

                {token && isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="mx-auto w-16 h-16 bg-info-light rounded-full flex items-center justify-center mb-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 className="w-8 h-8 text-info" />
                      </motion.div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Verifying Email...</h3>
                    <p className="text-sm text-muted-foreground">
                      Please wait while we verify your email address
                    </p>
                  </motion.div>
                )}

                {/* Timer and Resend */}
                {!token && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-center space-y-4"
                  >
                    {!canResend ? (
                      <div className="text-sm text-muted-foreground">
                        Code expires in <span className="font-mono font-medium text-info">{formatTime(timeLeft)}</span>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Didn&apos;t receive the code?</p>
                        <Button
                          variant="outline"
                          onClick={handleResendCode}
                          className="text-info border-info hover:bg-info-light"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Resend Code
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </>
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
                <h3 className="text-lg font-medium mb-2">Email Verified!</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Your email address has been successfully verified. You can now access all features of BirthLink Ghana.
                </p>
                <div className="space-y-3">
                  <Link href="/dashboard">
                    <Button className="w-full bg-success hover:bg-success-hover">
                      Continue to Dashboard
                    </Button>
                  </Link>
                  <Link href="/auth/signin">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}

            {!isSuccess && !token && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center text-sm text-muted-foreground"
              >
                Wrong email address?{' '}
                <Link href="/auth/signup" className="text-info hover:underline font-medium">
                  Update email
                </Link>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Help Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 text-center space-y-3"
        >
          <div className="text-xs text-muted-foreground bg-muted/30 p-4 rounded-lg">
            <p className="font-medium mb-2">Trouble verifying?</p>
            <p>Check your spam folder or ensure your email address is correct. Contact support if issues persist.</p>
          </div>
          <div className="text-xs text-muted-foreground">
            Need help? Contact: <strong>support@birthlink.gov.gh</strong>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function VerifyEmailPage() {
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
      <VerifyEmailContent />
    </Suspense>
  )
}