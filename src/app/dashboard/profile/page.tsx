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
import { Badge } from '@/components/ui/badge'
import { UserMenu } from '@/components/ui/user-menu'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { ghanaHospitals } from '@/data/ghana-hospitals'
import { 
  ArrowLeft, 
  User, 
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Shield,
  Camera,
  Edit,
  Save,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Verified
} from 'lucide-react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // Mock user data
  const [profile, setProfile] = useState({
    firstName: 'Dr. Kwame',
    lastName: 'Amankwa',
    email: 'kwame.amankwa@korlebu.edu.gh',
    phone: '+233 24 123 4567',
    dateOfBirth: '1985-03-15',
    gender: 'male',
    facility: 'korle-bu',
    role: 'doctor',
    specialization: 'Obstetrics and Gynecology',
    licenseNumber: 'MDC/12345/2010',
    bio: 'Experienced healthcare professional with over 10 years in maternal and child health. Passionate about improving birth registration processes in Ghana.',
    address: 'East Legon, Accra, Ghana',
    emergencyContact: '+233 20 987 6543',
    languages: ['English', 'Twi', 'Ga'],
    emailVerified: true,
    phoneVerified: true,
    profileComplete: 95
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
    }, 1500)
  }

  const handlePasswordChange = async () => {
    // Handle password change logic
    console.log('Password change requested')
  }

  const getHospitalName = (id: string) => {
    const hospital = ghanaHospitals.find(h => h.id === id)
    return hospital ? hospital.name : 'Unknown Hospital'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-medical-light">
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
              <Button variant="ghost" size="icon" className="hover:bg-primary-light">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
              <p className="text-sm text-muted-foreground">Manage your account information</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              disabled={isSaving}
              className="bg-primary hover:bg-primary-hover"
            >
              {isSaving ? (
                <>Saving...</>
              ) : isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Profile
              </>
              )}
            </Button>
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
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Completion Alert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Alert className="bg-info-light border-info">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-info-background">
                Your profile is {profile.profileComplete}% complete. 
                <Link href="#verification" className="ml-1 underline hover:no-underline">
                  Complete remaining steps
                </Link>
              </AlertDescription>
            </Alert>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Overview Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <div className="mx-auto w-32 h-32 bg-primary-light rounded-full flex items-center justify-center text-4xl font-bold text-primary">
                      {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                    </div>
                    <Button 
                      size="icon" 
                      className="absolute bottom-0 right-1/2 translate-x-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <h2 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
                    <div className="flex items-center justify-center space-x-2">
                      <Badge className="bg-medical text-medical-foreground">{profile.role}</Badge>
                      <Badge variant="outline">{profile.specialization}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{getHospitalName(profile.facility)}</p>
                  </div>

                  {/* Verification Status */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span>Email Verified</span>
                      {profile.emailVerified ? (
                        <div className="flex items-center text-success">
                          <Verified className="w-4 h-4 mr-1" />
                          <span>Verified</span>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline" className="text-xs">
                          Verify
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Phone Verified</span>
                      {profile.phoneVerified ? (
                        <div className="flex items-center text-success">
                          <Verified className="w-4 h-4 mr-1" />
                          <span>Verified</span>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline" className="text-xs">
                          Verify
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center border-t pt-4">
                    <div>
                      <div className="text-2xl font-bold text-primary">247</div>
                      <div className="text-xs text-muted-foreground">Registrations</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary">18</div>
                      <div className="text-xs text-muted-foreground">This Month</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Profile Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-primary" />
                    <span>Personal Information</span>
                  </CardTitle>
                  <CardDescription>Your basic profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select 
                        value={profile.gender} 
                        onValueChange={(value) => setProfile({...profile, gender: value})}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      disabled={!isEditing}
                      rows={3}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-secondary" />
                    <span>Contact Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          disabled={!isEditing}
                        />
                        {profile.emailVerified && (
                          <Verified className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-success" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          disabled={!isEditing}
                        />
                        {profile.phoneVerified && (
                          <Verified className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-success" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={profile.address}
                        onChange={(e) => setProfile({...profile, address: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input
                        id="emergencyContact"
                        value={profile.emergencyContact}
                        onChange={(e) => setProfile({...profile, emergencyContact: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="w-5 h-5 text-accent" />
                    <span>Professional Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="facility">Healthcare Facility</Label>
                      <Select 
                        value={profile.facility} 
                        onValueChange={(value) => setProfile({...profile, facility: value})}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ghanaHospitals.map((hospital) => (
                            <SelectItem key={hospital.id} value={hospital.id}>
                              {hospital.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select 
                        value={profile.role} 
                        onValueChange={(value) => setProfile({...profile, role: value})}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="doctor">Doctor</SelectItem>
                          <SelectItem value="midwife">Midwife</SelectItem>
                          <SelectItem value="nurse">Nurse</SelectItem>
                          <SelectItem value="registrar">Birth Registrar</SelectItem>
                          <SelectItem value="admin">Administrator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input
                        id="specialization"
                        value={profile.specialization}
                        onChange={(e) => setProfile({...profile, specialization: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">License Number</Label>
                      <Input
                        id="licenseNumber"
                        value={profile.licenseNumber}
                        onChange={(e) => setProfile({...profile, licenseNumber: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Settings */}
              {isEditing && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-error" />
                      <span>Change Password</span>
                    </CardTitle>
                    <CardDescription>Update your account password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showNewPassword ? 'text' : 'password'}
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                            placeholder="Enter new password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <Eye className="w-4 h-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                            placeholder="Confirm new password"
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
                      </div>
                    </div>

                    <Button 
                      onClick={handlePasswordChange}
                      className="bg-error hover:bg-error-hover"
                    >
                      Update Password
                    </Button>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}