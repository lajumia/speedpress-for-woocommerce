import { useState } from 'react';
import { Plus, FileText, Clock, CheckCircle, XCircle, AlertCircle, Edit, Trash2, MessageSquare, Paperclip, Calendar, DollarSign, User, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { toast } from 'sonner';

interface DevelopmentRequest {
  id: string;
  title: string;
  description: string;
  type: 'new-addon' | 'modification' | 'integration' | 'bug-fix' | 'consultation';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'submitted' | 'under-review' | 'approved' | 'in-development' | 'testing' | 'completed' | 'rejected';
  budgetRange: string;
  timeline: string;
  submittedDate: string;
  lastUpdated: string;
  technicalRequirements: string;
  attachments: string[];
  contactEmail: string;
  estimatedHours?: number;
  actualHours?: number;
  developerNotes?: string;
  progress: number;
}

const mockRequests: DevelopmentRequest[] = [
  {
    id: 'REQ-001',
    title: 'Advanced Product Configurator',
    description: 'Need a sophisticated product configurator that allows customers to customize products with real-time price updates and 3D visualization.',
    type: 'new-addon',
    priority: 'high',
    status: 'in-development',
    budgetRange: '$2000-$5000',
    timeline: '6-8 weeks',
    submittedDate: '2024-01-15',
    lastUpdated: '2024-02-01',
    technicalRequirements: 'Must integrate with existing product catalog, support variable pricing, and work with our current theme.',
    attachments: ['mockup.pdf', 'requirements.docx'],
    contactEmail: 'john@example.com',
    estimatedHours: 120,
    actualHours: 45,
    developerNotes: 'Initial framework completed. Working on 3D visualization integration.',
    progress: 65
  },
  {
    id: 'REQ-002',
    title: 'Loyalty Program Enhancement',
    description: 'Enhance existing loyalty program with tier-based rewards, referral bonuses, and social sharing incentives.',
    type: 'modification',
    priority: 'medium',
    status: 'approved',
    budgetRange: '$800-$1500',
    timeline: '3-4 weeks',
    submittedDate: '2024-01-20',
    lastUpdated: '2024-01-25',
    technicalRequirements: 'Build upon existing loyalty addon. Add social media integration APIs.',
    attachments: ['current-flow.png'],
    contactEmail: 'sarah@example.com',
    estimatedHours: 60,
    progress: 0
  },
  {
    id: 'REQ-003',
    title: 'ERP System Integration',
    description: 'Custom integration with SAP ERP system for automated inventory sync and order processing.',
    type: 'integration',
    priority: 'urgent',
    status: 'under-review',
    budgetRange: '$5000+',
    timeline: '8-12 weeks',
    submittedDate: '2024-02-05',
    lastUpdated: '2024-02-07',
    technicalRequirements: 'Must handle real-time data sync, support batch processing, and include error handling/logging.',
    attachments: ['sap-api-docs.pdf', 'data-structure.xlsx'],
    contactEmail: 'mike@enterprise.com',
    progress: 0
  }
];

export function CustomDevelopmentPortal() {
  const [requests, setRequests] = useState<DevelopmentRequest[]>(mockRequests);
  const [activeTab, setActiveTab] = useState('overview');
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [isEditRequestOpen, setIsEditRequestOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<DevelopmentRequest | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    priority: '',
    budgetRange: '',
    timeline: '',
    technicalRequirements: '',
    contactEmail: ''
  });

  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    type: '',
    priority: '',
    budgetRange: '',
    timeline: '',
    technicalRequirements: '',
    contactEmail: ''
  });

  const getStatusColor = (status: DevelopmentRequest['status']) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in-development':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'testing':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: DevelopmentRequest['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'medium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'urgent':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: DevelopmentRequest['status']) => {
    switch (status) {
      case 'submitted':
        return <FileText className="w-4 h-4" />;
      case 'under-review':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-development':
        return <Zap className="w-4 h-4" />;
      case 'testing':
        return <AlertCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleSubmitRequest = () => {
    // Enhanced validation
    if (!formData.title.trim()) {
      toast.error('Please enter a request title');
      return;
    }

    if (!formData.description.trim()) {
      toast.error('Please provide a detailed description');
      return;
    }

    if (!formData.type) {
      toast.error('Please select a request type');
      return;
    }

    if (!formData.priority) {
      toast.error('Please select a priority level');
      return;
    }

    if (!formData.contactEmail.trim()) {
      toast.error('Please enter your contact email');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contactEmail.trim())) {
      toast.error('Please enter a valid email address');
      return;
    }

    const newRequest: DevelopmentRequest = {
      id: `REQ-${(requests.length + 1).toString().padStart(3, '0')}`,
      title: formData.title.trim(),
      description: formData.description.trim(),
      type: formData.type as DevelopmentRequest['type'],
      priority: formData.priority as DevelopmentRequest['priority'],
      status: 'submitted',
      budgetRange: formData.budgetRange || 'consultation',
      timeline: formData.timeline || 'flexible',
      submittedDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      technicalRequirements: formData.technicalRequirements.trim(),
      attachments: [],
      contactEmail: formData.contactEmail.trim(),
      progress: 0
    };

    setRequests(prev => [newRequest, ...prev]);
    
    // Clear form data
    resetForm();
    setIsNewRequestOpen(false);
    toast.success('Development request submitted successfully!');
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: '',
      priority: '',
      budgetRange: '',
      timeline: '',
      technicalRequirements: '',
      contactEmail: ''
    });
  };

  const handleDialogClose = (open: boolean) => {
    setIsNewRequestOpen(open);
    if (!open) {
      // Only reset form if user cancels without submitting
      resetForm();
    }
  };

  const handleEditRequest = (request: DevelopmentRequest) => {
    setSelectedRequest(request);
    setEditFormData({
      title: request.title,
      description: request.description,
      type: request.type,
      priority: request.priority,
      budgetRange: request.budgetRange,
      timeline: request.timeline,
      technicalRequirements: request.technicalRequirements,
      contactEmail: request.contactEmail
    });
    setIsEditRequestOpen(true);
  };

  const handleUpdateRequest = () => {
    if (!selectedRequest) return;

    // Enhanced validation for edit form
    if (!editFormData.title.trim()) {
      toast.error('Please enter a request title');
      return;
    }

    if (!editFormData.description.trim()) {
      toast.error('Please provide a detailed description');
      return;
    }

    if (!editFormData.type) {
      toast.error('Please select a request type');
      return;
    }

    if (!editFormData.priority) {
      toast.error('Please select a priority level');
      return;
    }

    if (!editFormData.contactEmail.trim()) {
      toast.error('Please enter your contact email');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editFormData.contactEmail.trim())) {
      toast.error('Please enter a valid email address');
      return;
    }

    const updatedRequest: DevelopmentRequest = {
      ...selectedRequest,
      title: editFormData.title.trim(),
      description: editFormData.description.trim(),
      type: editFormData.type as DevelopmentRequest['type'],
      priority: editFormData.priority as DevelopmentRequest['priority'],
      budgetRange: editFormData.budgetRange || selectedRequest.budgetRange,
      timeline: editFormData.timeline || selectedRequest.timeline,
      technicalRequirements: editFormData.technicalRequirements.trim(),
      contactEmail: editFormData.contactEmail.trim(),
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setRequests(prev => prev.map(req => 
      req.id === selectedRequest.id ? updatedRequest : req
    ));

    setIsEditRequestOpen(false);
    setSelectedRequest(null);
    resetEditForm();
    toast.success('Request updated successfully!');
  };

  const resetEditForm = () => {
    setEditFormData({
      title: '',
      description: '',
      type: '',
      priority: '',
      budgetRange: '',
      timeline: '',
      technicalRequirements: '',
      contactEmail: ''
    });
  };

  const handleEditDialogClose = (open: boolean) => {
    setIsEditRequestOpen(open);
    if (!open) {
      setSelectedRequest(null);
      resetEditForm();
    }
  };

  const handleDeleteRequest = (requestId: string) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
    toast.success('Request deleted successfully');
  };

  const getRequestStats = () => {
    const total = requests.length;
    const inProgress = requests.filter(r => ['in-development', 'testing'].includes(r.status)).length;
    const completed = requests.filter(r => r.status === 'completed').length;
    const pending = requests.filter(r => ['submitted', 'under-review', 'approved'].includes(r.status)).length;
    
    return { total, inProgress, completed, pending };
  };

  const stats = getRequestStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Custom Development Portal</h2>
          <p className="text-muted-foreground">Request custom addons, modifications, and integrations</p>
        </div>
        <Dialog open={isNewRequestOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent 
            className="max-w-2xl max-h-[90vh] overflow-y-auto" 
            onInteractOutside={(e) => {
              // Prevent accidental closing when clicking inside form elements
              e.preventDefault();
            }}
          >
            <DialogHeader>
              <DialogTitle>Submit Development Request</DialogTitle>
              <DialogDescription>
                Fill out the form below to submit a custom development request. Our team will review your requirements and provide a detailed quote.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium">Request Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Brief title for your request"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail" className="text-sm font-medium">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                    placeholder="your@email.com"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type" className="text-sm font-medium">Request Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select request type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new-addon">New Addon</SelectItem>
                      <SelectItem value="modification">Modification</SelectItem>
                      <SelectItem value="integration">Integration</SelectItem>
                      <SelectItem value="bug-fix">Bug Fix</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority" className="text-sm font-medium">Priority Level *</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budgetRange" className="text-sm font-medium">Budget Range</Label>
                  <Select value={formData.budgetRange} onValueChange={(value) => setFormData(prev => ({ ...prev, budgetRange: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="$500-$1000">$500 - $1,000</SelectItem>
                      <SelectItem value="$1000-$2000">$1,000 - $2,000</SelectItem>
                      <SelectItem value="$2000-$5000">$2,000 - $5,000</SelectItem>
                      <SelectItem value="$5000+">$5,000+</SelectItem>
                      <SelectItem value="consultation">Consultation Required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timeline" className="text-sm font-medium">Expected Timeline</Label>
                  <Select value={formData.timeline} onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                      <SelectItem value="3-4 weeks">3-4 weeks</SelectItem>
                      <SelectItem value="1-2 months">1-2 months</SelectItem>
                      <SelectItem value="3+ months">3+ months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">Detailed Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide a detailed description of what you need..."
                  rows={4}
                  className="mt-1 resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Be as specific as possible to help us provide an accurate quote
                </p>
              </div>

              <div>
                <Label htmlFor="technicalRequirements" className="text-sm font-medium">Technical Requirements</Label>
                <Textarea
                  id="technicalRequirements"
                  value={formData.technicalRequirements}
                  onChange={(e) => setFormData(prev => ({ ...prev, technicalRequirements: e.target.value }))}
                  placeholder="Any specific technical requirements, integrations, or constraints..."
                  rows={3}
                  className="mt-1 resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Include existing plugins, theme details, or specific integrations needed
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    resetForm();
                    setIsNewRequestOpen(false);
                  }}
                  className="sm:order-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitRequest}
                  className="sm:order-2"
                  disabled={!formData.title || !formData.description || !formData.type || !formData.priority || !formData.contactEmail}
                >
                  Submit Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Request Dialog */}
        <Dialog open={isEditRequestOpen} onOpenChange={handleEditDialogClose}>
          <DialogContent 
            className="max-w-2xl max-h-[90vh] overflow-y-auto" 
            onInteractOutside={(e) => {
              // Prevent accidental closing when clicking inside form elements
              e.preventDefault();
            }}
          >
            <DialogHeader>
              <DialogTitle>Edit Development Request</DialogTitle>
              <DialogDescription>
                Update your development request details. Changes will be saved and our team will be notified.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="edit-title" className="text-sm font-medium">Request Title *</Label>
                  <Input
                    id="edit-title"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Brief title for your request"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-contactEmail" className="text-sm font-medium">Contact Email *</Label>
                  <Input
                    id="edit-contactEmail"
                    type="email"
                    value={editFormData.contactEmail}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                    placeholder="your@email.com"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-type" className="text-sm font-medium">Request Type *</Label>
                  <Select value={editFormData.type} onValueChange={(value) => setEditFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select request type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new-addon">New Addon</SelectItem>
                      <SelectItem value="modification">Modification</SelectItem>
                      <SelectItem value="integration">Integration</SelectItem>
                      <SelectItem value="bug-fix">Bug Fix</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-priority" className="text-sm font-medium">Priority Level *</Label>
                  <Select value={editFormData.priority} onValueChange={(value) => setEditFormData(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-budgetRange" className="text-sm font-medium">Budget Range</Label>
                  <Select value={editFormData.budgetRange} onValueChange={(value) => setEditFormData(prev => ({ ...prev, budgetRange: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="$500-$1000">$500 - $1,000</SelectItem>
                      <SelectItem value="$1000-$2000">$1,000 - $2,000</SelectItem>
                      <SelectItem value="$2000-$5000">$2,000 - $5,000</SelectItem>
                      <SelectItem value="$5000+">$5,000+</SelectItem>
                      <SelectItem value="consultation">Consultation Required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-timeline" className="text-sm font-medium">Expected Timeline</Label>
                  <Select value={editFormData.timeline} onValueChange={(value) => setEditFormData(prev => ({ ...prev, timeline: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                      <SelectItem value="3-4 weeks">3-4 weeks</SelectItem>
                      <SelectItem value="1-2 months">1-2 months</SelectItem>
                      <SelectItem value="3+ months">3+ months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-description" className="text-sm font-medium">Detailed Description *</Label>
                <Textarea
                  id="edit-description"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide a detailed description of what you need..."
                  rows={4}
                  className="mt-1 resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Be as specific as possible to help us provide an accurate quote
                </p>
              </div>

              <div>
                <Label htmlFor="edit-technicalRequirements" className="text-sm font-medium">Technical Requirements</Label>
                <Textarea
                  id="edit-technicalRequirements"
                  value={editFormData.technicalRequirements}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, technicalRequirements: e.target.value }))}
                  placeholder="Any specific technical requirements, integrations, or constraints..."
                  rows={3}
                  className="mt-1 resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Include existing plugins, theme details, or specific integrations needed
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    resetEditForm();
                    setIsEditRequestOpen(false);
                    setSelectedRequest(null);
                  }}
                  className="sm:order-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpdateRequest}
                  className="sm:order-2"
                  disabled={!editFormData.title || !editFormData.description || !editFormData.type || !editFormData.priority || !editFormData.contactEmail}
                >
                  Update Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Requests</p>
                    <p className="text-2xl font-semibold">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-semibold">{stats.pending}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-semibold">{stats.inProgress}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-semibold">{stats.completed}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400">1</div>
                  <div>
                    <p className="font-medium">Submit Request</p>
                    <p className="text-sm text-muted-foreground">Describe your custom development needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400">2</div>
                  <div>
                    <p className="font-medium">Review & Quote</p>
                    <p className="text-sm text-muted-foreground">Our team reviews and provides a detailed quote</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400">3</div>
                  <div>
                    <p className="font-medium">Development</p>
                    <p className="text-sm text-muted-foreground">Track progress and receive regular updates</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400">4</div>
                  <div>
                    <p className="font-medium">Delivery</p>
                    <p className="text-sm text-muted-foreground">Testing, deployment, and ongoing support</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Pricing Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-accent/50 rounded-lg">
                  <span className="font-medium">Simple Modifications</span>
                  <span className="text-sm text-muted-foreground">$500 - $1,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-accent/50 rounded-lg">
                  <span className="font-medium">New Addons</span>
                  <span className="text-sm text-muted-foreground">$1,000 - $5,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-accent/50 rounded-lg">
                  <span className="font-medium">Complex Integrations</span>
                  <span className="text-sm text-muted-foreground">$5,000+</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-accent/50 rounded-lg">
                  <span className="font-medium">Consultation</span>
                  <span className="text-sm text-muted-foreground">$150/hour</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="my-requests" className="space-y-4">
          {requests.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No requests yet</h3>
                <p className="text-muted-foreground mb-4">Submit your first custom development request to get started.</p>
                <Button onClick={() => setIsNewRequestOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Request
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-lg">{request.title}</CardTitle>
                          <Badge className={getPriorityColor(request.priority)}>
                            {request.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>#{request.id}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {request.submittedDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {request.contactEmail}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1 capitalize">{request.status.replace('-', ' ')}</span>
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditRequest(request)}
                          title="Edit request"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteRequest(request.id)}
                          title="Delete request"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-4">{request.description}</p>
                    
                    {request.status === 'in-development' && request.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Development Progress</span>
                          <span>{request.progress}%</span>
                        </div>
                        <Progress value={request.progress} className="h-2" />
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Type:</span>
                        <p className="font-medium capitalize">{request.type.replace('-', ' ')}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Budget:</span>
                        <p className="font-medium">{request.budgetRange}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timeline:</span>
                        <p className="font-medium">{request.timeline}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Updated:</span>
                        <p className="font-medium">{request.lastUpdated}</p>
                      </div>
                    </div>

                    {request.attachments.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground mb-2">Attachments:</p>
                        <div className="flex gap-2">
                          {request.attachments.map((attachment, index) => (
                            <Badge key={index} variant="outline" className="flex items-center gap-1">
                              <Paperclip className="w-3 h-3" />
                              {attachment}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {request.developerNotes && (
                      <div className="mt-4 p-3 bg-accent/50 rounded-lg">
                        <p className="text-sm font-medium mb-1">Developer Notes:</p>
                        <p className="text-sm text-muted-foreground">{request.developerNotes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="guidelines" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Development Request Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Before Submitting a Request</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Check if similar functionality exists in our current addon collection</li>
                  <li>• Prepare detailed requirements and specifications</li>
                  <li>• Consider your budget and timeline constraints</li>
                  <li>• Gather any necessary technical documentation</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3">What to Include in Your Request</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Clear and detailed description of the functionality needed</li>
                  <li>• Specific use cases and user workflows</li>
                  <li>• Technical requirements and constraints</li>
                  <li>• Mockups, wireframes, or reference examples (if available)</li>
                  <li>• Integration requirements with existing systems</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3">Development Process</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Initial review and feasibility assessment (1-2 business days)</li>
                  <li>• Detailed technical analysis and quote preparation (3-5 business days)</li>
                  <li>• Development phase with regular progress updates</li>
                  <li>• Testing and quality assurance</li>
                  <li>• Deployment and post-launch support</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3">Support & Maintenance</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 30-day bug fix guarantee on all custom development</li>
                  <li>• 6 months of compatibility updates included</li>
                  <li>• Extended support and maintenance plans available</li>
                  <li>• Documentation and training provided for complex features</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">💡 Pro Tip</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  The more detailed your requirements, the more accurate our quote and timeline will be. 
                  Don't hesitate to reach out for a consultation if you're unsure about technical feasibility.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}