import { useState, useEffect } from 'react';
import { 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock, 
  Database,
  Wifi,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface Addon {
  id: string;
  name: string;
  description: string;
  type: 'free' | 'premium';
  enabled: boolean;
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  impact: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}

interface AddonPerformanceData {
  addonId: string;
  loadTimeImpact: number; // in ms
  memoryImpact: number; // in MB
  databaseQueries: number;
  performanceScore: number; // 0-100
  recommendations?: string[];
}

interface PerformanceTrackerProps {
  addons: Record<string, Addon[]>;
  isVisible: boolean;
  onToggle: () => void;
}

// Mock performance data - in real app this would come from actual monitoring
const addonPerformanceData: Record<string, AddonPerformanceData> = {
  'product-bundles': {
    addonId: 'product-bundles',
    loadTimeImpact: 45,
    memoryImpact: 2.1,
    databaseQueries: 3,
    performanceScore: 92,
    recommendations: ['Enable caching for bundle calculations']
  },
  'cart-abandonment': {
    addonId: 'cart-abandonment',
    loadTimeImpact: 12,
    memoryImpact: 0.8,
    databaseQueries: 1,
    performanceScore: 97,
    recommendations: []
  },
  'page-speed-optimizer': {
    addonId: 'page-speed-optimizer',
    loadTimeImpact: -230,
    memoryImpact: 1.2,
    databaseQueries: 0,
    performanceScore: 99,
    recommendations: []
  },
  'seo-optimizer': {
    addonId: 'seo-optimizer',
    loadTimeImpact: 18,
    memoryImpact: 1.5,
    databaseQueries: 2,
    performanceScore: 95,
    recommendations: ['Consider lazy loading for meta tag generation']
  },
  'advanced-reports': {
    addonId: 'advanced-reports',
    loadTimeImpact: 85,
    memoryImpact: 4.2,
    databaseQueries: 8,
    performanceScore: 78,
    recommendations: ['Enable report caching', 'Optimize database queries']
  },
  'flash-sales': {
    addonId: 'flash-sales',
    loadTimeImpact: 32,
    memoryImpact: 1.8,
    databaseQueries: 4,
    performanceScore: 88,
    recommendations: ['Cache countdown calculations']
  }
};

export function PerformanceTracker({ addons, isVisible, onToggle }: PerformanceTrackerProps) {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [enabledAddons, setEnabledAddons] = useState<Addon[]>([]);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    // Calculate enabled addons and their performance impact
    const allEnabledAddons = Object.values(addons)
      .flat()
      .filter(addon => addon.enabled);
    
    setEnabledAddons(allEnabledAddons);

    // Calculate overall performance metrics
    let totalLoadTimeImpact = 0;
    let totalMemoryImpact = 0;
    let totalDatabaseQueries = 0;
    let totalPerformanceScore = 0;
    let addonCount = 0;

    allEnabledAddons.forEach(addon => {
      const perfData = addonPerformanceData[addon.id];
      if (perfData) {
        totalLoadTimeImpact += perfData.loadTimeImpact;
        totalMemoryImpact += perfData.memoryImpact;
        totalDatabaseQueries += perfData.databaseQueries;
        totalPerformanceScore += perfData.performanceScore;
        addonCount++;
      }
    });

    const avgPerformanceScore = addonCount > 0 ? totalPerformanceScore / addonCount : 100;
    setOverallScore(Math.round(avgPerformanceScore));

    // Create performance metrics
    const newMetrics: PerformanceMetric[] = [
      {
        name: 'Page Load Time',
        value: totalLoadTimeImpact > 0 ? 1.2 + (totalLoadTimeImpact / 1000) : Math.max(0.8, 1.2 + (totalLoadTimeImpact / 1000)),
        unit: 's',
        trend: totalLoadTimeImpact > 0 ? 'up' : totalLoadTimeImpact < 0 ? 'down' : 'stable',
        impact: totalLoadTimeImpact > 100 ? 'negative' : totalLoadTimeImpact < -50 ? 'positive' : 'neutral',
        icon: <Clock className="w-4 h-4" />
      },
      {
        name: 'Memory Usage',
        value: Math.max(0, totalMemoryImpact),
        unit: 'MB',
        trend: totalMemoryImpact > 5 ? 'up' : 'stable',
        impact: totalMemoryImpact > 10 ? 'negative' : totalMemoryImpact < 3 ? 'positive' : 'neutral',
        icon: <Database className="w-4 h-4" />
      },
      {
        name: 'Database Queries',
        value: totalDatabaseQueries,
        unit: 'queries',
        trend: totalDatabaseQueries > 10 ? 'up' : 'stable',
        impact: totalDatabaseQueries > 15 ? 'negative' : totalDatabaseQueries < 5 ? 'positive' : 'neutral',
        icon: <Activity className="w-4 h-4" />
      },
      {
        name: 'Performance Score',
        value: avgPerformanceScore,
        unit: '/100',
        trend: avgPerformanceScore > 90 ? 'up' : avgPerformanceScore < 80 ? 'down' : 'stable',
        impact: avgPerformanceScore > 90 ? 'positive' : avgPerformanceScore < 80 ? 'negative' : 'neutral',
        icon: <Zap className="w-4 h-4" />
      }
    ];

    setMetrics(newMetrics);
  }, [addons]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'negative':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-orange-500';
    return 'bg-red-500';
  };

  if (!isVisible) {
    return (
      <Button
        onClick={onToggle}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-20 z-40 shadow-lg"
      >
        <Activity className="w-4 h-4 mr-2" />
        Performance
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-card border border-border rounded-xl shadow-2xl z-40 max-h-96 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold">Performance Monitor</h3>
            </div>
            <Badge variant="secondary" className="text-xs">
              Real-time
            </Badge>
          </div>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            <Activity className="w-4 h-4" />
          </button>
        </div>

        {/* Overall Score */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Overall Score</span>
            <span className={`font-semibold ${getScoreColor(overallScore)}`}>
              {overallScore}/100
            </span>
          </div>
          <Progress 
            value={overallScore} 
            className="h-2"
            style={{
              background: `linear-gradient(90deg, ${overallScore >= 90 ? '#10b981' : overallScore >= 80 ? '#f59e0b' : '#ef4444'} 0%, ${overallScore >= 90 ? '#10b981' : overallScore >= 80 ? '#f59e0b' : '#ef4444'} ${overallScore}%, #e5e7eb ${overallScore}%)`
            }}
          />
        </div>
      </div>

      {/* Metrics */}
      <div className="p-4 max-h-64 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-accent/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                {metric.icon}
                <span className="text-xs text-muted-foreground">{metric.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium text-sm">
                  {typeof metric.value === 'number' ? metric.value.toFixed(metric.name === 'Performance Score' ? 0 : 1) : metric.value}
                  {metric.unit}
                </span>
                {metric.trend === 'up' && (
                  <TrendingUp className={`w-3 h-3 ${getImpactColor(metric.impact)}`} />
                )}
                {metric.trend === 'down' && (
                  <TrendingDown className={`w-3 h-3 ${getImpactColor(metric.impact)}`} />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Active Addons Impact */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Wifi className="w-4 h-4" />
            Active Addons Impact
          </h4>
          
          {enabledAddons.slice(0, 4).map(addon => {
            const perfData = addonPerformanceData[addon.id];
            if (!perfData) return null;

            return (
              <div key={addon.id} className="flex items-center justify-between text-xs p-2 bg-accent/30 rounded">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    perfData.performanceScore >= 90 ? 'bg-green-500' : 
                    perfData.performanceScore >= 80 ? 'bg-orange-500' : 'bg-red-500'
                  }`} />
                  <span className="font-medium truncate max-w-32">{addon.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {perfData.loadTimeImpact > 0 ? (
                    <span className="text-red-600">+{perfData.loadTimeImpact}ms</span>
                  ) : (
                    <span className="text-green-600">{perfData.loadTimeImpact}ms</span>
                  )}
                  {perfData.recommendations && perfData.recommendations.length > 0 && (
                    <AlertTriangle className="w-3 h-3 text-orange-500" />
                  )}
                </div>
              </div>
            );
          })}

          {enabledAddons.length > 4 && (
            <div className="text-center text-xs text-muted-foreground py-1">
              +{enabledAddons.length - 4} more addons
            </div>
          )}
        </div>

        {/* Recommendations */}
        {enabledAddons.some(addon => {
          const perfData = addonPerformanceData[addon.id];
          return perfData?.recommendations && perfData.recommendations.length > 0;
        }) && (
          <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-orange-800 dark:text-orange-200 mb-1">
                  Performance Tips
                </h5>
                <ul className="text-xs text-orange-700 dark:text-orange-300 space-y-1">
                  {enabledAddons.slice(0, 2).map(addon => {
                    const perfData = addonPerformanceData[addon.id];
                    if (!perfData?.recommendations?.length) return null;
                    return perfData.recommendations.map((rec, idx) => (
                      <li key={`${addon.id}-${idx}`}>• {rec}</li>
                    ));
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}