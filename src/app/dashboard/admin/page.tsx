'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { UserMenu } from '@/components/ui/user-menu'
import { 
  ArrowLeft, 
  Shield,
  Users,
  Building2,
  FileText,
  BarChart3,
  Settings,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  Database,
  Globe,
  UserCheck,
  UserX,
  Activity
} from 'lucide-react'

export default function AdminDashboardPage() {
  // Mock admin data
  const systemStats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalFacilities: 67,
    totalRegistrations: 15634,
    pendingApprovals: 23,
    systemUptime: 99.8,
    dataIntegrity: 99.95,
    lastBackup: '2024-03-15T02:30:00Z'
  }

  const recentActivity = [
    { id: 1, type: 'user_approval', user: 'Dr. Akosua Mensah', facility: 'Tamale Teaching Hospital', time: '2 minutes ago', status: 'pending' },
    { id: 2, type: 'facility_registration', facility: 'Cape Coast Regional Hospital', admin: 'System Admin', time: '15 minutes ago', status: 'completed' },
    { id: 3, type: 'data_sync', facility: 'Korle-Bu Teaching Hospital', records: 45, time: '1 hour ago', status: 'completed' },
    { id: 4, type: 'user_suspension', user: 'John Doe', reason: 'Policy violation', time: '2 hours ago', status: 'completed' },
    { id: 5, type: 'system_backup', size: '2.3GB', time: '6 hours ago', status: 'completed' }
  ]

  const pendingApprovals = [
    { id: 1, name: 'Dr. Yaa Asantewaa', email: 'yaa.asantewaa@hospital.gov.gh', facility: 'Komfo Anokye Teaching Hospital', role: 'Doctor', submitted: '2024-03-15' },
    { id: 2, name: 'Nurse Akua Donkor', email: 'akua.donkor@clinic.gov.gh', facility: 'Madina Polyclinic', role: 'Midwife', submitted: '2024-03-14' },
    { id: 3, name: 'Dr. Kwabena Osei', email: 'kwabena.osei@hospital.gov.gh', facility: 'Ridge Hospital', role: 'Doctor', submitted: '2024-03-14' }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_approval': return <UserCheck className="w-4 h-4" />
      case 'user_suspension': return <UserX className="w-4 h-4" />
      case 'facility_registration': return <Building2 className="w-4 h-4" />
      case 'data_sync': return <Database className="w-4 h-4" />
      case 'system_backup': return <Shield className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success bg-success-light'
      case 'pending': return 'text-warning bg-warning-light'
      case 'failed': return 'text-error bg-error-light'
      default: return 'text-muted-foreground bg-muted'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-light via-background to-error-light">
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
              <Button variant="ghost" size="icon" className="hover:bg-accent-light">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">System Administration</h1>
              <p className="text-sm text-muted-foreground">BirthLink Ghana Management Console</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-accent text-accent-foreground">
              <Shield className="w-3 h-3 mr-1" />
              Admin Access
            </Badge>
            <UserMenu 
              user={{
                name: 'Admin John Doe',
                email: 'admin@birthlink.gov.gh',
                role: 'System Administrator',
                facility: 'BirthLink Ghana',
                isAdmin: true
              }}
            />
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {/* System Health Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Alert className="bg-success-light border-success">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-success-background">
              All systems operational. Last backup completed successfully at {new Date(systemStats.lastBackup).toLocaleString()}.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* System Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Total Users</span>
              </div>
              <div className="text-3xl font-bold text-primary mb-1">{systemStats.totalUsers.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">
                <span className="text-success font-medium">{systemStats.activeUsers}</span> active
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Building2 className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium">Healthcare Facilities</span>
              </div>
              <div className="text-3xl font-bold text-secondary mb-1">{systemStats.totalFacilities}</div>
              <div className="text-sm text-success flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                3 new this month
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Total Registrations</span>
              </div>
              <div className="text-3xl font-bold text-accent mb-1">{systemStats.totalRegistrations.toLocaleString()}</div>
              <div className="text-sm text-success flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% this month
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-warning" />
                <span className="text-sm font-medium">Pending Approvals</span>
              </div>
              <div className="text-3xl font-bold text-warning mb-1">{systemStats.pendingApprovals}</div>
              <div className="text-sm text-muted-foreground">Requires attention</div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* System Health */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-info" />
                  <span>System Health</span>
                </CardTitle>
                <CardDescription>Real-time system performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>System Uptime</span>
                    <span className="font-medium">{systemStats.systemUptime}%</span>
                  </div>
                  <Progress value={systemStats.systemUptime} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Data Integrity</span>
                    <span className="font-medium">{systemStats.dataIntegrity}%</span>
                  </div>
                  <Progress value={systemStats.dataIntegrity} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">24/7</div>
                    <div className="text-xs text-muted-foreground">Monitoring</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-info">99.9%</div>
                    <div className="text-xs text-muted-foreground">SLA Target</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-medical" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Link href="/dashboard/admin/users">
                  <Button variant="outline" className="w-full justify-start h-auto p-4 hover:bg-primary-light">
                    <div className="text-left">
                      <div className="flex items-center space-x-2 mb-1">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="font-medium">Manage Users</span>
                      </div>
                      <div className="text-xs text-muted-foreground">User accounts & permissions</div>
                    </div>
                  </Button>
                </Link>

                <Link href="/dashboard/admin/facilities">
                  <Button variant="outline" className="w-full justify-start h-auto p-4 hover:bg-secondary-light">
                    <div className="text-left">
                      <div className="flex items-center space-x-2 mb-1">
                        <Building2 className="w-4 h-4 text-secondary" />
                        <span className="font-medium">Facilities</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Healthcare facilities</div>
                    </div>
                  </Button>
                </Link>

                <Link href="/dashboard/admin/reports">
                  <Button variant="outline" className="w-full justify-start h-auto p-4 hover:bg-accent-light">
                    <div className="text-left">
                      <div className="flex items-center space-x-2 mb-1">
                        <BarChart3 className="w-4 h-4 text-accent" />
                        <span className="font-medium">Reports</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Analytics & insights</div>
                    </div>
                  </Button>
                </Link>

                <Link href="/dashboard/admin/system">
                  <Button variant="outline" className="w-full justify-start h-auto p-4 hover:bg-medical-light">
                    <div className="text-left">
                      <div className="flex items-center space-x-2 mb-1">
                        <Globe className="w-4 h-4 text-medical" />
                        <span className="font-medium">System</span>
                      </div>
                      <div className="text-xs text-muted-foreground">System configuration</div>
                    </div>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent System Activity</CardTitle>
                <CardDescription>Latest administrative actions and system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="flex items-center space-x-4 p-3 rounded-lg border hover:shadow-md transition-shadow"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          {activity.user && <span className="font-medium text-sm">{activity.user}</span>}
                          {activity.facility && <span className="text-sm text-muted-foreground">at {activity.facility}</span>}
                          {activity.records && <span className="text-sm text-muted-foreground">{activity.records} records synced</span>}
                        </div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pending Approvals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Pending User Approvals</span>
                  <Badge variant="outline" className="bg-warning-light text-warning">
                    {pendingApprovals.length} pending
                  </Badge>
                </CardTitle>
                <CardDescription>New user registrations requiring approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {user.role} at {user.facility}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Submitted: {new Date(user.submitted).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-success hover:bg-success-hover">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-error border-error hover:bg-error-light">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {pendingApprovals.length > 3 && (
                  <div className="text-center pt-4 border-t">
                    <Link href="/dashboard/admin/users?tab=pending">
                      <Button variant="outline" size="sm">
                        View All Pending ({pendingApprovals.length})
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}