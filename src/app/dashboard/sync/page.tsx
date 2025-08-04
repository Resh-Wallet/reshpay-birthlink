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
  CheckCircle,
  AlertCircle,
  Clock,
  Wifi,
  WifiOff,
  RefreshCw,
  Database,
  Upload,
  Download
} from 'lucide-react'
import { FaCloud, FaSync } from 'react-icons/fa'


export default function SyncPage() {
  const [isOnline, setIsOnline] = useState(true)
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'complete'>('idle')
  const [syncProgress, setSyncProgress] = useState(0)

  const syncData = {
    pendingUploads: 3,
    pendingDownloads: 1,
    lastSync: '2024-03-15T10:30:00Z',
    totalRecords: 156,
    syncedRecords: 153,
    failedRecords: 0
  }

  const pendingRecords = [
    { id: 1, type: 'registration', name: 'Kwame Asante', status: 'pending_upload', timestamp: '2024-03-15T14:30:00Z' },
    { id: 2, type: 'certificate', name: 'Ama Osei', status: 'pending_upload', timestamp: '2024-03-15T13:45:00Z' },
    { id: 3, type: 'registration', name: 'Kofi Mensah', status: 'pending_upload', timestamp: '2024-03-15T12:20:00Z' },
    { id: 4, type: 'update', name: 'Abena Darko', status: 'pending_download', timestamp: '2024-03-15T11:10:00Z' },
  ]

  const startSync = () => {
    setSyncStatus('syncing')
    let progress = 0
    const interval = setInterval(() => {
      progress += 20
      setSyncProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setSyncStatus('complete')
        setTimeout(() => {
          setSyncStatus('idle')
          setSyncProgress(0)
        }, 2000)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500/5 via-background to-blue-500/5">
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
              <Button variant="ghost" size="icon" className="hover:bg-green-500/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Data Synchronization</h1>
              <p className="text-sm text-muted-foreground">Manage offline data and sync with central registry</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className={isOnline ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'}>
              {isOnline ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
              {isOnline ? 'Online' : 'Offline'}
            </Badge>
            <Button 
              onClick={startSync} 
              disabled={!isOnline || syncStatus === 'syncing'}
              className="bg-green-500 hover:bg-green-600"
            >
              {syncStatus === 'syncing' ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <FaSync className="w-4 h-4 mr-2" />
              )}
              {syncStatus === 'syncing' ? 'Syncing...' : 'Sync Now'}
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
        {/* Sync Status Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Upload className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium">Pending Upload</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-orange-500">{syncData.pendingUploads}</div>
                <div className="text-xs text-muted-foreground">Records</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Download className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Pending Download</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-blue-500">{syncData.pendingDownloads}</div>
                <div className="text-xs text-muted-foreground">Updates</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Synced</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-green-500">{syncData.syncedRecords}</div>
                <div className="text-xs text-muted-foreground">of {syncData.totalRecords}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Last Sync</span>
              </div>
              <div className="mt-2">
                <div className="text-sm font-bold">{new Date(syncData.lastSync).toLocaleTimeString()}</div>
                <div className="text-xs text-muted-foreground">{new Date(syncData.lastSync).toLocaleDateString()}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sync Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Current Sync Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FaCloud className="w-5 h-5 text-green-500" />
                  <span>Sync Status</span>
                </CardTitle>
                <CardDescription>Real-time synchronization with central registry</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {syncStatus === 'syncing' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <RefreshCw className="w-8 h-8 text-green-500" />
                      </motion.div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Synchronizing Data...</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Uploading local records and downloading updates
                    </p>
                    <Progress value={syncProgress} className="max-w-xs mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">{syncProgress}% complete</p>
                  </motion.div>
                )}

                {syncStatus === 'complete' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-6"
                  >
                    <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Sync Complete!</h3>
                    <p className="text-sm text-muted-foreground">
                      All records are now synchronized with the central registry
                    </p>
                  </motion.div>
                )}

                {syncStatus === 'idle' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Sync Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((syncData.syncedRecords / syncData.totalRecords) * 100)}%
                      </span>
                    </div>
                    <Progress value={(syncData.syncedRecords / syncData.totalRecords) * 100} />
                    <div className="text-sm text-muted-foreground">
                      {syncData.syncedRecords} of {syncData.totalRecords} records synchronized
                    </div>
                  </div>
                )}

                {!isOnline && (
                  <Alert>
                    <WifiOff className="h-4 w-4" />
                    <AlertDescription>
                      You&apos;re currently offline. Data will be synchronized automatically when connection is restored.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Pending Records */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5" />
                  <span>Pending Records</span>
                </CardTitle>
                <CardDescription>Records waiting to be synchronized</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRecords.map((record, index) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{record.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {record.type}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(record.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          record.status === 'pending_upload'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        }>
                          {record.status === 'pending_upload' ? (
                            <Upload className="w-3 h-3 mr-1" />
                          ) : (
                            <Download className="w-3 h-3 mr-1" />
                          )}
                          {record.status.replace('pending_', '')}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sync Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Connection Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {isOnline ? <Wifi className="w-5 h-5 text-green-500" /> : <WifiOff className="w-5 h-5 text-red-500" />}
                  <span>Connection</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status</span>
                  <Badge className={isOnline ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'}>
                    {isOnline ? 'Connected' : 'Disconnected'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Server</span>
                  <span className="text-sm text-muted-foreground">registry.births.gov.gh</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setIsOnline(!isOnline)}
                >
                  {isOnline ? 'Test Connection' : 'Retry Connection'}
                </Button>
              </CardContent>
            </Card>

            {/* Auto Sync Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Auto Sync</CardTitle>
                <CardDescription>Automatic synchronization settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto sync when online</span>
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                    Enabled
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sync interval</span>
                  <span className="text-sm text-muted-foreground">Every 5 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Background sync</span>
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                    Enabled
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Storage Info */}
            <Card>
              <CardHeader>
                <CardTitle>Local Storage</CardTitle>
                <CardDescription>Offline data storage information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Used space</span>
                  <span className="text-sm text-muted-foreground">2.3 MB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Available space</span>
                  <span className="text-sm text-muted-foreground">47.7 MB</span>
                </div>
                <Progress value={5} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  5% of allocated storage used
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Clear Cache
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}