'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Heart, Shield, CheckCircle } from 'lucide-react'
import { ghanaHospitals, getRegions } from '@/data/ghana-hospitals'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-primary/10 flex items-center justify-center p-4">
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
            className="mx-auto w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4"
          >
            <Heart className="w-8 h-8 text-secondary-foreground" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Join BirthLink</h1>
          <p className="text-muted-foreground">Register as a healthcare worker</p>
        </motion.div>

        {/* Sign Up Card */}
        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Get started with Ghana's birth registration system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  className="transition-all duration-200 focus:ring-2 focus:ring-secondary/20"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  className="transition-all duration-200 focus:ring-2 focus:ring-secondary/20"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-2"
            >
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@hospital.gov.gh"
                className="transition-all duration-200 focus:ring-2 focus:ring-secondary/20"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-2"
            >
              <Label htmlFor="facility">Healthcare Facility</Label>
              <Select>
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-secondary/20">
                  <SelectValue placeholder="Select your facility" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {getRegions().map((region) => (
                    <div key={region}>
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted/50 sticky top-0">
                        {region} Region
                      </div>
                      {ghanaHospitals
                        .filter(hospital => hospital.region === region)
                        .map((hospital) => (
                          <SelectItem key={hospital.id} value={hospital.id}>
                            {hospital.name} - {hospital.location}
                          </SelectItem>
                        ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-2"
            >
              <Label htmlFor="role">Role</Label>
              <Select>
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-secondary/20">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="midwife">Midwife</SelectItem>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="registrar">Birth Registrar</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="space-y-2"
            >
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a secure password"
                className="transition-all duration-200 focus:ring-2 focus:ring-secondary/20"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all duration-200 hover:scale-[1.02]"
                size="lg"
              >
                Create Account
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="text-center text-sm text-muted-foreground"
            >
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-secondary hover:underline font-medium">
                Sign in here
              </Link>
            </motion.div>
          </CardContent>
        </Card>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-8 space-y-3"
        >
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span>HIPAA compliant data security</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Verified healthcare professional only</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <Heart className="w-4 h-4 text-primary" />
            <span>Supporting Ghana's healthcare system</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}