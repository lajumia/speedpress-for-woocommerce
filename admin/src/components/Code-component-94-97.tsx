import { useState, useEffect } from 'react';
import { 
  Lightbulb, 
  TrendingUp, 
  Shield, 
  Zap, 
  Target, 
  ChevronRight,
  Star,
  Clock,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Addon {
  id: string;
  name: string;
  description: string;
  type: 'free' | 'premium';
  enabled: boolean;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'performance' | 'conversion' | 'seo' | 'security' | 'analytics';
  addons: string[];
  reasoning: string;
  estimatedBenefit: string;
  priority: number;
  icon: React.ReactNode;
}

interface SmartRecommendationsProps {
  addons: Record<string, Addon[]>;
  onEnableAddon: (categoryId: string, addonId: string) => void;
  onTabChange?: (tab: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  performance: <Zap className="w-4 h-4" />,
  conversion: <TrendingUp className="w-4 h-4" />,
  seo: <Target className="w-4 h-4" />,
  security: <Shield className="w-4 h-4" />,
  analytics: <Lightbulb className="w-4 h-4" />
};

const impactColors = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200',
  medium: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200',
  low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
};

export function SmartRecommendations({ addons, onEnableAddon, onTabChange }: SmartRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [dismissedRecommendations, setDismissedRecommendations] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const generateRecommendations = () => {
      const allAddons = Object.values(addons).flat();
      const enabledAddons = allAddons.filter(addon => addon.enabled);
      const disabledAddons = allAddons.filter(addon => !addon.enabled);
      
      const newRecommendations: Recommendation[] = [];

      // Performance Recommendations
      const hasPageSpeed = enabledAddons.some(addon => 
        addon.id.includes('page-speed') || addon.id.includes('minify')
      );
      
      if (!hasPageSpeed && disabledAddons.some(addon => addon.id === 'page-speed-optimizer')) {
        newRecommendations.push({
          id: 'enable-page-speed',
          title: 'Boost Site Performance',
          description: 'Enable page speed optimization to improve loading times',
          impact: 'high',
          category: 'performance',
          addons: ['page-speed-optimizer', 'minify-assets'],
          reasoning: 'Sites with faster loading times see 25% higher conversion rates',
          estimatedBenefit: '+25% conversion rate',
          priority: 1,
          icon: categoryIcons.performance
        });
      }

      // Conversion Recommendations
      const hasCartRecovery = enabledAddons.some(addon => 
        addon.id.includes('cart-abandonment') || addon.id.includes('abandonment')
      );
      
      if (!hasCartRecovery && disabledAddons.some(addon => addon.id === 'cart-abandonment')) {
        newRecommendations.push({
          id: 'enable-cart-recovery',
          title: 'Recover Lost Sales',
          description: 'Set up cart abandonment recovery to recapture potential customers',
          impact: 'high',
          category: 'conversion',
          addons: ['cart-abandonment'],
          reasoning: 'Cart abandonment recovery can recover up to 25% of abandoned carts',
          estimatedBenefit: '+$2,500/month revenue',
          priority: 2,
          icon: categoryIcons.conversion
        });
      }

      // SEO Recommendations
      const hasSEOOptimizer = enabledAddons.some(addon => 
        addon.id.includes('seo') || addon.id.includes('sitemap')
      );
      
      if (!hasSEOOptimizer) {
        newRecommendations.push({
          id: 'enable-seo-tools',
          title: 'Improve Search Rankings',
          description: 'Enable SEO optimization tools for better search visibility',
          impact: 'medium',
          category: 'seo',
          addons: ['seo-optimizer', 'sitemap-generator', 'schema-markup'],
          reasoning: 'Better SEO leads to 40% more organic traffic on average',
          estimatedBenefit: '+40% organic traffic',
          priority: 3,
          icon: categoryIcons.seo
        });
      }

      // Security Recommendations
      const hasSecurityScanner = enabledAddons.some(addon => 
        addon.id.includes('security') || addon.id.includes('ssl')
      );
      
      if (!hasSecurityScanner) {
        newRecommendations.push({
          id: 'enable-security',
          title: 'Enhance Store Security',
          description: 'Enable security monitoring and SSL certificate tracking',
          impact: 'high',
          category: 'security',
          addons: ['security-scanner', 'ssl-monitor', 'two-factor-auth'],
          reasoning: 'Security breaches cost an average of $4.45M per incident',
          estimatedBenefit: 'Prevent costly security breaches',
          priority: 4,
          icon: categoryIcons.security
        });
      }

      // Analytics Recommendations
      const hasAdvancedReports = enabledAddons.some(addon => 
        addon.id.includes('advanced-reports') || addon.id.includes('analytics')
      );
      
      if (!hasAdvancedReports && enabledAddons.length > 5) {
        newRecommendations.push({
          id: 'enable-analytics',
          title: 'Get Deeper Insights',
          description: 'Enable advanced analytics to track your optimization efforts',
          impact: 'medium',
          category: 'analytics',
          addons: ['advanced-reports', 'customer-analytics', 'conversion-tracking'],
          reasoning: 'Data-driven decisions improve ROI by 5-8% on average',
          estimatedBenefit: '+5-8% overall ROI',
          priority: 5,
          icon: categoryIcons.analytics
        });
      }

      // Social Proof Recommendations
      const hasSocialProof = enabledAddons.some(addon => 
        addon.id.includes('social-proof') || addon.id.includes('reviews')
      );
      
      if (!hasSocialProof && enabledAddons.length > 3) {
        newRecommendations.push({
          id: 'enable-social-proof',
          title: 'Build Customer Trust',
          description: 'Show social proof notifications to increase buyer confidence',
          impact: 'medium',
          category: 'conversion',
          addons: ['social-proof', 'product-reviews-pro', 'urgency-indicators'],
          reasoning: 'Social proof can increase conversions by 15% on average',
          estimatedBenefit: '+15% conversion rate',
          priority: 6,
          icon: categoryIcons.conversion
        });
      }

      return newRecommendations
        .filter(rec => !dismissedRecommendations.has(rec.id))
        .sort((a, b) => a.priority - b.priority);
    };

    setRecommendations(generateRecommendations());
  }, [addons, dismissedRecommendations]);

  const handleEnableRecommendation = (recommendation: Recommendation) => {
    recommendation.addons.forEach(addonId => {
      // Find the category this addon belongs to
      const categoryEntry = Object.entries(addons).find(([, categoryAddons]) =>
        categoryAddons.some(addon => addon.id === addonId)
      );
      
      if (categoryEntry) {
        const [categoryId] = categoryEntry;
        onEnableAddon(categoryId, addonId);
      }
    });

    // Dismiss this recommendation
    setDismissedRecommendations(prev => new Set([...prev, recommendation.id]));
  };

  const handleDismissRecommendation = (recommendationId: string) => {
    setDismissedRecommendations(prev => new Set([...prev, recommendationId]));
  };

  const handleViewCategory = (recommendation: Recommendation) => {
    // Navigate to the relevant category
    const categoryMapping: Record<string, string> = {
      performance: 'seo-performance',
      conversion: 'marketing-sales',
      seo: 'seo-performance',
      security: 'security-compliance',
      analytics: 'reports-analytics'
    };
    
    const targetCategory = categoryMapping[recommendation.category] || 'dashboard';
    if (onTabChange) {
      onTabChange(targetCategory);
    }
  };

  if (!isVisible || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">Smart Recommendations</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">AI-powered suggestions to optimize your store</p>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </button>
      </div>

      <div className="space-y-4">
        {recommendations.slice(0, 3).map((recommendation) => (
          <div key={recommendation.id} className="bg-white dark:bg-slate-800/50 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  {recommendation.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">{recommendation.title}</h4>
                    <Badge className={`text-xs ${impactColors[recommendation.impact]}`}>
                      {recommendation.impact} impact
                    </Badge>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                    {recommendation.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-blue-600 dark:text-blue-400">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      <span>{recommendation.estimatedBenefit}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{recommendation.addons.length} addon{recommendation.addons.length > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDismissRecommendation(recommendation.id)}
                className="p-1 hover:bg-blue-100 dark:hover:bg-blue-800 rounded transition-colors"
              >
                <X className="w-3 h-3 text-blue-500" />
              </button>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <span className="font-medium">Why this matters:</span> {recommendation.reasoning}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleEnableRecommendation(recommendation)}
                size="sm"
                className="flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Enable Now
              </Button>
              <Button
                onClick={() => handleViewCategory(recommendation)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                View Category
                <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {recommendations.length > 3 && (
        <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-600 dark:text-blue-400 text-center">
            +{recommendations.length - 3} more recommendations available
          </p>
        </div>
      )}
    </div>
  );
}