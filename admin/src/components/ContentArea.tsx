import { AddonCard } from "./AddonCard";
import { ContentHeader } from "./ContentHeader";
import { AnimatedCounter } from "./AnimatedCounter";
import { SmartRecommendations } from "./SmartRecommendations";
import { CustomDevelopmentPortal } from "./CustomDevelopmentPortal";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Bell, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  AlertTriangle, 
  Shield, 
  Zap, 
  TrendingUp,
  Clock,
  Star,
  Download,
  RefreshCw
} from "lucide-react";

interface Addon {
  id: string;
  name: string;
  description: string;
  type: 'free' | 'premium';
  enabled: boolean;
}

interface ContentAreaProps {
  activeTab: string;
  addons: Record<string, Addon[]>;
  filter: 'all' | 'free' | 'premium';
  dashboardVisitCount: number;
  onFilterChange: (filter: 'all' | 'free' | 'premium') => void;
  onToggleAddon: (tabId: string, addonId: string) => void;
  onConfigureAddon: (tabId: string, addonId: string) => void;
  onOpenSidebar?: () => void;
  onTabChange?: (tab: string) => void;
}

const tabTitles: Record<string, string> = {
  'dashboard': 'Dashboard Overview',
  'product-addons': 'Product Addons',
  'general-addons': 'General Addons',
  'cart-checkout-addons': 'Cart & Checkout Addons',
  'shipping-payment': 'Shipping & Payment Addons',
  'marketing-sales': 'Marketing & Sales Addons',
  'seo-performance': 'SEO & Performance',
  'customer-management': 'Customer Management',
  'inventory-management': 'Inventory Management',
  'security-compliance': 'Security & Compliance',
  'integrations-api': 'Integrations & API',
  'content-design': 'Content & Design',
  'mobile-apps': 'Mobile & Apps',
  'automation-workflows': 'Automation & Workflows',
  'reports-analytics': 'Reports & Analytics',
  'free-addons': 'Free Addons',
  'custom-requests': 'Custom Development Portal',
  'license-updates': 'License & Updates',
  'help-docs': 'Help & Documentation'
};

const tabDescriptions: Record<string, string> = {
  'dashboard': 'Monitor your WooCommerce store performance and addon status',
  'product-addons': 'Enhance your products with additional features and customization options',
  'general-addons': 'Improve your general store visibility and user experience with general addons.',
  'cart-checkout': 'Improve the shopping cart and checkout experience for your customers',
  'shipping-payment': 'Manage shipping methods and payment gateway integrations',
  'marketing-sales': 'Boost your sales with marketing tools and promotional features',
  'seo-performance': 'Optimize your store for search engines and improve performance',
  'customer-management': 'Manage customer relationships and enhance user experience',
  'inventory-management': 'Track and manage your product inventory efficiently',
  'security-compliance': 'Ensure your store is secure and compliant with regulations',
  'integrations-api': 'Connect your store with external services and APIs',
  'content-design': 'Customize your store design and manage content',
  'mobile-apps': 'Optimize your store for mobile devices and create apps',
  'automation-workflows': 'Automate repetitive tasks and create efficient workflows',
  'reports-analytics': 'Get insights into your store performance with detailed analytics',
  'free-addons': 'Explore our collection of free addons to extend functionality',
  'custom-requests': 'Submit requests for custom addons, modifications, and integrations',
  'license-updates': 'Manage your SpeedPress license and keep addons updated',
  'help-docs': 'Access documentation, support, and helpful resources'
};

