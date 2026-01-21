import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  Settings, 
  Save, 
  X, 
  AlertCircle, 
  Zap, 
  Palette, 
  Mail, 
  Shield, 
  BarChart3, 
  Wrench,
  Eye,
  Code,
  Globe,
  Bell,
  Lock,
  Smartphone,
  Target,
  Timer,
  DollarSign,
  Users,
  TrendingUp,
  FileText,
  Database,
  Monitor,
  MessageSquare,
  Heart,
  Star,
  Gift,
  ShoppingCart,
  Truck
} from 'lucide-react';
import { toast } from 'sonner';

interface ConfigField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'select' | 'switch' | 'color' | 'radio' | 'slider' | 'email' | 'url';
  value: any;
  placeholder?: string;
  description?: string;
  options?: { value: string; label: string; description?: string }[];
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

interface AddonConfig {
  id: string;
  name: string;
  type: 'free' | 'premium';
  category: string;
  description: string;
  fields: ConfigField[];
}

interface AddonConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  addonId: string;
  addonName: string;
  addonType: 'free' | 'premium';
}

// Enhanced configuration data with comprehensive settings for all addon types
const getAddonConfig = (addonId: string, addonName: string, addonType: 'free' | 'premium'): AddonConfig => {
  
  // Determine addon category and description
  let category = 'general';
  let description = `Configure ${addonName} settings to customize its behavior and appearance.`;
  
  if (addonName.toLowerCase().includes('cart') || addonName.toLowerCase().includes('checkout')) {
    category = 'ecommerce';
    description = 'Customize your shopping cart and checkout experience.';
  } else if (addonName.toLowerCase().includes('seo') || addonName.toLowerCase().includes('meta')) {
    category = 'seo';
    description = 'Optimize your store for search engines and improve visibility.';
  } else if (addonName.toLowerCase().includes('email') || addonName.toLowerCase().includes('notification')) {
    category = 'communication';
    description = 'Configure email notifications and customer communications.';
  } else if (addonName.toLowerCase().includes('security') || addonName.toLowerCase().includes('ssl')) {
    category = 'security';
    description = 'Enhance your store security and protect customer data.';
  } else if (addonName.toLowerCase().includes('report') || addonName.toLowerCase().includes('analytic')) {
    category = 'analytics';
    description = 'Track performance and gain insights into your store data.';
  } else if (addonName.toLowerCase().includes('design') || addonName.toLowerCase().includes('theme') || addonName.toLowerCase().includes('color')) {
    category = 'design';
    description = 'Customize the visual appearance and branding of your store.';
  }

  // Comprehensive base fields that every addon should have
  const baseFields: ConfigField[] = [
    {
      id: 'enabled',
      label: 'Enable Addon',
      type: 'switch',
      value: true,
      description: 'Turn this addon on or off for your store'
    },
    {
      id: 'display_priority',
      label: 'Display Priority',
      type: 'slider',
      value: 5,
      min: 1,
      max: 10,
      description: 'Higher priority items are displayed first (1 = lowest, 10 = highest)'
    }
  ];

  // Appearance settings for all addons
  const appearanceFields: ConfigField[] = [
    {
      id: 'primary_color',
      label: 'Primary Color',
      type: 'color',
      value: '#3b82f6',
      description: 'Main color used for buttons and highlights'
    },
    {
      id: 'text_color',
      label: 'Text Color',
      type: 'color',
      value: '#1f2937',
      description: 'Color for text elements'
    },
    {
      id: 'border_radius',
      label: 'Border Radius',
      type: 'slider',
      value: 8,
      min: 0,
      max: 20,
      unit: 'px',
      description: 'Roundness of corners (0 = square, 20 = very round)'
    },
    {
      id: 'animation_style',
      label: 'Animation Style',
      type: 'radio',
      value: 'smooth',
      options: [
        { value: 'none', label: 'No Animation', description: 'Static display without animations' },
        { value: 'smooth', label: 'Smooth Transitions', description: 'Gentle fade and slide effects' },
        { value: 'bouncy', label: 'Bouncy Effects', description: 'Playful bounce animations' },
        { value: 'instant', label: 'Instant Changes', description: 'Immediate state changes' }
      ],
      description: 'Choose how elements animate when they change'
    },
    {
      id: 'responsive_design',
      label: 'Responsive Design',
      type: 'switch',
      value: true,
      description: 'Automatically adapt layout for mobile devices'
    }
  ];

  // Feature configuration based on addon type
  const getFeatureFields = (): ConfigField[] => {
    const fields: ConfigField[] = [];

    // Cart and Checkout related
    if (category === 'ecommerce') {
      fields.push(
        {
          id: 'cart_threshold',
          label: 'Minimum Cart Amount',
          type: 'number',
          value: 50,
          placeholder: '50.00',
          unit: '$',
          description: 'Minimum cart value to activate features'
        },
        {
          id: 'checkout_style',
          label: 'Checkout Style',
          type: 'select',
          value: 'modern',
          options: [
            { value: 'classic', label: 'Classic Layout' },
            { value: 'modern', label: 'Modern Single Page' },
            { value: 'multi_step', label: 'Multi-Step Process' },
            { value: 'express', label: 'Express Checkout' }
          ],
          description: 'Choose the checkout flow style'
        },
        {
          id: 'progress_indicator',
          label: 'Show Progress Indicator',
          type: 'switch',
          value: true,
          description: 'Display checkout progress to customers'
        },
        {
          id: 'guest_checkout',
          label: 'Enable Guest Checkout',
          type: 'switch',
          value: true,
          description: 'Allow purchases without account creation'
        }
      );
    }

    // SEO related
    if (category === 'seo') {
      fields.push(
        {
          id: 'auto_meta_generation',
          label: 'Auto-Generate Meta Tags',
          type: 'switch',
          value: true,
          description: 'Automatically create meta descriptions for products'
        },
        {
          id: 'meta_description_length',
          label: 'Meta Description Length',
          type: 'slider',
          value: 155,
          min: 120,
          max: 320,
          unit: 'chars',
          description: 'Optimal length for search engine snippets'
        },
        {
          id: 'schema_markup',
          label: 'Schema Markup Type',
          type: 'select',
          value: 'product',
          options: [
            { value: 'product', label: 'Product Schema' },
            { value: 'organization', label: 'Organization Schema' },
            { value: 'local_business', label: 'Local Business Schema' },
            { value: 'review', label: 'Review Schema' }
          ],
          description: 'Type of structured data to include'
        }
      );
    }

    // Communication related
    if (category === 'communication') {
      fields.push(
        {
          id: 'email_frequency',
          label: 'Email Frequency',
          type: 'select',
          value: 'daily',
          options: [
            { value: 'immediate', label: 'Immediate' },
            { value: 'hourly', label: 'Every Hour' },
            { value: 'daily', label: 'Daily Digest' },
            { value: 'weekly', label: 'Weekly Summary' }
          ],
          description: 'How often to send notification emails'
        },
        {
          id: 'notification_types',
          label: 'Notification Types',
          type: 'radio',
          value: 'all',
          options: [
            { value: 'all', label: 'All Notifications', description: 'Send all available notifications' },
            { value: 'important', label: 'Important Only', description: 'Only critical notifications' },
            { value: 'custom', label: 'Custom Selection', description: 'Choose specific types' }
          ],
          description: 'Which types of notifications to send'
        }
      );
    }

    // Default functionality fields for all addons
    fields.push(
      {
        id: 'display_position',
        label: 'Display Position',
        type: 'select',
        value: 'auto',
        options: [
          { value: 'auto', label: 'Automatic (Recommended)' },
          { value: 'header', label: 'Header Area' },
          { value: 'content_top', label: 'Top of Content' },
          { value: 'content_bottom', label: 'Bottom of Content' },
          { value: 'sidebar', label: 'Sidebar' },
          { value: 'footer', label: 'Footer Area' }
        ],
        description: 'Where to display this addon on your pages'
      },
      {
        id: 'mobile_optimization',
        label: 'Mobile Optimization Level',
        type: 'slider',
        value: 8,
        min: 1,
        max: 10,
        description: 'How aggressively to optimize for mobile devices'
      }
    );

    return fields;
  };

  // Communication settings for all addons
  const communicationFields: ConfigField[] = [
    {
      id: 'admin_notifications',
      label: 'Admin Notifications',
      type: 'switch',
      value: true,
      description: 'Receive notifications about addon activity'
    },
    {
      id: 'notification_email',
      label: 'Notification Email',
      type: 'email',
      value: 'admin@yourstore.com',
      placeholder: 'admin@yourstore.com',
      description: 'Email address for admin notifications'
    },
    {
      id: 'customer_notifications',
      label: 'Customer Notifications',
      type: 'switch',
      value: false,
      description: 'Send notifications to customers about this addon'
    },
    {
      id: 'notification_template',
      label: 'Email Template Style',
      type: 'select',
      value: 'modern',
      options: [
        { value: 'classic', label: 'Classic Template' },
        { value: 'modern', label: 'Modern Template' },
        { value: 'minimal', label: 'Minimal Template' },
        { value: 'branded', label: 'Branded Template' }
      ],
      description: 'Visual style for notification emails'
    },
    {
      id: 'message_customization',
      label: 'Custom Message',
      type: 'textarea',
      value: 'Thank you for using our service!',
      placeholder: 'Enter your custom message...',
      description: 'Custom message to include in notifications'
    }
  ];

  // Advanced settings (premium features)
  const advancedFields: ConfigField[] = [
    {
      id: 'performance_mode',
      label: 'Performance Mode',
      type: 'radio',
      value: 'balanced',
      options: [
        { value: 'speed', label: 'Speed Optimized', description: 'Prioritize loading speed' },
        { value: 'balanced', label: 'Balanced', description: 'Balance between speed and features' },
        { value: 'features', label: 'Feature Rich', description: 'Enable all features' }
      ],
      description: 'Choose optimization strategy'
    },
    {
      id: 'caching_enabled',
      label: 'Enable Caching',
      type: 'switch',
      value: true,
      description: 'Cache data for better performance'
    },
    {
      id: 'cache_duration',
      label: 'Cache Duration',
      type: 'slider',
      value: 24,
      min: 1,
      max: 168,
      unit: 'hours',
      description: 'How long to keep cached data'
    },
    {
      id: 'debug_mode',
      label: 'Debug Mode',
      type: 'switch',
      value: false,
      description: 'Enable detailed logging for troubleshooting'
    },
    {
      id: 'api_integration',
      label: 'API Integration',
      type: 'switch',
      value: false,
      description: 'Enable third-party API connections'
    },
    {
      id: 'webhook_url',
      label: 'Webhook URL',
      type: 'url',
      value: '',
      placeholder: 'https://your-webhook-url.com/endpoint',
      description: 'URL for webhook notifications (optional)'
    },
    {
      id: 'custom_css',
      label: 'Custom CSS',
      type: 'textarea',
      value: '/* Add your custom CSS here */\n.my-addon {\n  /* Your styles */\n}',
      placeholder: '/* Custom CSS styles */\n.my-custom-style {\n  color: #333;\n}',
      description: 'Add custom CSS for advanced styling'
    }
  ];

  return {
    id: addonId,
    name: addonName,
    type: addonType,
    category,
    description,
    fields: [
      ...baseFields,
      ...appearanceFields,
      ...getFeatureFields(),
      ...communicationFields,
      ...(addonType === 'premium' ? advancedFields : [])
    ]
  };
};

