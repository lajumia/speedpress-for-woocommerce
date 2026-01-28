import { useState, useRef, useEffect } from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  Youtube, 
  FileText, 
  Star, 
  Bug, 
  Lightbulb,
  ExternalLink,
  X,
  ChevronLeft,
  Palette
} from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
}

export function QuickActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { setTheme, theme } = useTheme();

  const quickActions: QuickAction[] = [
    {
      id: 'help',
      label: 'Help & Support',
      icon: <HelpCircle className="w-4 h-4" />,
      action: () => {
        console.log('Open Help & Support');
        setIsOpen(false);
      },
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'feature-request',
      label: 'Feature Request',
      icon: <Lightbulb className="w-4 h-4" />,
      action: () => {
        console.log('Open Feature Request');
        setIsOpen(false);
      },
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'youtube',
      label: 'Video Tutorials',
      icon: <Youtube className="w-4 h-4" />,
      action: () => {
        window.open('https://youtube.com/@speedpress', '_blank');
        setIsOpen(false);
      },
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      id: 'documentation',
      label: 'Documentation',
      icon: <FileText className="w-4 h-4" />,
      action: () => {
        console.log('Open Documentation');
        setIsOpen(false);
      },
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'rate-us',
      label: 'Rate & Review',
      icon: <Star className="w-4 h-4" />,
      action: () => {
        window.open('https://wordpress.org/plugins/speedpress/', '_blank');
        setIsOpen(false);
      },
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      id: 'bug-report',
      label: 'Report Bug',
      icon: <Bug className="w-4 h-4" />,
      action: () => {
        console.log('Open Bug Report');
        setIsOpen(false);
      },
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      id: 'live-chat',
      label: 'Live Chat',
      icon: <MessageSquare className="w-4 h-4" />,
      action: () => {
        console.log('Open Live Chat');
        setIsOpen(false);
      },
      color: 'bg-emerald-500 hover:bg-emerald-600'
    },
    {
      id: 'theme-toggle',
      label: 'Toggle Theme',
      icon: <Palette className="w-4 h-4" />,
      action: () => {
        const nextTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark';
        setTheme(nextTheme);
        setIsOpen(false);
      },
      color: 'bg-indigo-500 hover:bg-indigo-600'
    }
  ];

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isOpen]);

  return (
    <></>
    // <>
    //   {/* Backdrop */}
    //   {isOpen && (
    //     <div 
    //       className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
    //       onClick={() => setIsOpen(false)}
    //     />
    //   )}

    //   {/* Quick Action Menu */}
    //   <div
    //     ref={menuRef}
    //     className={`fixed bottom-24 right-6 z-50 transition-all duration-300 ease-out ${
    //       isOpen 
    //         ? 'translate-x-0 opacity-100 scale-100' 
    //         : 'translate-x-full opacity-0 scale-95 pointer-events-none'
    //     }`}
    //   >
    //     <div className="bg-card border border-border rounded-2xl shadow-2xl p-4 min-w-[280px] backdrop-blur-sm">
    //       {/* Menu Header */}
    //       <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
    //         <div className="flex items-center gap-3">
    //           <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
    //             <span className="text-white font-bold text-sm">SP</span>
    //           </div>
    //           <div>
    //             <h3 className="font-semibold text-sm">Quick Actions</h3>
    //             <p className="text-xs text-muted-foreground">Get help instantly</p>
    //           </div>
    //         </div>
    //         <Button
    //           variant="ghost"
    //           size="sm"
    //           onClick={() => setIsOpen(false)}
    //           className="h-8 w-8 p-0 hover:bg-accent"
    //         >
    //           <X className="w-4 h-4" />
    //         </Button>
    //       </div>

    //       {/* Quick Actions List */}
    //       <div className="space-y-2">
    //         {quickActions.map((action, index) => (
    //           <button
    //             key={action.id}
    //             onClick={action.action}
    //             className={`w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-all duration-200 group text-left transform hover:scale-[1.02] ${
    //               isOpen ? 'animate-in slide-in-from-right' : ''
    //             }`}
    //             style={{
    //               animationDelay: `${index * 50}ms`,
    //               animationDuration: '300ms',
    //               animationFillMode: 'backwards'
    //             }}
    //           >
    //             <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white transition-all duration-200 group-hover:scale-110 ${action.color}`}>
    //               {action.icon}
    //             </div>
    //             <div className="flex-1">
    //               <div className="font-medium text-sm">{action.label}</div>
    //             </div>
    //             <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors rotate-180" />
    //           </button>
    //         ))}
    //       </div>

    //       {/* Footer */}
    //       <div className="mt-4 pt-3 border-t border-border">
    //         <p className="text-xs text-muted-foreground text-center">
    //           SpeedPress v2.1.4 • Need more help?
    //         </p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Main FAB Button */}
    //   <button
    //     ref={buttonRef}
    //     onClick={() => setIsOpen(!isOpen)}
    //     className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
    //       isOpen ? 'scale-110 rotate-45' : 'hover:scale-105'
    //     }`}
    //     title="Quick Actions"
    //   >
    //     {isOpen ? (
    //       <X className="w-6 h-6 transition-transform duration-200" />
    //     ) : (
    //       <span className="font-bold text-lg group-hover:scale-110 transition-transform duration-200">
    //         SP
    //       </span>
    //     )}
        
    //     {/* Pulse animation ring */}
    //     <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 ${
    //       isOpen ? 'animate-none' : 'animate-ping'
    //     } opacity-20`} />
        
    //     {/* Notification dot */}
    //     <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
    //       <span className="text-[10px] font-semibold text-white">!</span>
    //     </div>
    //   </button>

    //   {/* Floating tooltip when closed */}
    //   {!isOpen && (
    //     <div className="fixed bottom-6 right-24 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
    //       <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
    //         Quick Actions
    //         <div className="absolute top-1/2 -right-1 w-2 h-2 bg-gray-900 rotate-45 transform -translate-y-1/2" />
    //       </div>
    //     </div>
    //   )}
    // </>
  );
}