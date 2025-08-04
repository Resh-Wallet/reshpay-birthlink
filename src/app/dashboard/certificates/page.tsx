'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { UserMenu } from '@/components/ui/user-menu'
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Printer,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Share,
  MoreVertical
} from 'lucide-react'

export default function CertificatesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock certificates data
  const certificates = [
    {
      id: 'CERT-001',
      babyName: 'Kwame Asante',
      motherName: 'Akosua Asante',
      dateIssued: '2024-03-15',
      status: 'issued',
      certificateNumber: 'BRC/2024/001234',
      registrationDate: '2024-03-15',
      downloads: 3
    },
    {
      id: 'CERT-002',
      babyName: 'Ama Osei',
      motherName: 'Efua Osei',
      dateIssued: '2024-03-14',
      status: 'pending',
      certificateNumber: 'BRC/2024/001235',
      registrationDate: '2024-03-14',
      downloads: 0
    },
    {
      id: 'CERT-003',
      babyName: 'Kofi Mensah',
      motherName: 'Akua Mensah',
      dateIssued: '2024-03-13',
      status: 'issued',
      certificateNumber: 'BRC/2024/001236',
      registrationDate: '2024-03-13',
      downloads: 5
    },
    {
      id: 'CERT-004',
      babyName: 'Abena Darko',
      motherName: 'Yaa Darko',
      dateIssued: '2024-03-12',
      status: 'error',
      certificateNumber: 'BRC/2024/001237',
      registrationDate: '2024-03-12',
      downloads: 0
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'issued': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'issued': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      case 'error': return <AlertCircle className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.babyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.motherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || cert.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 via-background to-primary/5">
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
              <Button variant="ghost" size="icon" className="hover:bg-accent/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Birth Certificates</h1>
              <p className="text-sm text-muted-foreground">Generate and manage certificates</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-accent hover:bg-accent/90">
              <FileText className="w-4 h-4 mr-2" />
              Generate New
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
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Total</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-primary">{certificates.length}</div>
                <div className="text-xs text-muted-foreground">Certificates</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Issued</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-green-500">
                  {certificates.filter(c => c.status === 'issued').length}
                </div>
                <div className="text-xs text-muted-foreground">Ready</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">Pending</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-yellow-500">
                  {certificates.filter(c => c.status === 'pending').length}
                </div>
                <div className="text-xs text-muted-foreground">Processing</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Download className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Downloads</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-blue-500">
                  {certificates.reduce((sum, c) => sum + c.downloads, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'issued' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('issued')}
              size="sm"
              className={filterStatus === 'issued' ? 'bg-green-500 hover:bg-green-600' : ''}
            >
              Issued
            </Button>
            <Button
              variant={filterStatus === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('pending')}
              size="sm"
              className={filterStatus === 'pending' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
            >
              Pending
            </Button>
          </div>
        </motion.div>

        {/* Certificates List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          {filteredCertificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.01]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className="text-lg font-semibold">{certificate.babyName}</h3>
                        <Badge className={getStatusColor(certificate.status)}>
                          {getStatusIcon(certificate.status)}
                          <span className="ml-1 capitalize">{certificate.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
                        <div>
                          <span className="font-medium">Mother:</span> {certificate.motherName}
                        </div>
                        <div>
                          <span className="font-medium">Certificate #:</span> {certificate.certificateNumber}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>Issued: {new Date(certificate.dateIssued).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Download className="w-3 h-3" />
                          <span>{certificate.downloads} downloads</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>Registered: {new Date(certificate.registrationDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {certificate.status === 'issued' && (
                        <>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" className="bg-accent hover:bg-accent/90">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            <Printer className="w-4 h-4 mr-1" />
                            Print
                          </Button>
                        </>
                      )}
                      
                      {certificate.status === 'pending' && (
                        <Button size="sm" variant="outline" disabled>
                          <Clock className="w-4 h-4 mr-1" />
                          Processing...
                        </Button>
                      )}
                      
                      {certificate.status === 'error' && (
                        <Button size="sm" variant="outline" className="text-red-600">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Retry
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

        {filteredCertificates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center py-12"
          >
            <FileText className="mx-auto w-16 h-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No certificates found
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Start by creating a new birth registration.'}
            </p>
            <Link href="/dashboard/register">
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Create New Registration
              </Button>
            </Link>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Bulk Generate</h3>
              <p className="text-sm text-muted-foreground">Generate multiple certificates at once</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Download className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Export Report</h3>
              <p className="text-sm text-muted-foreground">Export certificate data as CSV</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Share className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Share Portal</h3>
              <p className="text-sm text-muted-foreground">Share certificates with families</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}