import { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Square, 
  Zap, 
  Shield, 
  AlertTriangle,
  Play,
  Square as StopSquare,
  Settings,
  Download
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';

interface Addon {
  id: string;
  name: string;
  description: string;
  type: 'free' | 'premium';
  enabled: boolean;
}

interface BulkAddonManagerProps {
  addons: Addon[];
  onToggleAddon: (addonId: string) => void;
  onConfigureAddon: (addonId: string) => void;
  categoryId: string;
}

export function BulkAddonManager({ addons, onToggleAddon, onConfigureAddon, categoryId }: BulkAddonManagerProps) {
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show bulk manager only if there are 3 or more addons
    setIsVisible(addons.length >= 3);
    // Clear selections when category changes
    setSelectedAddons(new Set());
  }, [addons, categoryId]);

  const toggleAddonSelection = (addonId: string) => {
    const newSelected = new Set(selectedAddons);
    if (newSelected.has(addonId)) {
      newSelected.delete(addonId);
    } else {
      newSelected.add(addonId);
    }
    setSelectedAddons(newSelected);
  };

  const selectAll = () => {
    if (selectedAddons.size === addons.length) {
      setSelectedAddons(new Set());
    } else {
      setSelectedAddons(new Set(addons.map(addon => addon.id)));
    }
  };

  const bulkEnable = () => {
    if (selectedAddons.size === 0) {
      toast.error('Please select addons to enable');
      return;
    }

    const enabledCount = Array.from(selectedAddons).filter(id => {
      const addon = addons.find(a => a.id === id);
      return addon && !addon.enabled;
    }).length;

    Array.from(selectedAddons).forEach(addonId => {
      const addon = addons.find(a => a.id === addonId);
      if (addon && !addon.enabled) {
        onToggleAddon(addonId);
      }
    });

    if (enabledCount > 0) {
      toast.success(`Successfully enabled ${enabledCount} addon${enabledCount > 1 ? 's' : ''}`);
    }
    setSelectedAddons(new Set());
  };

  const bulkDisable = () => {
    if (selectedAddons.size === 0) {
      toast.error('Please select addons to disable');
      return;
    }

    const disabledCount = Array.from(selectedAddons).filter(id => {
      const addon = addons.find(a => a.id === id);
      return addon && addon.enabled;
    }).length;

    Array.from(selectedAddons).forEach(addonId => {
      const addon = addons.find(a => a.id === addonId);
      if (addon && addon.enabled) {
        onToggleAddon(addonId);
      }
    });

    if (disabledCount > 0) {
      toast.success(`Successfully disabled ${disabledCount} addon${disabledCount > 1 ? 's' : ''}`);
    }
    setSelectedAddons(new Set());
  };

  const bulkConfigure = () => {
    if (selectedAddons.size === 0) {
      toast.error('Please select an addon to configure');
      return;
    }

    if (selectedAddons.size > 1) {
      toast.error('Please select only one addon to configure');
      return;
    }

    const addonId = Array.from(selectedAddons)[0];
    onConfigureAddon(addonId);
    setSelectedAddons(new Set());
  };

  const getConflictWarning = (): string | null => {
    const selectedAddonsList = Array.from(selectedAddons)
      .map(id => addons.find(a => a.id === id))
      .filter(Boolean) as Addon[];

    // Check for potential conflicts between selected addons
    const hasMultipleCartAddons = selectedAddonsList.filter(addon => 
      addon.name.toLowerCase().includes('cart') || 
      addon.name.toLowerCase().includes('checkout')
    ).length > 1;

    const hasMultipleSEOAddons = selectedAddonsList.filter(addon => 
      addon.name.toLowerCase().includes('seo') || 
      addon.name.toLowerCase().includes('sitemap')
    ).length > 1;

    if (hasMultipleCartAddons) {
      return 'Multiple cart addons selected - may cause conflicts';
    }
    if (hasMultipleSEOAddons) {
      return 'Multiple SEO addons selected - may cause conflicts';
    }

    return null;
  };

  if (!isVisible) return null;

  const selectedCount = selectedAddons.size;
  const allSelected = selectedCount === addons.length && addons.length > 0;
  const someSelected = selectedCount > 0;
  const conflictWarning = getConflictWarning();

  return (
    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Checkbox 
              id="select-all"
              checked={allSelected}
              onCheckedChange={selectAll}
              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <label htmlFor="select-all" className="text-sm font-medium text-blue-900 dark:text-blue-100 cursor-pointer">
              Bulk Actions
            </label>
          </div>
          {selectedCount > 0 && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
              {selectedCount} selected
            </Badge>
          )}
        </div>

        {someSelected && (
          <div className="flex items-center gap-2">
            <Button
              onClick={bulkEnable}
              size="sm"
              variant="outline"
              className="bg-green-50 border-green-200 hover:bg-green-100 text-green-700 dark:bg-green-950/20 dark:border-green-800 dark:text-green-300"
            >
              <Play className="w-3 h-3 mr-1" />
              Enable
            </Button>
            <Button
              onClick={bulkDisable}
              size="sm"
              variant="outline"
              className="bg-red-50 border-red-200 hover:bg-red-100 text-red-700 dark:bg-red-950/20 dark:border-red-800 dark:text-red-300"
            >
              <StopSquare className="w-3 h-3 mr-1" />
              Disable
            </Button>
            {selectedCount === 1 && (
              <Button
                onClick={bulkConfigure}
                size="sm"
                variant="outline"
                className="bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-700 dark:bg-purple-950/20 dark:border-purple-800 dark:text-purple-300"
              >
                <Settings className="w-3 h-3 mr-1" />
                Configure
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Conflict Warning */}
      {conflictWarning && someSelected && (
        <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 mb-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                Potential Conflict Detected
              </p>
              <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                {conflictWarning}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Select Suggestions */}
      <div className="flex flex-wrap gap-2 text-xs">
        <button
          onClick={() => {
            const performanceAddons = addons.filter(addon => 
              addon.name.toLowerCase().includes('speed') || 
              addon.name.toLowerCase().includes('cache') ||
              addon.name.toLowerCase().includes('optimize')
            );
            setSelectedAddons(new Set(performanceAddons.map(a => a.id)));
          }}
          className="flex items-center gap-1 px-2 py-1 bg-green-100 hover:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md transition-colors"
        >
          <Zap className="w-3 h-3" />
          Performance
        </button>
        <button
          onClick={() => {
            const securityAddons = addons.filter(addon => 
              addon.name.toLowerCase().includes('security') || 
              addon.name.toLowerCase().includes('ssl') ||
              addon.name.toLowerCase().includes('firewall')
            );
            setSelectedAddons(new Set(securityAddons.map(a => a.id)));
          }}
          className="flex items-center gap-1 px-2 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md transition-colors"
        >
          <Shield className="w-3 h-3" />
          Security
        </button>
        <button
          onClick={() => {
            const freeAddons = addons.filter(addon => addon.type === 'free');
            setSelectedAddons(new Set(freeAddons.map(a => a.id)));
          }}
          className="flex items-center gap-1 px-2 py-1 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md transition-colors"
        >
          <Download className="w-3 h-3" />
          Free Only
        </button>
      </div>

      {/* Individual addon checkboxes rendered by parent */}
      <div className="mt-4">
        <div className="grid gap-2">
          {addons.map(addon => (
            <div key={addon.id} className="flex items-center gap-3 p-2 bg-white dark:bg-slate-800/50 rounded-md">
              <Checkbox 
                id={`addon-${addon.id}`}
                checked={selectedAddons.has(addon.id)}
                onCheckedChange={() => toggleAddonSelection(addon.id)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <label htmlFor={`addon-${addon.id}`} className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-sm">{addon.name}</span>
                    <Badge variant={addon.type === 'premium' ? 'default' : 'secondary'} className="ml-2 text-xs">
                      {addon.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {addon.enabled ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        <Square className="w-3 h-3 mr-1" />
                        Inactive
                      </Badge>
                    )}
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}