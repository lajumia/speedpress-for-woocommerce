import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { GlobalSearch } from "./GlobalSearch";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Button } from "./ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronRight, Home, Bell, CheckCircle, AlertTriangle, Info, X, Menu } from "lucide-react";

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning';
  title: string;
  message: string;
  time: string;
  icon: any;
}

interface Addon {
  id: string;
  name: string;
  description: string;
  type: 'free' | 'premium';
  enabled: boolean;
}

interface ContentHeaderProps {
  activeTab: string;
  addons: Record<string, Addon[]>;
  onOpenSidebar?: () => void;
  onAddonSelect?: (category: string, addonId: string) => void;
}

const tabTitles: Record<string, string> = {
  'dashboard': 'Dashboard',
  'general-addons': 'General Addons',
  'product-addons': 'Product Addons',
  'cart-checkout-addons': 'Cart & Checkout',
  'shipping-payment': 'Shipping & Payment',
  'marketing-sales': 'Marketing & Sales',
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
  'license-updates': 'License & Updates',
  'help-docs': 'Help & Documentation'
};

export function ContentHeader({ activeTab, addons, onOpenSidebar, onAddonSelect }: ContentHeaderProps) {
  const currentPageTitle = tabTitles[activeTab] || 'Unknown Section';
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'info',
      title: 'System Update Available',
      message: 'SpeedPress v2.1.5 is now available with new features and bug fixes.',
      time: '2 minutes ago',
      icon: Info
    },
    {
      id: '2',
      type: 'success',
      title: 'Backup Completed',
      message: 'Your store data has been successfully backed up to cloud storage.',
      time: '1 hour ago',
      icon: CheckCircle
    },
    {
      id: '3',
      type: 'warning',
      title: 'Security Alert',
      message: '3 failed login attempts detected from unknown IP address.',
      time: '3 hours ago',
      icon: AlertTriangle
    }
  ]);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-500';
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getNotificationIconColor = (type: string) => {
    switch (type) {
      case 'info': return 'text-blue-500';
      case 'success': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10 transition-colors duration-200">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Left Side - Mobile Menu + Breadcrumb */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          {onOpenSidebar && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onOpenSidebar}
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
          
          {/* Breadcrumb - hide on mobile, replaced with simple title */}
          <div className="hide sm:block">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="flex items-center gap-1.5">
                    <Home className="w-4 h-4" />
                    SpeedPress
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-medium">
                    {currentPageTitle}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          {/* Mobile Page Title */}
          <h1 className="sm:hidden font-medium text-lg">{currentPageTitle}</h1>
        </div>

        {/* Right Side - Search, Notifications & Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* Global Search */}
          <div id="global-search" className="hide md:block">
            <GlobalSearch addons={addons} onAddonSelect={onAddonSelect} />
          </div>
          
          {/* Notification Dropdown */}
          <DropdownMenu>
            {/* <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 transition-colors"
              >
                <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                {notifications.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-[10px] font-semibold text-white">{notifications.length}</span>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger> */}
            {/* <DropdownMenuContent align="end" className="w-80 max-w-[calc(100vw-2rem)]">
              <div className="px-3 py-2 border-b border-border">
                <h4 className="font-medium">Notifications</h4>
                <p className="text-xs text-muted-foreground">
                  {notifications.length} unread notification{notifications.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              {notifications.length === 0 ? (
                <div className="p-6 text-center">
                  <Bell className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No new notifications</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <DropdownMenuItem key={notification.id} className="flex items-start gap-3 p-3 relative group">
                      <div className={`w-2 h-2 ${getNotificationColor(notification.type)} rounded-full mt-2 flex-shrink-0`}></div>
                      <div className="flex-1 pr-6">
                        <div className="flex items-center gap-2 mb-1">
                          <IconComponent className={`w-3 h-3 ${getNotificationIconColor(notification.type)}`} />
                          <span className="text-sm font-medium">{notification.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{notification.message}</p>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 dark:hover:bg-red-900/20"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                      >
                        <X className="w-3 h-3 text-red-500" />
                      </Button>
                    </DropdownMenuItem>
                  );
                })
              )}
              
              {notifications.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="justify-center text-center p-3 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    onClick={() => setNotifications([])}
                  >
                    <span className="text-sm">Clear all notifications</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent> */}
          </DropdownMenu>
          
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}