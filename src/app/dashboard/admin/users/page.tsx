'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UserMenu } from '@/components/ui/user-menu'
import { 
  ArrowLeft, 
  Users,
  Search,
  Filter,
  UserPlus,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  Shield,
  Clock,
  Mail,
  Phone
} from 'lucide-react'

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')

  // Mock users data
  const users = [
    {
      id: 1,
      name: 'Dr. Kwame Amankwa',
      email: 'kwame.amankwa@korlebu.edu.gh',
      phone: '+233 24 123 4567',
      role: 'doctor',
      facility: 'Korle-Bu Teaching Hospital',
      status: 'active',
      lastLogin: '2024-03-15T08:30:00Z',
      registrations: 247,
      joined: '2023-01-15'
    },
    {
      id: 2,
      name: 'Nurse Akosua Mensah',
      email: 'akosua.mensah@hospital.gov.gh',
      phone: '+233 20 987 6543',
      role: 'midwife',
      facility: 'Tamale Teaching Hospital',
      status: 'pending',
      lastLogin: null,
      registrations: 0,
      joined: '2024-03-14'
    },
    {
      id: 3,
      name: 'Dr. Yaa Asantewaa',
      email: 'yaa.asantewaa@komfo.edu.gh',
      phone: '+233 54 234 5678',
      role: 'doctor',
      facility: 'Komfo Anokye Teaching Hospital',
      status: 'active',
      lastLogin: '2024-03-14T16:45:00Z',
      registrations: 189,
      joined: '2022-08-20'
    },
    {
      id: 4,
      name: 'Admin John Doe',
      email: 'john.doe@birthlink.gov.gh',
      phone: '+233 30 345 6789',
      role: 'admin',
      facility: 'System Administrator',
      status: 'suspended',
      lastLogin: '2024-03-10T12:20:00Z',
      registrations: 0,
      joined: '2023-06-01'
    },
    {
      id: 5,
      name: 'Registrar Mary Osei',
      email: 'mary.osei@registry.gov.gh',
      phone: '+233 50 456 7890',
      role: 'registrar',
      facility: 'Ridge Hospital',
      status: 'active',
      lastLogin: '2024-03-15T07:15:00Z',
      registrations: 134,
      joined: '2023-03-10'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground'
      case 'pending': return 'bg-warning text-warning-foreground'
      case 'suspended': return 'bg-error text-error-foreground'
      case 'inactive': return 'bg-muted text-muted-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-accent text-accent-foreground'
      case 'doctor': return 'bg-primary text-primary-foreground'
      case 'midwife': return 'bg-secondary text-secondary-foreground'
      case 'nurse': return 'bg-medical text-medical-foreground'
      case 'registrar': return 'bg-info text-info-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.facility.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesStatus && matchesRole
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/admin">
              <Button variant="ghost" size="icon" className="hover:bg-primary-light">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">User Management</h1>
              <p className="text-sm text-muted-foreground">Manage healthcare worker accounts</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-primary hover:bg-primary-hover">
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
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
        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Total Users</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-primary">{users.length}</div>
                <div className="text-xs text-muted-foreground">Registered accounts</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm font-medium">Active</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-success">
                  {users.filter(u => u.status === 'active').length}
                </div>
                <div className="text-xs text-muted-foreground">Active users</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-warning" />
                <span className="text-sm font-medium">Pending</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-warning">
                  {users.filter(u => u.status === 'pending').length}
                </div>
                <div className="text-xs text-muted-foreground">Awaiting approval</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <XCircle className="w-4 h-4 text-error" />
                <span className="text-sm font-medium">Suspended</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-error">
                  {users.filter(u => u.status === 'suspended').length}
                </div>
                <div className="text-xs text-muted-foreground">Suspended accounts</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="midwife">Midwife</SelectItem>
                <SelectItem value="nurse">Nurse</SelectItem>
                <SelectItem value="registrar">Registrar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Users List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.01]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center text-lg font-bold text-primary">
                          {user.name.split(' ').map(n => n.charAt(0)).join('')}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{user.name}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                            <Badge className={getRoleColor(user.role)}>
                              {user.role}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4" />
                          <span>{user.facility}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span>Registrations: <strong>{user.registrations}</strong></span>
                          <span>Joined: {new Date(user.joined).toLocaleDateString()}</span>
                          {user.lastLogin && (
                            <span>Last login: {new Date(user.lastLogin).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {user.status === 'pending' && (
                        <>
                          <Button size="sm" className="bg-success hover:bg-success-hover">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="text-error border-error hover:bg-error-light">
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      
                      {user.status === 'active' && (
                        <>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </>
                      )}
                      
                      {user.status === 'suspended' && (
                        <Button size="sm" className="bg-success hover:bg-success-hover">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Reactivate
                        </Button>
                      )}
                      
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center py-12"
          >
            <Users className="mx-auto w-16 h-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No users found
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your search or filter criteria.
            </p>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Add New User
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}