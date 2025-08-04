'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { UserMenu } from '@/components/ui/user-menu'
import { ghanaHospitals } from '@/data/ghana-hospitals'
import { 
  ArrowLeft, 
  Settings, 
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Wifi,
  Save,
  CheckCircle
} from 'lucide-react'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)

  const saveSettings = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500/5 via-background to-primary/5">
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
              <Button variant="ghost" size="icon" className="hover:bg-purple-500/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Settings</h1>
              <p className="text-sm text-muted-foreground">Configure your BirthLink experience</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={saveSettings} disabled={saved}>
              {saved ? (
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {saved ? 'Saved!' : 'Save Changes'}
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
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-primary" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>Manage your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Dr. Kwame" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Amankwa" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="kwame.amankwa@korlebu.edu.gh" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+233 24 123 4567" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="facility">Healthcare Facility</Label>
                    <Select defaultValue="korle-bu">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                                              <SelectContent className="max-h-60">
                          {ghanaHospitals.map((hospital) => (
                            <SelectItem key={hospital.id} value={hospital.id}>
                              {hospital.name} - {hospital.location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="doctor">
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
              </CardContent>
            </Card>
          </motion.div>

          {/* Appearance Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-secondary" />
                  <span>Appearance & Language</span>
                </CardTitle>
                <CardDescription>Customize the look and feel of BirthLink</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Theme</Label>
                    <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                  </div>
                  <ThemeToggle />
                </div>

                {/* Color Customization */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Color Theme</Label>
                  <p className="text-sm text-muted-foreground mb-4">Customize your Ghana-inspired color palette</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Primary (Ghana Green)</Label>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary rounded border-2 border-border"></div>
                        <input 
                          type="color" 
                          defaultValue="#16a34a" 
                          className="w-16 h-8 rounded border cursor-pointer"
                        />
                        <span className="text-xs text-muted-foreground">Green</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm">Secondary (Ghana Gold)</Label>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-secondary rounded border-2 border-border"></div>
                        <input 
                          type="color" 
                          defaultValue="#fcd34d" 
                          className="w-16 h-8 rounded border cursor-pointer"
                        />
                        <span className="text-xs text-muted-foreground">Gold</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm">Accent (Ghana Red)</Label>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-accent rounded border-2 border-border"></div>
                        <input 
                          type="color" 
                          defaultValue="#ef4444" 
                          className="w-16 h-8 rounded border cursor-pointer"
                        />
                        <span className="text-xs text-muted-foreground">Red</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Reset to Default</Button>
                    <Button variant="outline" size="sm">Preview Changes</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">🇺🇸 English</SelectItem>
                      <SelectItem value="tw">🇬🇭 Twi</SelectItem>
                      <SelectItem value="ga">🇬🇭 Ga</SelectItem>
                      <SelectItem value="ee">🇬🇭 Ewe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-accent" />
                  <span>Notifications</span>
                </CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Registration Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get notified about pending registrations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Sync Notifications</Label>
                      <p className="text-sm text-muted-foreground">Alerts when data sync is complete or fails</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Certificate Updates</Label>
                      <p className="text-sm text-muted-foreground">Notifications when certificates are ready</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">System Maintenance</Label>
                      <p className="text-sm text-muted-foreground">Important system updates and maintenance notices</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>Security & Privacy</span>
                </CardTitle>
                <CardDescription>Manage your account security and data privacy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                        Enabled
                      </Badge>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Session Timeout</Label>
                      <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Data Encryption</Label>
                      <p className="text-sm text-muted-foreground">Encrypt sensitive data stored locally</p>
                    </div>
                    <Switch defaultChecked disabled />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full md:w-auto">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full md:w-auto ml-0 md:ml-2">
                      Download My Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-blue-500" />
                  <span>System & Data</span>
                </CardTitle>
                <CardDescription>Configure system behavior and data management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Offline Mode</Label>
                      <p className="text-sm text-muted-foreground">Continue working without internet connection</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Auto-Save Drafts</Label>
                      <p className="text-sm text-muted-foreground">Automatically save form progress</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Data Validation</Label>
                      <p className="text-sm text-muted-foreground">Strict validation of form inputs</p>
                    </div>
                    <Select defaultValue="strict">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strict">Strict</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="lenient">Lenient</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Button variant="outline" size="sm">
                      <Database className="w-4 h-4 mr-2" />
                      Clear Cache
                    </Button>
                    <Button variant="outline" size="sm">
                      <Wifi className="w-4 h-4 mr-2" />
                      Test Connection
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Reset Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>About BirthLink Ghana</CardTitle>
                <CardDescription>Application information and support</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Version:</span> 1.0.0-beta
                  </div>
                  <div>
                    <span className="font-medium">Build:</span> 2024.03.15.001
                  </div>
                  <div>
                    <span className="font-medium">Last Updated:</span> March 15, 2024
                  </div>
                  <div>
                    <span className="font-medium">Support:</span> support@birthlink.gov.gh
                  </div>
                </div>
                
                <div className="pt-4 border-t flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">View Documentation</Button>
                  <Button variant="outline" size="sm">Contact Support</Button>
                  <Button variant="outline" size="sm">Privacy Policy</Button>
                  <Button variant="outline" size="sm">Terms of Service</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}