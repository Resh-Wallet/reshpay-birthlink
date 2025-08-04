'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { UserMenu } from '@/components/ui/user-menu'
import { 
  ArrowLeft, 
  ArrowRight, 
  Baby, 
  Users, 
  FileText, 
  CheckCircle,
  Calendar,
  MapPin,
  Phone,
  IdCard
} from 'lucide-react'

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const steps = [
    { id: 1, title: 'Baby Information', icon: Baby, description: 'Basic baby details' },
    { id: 2, title: 'Mother Information', icon: Users, description: 'Mother\'s details' },
    { id: 3, title: 'Father Information', icon: Users, description: 'Father\'s details' },
    { id: 4, title: 'Review & Submit', icon: FileText, description: 'Final review' },
  ]

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Birth Registration</h1>
              <p className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Draft
            </Badge>
            <UserMenu 
              user={{
                name: 'Dr. Kwame Amankwa',
                email: 'kwame.amankwa@korlebu.edu.gh',
                role: 'Doctor',
                facility: 'Korle-Bu Teaching Hospital',
                isAdmin: false
              }}
            />
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="mb-4">
            <Progress value={progress} className="h-2" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * step.id }}
                className={`flex flex-col items-center space-y-2 p-4 rounded-lg transition-all ${
                  step.id === currentStep
                    ? 'bg-primary/10 border-2 border-primary/20'
                    : step.id < currentStep
                    ? 'bg-green-50 border-2 border-green-200 dark:bg-green-900/20 dark:border-green-800/20'
                    : 'bg-muted/50 border-2 border-muted'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.id === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : step.id < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step.id < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">{step.title}</div>
                  <div className="text-xs text-muted-foreground">{step.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Baby className="w-6 h-6 text-primary" />
                  <span>Baby Information</span>
                </CardTitle>
                <CardDescription>Enter the newborn's basic information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="Kwame" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Asante" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input id="dateOfBirth" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeOfBirth">Time of Birth</Label>
                    <Input id="timeOfBirth" type="time" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input id="weight" type="number" step="0.1" placeholder="3.2" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="placeOfBirth">Place of Birth *</Label>
                  <Input id="placeOfBirth" placeholder="Korle-Bu Teaching Hospital, Accra" />
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-secondary" />
                  <span>Mother Information</span>
                </CardTitle>
                <CardDescription>Enter the mother's details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="motherFirstName">First Name *</Label>
                    <Input id="motherFirstName" placeholder="Akosua" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motherLastName">Last Name *</Label>
                    <Input id="motherLastName" placeholder="Asante" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="motherDob">Date of Birth *</Label>
                    <Input id="motherDob" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motherNationality">Nationality *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ghanaian">Ghanaian</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="motherPhone">Phone Number</Label>
                    <Input id="motherPhone" placeholder="+233 XX XXX XXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motherOccupation">Occupation</Label>
                    <Input id="motherOccupation" placeholder="Teacher" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motherAddress">Residential Address *</Label>
                  <Textarea id="motherAddress" placeholder="House number, street, area, city" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="motherIdType">ID Type *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ghana_card">Ghana Card</SelectItem>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="drivers_license">Driver's License</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motherIdNumber">ID Number *</Label>
                    <Input id="motherIdNumber" placeholder="GHA-XXXXXXXXX-X" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nhisNumber">NHIS Number</Label>
                  <Input id="nhisNumber" placeholder="Optional" />
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-accent" />
                  <span>Father Information</span>
                </CardTitle>
                <CardDescription>Enter the father's details (optional)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Similar form fields as mother, but optional */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fatherFirstName">First Name</Label>
                    <Input id="fatherFirstName" placeholder="Kofi" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fatherLastName">Last Name</Label>
                    <Input id="fatherLastName" placeholder="Asante" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fatherPhone">Phone Number</Label>
                    <Input id="fatherPhone" placeholder="+233 XX XXX XXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fatherOccupation">Occupation</Label>
                    <Input id="fatherOccupation" placeholder="Engineer" />
                  </div>
                </div>

                <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                  <p>Father's information is optional but recommended for complete records. This information can be added later if not available now.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-6 h-6 text-green-500" />
                  <span>Review & Submit</span>
                </CardTitle>
                <CardDescription>Review all information before submitting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                  <h3 className="font-semibold text-lg">Registration Summary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium text-primary mb-2">Baby Information</h4>
                      <div className="text-sm space-y-1">
                        <p><strong>Name:</strong> Kwame Asante</p>
                        <p><strong>Gender:</strong> Male</p>
                        <p><strong>Date of Birth:</strong> March 15, 2024</p>
                        <p><strong>Place:</strong> Korle-Bu Teaching Hospital</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-secondary mb-2">Mother Information</h4>
                      <div className="text-sm space-y-1">
                        <p><strong>Name:</strong> Akosua Asante</p>
                        <p><strong>Phone:</strong> +233 XX XXX XXXX</p>
                        <p><strong>ID:</strong> Ghana Card</p>
                        <p><strong>NHIS:</strong> Available</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-accent mb-2">Father Information</h4>
                      <div className="text-sm space-y-1">
                        <p><strong>Name:</strong> Kofi Asante</p>
                        <p><strong>Phone:</strong> +233 XX XXX XXXX</p>
                        <p><strong>Occupation:</strong> Engineer</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-700 dark:text-green-300">
                    All required information has been provided. Ready to submit registration.
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-between mt-8"
        >
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <div className="flex space-x-4">
            <Button variant="outline">Save Draft</Button>
            {currentStep === totalSteps ? (
              <Button className="flex items-center space-x-2 bg-green-500 hover:bg-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>Submit Registration</span>
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}