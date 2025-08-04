'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { UserMenu } from '@/components/ui/user-menu'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ArrowLeft, 
  Upload, 
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  Users,
  Baby,
  Clock,
  RefreshCw
} from 'lucide-react'

export default function BatchPage() {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'complete'>('idle')
  const [uploadProgress, setUploadProgress] = useState(0)

  const mockBatchResults = {
    total: 50,
    successful: 47,
    failed: 3,
    errors: [
      { row: 15, error: 'Invalid date format for mother\'s birth date' },
      { row: 28, error: 'Missing required field: baby first name' },
      { row: 42, error: 'Invalid Ghana Card number format' }
    ]
  }

  const simulateUpload = () => {
    setUploadStatus('uploading')
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setUploadStatus('processing')
        setTimeout(() => {
          setUploadStatus('complete')
        }, 2000)
      }
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/5 via-background to-secondary/5">
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
              <Button variant="ghost" size="icon" className="hover:bg-blue-500/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Batch Upload</h1>
              <p className="text-sm text-muted-foreground">Import multiple registrations via CSV</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Template
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
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-6 h-6 text-blue-500" />
                  <span>CSV File Upload</span>
                </CardTitle>
                <CardDescription>
                  Upload a CSV file containing multiple birth registration records
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {uploadStatus === 'idle' && (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-blue-500/50 transition-colors">
                    <div className="mx-auto w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                      <Upload className="w-10 h-10 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Upload CSV File</h3>
                    <p className="text-muted-foreground mb-6">
                      Select a CSV file with birth registration data. Maximum file size: 10MB
                    </p>
                    <Button className="bg-blue-500 hover:bg-blue-600" onClick={simulateUpload}>
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                )}

                {(uploadStatus === 'uploading' || uploadStatus === 'processing') && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="mx-auto w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <RefreshCw className="w-10 h-10 text-blue-500" />
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-medium mb-2">
                      {uploadStatus === 'uploading' ? 'Uploading File...' : 'Processing Records...'}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {uploadStatus === 'uploading' 
                        ? 'Please wait while we upload your file'
                        : 'Validating and importing birth registration data'}
                    </p>
                    <div className="max-w-xs mx-auto">
                      <Progress value={uploadStatus === 'uploading' ? uploadProgress : 75} className="mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {uploadStatus === 'uploading' ? `${uploadProgress}% uploaded` : 'Processing records...'}
                      </p>
                    </div>
                  </motion.div>
                )}

                {uploadStatus === 'complete' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">Upload Complete!</h3>
                      <p className="text-muted-foreground">
                        Processed {mockBatchResults.total} records from your CSV file
                      </p>
                    </div>

                    {/* Results Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-blue-500 mb-1">
                            {mockBatchResults.total}
                          </div>
                          <div className="text-sm text-muted-foreground">Total Records</div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-green-500 mb-1">
                            {mockBatchResults.successful}
                          </div>
                          <div className="text-sm text-muted-foreground">Successful</div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-red-500 mb-1">
                            {mockBatchResults.failed}
                          </div>
                          <div className="text-sm text-muted-foreground">Failed</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Error Details */}
                    {mockBatchResults.errors.length > 0 && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          <div className="space-y-2">
                            <p className="font-medium">Errors found in {mockBatchResults.failed} records:</p>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {mockBatchResults.errors.map((error, index) => (
                                <li key={index}>
                                  Row {error.row}: {error.error}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex gap-4">
                      <Button onClick={() => setUploadStatus('idle')} variant="outline" className="flex-1">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Another File
                      </Button>
                      <Button className="flex-1">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        View Registrations
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* CSV Template Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>CSV Template Guide</span>
                </CardTitle>
                <CardDescription>
                  Required columns and data format for bulk upload
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-primary mb-3 flex items-center">
                      <Baby className="w-4 h-4 mr-2" />
                      Baby Information (Required)
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• baby_first_name</li>
                      <li>• baby_last_name</li>
                      <li>• baby_date_of_birth (YYYY-MM-DD)</li>
                      <li>• baby_gender (Male/Female)</li>
                      <li>• baby_place_of_birth</li>
                      <li>• baby_weight (optional)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-secondary mb-3 flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Mother Information (Required)
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• mother_first_name</li>
                      <li>• mother_last_name</li>
                      <li>• mother_date_of_birth (YYYY-MM-DD)</li>
                      <li>• mother_nationality</li>
                      <li>• mother_id_type</li>
                      <li>• mother_id_number</li>
                      <li>• mother_phone (optional)</li>
                      <li>• mother_address</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-accent mb-3 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Father Information (Optional)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• father_first_name</li>
                      <li>• father_last_name</li>
                      <li>• father_date_of_birth</li>
                      <li>• father_nationality</li>
                    </ul>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• father_id_type</li>
                      <li>• father_id_number</li>
                      <li>• father_phone</li>
                      <li>• father_occupation</li>
                    </ul>
                  </div>
                </div>

                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-medium mb-2">Important Notes:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>All dates must be in YYYY-MM-DD format</li>
                      <li>Gender should be exactly "Male" or "Female"</li>
                      <li>ID types: "Ghana Card", "Passport", "Driver's License"</li>
                      <li>File must be saved as UTF-8 encoded CSV</li>
                      <li>Maximum 1000 records per file</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <div className="flex justify-center">
                  <Button variant="outline" className="bg-blue-500/5">
                    <Download className="w-4 h-4 mr-2" />
                    Download Sample CSV Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Uploads */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Recent Uploads</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 1, filename: 'births_march_2024.csv', date: '2024-03-15', records: 47, status: 'completed' },
                    { id: 2, filename: 'hospital_registrations.csv', date: '2024-03-14', records: 23, status: 'completed' },
                    { id: 3, filename: 'weekly_batch.csv', date: '2024-03-13', records: 15, status: 'failed' },
                  ].map((upload) => (
                    <div key={upload.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{upload.filename}</div>
                        <div className="text-sm text-muted-foreground">
                          {upload.records} records • {new Date(upload.date).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge className={
                        upload.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }>
                        {upload.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}