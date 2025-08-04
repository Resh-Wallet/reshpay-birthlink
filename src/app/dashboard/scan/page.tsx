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
  Camera, 
  Upload, 
  Scan,
  FileImage,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Eye,
  RefreshCw,
  Download
} from 'lucide-react'

export default function ScanPage() {
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'complete' | 'error'>('idle')
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [extractedData, setExtractedData] = useState<any>(null)

  const mockExtractedData = {
    babyInfo: {
      name: 'Kwame Asante',
      dateOfBirth: '2024-03-15',
      gender: 'Male',
      weight: '3.2 kg',
      placeOfBirth: 'Korle-Bu Teaching Hospital'
    },
    motherInfo: {
      name: 'Akosua Asante',
      age: '28',
      occupation: 'Teacher',
      idNumber: 'GHA-123456789-1'
    },
    confidence: 94
  }

  const simulateScan = () => {
    setScanStatus('scanning')
    setTimeout(() => {
      setScanStatus('complete')
      setExtractedData(mockExtractedData)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-primary/5">
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
              <Button variant="ghost" size="icon" className="hover:bg-secondary/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Document Scanner</h1>
              <p className="text-sm text-muted-foreground">Extract data from medical records</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scan Interface */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Scan className="w-6 h-6 text-secondary" />
                  <span>Upload Documents</span>
                </CardTitle>
                <CardDescription>
                  Upload medical records, birth certificates, or ID documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {scanStatus === 'idle' && (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-secondary/50 transition-colors">
                    <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Drop files here or click to upload</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Support for JPG, PNG, PDF files up to 10MB
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button className="bg-secondary hover:bg-secondary/90" onClick={simulateScan}>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Files
                      </Button>
                      <Button variant="outline">
                        <Camera className="w-4 h-4 mr-2" />
                        Take Photo
                      </Button>
                    </div>
                  </div>
                )}

                {scanStatus === 'scanning' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <RefreshCw className="w-8 h-8 text-secondary" />
                      </motion.div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">AI Processing Document...</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Extracting information using advanced OCR and NLP
                    </p>
                    <Progress value={75} className="max-w-xs mx-auto" />
                  </motion.div>
                )}

                {scanStatus === 'complete' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Scan Complete!</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Successfully extracted data with {extractedData?.confidence}% confidence
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button variant="outline" onClick={() => setScanStatus('idle')}>
                        <Upload className="w-4 h-4 mr-2" />
                        Scan Another
                      </Button>
                      <Button>
                        <Download className="w-4 h-4 mr-2" />
                        Use Data
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Scanning Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="text-sm">
                    <p className="font-medium">Good Lighting</p>
                    <p className="text-muted-foreground">Ensure documents are well-lit and readable</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <div className="text-sm">
                    <p className="font-medium">Clear Images</p>
                    <p className="text-muted-foreground">Avoid blurry or tilted document photos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div className="text-sm">
                    <p className="font-medium">Complete Documents</p>
                    <p className="text-muted-foreground">Include all relevant sections and text</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {scanStatus === 'complete' && extractedData && (
              <>
                {/* Confidence Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 text-secondary" />
                        <span>Extraction Results</span>
                      </span>
                      <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                        {extractedData.confidence}% Confidence
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={extractedData.confidence} className="mb-2" />
                    <p className="text-sm text-muted-foreground">
                      High confidence score indicates reliable data extraction
                    </p>
                  </CardContent>
                </Card>

                {/* Extracted Baby Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Baby Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(extractedData.babyInfo).map(([key, value]) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                      >
                        <span className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-muted-foreground">{value as string}</span>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Extracted Mother Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-secondary">Mother Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(extractedData.motherInfo).map(([key, value]) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                      >
                        <span className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-muted-foreground">{value as string}</span>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Please review the extracted data carefully before proceeding with registration.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="flex gap-4">
                      <Link href="/dashboard/register" className="flex-1">
                        <Button className="w-full">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Create Registration
                        </Button>
                      </Link>
                      <Button variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Review & Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {(scanStatus === 'idle' || scanStatus === 'scanning') && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileImage className="w-5 h-5" />
                    <span>Supported Documents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileImage className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Medical Records</p>
                        <p className="text-xs text-muted-foreground">Birth records, delivery notes</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <FileImage className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium">Identity Documents</p>
                        <p className="text-xs text-muted-foreground">Ghana Cards, passports, IDs</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <FileImage className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">Hospital Forms</p>
                        <p className="text-xs text-muted-foreground">Intake forms, consent documents</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}