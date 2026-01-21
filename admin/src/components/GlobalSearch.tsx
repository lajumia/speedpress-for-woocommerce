import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface Addon {
  id: string;
  name: string;
  description: string;
  type: 'free' | 'premium';
  enabled: boolean;
}

interface SearchResult extends Addon {
  category: string;
  categoryName: string;
}

interface GlobalSearchProps {
  addons: Record<string, Addon[]>;
  onAddonSelect?: (category: string, addonId: string) => void;
}

const categoryNames: Record<string, string> = {
  'product-addons': 'Product Addons',
  'cart-checkout': 'Cart & Checkout',
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
  'free-addons': 'Free Addons'
};

export function GlobalSearch({ addons, onAddonSelect }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Create searchable addon list
  const allAddons: SearchResult[] = Object.entries(addons).flatMap(([category, categoryAddons]) =>
    categoryAddons.map(addon => ({
      ...addon,
      category,
      categoryName: categoryNames[category] || category
    }))
  );

  // Filter results based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      setSelectedIndex(-1);
      return;
    }

    const filtered = allAddons.filter(addon => {
      const searchLower = searchTerm.toLowerCase();
      return (
        addon.name.toLowerCase().includes(searchLower) ||
        addon.description.toLowerCase().includes(searchLower) ||
        addon.categoryName.toLowerCase().includes(searchLower)
      );
    });

    // Sort results by relevance (name matches first, then description, then category)
    filtered.sort((a, b) => {
      const searchLower = searchTerm.toLowerCase();
      const aNameMatch = a.name.toLowerCase().includes(searchLower);
      const bNameMatch = b.name.toLowerCase().includes(searchLower);
      
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      
      return a.name.localeCompare(b.name);
    });

    setResults(filtered.slice(0, 8)); // Limit to 8 results
    setSelectedIndex(-1);
  }, [searchTerm, addons]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleAddonSelect(results[selectedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSearchTerm('');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddonSelect = (addon: SearchResult) => {
    onAddonSelect?.(addon.category, addon.id);
    setIsOpen(false);
    setSearchTerm('');
    setSelectedIndex(-1);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setResults([]);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const highlightMatch = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800/50 text-current rounded-sm px-0.5">
          {part}
        </mark> : part
    );
  };

  return (
    <div ref={searchRef} className="relative">
      {/* Search Input */}
      <div className="relative">
        <Button
          variant="ghost"
          className="w-full md:w-64 justify-start text-left gap-2 bg-accent/50 hover:bg-accent border border-border h-9 px-3"
          onClick={() => {
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
        >
          <Search className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground text-sm flex-1 truncate">
            {searchTerm || 'Search addons...'}
          </span>
          <kbd className="hide sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>

        {/* Active Search Input */}
        {isOpen && (
          <div className="absolute top-0 left-0 right-0 z-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search addons..."
                className="pl-10 pr-10 h-9 bg-background border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                autoFocus
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 w-7 h-7 hover:bg-muted"
                  onClick={clearSearch}
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.length === 0 && searchTerm.trim() ? (
            <div className="p-4 text-center text-muted-foreground">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No addons found for "{searchTerm}"</p>
              <p className="text-xs mt-1">Try searching for features, categories, or addon names</p>
            </div>
          ) : results.length === 0 && !searchTerm.trim() ? (
            <div className="p-4 text-center text-muted-foreground">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Start typing to search addons</p>
              <p className="text-xs mt-1">Search across {allAddons.length} available addons</p>
            </div>
          ) : (
            <div className="py-2">
              {results.map((addon, index) => (
                <button
                  key={`${addon.category}-${addon.id}`}
                  className={`w-full text-left px-4 py-3 hover:bg-accent transition-colors ${
                    index === selectedIndex ? 'bg-accent' : ''
                  }`}
                  onClick={() => handleAddonSelect(addon)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm truncate">
                          {highlightMatch(addon.name, searchTerm)}
                        </span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Badge 
                            variant={addon.type === 'premium' ? 'default' : 'secondary'}
                            className="text-xs px-2 py-0"
                          >
                            {addon.type}
                          </Badge>
                          {addon.enabled && (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {highlightMatch(addon.description, searchTerm)}
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        in {highlightMatch(addon.categoryName, searchTerm)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
              
              {results.length === 8 && (
                <div className="px-4 py-2 text-xs text-muted-foreground text-center border-t border-border bg-muted/30">
                  Showing first 8 results. Refine your search for more specific results.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}