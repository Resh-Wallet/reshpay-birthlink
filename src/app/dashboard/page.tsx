'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { UserMenu } from '@/components/ui/user-menu'
import { 
  Plus, 
  Scan, 
  FileText, 
  Upload, 
  Settings, 
  Heart,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  WifiOff,
  WifiSyncIcon
} from 'lucide-react'

export default function DashboardPage() {
  // Mock data for demonstration
  const stats = {
    todayRegistrations: 12,
    weeklyRegistrations: 47,
    monthlyRegistrations: 203,
    pendingSync: 3,
    completedToday: 9,
    totalCertificates: 156
  }

  const recentRegistrations = [
    { id: 1, baby: 'Kwame Asante', mother: 'Akosua Asante', status: 'completed', time: '2 hours ago' },
    { id: 2, baby: 'Ama Osei', mother: 'Efua Osei', status: 'pending', time: '4 hours ago' },
    { id: 3, baby: 'Kofi Mensah', mother: 'Akua Mensah', status: 'completed', time: '6 hours ago' },
  ]

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
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center"
            >
              <Heart className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">BirthLink Ghana</h1>
              <p className="text-sm text-muted-foreground">Healthcare Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Online</span>
            </div>
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
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, Dr. Amankwa!</h2>
          <p className="text-muted-foreground">Korle-Bu Teaching Hospital • Birth Registration Unit</p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Link href="/dashboard/register">
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-primary/5 border-primary/20 cursor-pointer">
              <CardContent className="p-6 text-center">
                <Plus className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-primary">New Registration</h3>
                <p className="text-xs text-muted-foreground mt-1">Register newborn</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/scan">
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-secondary/5 border-secondary/20 cursor-pointer">
              <CardContent className="p-6 text-center">
                <Scan className="w-8 h-8 text-secondary mx-auto mb-2" />
                <h3 className="font-semibold text-secondary">Scan Documents</h3>
                <p className="text-xs text-muted-foreground mt-1">AI document scan</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/certificates">
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-accent/5 border-accent/20 cursor-pointer">
              <CardContent className="p-6 text-center">
                <FileText className="w-8 h-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold text-accent">Certificates</h3>
                <p className="text-xs text-muted-foreground mt-1">Generate & print</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/batch">
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-blue-500/5 border-blue-500/20 cursor-pointer">
              <CardContent className="p-6 text-center">
                <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-500">Batch Upload</h3>
                <p className="text-xs text-muted-foreground mt-1">CSV bulk import</p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Today</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-primary">{stats.todayRegistrations}</div>
                <div className="text-xs text-muted-foreground">Registrations</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium">This Week</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-secondary">{stats.weeklyRegistrations}</div>
                <div className="text-xs text-muted-foreground">Registrations</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">This Month</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-accent">{stats.monthlyRegistrations}</div>
                <div className="text-xs text-muted-foreground">Registrations</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Completed</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-green-500">{stats.completedToday}</div>
                <div className="text-xs text-muted-foreground">Today</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium">Pending Sync</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-orange-500">{stats.pendingSync}</div>
                <div className="text-xs text-muted-foreground">Records</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Certificates</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-blue-500">{stats.totalCertificates}</div>
                <div className="text-xs text-muted-foreground">Generated</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Registrations */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Registrations</CardTitle>
                <CardDescription>Latest birth registrations in your facility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentRegistrations.map((registration) => (
                  <motion.div
                    key={registration.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * registration.id }}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{registration.baby}</div>
                      <div className="text-sm text-muted-foreground">Mother: {registration.mother}</div>
                      <div className="text-xs text-muted-foreground">{registration.time}</div>
                    </div>
                    <Badge 
                      variant={registration.status === 'completed' ? 'default' : 'secondary'}
                      className={registration.status === 'completed' ? 'bg-green-500' : ''}
                    >
                      {registration.status}
                    </Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Access Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-6"
          >
            {/* Sync Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <WifiSyncIcon className="w-5 h-5" />
                  <span>Sync Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Records synced</span>
                    <span className="text-sm font-medium">97%</span>
                  </div>
                  <Progress value={97} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {stats.pendingSync} records pending sync
                  </div>
                  <Link href="/dashboard/sync">
                    <Button variant="outline" size="sm" className="w-full">
                      View Sync Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Quick Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard/settings">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    App Settings
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <WifiOff className="w-4 h-4 mr-2" />
                  Offline Mode
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}