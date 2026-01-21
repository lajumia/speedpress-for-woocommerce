import { useState, useEffect } from 'react';
import {
  Key,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Globe,
  CreditCard,
  Download,
  RefreshCw,
  Trash2,
  Copy,
  ExternalLink,
  Users,
  Zap,
  Calendar,
  Server,
  Eye,
  EyeOff,
  AlertCircle,
  Settings,
  HelpCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner';

interface License {
  id: string;
  key: string;
  type: 'single-site' | 'multi-site' | 'developer' | 'agency' | 'lifetime';
  status: 'active' | 'expired' | 'suspended' | 'invalid' | 'grace-period';
  product: string;
  activatedSites: number;
  maxSites: number;
  purchaseDate: string;
  expiryDate: string;
  lastChecked: string;
  customerEmail: string;
  customerName: string;
  version: string;
  features: string[];
  gracePeriodEnds?: string;
  autoRenewal: boolean;
  nextBillingDate?: string;
  billingCycle: 'monthly' | 'yearly' | 'lifetime';
}

interface Site {
  id: string;
  domain: string;
  ip: string;
  activatedDate: string;
  lastSeen: string;
  version: string;
  status: 'active' | 'inactive';
}

interface LicenseActivity {
  id: string;
  licenseId: string;
  action: string;
  details: string;
  timestamp: string;
  ip?: string;
  userAgent?: string;
}

const mockLicenses: License[] = [
  {
    id: 'LIC-001',
    key: 'SP-PREM-XXXX-XXXX-XXXX-XXXX',
    type: 'single-site',
    status: 'active',
    product: 'SpeedPress Premium',
    activatedSites: 1,
    maxSites: 1,
    purchaseDate: '2024-01-15',
    expiryDate: '2025-01-15',
    lastChecked: '2024-02-10T10:30:00Z',
    customerEmail: 'john@example.com',
    customerName: 'John Smith',
    version: '2.1.0',
    features: ['All Premium Addons', 'Priority Support', 'Free Updates'],
    autoRenewal: true,
    nextBillingDate: '2025-01-15',
    billingCycle: 'yearly'
  },
  {
    id: 'LIC-002',
    key: 'SP-DEV-YYYY-YYYY-YYYY-YYYY',
    type: 'developer',
    status: 'active',
    product: 'SpeedPress Developer',
    activatedSites: 8,
    maxSites: 25,
    purchaseDate: '2023-11-20',
    expiryDate: '2024-11-20',
    lastChecked: '2024-02-10T09:15:00Z',
    customerEmail: 'dev@agency.com',
    customerName: 'WebDev Agency',
    version: '2.1.0',
    features: ['All Premium Addons', 'White Label', 'Client Licensing', 'Priority Support'],
    autoRenewal: false,
    billingCycle: 'yearly'
  },
  {
    id: 'LIC-003',
    key: 'SP-MULT-ZZZZ-ZZZZ-ZZZZ-ZZZZ',
    type: 'multi-site',
    status: 'grace-period',
    product: 'SpeedPress Multi-Site',
    activatedSites: 3,
    maxSites: 5,
    purchaseDate: '2023-08-10',
    expiryDate: '2024-02-05',
    gracePeriodEnds: '2024-02-20',
    lastChecked: '2024-02-09T14:20:00Z',
    customerEmail: 'admin@multistore.com',
    customerName: 'Multi Store Corp',
    version: '2.0.8',
    features: ['All Premium Addons', 'Multi-Site Management', 'Bulk Updates'],
    autoRenewal: true,
    nextBillingDate: '2024-02-20',
    billingCycle: 'yearly'
  }
];

const mockSites: Record<string, Site[]> = {
  'LIC-001': [
    {
      id: 'SITE-001',
      domain: 'mystore.com',
      ip: '192.168.1.100',
      activatedDate: '2024-01-16',
      lastSeen: '2024-02-10T08:45:00Z',
      version: '2.1.0',
      status: 'active'
    }
  ],
  'LIC-002': [
    {
      id: 'SITE-005',
      domain: 'client1.com',
      ip: '192.168.1.105',
      activatedDate: '2023-12-01',
      lastSeen: '2024-02-10T07:30:00Z',
      version: '2.1.0',
      status: 'active'
    },
    {
      id: 'SITE-006',
      domain: 'client2.com',
      ip: '192.168.1.106',
      activatedDate: '2023-12-15',
      lastSeen: '2024-02-09T16:20:00Z',
      version: '2.0.9',
      status: 'active'
    }
  ]
};

const mockActivity: LicenseActivity[] = [
  {
    id: 'ACT-001',
    licenseId: 'LIC-001',
    action: 'License Activated',
    details: 'License activated on mystore.com',
    timestamp: '2024-01-16T10:30:00Z',
    ip: '192.168.1.100'
  },
  {
    id: 'ACT-002',
    licenseId: 'LIC-002',
    action: 'Site Added',
    details: 'New site client2.com added to license',
    timestamp: '2023-12-15T14:15:00Z',
    ip: '192.168.1.106'
  },
  {
    id: 'ACT-003',
    licenseId: 'LIC-003',
    action: 'Grace Period Started',
    details: 'License expired, grace period activated',
    timestamp: '2024-02-05T23:59:59Z'
  }
];

export function LicenseManager() {
  const [licenses, setLicenses] = useState<License[]>(mockLicenses);
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);
  const [sites, setSites] = useState<Record<string, Site[]>>(mockSites);
  const [activity, setActivity] = useState<LicenseActivity[]>(mockActivity);
  const [activeTab, setActiveTab] = useState('overview');
  const [newLicenseKey, setNewLicenseKey] = useState('');
  const [showLicenseKey, setShowLicenseKey] = useState<Record<string, boolean>>({});
  const [isActivating, setIsActivating] = useState(false);

  const getStatusColor = (status: License['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500 text-white';
      case 'expired': return 'bg-red-500 text-white';
      case 'suspended': return 'bg-orange-500 text-white';
      case 'grace-period': return 'bg-yellow-500 text-black';
      case 'invalid': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: License['status']) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'expired': return <XCircle className="w-4 h-4" />;
      case 'suspended': return <AlertTriangle className="w-4 h-4" />;
      case 'grace-period': return <Clock className="w-4 h-4" />;
      case 'invalid': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getLicenseTypeColor = (type: License['type']) => {
    switch (type) {
      case 'single-site': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'multi-site': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'developer': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'agency': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'lifetime': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatLicenseKey = (key: string, show: boolean) => {
    if (show) return key;
    const parts = key.split('-');
    return parts.map((part, index) => 
      index === 0 ? part : 'X'.repeat(part.length)
    ).join('-');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleActivateLicense = async () => {
    if (!newLicenseKey.trim()) {
      toast.error('Please enter a license key');
      return;
    }

    setIsActivating(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock validation - in real app, this would call your license server
      const isValid = newLicenseKey.startsWith('SP-');
      
      if (isValid) {
        const newLicense: License = {
          id: `LIC-${String(licenses.length + 1).padStart(3, '0')}`,
          key: newLicenseKey,
          type: 'single-site',
          status: 'active',
          product: 'SpeedPress Premium',
          activatedSites: 1,
          maxSites: 1,
          purchaseDate: new Date().toISOString().split('T')[0],
          expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          lastChecked: new Date().toISOString(),
          customerEmail: 'user@example.com',
          customerName: 'New Customer',
          version: '2.1.0',
          features: ['All Premium Addons', 'Priority Support'],
          autoRenewal: false,
          billingCycle: 'yearly'
        };

        setLicenses(prev => [...prev, newLicense]);
        setNewLicenseKey('');
        toast.success('License activated successfully!');
      } else {
        toast.error('Invalid license key. Please check and try again.');
      }
      
      setIsActivating(false);
    }, 2000);
  };

  const handleDeactivateLicense = (licenseId: string) => {
    setLicenses(prev => prev.map(license => 
      license.id === licenseId 
        ? { ...license, status: 'suspended' as const }
        : license
    ));
    toast.success('License deactivated successfully');
  };

  const handleRefreshLicense = (licenseId: string) => {
    // Simulate license refresh
    toast.success('License status refreshed');
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const days = Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getUsagePercentage = (used: number, total: number) => {
    return Math.round((used / total) * 100);
  };

  const activeLicenses = licenses.filter(l => l.status === 'active').length;
  const expiredLicenses = licenses.filter(l => l.status === 'expired').length;
  const gracePeriodLicenses = licenses.filter(l => l.status === 'grace-period').length;
  const totalSites = Object.values(sites).flat().length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Key className="w-4 h-4 text-white" />
            </div>
            License Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your SpeedPress licenses and premium addon access
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Key className="w-4 h-4 mr-2" />
              Activate License
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Activate New License</DialogTitle>
              <DialogDescription>
                Enter your license key to activate premium features
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="license-key">License Key</Label>
                <Input
                  id="license-key"
                  value={newLicenseKey}
                  onChange={(e) => setNewLicenseKey(e.target.value)}
                  placeholder="SP-XXXX-XXXX-XXXX-XXXX"
                  className="font-mono"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setNewLicenseKey('')}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleActivateLicense}
                  disabled={isActivating}
                  className="bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  {isActivating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Activating...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Activate
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Licenses</p>
                <p className="text-2xl font-semibold">{activeLicenses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expired</p>
                <p className="text-2xl font-semibold">{expiredLicenses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Grace Period</p>
                <p className="text-2xl font-semibold">{gracePeriodLicenses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sites</p>
                <p className="text-2xl font-semibold">{totalSites}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="licenses">Licenses</TabsTrigger>
          <TabsTrigger value="sites">Sites</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* License Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {licenses.map((license) => {
              const daysUntilExpiry = getDaysUntilExpiry(license.expiryDate);
              const usagePercentage = getUsagePercentage(license.activatedSites, license.maxSites);
              
              return (
                <Card key={license.id} className="relative overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getLicenseTypeColor(license.type)}>
                        {license.type.replace('-', ' ').toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(license.status)}>
                        {getStatusIcon(license.status)}
                        <span className="ml-1 capitalize">{license.status.replace('-', ' ')}</span>
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{license.product}</CardTitle>
                    <CardDescription>{license.customerName}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* License Key */}
                    <div>
                      <Label className="text-xs text-muted-foreground">License Key</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="flex-1 px-2 py-1 bg-muted rounded text-sm font-mono">
                          {formatLicenseKey(license.key, showLicenseKey[license.id] || false)}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowLicenseKey(prev => ({ 
                            ...prev, 
                            [license.id]: !prev[license.id] 
                          }))}
                        >
                          {showLicenseKey[license.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(license.key)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Site Usage */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Site Usage</span>
                        <span>{license.activatedSites}/{license.maxSites}</span>
                      </div>
                      <Progress value={usagePercentage} className="h-2" />
                    </div>

                    {/* Expiry Information */}
                    {license.status !== 'expired' && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {license.status === 'grace-period' ? 'Grace period ends:' : 'Expires:'}
                        </span>
                        <span className={daysUntilExpiry < 30 ? 'text-red-600 font-medium' : ''}>
                          {daysUntilExpiry < 0 ? 'Expired' : `${daysUntilExpiry} days`}
                        </span>
                      </div>
                    )}

                    {/* Grace Period Warning */}
                    {license.status === 'grace-period' && (
                      <Alert> 
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          License expired. Grace period active until {new Date(license.gracePeriodEnds!).toLocaleDateString()}
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleRefreshLicense(license.id)}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      {license.status === 'active' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeactivateLicense(license.id)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedLicense(license)}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="licenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>License Details</CardTitle>
              <CardDescription>Complete overview of all your licenses</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>License</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sites</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {licenses.map((license) => (
                    <TableRow key={license.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{license.product}</div>
                          <div className="text-sm text-muted-foreground font-mono">
                            {formatLicenseKey(license.key, false)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getLicenseTypeColor(license.type)}>
                          {license.type.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(license.status)}>
                          {getStatusIcon(license.status)}
                          <span className="ml-1 capitalize">{license.status.replace('-', ' ')}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {license.activatedSites}/{license.maxSites}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {new Date(license.expiryDate).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sites" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activated Sites</CardTitle>
              <CardDescription>All sites where your licenses are active</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Domain</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Last Seen</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(sites).map(([licenseId, siteList]) =>
                    siteList.map((site) => {
                      const license = licenses.find(l => l.id === licenseId);
                      return (
                        <TableRow key={site.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">{site.domain}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">
                              {license?.product}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{site.version}</Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {new Date(site.lastSeen).toLocaleDateString()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge className={site.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}>
                              {site.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>License Activity</CardTitle>
              <CardDescription>Recent license and activation activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activity.map((item) => {
                  const license = licenses.find(l => l.id === item.licenseId);
                  return (
                    <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border">
                      <div className="p-1 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                        <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{item.action}</p>
                          <span className="text-sm text-muted-foreground">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.details}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>License: {license?.key.split('-').slice(0, 2).join('-')}...</span>
                          {item.ip && <span>IP: {item.ip}</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* License Details Modal */}
      {selectedLicense && (
        <Dialog open={!!selectedLicense} onOpenChange={() => setSelectedLicense(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>License Details - {selectedLicense.product}</DialogTitle>
              <DialogDescription>
                Manage settings and view details for this license
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">License ID</Label>
                  <p className="font-mono">{selectedLicense.id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Customer</Label>
                  <p>{selectedLicense.customerName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Purchase Date</Label>
                  <p>{new Date(selectedLicense.purchaseDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Version</Label>
                  <p>{selectedLicense.version}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label className="text-muted-foreground">Features Included</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedLicense.features.map((feature, index) => (
                    <Badge key={index} variant="outline">{feature}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>Auto Renewal</Label>
                <Switch 
                  checked={selectedLicense.autoRenewal}
                  onCheckedChange={(checked) => {
                    setSelectedLicense(prev => prev ? { ...prev, autoRenewal: checked } : null);
                    toast.success(`Auto renewal ${checked ? 'enabled' : 'disabled'}`);
                  }}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => window.open('https://speedpress.com/account', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View in Account
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => copyToClipboard(selectedLicense.key)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy License Key
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}