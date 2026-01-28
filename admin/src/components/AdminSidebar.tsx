import { cn } from "./ui/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Home,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  TrendingUp,
  BarChart3,
  Gift,
  Settings,
  HelpCircle,
  Search,
  Users,
  Package2,
  Shield,
  Zap,
  Palette,
  Smartphone,
  Workflow,
  Code2,
  X,
} from "lucide-react";

interface Addon {
  id: string;
  name: string;
  description: string;
  type: "free" | "premium";
  enabled: boolean;
}

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  addons?: Record<string, Addon[]>;
  isMobile?: boolean;
  onClose?: () => void;
}

const tabs = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    hasCount: false,
  },
  {
    id: "general-addons",
    label: "General Addons",
    icon: Home,
    hasCount: true,
  },
  {
    id: "product-addons",
    label: "Product Addons",
    icon: Package,
    hasCount: true,
  },
  {
    id: "cart-checkout-addons",
    label: "Cart & Checkout",
    icon: ShoppingCart,
    hasCount: true,
  },
  {
    id: "shipping-payment",
    label: "Shipping & Payment",
    icon: Truck,
    hasCount: true,
  },
  {
    id: "marketing-sales",
    label: "Marketing & Sales",
    icon: TrendingUp,
    hasCount: true,
  },
  {
    id: "seo-performance",
    label: "SEO & Performance",
    icon: Search,
    hasCount: true,
  },
  {
    id: "customer-management",
    label: "Customer Management",
    icon: Users,
    hasCount: true,
  },
  {
    id: "inventory-management",
    label: "Inventory Management",
    icon: Package2,
    hasCount: true,
  },
  {
    id: "security-compliance",
    label: "Security & Compliance",
    icon: Shield,
    hasCount: true,
  },
  {
    id: "integrations-api",
    label: "Integrations & API",
    icon: Zap,
    hasCount: true,
  },
  {
    id: "content-design",
    label: "Content & Design",
    icon: Palette,
    hasCount: true,
  },
  {
    id: "mobile-apps",
    label: "Mobile & Apps",
    icon: Smartphone,
    hasCount: true,
  },
  {
    id: "automation-workflows",
    label: "Automation & Workflows",
    icon: Workflow,
    hasCount: true,
  },
  {
    id: "reports-analytics",
    label: "Reports & Analytics",
    icon: BarChart3,
    hasCount: true,
  },
  // {
  //   id: "free-addons",
  //   label: "Free Addons",
  //   icon: Gift,
  //   hasCount: true,
  // },
  // {
  //   id: "custom-requests",
  //   label: "Custom Development",
  //   icon: Code2,
  //   hasCount: false,
  // },
  // {
  //   id: "license-updates",
  //   label: "License & Updates",
  //   icon: Settings,
  //   hasCount: false,
  // },
  // {
  //   id: "help-docs",
  //   label: "Help & Documentation",
  //   icon: HelpCircle,
  //   hasCount: false,
  // },
];

export function AdminSidebar({activeTab,onTabChange,addons = {},isMobile = false,onClose,}: SidebarProps) {
  const getAddonCount = (tabId: string): number => {
    return addons[tabId]?.length || 0;
  };

  return (
    <div className="w-70 bg-card border-r border-border h-full flex flex-col flex-shrink-0 transition-colors duration-300 overflow-hidden">
      <div className="p-6 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-3 relative">
          {/* Mobile Close Button */}
          {isMobile && onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-2 -right-2 w-8 h-8"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          )}

          <div className="w-10 h-10 speedpress-gradient rounded-lg flex items-center justify-center shadow-lg speedpress-logo-animate group cursor-pointer relative overflow-hidden">
            <span className="text-white font-bold text-lg group-hover:scale-125 transition-all duration-500 relative z-10 drop-shadow-sm">
              SP
            </span>
          </div>
          <div>
            <h1 className="font-semibold text-lg" style={{fontSize:"1.125rem",margin:'0px'}}>
              SpeedPress
            </h1>
            <p className="text-sm text-muted-foreground" style={{margin:'0px'}}>
              WooCommerce Suite
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar">
        <div id="sidebar-categories" className="px-3 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const addonCount = getAddonCount(tab.id);

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                style={{textAlign:"left"}}
                className={cn(
                  "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm transform hover:scale-[1.02]",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-accent text-foreground hover:text-accent-foreground",
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.hasCount && addonCount > 0 && (
                  <Badge
                    variant={
                      activeTab === tab.id
                        ? "secondary"
                        : "outline"
                    }
                    className={cn(
                      "ml-auto text-xs px-2 py-0.5 h-5",
                      activeTab === tab.id
                        ? "bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
                        : "bg-accent text-accent-foreground",
                    )}
                  >
                    {addonCount}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-3 border-t border-border flex-shrink-0">
        <div className="text-xs text-muted-foreground text-center">
          Version 1.0.0
        </div>
      </div>
    </div>
  );
}