export function ContentArea({ activeTab, addons, filter, dashboardVisitCount, onFilterChange, onToggleAddon, onConfigureAddon, onOpenSidebar, onTabChange }: ContentAreaProps) {
  const allAddons = addons[activeTab] || [];
  const currentAddons = filter === 'all' ? allAddons : allAddons.filter(addon => addon.type === filter);
  const title = tabTitles[activeTab] || 'Unknown Section';
  const description = tabDescriptions[activeTab] || '';

  // Check if this tab should show filter controls (exclude dashboard, help-docs, license-updates, custom-requests)
  const showFilters = !['dashboard', 'help-docs', 'license-updates', 'custom-requests'].includes(activeTab);

  const handleAddonSelect = (category: string, addonId: string) => {
    // Navigate to the category and highlight the addon
    if (onTabChange) {
      onTabChange(category);
    }
  };

  // Special handling for dashboard
  if (activeTab === 'dashboard') {
    const allAddons = Object.values(addons).flat();
    const enabledCount = allAddons.filter(addon => addon.enabled).length;
    const totalCount = allAddons.length;
    const premiumCount = allAddons.filter(addon => addon.type === 'premium').length;
    const freeCount = allAddons.filter(addon => addon.type === 'free').length;

    return (
      <div className="h-full flex flex-col">
        <ContentHeader 
          activeTab={activeTab} 
          addons={addons}
          onOpenSidebar={onOpenSidebar} 
          onAddonSelect={handleAddonSelect}
        />
        <div className="flex-1 p-3 md:p-6 lg:p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-xl md:text-2xl font-semibold mb-2">{title}</h1>
              <p className="text-sm md:text-base text-muted-foreground">{description}</p>
            </div>

            {/* Smart Recommendations */}
            <SmartRecommendations 
              addons={addons}
              onEnableAddon={onToggleAddon}
              onTabChange={onTabChange}
            />

            {/* Welcome Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 rounded-lg md:rounded-xl p-4 md:p-8 text-white mb-6 md:mb-8">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
                <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white rounded-full"></div>
              </div>
              
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{color:"white",fontSize:"1.6rem"}}>Welcome to SpeedPress!</h2>
                    <p className="text-blue-50 text-base md:text-lg max-w-2xl leading-relaxed" style={{fontSize:"1.1rem"}}>
                      The ultimate WooCommerce enhancement suite that transforms your online store with powerful addons, 
                      improved performance, and enhanced customer experience.
                    </p>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 text-center">
                      <div className="text-lg md:text-2xl font-bold mb-1">
                        <AnimatedCounter 
                          from={45000}
                          to={50000 + (dashboardVisitCount * 150)}
                          suffix="+"
                          duration={2000}
                          className="text-lg md:text-2xl font-bold"
                        />
                      </div>
                      <div className="text-xs text-blue-100 uppercase tracking-wide">Active Users</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Star className="w-4 md:w-5 h-4 md:h-5 fill-current text-yellow-300" />
                        <AnimatedCounter 
                          from={4.5}
                          to={4.9 + (dashboardVisitCount * 0.01)}
                          decimals={1}
                          duration={2000}
                          className="text-lg md:text-2xl font-bold"
                        />
                      </div>
                      <div className="text-xs text-blue-100 uppercase tracking-wide">User Rating</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 text-center">
                      <div className="text-lg md:text-2xl font-bold mb-1">
                        <AnimatedCounter 
                          from={95.0}
                          to={99.9 + (dashboardVisitCount * 0.02)}
                          suffix="%"
                          decimals={1}
                          duration={2000}
                          className="text-lg md:text-2xl font-bold"
                        />
                      </div>
                      <div className="text-xs text-blue-100 uppercase tracking-wide">Uptime</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 text-center">
                      <div className="text-lg md:text-2xl font-bold mb-1">
                        <AnimatedCounter 
                          from={totalCount - 10}
                          to={totalCount + dashboardVisitCount}
                          duration={2000}
                          className="text-lg md:text-2xl font-bold"
                        />
                      </div>
                      <div className="text-xs text-blue-100 uppercase tracking-wide">Total Addons</div>
                    </div>
                  </div>
                </div>
                
                {/* Logo Section */}
                <div className="hide lg:block">
                  <div className="w-32 h-32 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                    <div className="w-20 h-20 speedpress-gradient rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-white">SP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div id="dashboard-stats" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              <div className="dashboard-stat-card bg-card border border-border rounded-lg p-4 md:p-6 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xl md:text-2xl font-semibold text-blue-600">
                    <AnimatedCounter 
                      from={enabledCount - 5}
                      to={enabledCount + dashboardVisitCount}
                      duration={1500}
                      className="text-xl md:text-2xl font-semibold text-blue-600"
                    />
                    /
                    <AnimatedCounter 
                      from={totalCount - 10}
                      to={totalCount + dashboardVisitCount}
                      duration={1500}
                      className="text-xl md:text-2xl font-semibold text-blue-600"
                    />
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">Active Addons</div>
              </div>
              <div className="dashboard-stat-card bg-card border border-border rounded-lg p-4 md:p-6 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <AnimatedCounter 
                    from={premiumCount - 5}
                    to={premiumCount + dashboardVisitCount}
                    duration={1500}
                    className="text-xl md:text-2xl font-semibold text-purple-600"
                  />
                  <Star className="w-5 h-5 text-purple-500 fill-current" />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">Premium Addons</div>
              </div>
              <div className="dashboard-stat-card bg-card border border-border rounded-lg p-4 md:p-6 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <AnimatedCounter 
                    from={freeCount - 3}
                    to={freeCount + Math.floor(dashboardVisitCount * 0.5)}
                    duration={1500}
                    className="text-xl md:text-2xl font-semibold text-green-600"
                  />
                  <Info className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">Free Addons</div>
              </div>
              <div className="dashboard-stat-card bg-card border border-border rounded-lg p-4 md:p-6 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <AnimatedCounter 
                    from={92.0}
                    to={98.5 + (dashboardVisitCount * 0.1)}
                    suffix="%"
                    decimals={1}
                    duration={1500}
                    className="text-xl md:text-2xl font-semibold text-orange-600"
                  />
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">Performance Score</div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 mb-8">
              {/* Key Features */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2" style={{display:"flex"}}>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Key Features
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium">Enhanced Product Management</div>
                      <div className="text-xs text-muted-foreground">Bundles, custom tabs, badges, and quick view modals</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium">Optimized Checkout Experience</div>
                      <div className="text-xs text-muted-foreground">Cart recovery, one-click checkout, custom fields</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium">Advanced Marketing Tools</div>
                      <div className="text-xs text-muted-foreground">Flash sales, social proof, cross-sell automation</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium">Comprehensive Analytics</div>
                      <div className="text-xs text-muted-foreground">Sales reports, customer behavior tracking</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Status */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2" style={{display:"flex"}}>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  System Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-sm">WordPress Version</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">6.4.2 ✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-sm">WooCommerce Version</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">8.5.1 ✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-sm">PHP Version</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">8.2.0 ✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-sm">Database Status</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">Optimized ✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-blue-500" />
                      <span className="text-sm">License Status</span>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-100">Active ✓</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h3 className="font-medium mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600">📊</span>
                  </div>
                  <span className="text-sm font-medium">View Reports</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-colors">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600">⚙️</span>
                  </div>
                  <span className="text-sm font-medium">Settings</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-colors">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600">🔄</span>
                  </div>
                  <span className="text-sm font-medium">Check Updates</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-colors">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600">📖</span>
                  </div>
                  <span className="text-sm font-medium">Documentation</span>
                </button>
              </div>
            </div>

            {/* Performance Analytics */}
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h3 className="font-medium mb-6 flex items-center gap-2" style={{display:"flex"}}>
                <TrendingUp className="w-4 h-4 text-orange-500" />
                Performance Analytics (Last 7 Days)
                <div className="relative ml-2">
                  <Bell className="w-4 h-4 text-blue-500" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Zap className="w-4 h-4 text-green-600" />
                    <AnimatedCounter 
                      from={2.0}
                      to={1.2 - (dashboardVisitCount * 0.05)}
                      suffix="s"
                      decimals={1}
                      duration={1800}
                      className="text-2xl font-semibold text-green-600"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">Avg Page Load</div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    ↓ 0.3s faster
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <AnimatedCounter 
                      from={80}
                      to={94 + dashboardVisitCount}
                      duration={1800}
                      className="text-2xl font-semibold text-blue-600"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">Google PageSpeed</div>
                  <div className="text-xs text-blue-600 flex items-center justify-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    ↑ +12 points
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <AnimatedCounter 
                      from={2.0}
                      to={2.8 + (dashboardVisitCount * 0.1)}
                      suffix="%"
                      decimals={1}
                      duration={1800}
                      className="text-2xl font-semibold text-purple-600"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">Conversion Rate</div>
                  <div className="text-xs text-purple-600 flex items-center justify-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    ↑ +0.4%
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 text-orange-600 fill-current" />
                    <AnimatedCounter 
                      from={100}
                      to={127 + (dashboardVisitCount * 5)}
                      prefix="$"
                      duration={1800}
                      className="text-2xl font-semibold text-orange-600"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">Avg Order Value</div>
                  <div className="text-xs text-orange-600 flex items-center justify-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    ↑ +$23
                  </div>
                </div>
              </div>
            </div>

            {/* Store Health & Security */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Store Health Monitor */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2" style={{display:"flex"}}>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Store Health Monitor
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-sm">Database Optimization</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">Optimized</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-sm">Cache Performance</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-3 h-3 text-yellow-500 animate-spin" />
                      <span className="text-sm">Image Compression</span>
                    </div>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded dark:bg-yellow-900 dark:text-yellow-100">Running</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-sm">Broken Links</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">0 Found</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-green-500" />
                      <span className="text-sm">SSL Certificate</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">Valid</span>
                  </div>
                </div>
              </div>

              {/* Security Status */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2" style={{display:"flex"}}>
                  <Shield className="w-4 h-4 text-blue-500" />
                  Security Status
                  <div className="relative ml-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  </div>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-green-500" />
                      <span className="text-sm">Firewall Protection</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-sm">Malware Scan</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">Clean</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-yellow-500" />
                      <span className="text-sm">Login Attempts</span>
                    </div>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded dark:bg-yellow-900 dark:text-yellow-100">3 Blocked</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-green-500" />
                      <span className="text-sm">Last Backup</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Download className="w-3 h-3 text-blue-500" />
                      <span className="text-sm">Plugin Updates</span>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-100">Up to date</span>
                  </div>
                </div>
              </div>

              {/* SEO Overview */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2" style={{display:"flex"}}>
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  SEO Overview
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SEO Score</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">89/100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Meta Descriptions</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">Complete</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Schema Markup</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sitemap Status</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">Updated</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mobile Friendly</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">Yes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Optimization Recommendations */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-lg p-6 mb-8 dark:from-amber-950/20 dark:to-orange-950/20 dark:border-orange-800">
              <h3 className="font-medium mb-4 flex items-center gap-2 text-amber-800 dark:text-amber-200" style={{display:"flex"}}>
                <AlertCircle className="w-4 h-4 text-amber-500" />
                Optimization Recommendations
                <div className="relative ml-2">
                  <Bell className="w-4 h-4 text-orange-500" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-semibold text-white">4</span>
                  </div>
                </div>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/60 dark:bg-black/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="text-blue-600 w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-amber-900 dark:text-amber-100">Enable Product Image Lazy Loading</div>
                        <Info className="w-3 h-3 text-blue-500" />
                      </div>
                      <div className="text-xs text-amber-700 dark:text-amber-300 mt-1">Could improve page load speed by 15-20%</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/60 dark:bg-black/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <TrendingUp className="text-green-600 w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-amber-900 dark:text-amber-100">Configure Smart Cross-Sell</div>
                        <AlertCircle className="w-3 h-3 text-yellow-500" />
                      </div>
                      <div className="text-xs text-amber-700 dark:text-amber-300 mt-1">Potential 12% increase in average order value</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/60 dark:bg-black/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bell className="text-purple-600 w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-amber-900 dark:text-amber-100">Set Up Abandoned Cart Recovery</div>
                        <AlertTriangle className="w-3 h-3 text-red-500" />
                      </div>
                      <div className="text-xs text-amber-700 dark:text-amber-300 mt-1">Recover up to 25% of abandoned carts</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/60 dark:bg-black/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertCircle className="text-orange-600 w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-amber-900 dark:text-amber-100">Optimize Database Tables</div>
                        <AlertTriangle className="w-3 h-3 text-orange-500" />
                      </div>
                      <div className="text-xs text-amber-700 dark:text-amber-300 mt-1">Found 2.3MB of data to clean up</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* News & Updates */}
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h3 className="font-medium mb-4 flex items-center gap-2" style={{display:"flex"}}>
                <Info className="w-4 h-4 text-indigo-500" />
                What's New in SpeedPress
                <div className="relative ml-2">
                  <Bell className="w-4 h-4 text-indigo-500" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                </div>
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-2">
                    <Download className="w-3 h-3 text-blue-500" />
                    <div className="text-sm font-medium">Version 2.1.4 Released</div>
                    <div className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-100">NEW</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    New features: Advanced product filtering, improved checkout flow, and enhanced analytics dashboard.
                  </div>
                  <div className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Released 3 days ago
                  </div>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-3 h-3 text-green-500 fill-current" />
                    <div className="text-sm font-medium">Black Friday Sale Campaign Tools</div>
                    <div className="bg-green-100 text-green-800 text-[10px] px-2 py-0.5 rounded-full dark:bg-green-900 dark:text-green-100">FEATURED</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Special seasonal addons and templates now available for holiday promotions.
                  </div>
                  <div className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    1 week ago
                  </div>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-purple-500" />
                    <div className="text-sm font-medium">WooCommerce 8.5 Compatibility</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    All SpeedPress addons now fully compatible with the latest WooCommerce version.
                  </div>
                  <div className="text-xs text-purple-600 mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    2 weeks ago
                  </div>
                </div>
              </div>
            </div>

            {/* Support & Resources */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Support Center */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2" style={{display:"flex"}}>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Support Center
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-xs">💬</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Live Chat Support</div>
                      <div className="text-xs text-muted-foreground">Get instant help from our experts</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-xs">📚</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Knowledge Base</div>
                      <div className="text-xs text-muted-foreground">Browse our comprehensive guides</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 text-xs">🎬</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Video Tutorials</div>
                      <div className="text-xs text-muted-foreground">Watch step-by-step instructions</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 text-xs">🐛</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Report Bug</div>
                      <div className="text-xs text-muted-foreground">Help us improve SpeedPress</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Migration Tools */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2" style={{display:"flex"}}>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  Migration & Tools
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                    <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                      <span className="text-cyan-600 text-xs">📤</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Export Settings</div>
                      <div className="text-xs text-muted-foreground">Backup your SpeedPress configuration</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-600 text-xs">📥</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Import Settings</div>
                      <div className="text-xs text-muted-foreground">Restore from backup or transfer sites</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-600 text-xs">🔄</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Reset to Defaults</div>
                      <div className="text-xs text-muted-foreground">Start fresh with clean settings</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <span className="text-amber-600 text-xs">🔧</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">System Diagnostics</div>
                      <div className="text-xs text-muted-foreground">Run comprehensive health check</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Two Column Layout - Recent Activity and Featured Addons */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2" style={{display:"flex"}}>
                  <Clock className="w-4 h-4 text-blue-500" />
                  Recent Activity
                  <div className="relative ml-2">
                    <Bell className="w-4 h-4 text-green-500" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-sm">Cart Abandonment Recovery enabled</span>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      2 hours ago
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Download className="w-3 h-3 text-blue-500" />
                      <span className="text-sm">Product Bundle addon updated to v1.2.3</span>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      1 day ago
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-purple-500" />
                      <span className="text-sm">Advanced Search configured</span>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      3 days ago
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-orange-500" />
                      <span className="text-sm">Flash Sales Timer activated</span>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      5 days ago
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-sm">Performance optimization completed</span>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      1 week ago
                    </span>
                  </div>
                </div>
              </div>

              {/* Featured Addons */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4" style={{display:"flex"}}>Featured Addons</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">🛒</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Cart Abandonment Recovery</div>
                      <div className="text-xs text-muted-foreground">Recover lost sales automatically</div>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-100">Premium</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">📦</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Product Bundles</div>
                      <div className="text-xs text-muted-foreground">Increase average order value</div>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-100">Premium</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">⚡</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Flash Sales Timer</div>
                      <div className="text-xs text-muted-foreground">Create urgency with countdowns</div>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-100">Premium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Special handling for help-docs
  if (activeTab === 'help-docs') {
    return (
      <div className="h-full flex flex-col">
        <ContentHeader 
          activeTab={activeTab} 
          addons={addons}
          onOpenSidebar={onOpenSidebar} 
          onAddonSelect={handleAddonSelect}
        />
        <div className="flex-1 p-3 md:p-6 lg:p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold mb-2">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>

            {/* Search Bar */}
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h3 className="font-medium mb-4">Search Documentation</h3>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="Search for guides, tutorials, troubleshooting..."
                  className="flex-1 px-4 py-3 bg-input-background border border-border rounded-lg text-sm"
                />
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-colors text-sm">
                  Search
                </button>
              </div>
              <div className="flex gap-2 mt-3">
                <span className="text-xs text-muted-foreground">Popular searches:</span>
                <button className="text-xs text-blue-600 hover:underline">Setup Guide</button>
                <button className="text-xs text-blue-600 hover:underline">Cart Recovery</button>
                <button className="text-xs text-blue-600 hover:underline">Product Bundles</button>
                <button className="text-xs text-blue-600 hover:underline">API Integration</button>
              </div>
            </div>

            {/* Quick Start Guide */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8 dark:from-blue-950/20 dark:to-indigo-950/20 dark:border-blue-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-lg">🚀</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Quick Start Guide</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                    New to SpeedPress? Follow our step-by-step guide to get your WooCommerce store optimized in minutes.
                  </p>
                  <div className="flex gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                      Start Setup Guide
                    </button>
                    <button className="bg-white/80 hover:bg-white text-blue-800 px-4 py-2 rounded-lg text-sm transition-colors">
                      Watch Video Tutorial
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Documentation Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Installation & Setup */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600">⚙️</span>
                  </div>
                  <h3 className="font-medium">Installation & Setup</h3>
                </div>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Installing SpeedPress Plugin</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">License Activation Guide</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Initial Configuration</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">System Requirements</button>
                </div>
                <button className="text-xs text-muted-foreground hover:text-foreground mt-3">View all articles →</button>
              </div>

              {/* Product Features */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600">📦</span>
                  </div>
                  <h3 className="font-medium">Product Features</h3>
                </div>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Product Bundles Setup</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Custom Product Tabs</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Product Badges Configuration</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Quick View Modal</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Advanced Search Options</button>
                </div>
                <button className="text-xs text-muted-foreground hover:text-foreground mt-3">View all articles →</button>
              </div>

              {/* Cart & Checkout */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600">🛒</span>
                  </div>
                  <h3 className="font-medium">Cart & Checkout</h3>
                </div>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Cart Abandonment Recovery</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">One-Click Checkout Setup</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Custom Checkout Fields</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Sliding Cart Drawer</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Payment Gateway Integration</button>
                </div>
                <button className="text-xs text-muted-foreground hover:text-foreground mt-3">View all articles →</button>
              </div>

              {/* Marketing Tools */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-red-600">📈</span>
                  </div>
                  <h3 className="font-medium">Marketing Tools</h3>
                </div>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Flash Sales Timer</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Social Proof Notifications</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Cross-Sell Configuration</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Wishlist Setup</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Email Marketing Integration</button>
                </div>
                <button className="text-xs text-muted-foreground hover:text-foreground mt-3">View all articles →</button>
              </div>

              {/* Analytics & Reports */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600">📊</span>
                  </div>
                  <h3 className="font-medium">Analytics & Reports</h3>
                </div>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Sales Reports Dashboard</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Customer Behavior Analytics</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Performance Monitoring</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Custom Report Creation</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Data Export Options</button>
                </div>
                <button className="text-xs text-muted-foreground hover:text-foreground mt-3">View all articles →</button>
              </div>

              {/* Troubleshooting */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-600">🔧</span>
                  </div>
                  <h3 className="font-medium">Troubleshooting</h3>
                </div>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Common Issues & Solutions</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Plugin Conflicts</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Performance Issues</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Database Optimization</button>
                  <button className="w-full text-left text-sm text-blue-600 hover:underline py-1">Debug Mode Guide</button>
                </div>
                <button className="text-xs text-muted-foreground hover:text-foreground mt-3">View all articles →</button>
              </div>
            </div>

            {/* Video Tutorials & FAQ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Video Tutorials */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2" style={{display:"flex"}}>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Video Tutorials
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="w-16 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 text-xs">▶️</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Getting Started with SpeedPress</div>
                      <div className="text-xs text-muted-foreground">Complete setup guide • 8:42</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="w-16 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 text-xs">▶️</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Setting Up Cart Recovery</div>
                      <div className="text-xs text-muted-foreground">Email templates & automation • 12:15</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="w-16 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 text-xs">▶️</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Creating Product Bundles</div>
                      <div className="text-xs text-muted-foreground">Boost sales with bundles • 9:23</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="w-16 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 text-xs">▶️</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Performance Optimization</div>
                      <div className="text-xs text-muted-foreground">Speed up your store • 15:30</div>
                    </div>
                  </div>
                  <button className="w-full text-center text-sm text-blue-600 hover:underline py-2">
                    View All Video Tutorials
                  </button>
                </div>
              </div>

              {/* Frequently Asked Questions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2" style={{display:"flex"}}>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div className="border-b border-border pb-3">
                    <button className="w-full text-left">
                      <div className="text-sm font-medium mb-1">How do I activate my license?</div>
                      <div className="text-xs text-muted-foreground">Go to License & Updates tab and enter your license key...</div>
                    </button>
                  </div>
                  <div className="border-b border-border pb-3">
                    <button className="w-full text-left">
                      <div className="text-sm font-medium mb-1">Can I use SpeedPress on multiple sites?</div>
                      <div className="text-xs text-muted-foreground">Yes, depending on your license plan. Professional allows...</div>
                    </button>
                  </div>
                  <div className="border-b border-border pb-3">
                    <button className="w-full text-left">
                      <div className="text-sm font-medium mb-1">How do I set up cart abandonment emails?</div>
                      <div className="text-xs text-muted-foreground">Navigate to Cart & Checkout addons and enable...</div>
                    </button>
                  </div>
                  <div className="border-b border-border pb-3">
                    <button className="w-full text-left">
                      <div className="text-sm font-medium mb-1">Is SpeedPress compatible with my theme?</div>
                      <div className="text-xs text-muted-foreground">SpeedPress is designed to work with most themes...</div>
                    </button>
                  </div>
                  <div className="pb-3">
                    <button className="w-full text-left">
                      <div className="text-sm font-medium mb-1">How do I get support?</div>
                      <div className="text-xs text-muted-foreground">Premium users get priority email and live chat support...</div>
                    </button>
                  </div>
                  <button className="w-full text-center text-sm text-blue-600 hover:underline py-2">
                    View All FAQs
                  </button>
                </div>
              </div>
            </div>

            {/* Developer Resources */}
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h3 className="font-medium mb-6 flex items-center gap-2" style={{display:"flex"}}>
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                Developer Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-accent transition-colors text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <span className="text-cyan-600">🔌</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">API Documentation</div>
                    <div className="text-xs text-muted-foreground mt-1">REST API endpoints and examples</div>
                  </div>
                </button>
                <button className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-accent transition-colors text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <span className="text-emerald-600">🎣</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Hooks & Filters</div>
                    <div className="text-xs text-muted-foreground mt-1">Custom development hooks</div>
                  </div>
                </button>
                <button className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-accent transition-colors text-center">
                  <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center">
                    <span className="text-violet-600">💻</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Code Examples</div>
                    <div className="text-xs text-muted-foreground mt-1">Ready-to-use code snippets</div>
                  </div>
                </button>
                <button className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-accent transition-colors text-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <span className="text-amber-600">🔧</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Custom Addons</div>
                    <div className="text-xs text-muted-foreground mt-1">Build your own addons</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Popular Articles & Community */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Popular Articles */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4">Most Popular Articles</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 hover:bg-accent/50 rounded px-2 transition-colors">
                    <span className="text-sm">Complete SpeedPress Setup Guide</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">1.2k views</span>
                  </div>
                  <div className="flex items-center justify-between py-2 hover:bg-accent/50 rounded px-2 transition-colors">
                    <span className="text-sm">Cart Abandonment Email Templates</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">950 views</span>
                  </div>
                  <div className="flex items-center justify-between py-2 hover:bg-accent/50 rounded px-2 transition-colors">
                    <span className="text-sm">WooCommerce Compatibility Issues</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">780 views</span>
                  </div>
                  <div className="flex items-center justify-between py-2 hover:bg-accent/50 rounded px-2 transition-colors">
                    <span className="text-sm">Product Bundle Pricing Strategies</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">650 views</span>
                  </div>
                  <div className="flex items-center justify-between py-2 hover:bg-accent/50 rounded px-2 transition-colors">
                    <span className="text-sm">Performance Optimization Tips</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">540 views</span>
                  </div>
                </div>
              </div>

              {/* Community & Support */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4">Community & Support</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-xs">💬</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Community Forum</div>
                      <div className="text-xs text-muted-foreground">Connect with other users</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-xs">🎧</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Live Chat Support</div>
                      <div className="text-xs text-muted-foreground">Get instant help from experts</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 text-xs">📧</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Email Support</div>
                      <div className="text-xs text-muted-foreground">Priority support for premium users</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 text-xs">🐛</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Report Bug</div>
                      <div className="text-xs text-muted-foreground">Help us improve SpeedPress</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                      <span className="text-pink-600 text-xs">💡</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Feature Request</div>
                      <div className="text-xs text-muted-foreground">Suggest new features</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Special handling for license-updates
  if (activeTab === 'license-updates') {
    return (
      <div className="h-full flex flex-col">
        <ContentHeader 
          activeTab={activeTab} 
          addons={addons}
          onOpenSidebar={onOpenSidebar} 
          onAddonSelect={handleAddonSelect}
        />
        <div className="flex-1 p-3 md:p-6 lg:p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold mb-2">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>

            {/* License Status Card */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-8 dark:from-green-950/20 dark:to-emerald-950/20 dark:border-green-800">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-lg">✓</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">License Active</h3>
                      <p className="text-sm text-green-700 dark:text-green-300">Your SpeedPress Pro license is valid and up to date</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-green-700 dark:text-green-300">License Type</div>
                      <div className="font-semibold text-green-800 dark:text-green-200">Professional</div>
                    </div>
                    <div>
                      <div className="text-sm text-green-700 dark:text-green-300">Sites Used</div>
                      <div className="font-semibold text-green-800 dark:text-green-200">1 / 5</div>
                    </div>
                    <div>
                      <div className="text-sm text-green-700 dark:text-green-300">Expires</div>
                      <div className="font-semibold text-green-800 dark:text-green-200">March 15, 2025</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="bg-white/80 hover:bg-white text-green-800 px-4 py-2 rounded-lg transition-colors text-sm">
                    Renew License
                  </button>
                  <button className="bg-white/80 hover:bg-white text-green-800 px-4 py-2 rounded-lg transition-colors text-sm">
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </div>

            {/* License Management */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* License Key Management */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2" style={{display:"flex"}}>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  License Key Management
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">License Key</label>
                    <div className="flex gap-2">
                      <input 
                        type="password" 
                        value="SP-PRO-XXXX-XXXX-XXXX-XXXX"
                        className="flex-1 px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                        disabled
                      />
                      <button className="px-3 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg text-sm transition-colors">
                        Show
                      </button>
                      <button className="px-3 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg text-sm transition-colors">
                        Copy
                      </button>
                    </div>
                  </div>
                  <div>
                    <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors text-sm">
                      Refresh License Status
                    </button>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-medium text-sm mb-3">License Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Customer Email:</span>
                        <span>user@example.com</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Purchase Date:</span>
                        <span>March 15, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Order ID:</span>
                        <span>#SP-2024-1234</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Multi-Site Management */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2" style={{display:"flex"}}>
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Multi-Site Management
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Current Site</div>
                      <div className="text-xs text-muted-foreground">mystore.com</div>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">Active</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Available Sites (4 remaining)</div>
                    <div className="text-xs text-muted-foreground">
                      You can activate SpeedPress on 4 more websites with your Professional license.
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <input 
                      type="url" 
                      placeholder="https://newsite.com"
                      className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                    />
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                      Activate on New Site
                    </button>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <button className="text-sm text-blue-600 hover:underline">
                      View All Licensed Sites
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Update Management */}
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h3 className="font-medium mb-6 flex items-center gap-2" style={{display:"flex"}}> 
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Update Management
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Current Version & Updates */}
                <div>
                  <h4 className="font-medium text-sm mb-4">Current Version</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                      <div>
                        <div className="font-medium">SpeedPress Pro</div>
                        <div className="text-sm text-muted-foreground">Version 2.1.4</div>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">Latest</span>
                    </div>
                    
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-950/20 dark:border-blue-800">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-blue-600">📦</span>
                        <span className="font-medium text-sm text-blue-800 dark:text-blue-200">Update Available</span>
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                        Version 2.1.5 is now available with bug fixes and performance improvements.
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                        Update Now
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Auto Update Settings */}
                <div>
                  <h4 className="font-medium text-sm mb-4">Auto-Update Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <div className="text-sm font-medium">Automatic Updates</div>
                        <div className="text-xs text-muted-foreground">Update plugin automatically when new versions are released</div>
                      </div>
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <div className="text-sm font-medium">Beta Updates</div>
                        <div className="text-xs text-muted-foreground">Receive early access to beta versions</div>
                      </div>
                      <input type="checkbox" className="w-4 h-4" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <div className="text-sm font-medium">Update Notifications</div>
                        <div className="text-xs text-muted-foreground">Email notifications for available updates</div>
                      </div>
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <div className="text-sm font-medium">Backup Before Update</div>
                        <div className="text-xs text-muted-foreground">Create automatic backup before updating</div>
                      </div>
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Version History */}
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h3 className="font-medium mb-4 flex items-center gap-2" style={{display:"flex"}}>
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                Version History
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">Version 2.1.4 (Current)</div>
                    <div className="text-xs text-muted-foreground">Released 3 days ago</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Added advanced product filtering, improved checkout flow, enhanced analytics dashboard
                  </div>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">Version 2.1.3</div>
                    <div className="text-xs text-muted-foreground">Released 2 weeks ago</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Fixed cart abandonment email templates, improved mobile responsiveness
                  </div>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">Version 2.1.2</div>
                    <div className="text-xs text-muted-foreground">Released 1 month ago</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    New flash sales timer addon, performance optimizations, WooCommerce 8.4 compatibility
                  </div>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">Version 2.1.1</div>
                    <div className="text-xs text-muted-foreground">Released 2 months ago</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Security updates, bug fixes for product bundles, improved compatibility
                  </div>
                </div>
                
                <button className="text-sm text-blue-600 hover:underline">
                  View Complete Changelog
                </button>
              </div>
            </div>

            {/* Support & Billing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Support Entitlements */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2" style={{display:"flex"}}>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Support Entitlements
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Priority Email Support</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">Included</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Live Chat Support</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">Included</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Installation Support</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">Included</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Custom Development</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-100">Available</span>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>

              {/* Billing & Account */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2" style={{display:"flex"}}>
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Billing & Account
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Next Billing Date:</span>
                      <span>March 15, 2025</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Amount:</span>
                      <span>$79.00 USD</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payment Method:</span>
                      <span>•••• 4242</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-lg transition-colors text-sm">
                      Update Payment
                    </button>
                    <button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-lg transition-colors text-sm">
                      Download Invoice
                    </button>
                  </div>
                  
                  <div className="pt-3 border-t border-border">
                    <button className="text-sm text-blue-600 hover:underline">
                      Manage Billing in Customer Portal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Special handling for custom development portal
  if (activeTab === 'custom-requests') {
    return (
      <div className="h-full flex flex-col">
        <ContentHeader 
          activeTab={activeTab} 
          addons={addons}
          onOpenSidebar={onOpenSidebar} 
          onAddonSelect={handleAddonSelect}
        />
        <div className="flex-1 p-3 md:p-6 lg:p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <CustomDevelopmentPortal />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <ContentHeader 
        activeTab={activeTab} 
        addons={addons}
        onOpenSidebar={onOpenSidebar} 
        onAddonSelect={handleAddonSelect}
      />
      <div className="flex-1 p-3 md:p-6 lg:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <Badge variant="outline">
                  {currentAddons.length} addon{currentAddons.length !== 1 ? 's' : ''}
                  {filter !== 'all' && ` (${filter})`}
                </Badge>
              </div>
              
              {showFilters && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Filter:</span>
                  <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                    <Button
                      variant={filter === 'all' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => onFilterChange('all')}
                      className="h-7 px-3 text-xs"
                    >
                      All ({allAddons.length})
                    </Button>
                    <Button
                      variant={filter === 'free' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => onFilterChange('free')}
                      className="h-7 px-3 text-xs"
                    >
                      Free ({allAddons.filter(a => a.type === 'free').length})
                    </Button>
                    <Button
                      variant={filter === 'premium' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => onFilterChange('premium')}
                      className="h-7 px-3 text-xs"
                    >
                      Premium ({allAddons.filter(a => a.type === 'premium').length})
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <p className="text-muted-foreground">{description}</p>
            
            {showFilters && filter !== 'all' && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Showing {currentAddons.length} {filter} addon{currentAddons.length !== 1 ? 's' : ''} out of {allAddons.length} total.
                  <button 
                    onClick={() => onFilterChange('all')}
                    className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Clear filter
                  </button>
                </p>
              </div>
            )}
          </div>

          {currentAddons.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="font-medium mb-2">
                {filter === 'all' 
                  ? 'No addons available' 
                  : `No ${filter} addons available`
                }
              </h3>
              <p className="text-sm text-muted-foreground">
                {filter === 'all' 
                  ? 'Check back later for new addons in this category.'
                  : `Try switching to a different filter to see more addons.`
                }
              </p>
              {filter !== 'all' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onFilterChange('all')}
                  className="mt-3"
                >
                  Show All Addons
                </Button>
              )}
            </div>
          ) : (
            <div id="addon-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
              {currentAddons.map((addon) => (
                <AddonCard
                  key={addon.id}
                  name={addon.name}
                  description={addon.description}
                  type={addon.type}
                  enabled={addon.enabled}
                  onToggle={() => onToggleAddon(activeTab, addon.id)}
                  onConfigure={() => onConfigureAddon(activeTab, addon.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}