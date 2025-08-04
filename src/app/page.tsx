'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Stethoscope, Users, FileText, Shield, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()

  // For prototype, we'll redirect to auth after showing a brief landing
  useEffect(() => {
    const timer = setTimeout(() => {
      // In a real app, check if user is authenticated first
      // router.push('/dashboard') // if authenticated
      // router.push('/auth/signin') // if not authenticated
    }, 5000) // Show landing for 5 seconds, then redirect

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
            className="mx-auto w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-6"
          >
            <Heart className="w-12 h-12 text-primary-foreground" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl font-bold text-foreground mb-4"
          >
            BirthLink Ghana
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-muted-foreground mb-2"
          >
            AI-Powered Birth Registration System
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-muted-foreground"
          >
            Empowering Healthcare Workers • Securing Children&apos;s Futures
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Stethoscope className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Point-of-Care Registration</h3>
            <p className="text-sm text-muted-foreground text-center">
              Register newborns immediately at birth with integrated healthcare systems
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border"
          >
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Document Scanning</h3>
            <p className="text-sm text-muted-foreground text-center">
              Extract data from medical records using advanced AI and OCR technology
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border"
          >
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Offline-First Design</h3>
            <p className="text-sm text-muted-foreground text-center">
              Continue registering births even without internet connectivity
            </p>
          </motion.div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="bg-card/30 backdrop-blur-sm rounded-xl p-8 mb-12 border"
        >
          <h2 className="text-2xl font-bold mb-6">Transforming Birth Registration in Ghana</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Instant Certificate Generation</h4>
                <p className="text-sm text-muted-foreground">
                  Generate official birth certificates immediately after registration
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">LHIMS Integration</h4>
                <p className="text-sm text-muted-foreground">
                  Seamlessly integrate with existing health information systems
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Ghana Registry Sync</h4>
                <p className="text-sm text-muted-foreground">
                  Automatically sync with national Birth & Death Registry
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Mobile-Optimized Interface</h4>
                <p className="text-sm text-muted-foreground">
                  Designed for healthcare workers using mobile devices
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signin">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                <Users className="w-5 h-5 mr-2" />
                Healthcare Worker Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Heart className="w-5 h-5 mr-2" />
                Create Account
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Authorized healthcare professionals only • HIPAA compliant • Government approved
          </p>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border/50"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Registration Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary mb-2">5min</div>
            <div className="text-sm text-muted-foreground">Average Registration Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">System Availability</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
