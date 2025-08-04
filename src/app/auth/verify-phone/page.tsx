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
import { Heart, Phone, CheckCircle, Loader2, RefreshCw, AlertCircle, MessageSquare } from 'lucide-react'

function VerifyPhoneContent() {
  const searchParams = useSearchParams()
  const phone = searchParams.get('phone') || '+233 XX XXX XXXX'
  
  const [verificationCode, setVerificationCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [canResend, setCanResend] = useState(false)
  const [verificationMethod, setVerificationMethod] = useState<'sms' | 'call'>('sms')

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

  const handleResendCode = (method: 'sms' | 'call' = verificationMethod) => {
    setVerificationMethod(method)
    setTimeLeft(300)
    setCanResend(false)
    setError('')
    // Simulate resend API call
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warning-light via-background to-secondary-light flex items-center justify-center p-4">
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
            className="mx-auto w-16 h-16 bg-warning rounded-full flex items-center justify-center mb-4"
          >
            <Heart className="w-8 h-8 text-warning-foreground" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Verify Phone Number</h1>
          <p className="text-muted-foreground">Enter the code sent to your phone</p>
        </motion.div>

        {/* Verification Card */}
        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-bold flex items-center space-x-2">
              <Phone className="w-5 h-5 text-warning" />
              <span>Phone Verification</span>
            </CardTitle>
            <CardDescription>
              We sent a {verificationMethod === 'sms' ? 'text message' : 'voice call'} to <strong>{phone}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isSuccess ? (
              <>
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
                      className="text-center text-2xl font-mono tracking-widest transition-all duration-200 focus:ring-2 focus:ring-warning/20"
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
                      className="w-full bg-warning hover:bg-warning-hover text-warning-foreground transition-all duration-200 hover:scale-[1.02]"
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
                          Verify Phone
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>

                {/* Timer and Resend */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-center space-y-4"
                >
                  {!canResend ? (
                    <div className="text-sm text-muted-foreground">
                      Code expires in <span className="font-mono font-medium text-warning">{formatTime(timeLeft)}</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">Didn't receive the code?</p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleResendCode('sms')}
                          className="flex-1 text-warning border-warning hover:bg-warning-light"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Resend SMS
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleResendCode('call')}
                          className="flex-1 text-warning border-warning hover:bg-warning-light"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Me
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Verification Method Info */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-muted/30 p-4 rounded-lg"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {verificationMethod === 'sms' ? (
                      <MessageSquare className="w-4 h-4 text-warning" />
                    ) : (
                      <Phone className="w-4 h-4 text-warning" />
                    )}
                    <span className="text-sm font-medium">
                      {verificationMethod === 'sms' ? 'SMS Message' : 'Voice Call'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {verificationMethod === 'sms' 
                      ? 'We sent a 6-digit code via text message to your phone number.'
                      : 'We called your phone number with a 6-digit verification code.'
                    }
                  </p>
                </motion.div>
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
                <h3 className="text-lg font-medium mb-2">Phone Verified!</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Your phone number has been successfully verified. You can now receive important notifications and updates.
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

            {!isSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-center text-sm text-muted-foreground"
              >
                Wrong phone number?{' '}
                <Link href="/auth/signup" className="text-warning hover:underline font-medium">
                  Update phone
                </Link>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Help Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 text-center space-y-3"
        >
          <div className="text-xs text-muted-foreground bg-muted/30 p-4 rounded-lg">
            <p className="font-medium mb-2">Having trouble?</p>
            <p>Make sure your phone has good signal and can receive SMS messages. Try the voice call option if SMS doesn't work.</p>
          </div>
          <div className="text-xs text-muted-foreground">
            For assistance: <strong>support@birthlink.gov.gh</strong> or <strong>+233 30 123 4567</strong>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function VerifyPhonePage() {
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
      <VerifyPhoneContent />
    </Suspense>
  )
}