export function AddonConfigModal({ isOpen, onClose, addonId, addonName, addonType }: AddonConfigModalProps) {
  const [config, setConfig] = useState<AddonConfig>(() => 
    getAddonConfig(addonId, addonName, addonType)
  );
  const [activeTab, setActiveTab] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);

  const updateField = (fieldId: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      fields: prev.fields.map(field => 
        field.id === fieldId ? { ...field, value } : field
      )
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    toast.success(`${addonName} configuration saved successfully!`);
    setHasChanges(false);
    onClose();
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        setHasChanges(false);
        onClose();
      }
    } else {
      onClose();
    }
  };

  const renderField = (field: ConfigField) => {
    const commonClassName = "mt-2";
    
    switch (field.type) {
      case 'text':
        return (
          <Input
            type="text"
            value={field.value || ''}
            onChange={(e) => updateField(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={commonClassName}
          />
        );
      
      case 'email':
        return (
          <Input
            type="email"
            value={field.value || ''}
            onChange={(e) => updateField(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={commonClassName}
          />
        );
      
      case 'url':
        return (
          <Input
            type="url"
            value={field.value || ''}
            onChange={(e) => updateField(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={commonClassName}
          />
        );
      
      case 'number':
        return (
          <div className="flex items-center gap-2 mt-2">
            <Input
              type="number"
              value={field.value || ''}
              onChange={(e) => updateField(field.id, parseInt(e.target.value) || 0)}
              placeholder={field.placeholder}
              className="flex-1"
              min={field.min}
              max={field.max}
            />
            {field.unit && (
              <Badge variant="secondary" className="px-2 py-1 text-xs">
                {field.unit}
              </Badge>
            )}
          </div>
        );
      
      case 'textarea':
        return (
          <Textarea
            value={field.value || ''}
            onChange={(e) => updateField(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={`${commonClassName} min-h-[120px] font-mono text-sm`}
            rows={6}
          />
        );
      
      case 'select':
        return (
          <Select value={field.value} onValueChange={(value) => updateField(field.id, value)}>
            <SelectTrigger className={commonClassName}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div>
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'radio':
        return (
          <RadioGroup 
            value={field.value} 
            onValueChange={(value) => updateField(field.id, value)}
            className="mt-3"
          >
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  <div className="font-medium">{option.label}</div>
                  {option.description && (
                    <div className="text-sm text-muted-foreground mt-1">{option.description}</div>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'switch':
        return (
          <div className="flex items-center justify-between p-3 rounded-lg border bg-card mt-2">
            <div className="flex items-center space-x-3">
              <Switch
                checked={field.value}
                onCheckedChange={(checked) => updateField(field.id, checked)}
              />
              <div>
                <span className="text-sm font-medium">
                  {field.value ? 'Enabled' : 'Disabled'}
                </span>
                <div className="text-xs text-muted-foreground">
                  {field.value ? 'Feature is active' : 'Feature is inactive'}
                </div>
              </div>
            </div>
            <Badge variant={field.value ? 'default' : 'secondary'}>
              {field.value ? 'ON' : 'OFF'}
            </Badge>
          </div>
        );
      
      case 'slider':
        return (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {field.min}{field.unit}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{field.value}</span>
                {field.unit && (
                  <Badge variant="outline" className="text-xs">
                    {field.unit}
                  </Badge>
                )}
              </div>
              <span className="text-sm text-muted-foreground">
                {field.max}{field.unit}
              </span>
            </div>
            <Slider
              value={[field.value]}
              onValueChange={(values) => updateField(field.id, values[0])}
              min={field.min}
              max={field.max}
              step={field.step || 1}
              className="flex-1"
            />
          </div>
        );
      
      case 'color':
        return (
          <div className="flex items-center gap-3 mt-2">
            <div className="relative">
              <Input
                type="color"
                value={field.value}
                onChange={(e) => updateField(field.id, e.target.value)}
                className="w-16 h-12 p-1 border rounded-md cursor-pointer"
              />
            </div>
            <Input
              type="text"
              value={field.value}
              onChange={(e) => updateField(field.id, e.target.value)}
              className="flex-1 font-mono"
              placeholder="#3b82f6"
            />
            <div 
              className="w-8 h-8 rounded-md border shadow-sm"
              style={{ backgroundColor: field.value }}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  // Organize fields by tabs
  const fieldsByTab = {
    general: config.fields.filter(field => 
      field.id === 'enabled' || 
      field.id === 'display_priority' || 
      field.id === 'display_position' ||
      field.id === 'mobile_optimization' ||
      field.id.includes('threshold') ||
      field.id.includes('style') ||
      field.id.includes('mode')
    ),
    appearance: config.fields.filter(field => 
      field.id.includes('color') || 
      field.id.includes('border') || 
      field.id.includes('animation') || 
      field.id.includes('responsive') ||
      field.id.includes('template')
    ),
    features: config.fields.filter(field => 
      field.id.includes('checkout') ||
      field.id.includes('guest') ||
      field.id.includes('progress') ||
      field.id.includes('meta') ||
      field.id.includes('schema') ||
      field.id.includes('frequency') ||
      field.id.includes('types')
    ),
    communication: config.fields.filter(field => 
      field.id.includes('notification') || 
      field.id.includes('email') || 
      field.id.includes('message') ||
      field.id.includes('template')
    ),
    advanced: config.fields.filter(field => 
      field.id.includes('performance') ||
      field.id.includes('caching') ||
      field.id.includes('cache') ||
      field.id.includes('debug') ||
      field.id.includes('api') ||
      field.id.includes('webhook') ||
      field.id.includes('css')
    )
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'general': return <Settings className="w-4 h-4" />;
      case 'appearance': return <Palette className="w-4 h-4" />;
      case 'features': return <Wrench className="w-4 h-4" />;
      case 'communication': return <Mail className="w-4 h-4" />;
      case 'advanced': return <Zap className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getTabDescription = (tab: string) => {
    switch (tab) {
      case 'general': return 'Basic settings and core functionality options';
      case 'appearance': return 'Visual styling, colors, and design preferences';
      case 'features': return 'Feature-specific settings and behavior options';
      case 'communication': return 'Email notifications and customer messaging';
      case 'advanced': return 'Advanced settings for power users and developers';
      default: return '';
    }
  };

  const renderFieldSection = (fields: ConfigField[], title: string, emptyMessage: string, emptyIcon: any) => {
    if (fields.length === 0) {
      const EmptyIcon = emptyIcon;
      return (
        <Card className="border-dashed border-2">
          <CardContent className="pt-8 pb-8 text-center">
            <EmptyIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <CardTitle className="text-lg mb-2 text-muted-foreground">{emptyMessage}</CardTitle>
            <CardDescription>
              This addon doesn't have specific settings in this category.
            </CardDescription>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            {getTabIcon(activeTab)}
            {title}
          </CardTitle>
          <CardDescription>{getTabDescription(activeTab)}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id}>
              <div className="space-y-2">
                <Label htmlFor={field.id} className="flex items-center gap-2 text-sm font-medium">
                  {field.label}
                  {field.required && <span className="text-destructive text-xs">*</span>}
                </Label>
                {renderField(field)}
                {field.description && (
                  <div className="flex items-start gap-2 mt-2 p-2 rounded-md bg-muted/50">
                    <AlertCircle className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {field.description}
                    </p>
                  </div>
                )}
              </div>
              {index < fields.length - 1 && <Separator className="mt-6" />}
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">Configure {addonName}</span>
                <Badge 
                  variant={addonType === 'premium' ? 'default' : 'secondary'} 
                  className={addonType === 'premium' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''}
                >
                  {addonType === 'premium' ? (
                    <>
                      <Zap className="w-3 h-3 mr-1" />
                      Premium
                    </>
                  ) : (
                    'Free'
                  )}
                </Badge>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription className="text-base">
            {config.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-hide">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-5 mb-4 bg-muted/30">
              <TabsTrigger value="general" className="flex items-center gap-2 text-xs font-medium">
                {getTabIcon('general')}
                <span className="hide sm:inline">General</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2 text-xs font-medium">
                {getTabIcon('appearance')}
                <span className="hide sm:inline">Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="features" className="flex items-center gap-2 text-xs font-medium">
                {getTabIcon('features')}
                <span className="hide sm:inline">Features</span>
              </TabsTrigger>
              <TabsTrigger value="communication" className="flex items-center gap-2 text-xs font-medium">
                {getTabIcon('communication')}
                <span className="hide sm:inline">Messages</span>
              </TabsTrigger>
              <TabsTrigger 
                value="advanced" 
                className="flex items-center gap-2 text-xs font-medium"
                disabled={addonType !== 'premium'}
              >
                {getTabIcon('advanced')}
                <span className="hide sm:inline">Advanced</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto pr-2">
              <TabsContent value="general" className="mt-0 h-full">
                {renderFieldSection(
                  fieldsByTab.general, 
                  'General Settings',
                  'No General Settings',
                  Settings
                )}
              </TabsContent>

              <TabsContent value="appearance" className="mt-0 h-full">
                {renderFieldSection(
                  fieldsByTab.appearance, 
                  'Appearance & Design',
                  'No Appearance Settings',
                  Palette
                )}
              </TabsContent>

              <TabsContent value="features" className="mt-0 h-full">
                {renderFieldSection(
                  fieldsByTab.features, 
                  'Feature Configuration',
                  'No Feature Settings',
                  Wrench
                )}
              </TabsContent>

              <TabsContent value="communication" className="mt-0 h-full">
                {renderFieldSection(
                  fieldsByTab.communication, 
                  'Communication Settings',
                  'No Communication Settings',
                  Mail
                )}
              </TabsContent>

              <TabsContent value="advanced" className="mt-0 h-full">
                {addonType === 'premium' ? (
                  renderFieldSection(
                    fieldsByTab.advanced, 
                    'Advanced Settings',
                    'No Advanced Settings',
                    Zap
                  )
                ) : (
                  <Card className="border-dashed border-2">
                    <CardContent className="pt-12 pb-12 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl mb-3">Premium Features</CardTitle>
                      <CardDescription className="text-base mb-6 max-w-md mx-auto">
                        Advanced settings and customization options are available with the premium version of this addon.
                      </CardDescription>
                      <Button 
                        size="lg"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Upgrade to Premium
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <DialogFooter className="pt-4 border-t flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {hasChanges && (
              <>
                <AlertCircle className="w-4 h-4" />
                <span>You have unsaved changes</span>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              disabled={!hasChanges}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}