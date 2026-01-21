import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Lightbulb, Target, Zap, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  icon: React.ReactNode;
  action?: {
    text: string;
    callback: () => void;
  };
}

interface OnboardingTourProps {
  isVisible: boolean;
  onComplete: () => void;
  onSkip: () => void;
  onTabChange?: (tab: string) => void;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to SpeedPress!',
    description: 'Let\'s take a quick tour to help you get the most out of your WooCommerce optimization suite.',
    target: 'dashboard',
    position: 'bottom',
    icon: <Lightbulb className="w-5 h-5 text-blue-500" />
  },
  {
    id: 'dashboard',
    title: 'Dashboard Overview',
    description: 'Monitor your store\'s performance metrics, active addons, and recent activities. Numbers animate each time you visit!',
    target: 'dashboard-stats',
    position: 'bottom',
    icon: <Target className="w-5 h-5 text-purple-500" />
  },
  {
    id: 'addons',
    title: 'Browse Addon Categories',
    description: 'Explore 150+ addons organized by functionality. Click any category to see available addons.',
    target: 'sidebar-categories',
    position: 'right',
    icon: <Zap className="w-5 h-5 text-green-500" />,
    action: {
      text: 'View Product Addons',
      callback: () => {}
    }
  },
  {
    id: 'search',
    title: 'Global Search',
    description: 'Quickly find any addon across all categories with real-time search filtering.',
    target: 'global-search',
    position: 'bottom',
    icon: <CheckCircle className="w-5 h-5 text-orange-500" />
  },
  {
    id: 'configuration',
    title: 'Configure Addons',
    description: 'Each addon has detailed configuration options. Enable what you need and customize settings to fit your store.',
    target: 'addon-cards',
    position: 'top',
    icon: <Target className="w-5 h-5 text-indigo-500" />
  }
];

export function OnboardingTour({ isVisible, onComplete, onSkip, onTabChange }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentStepData = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;
  const isFirstStep = currentStep === 0;

  useEffect(() => {
    if (!isVisible) return;

    // Handle step-specific actions
    if (currentStepData.id === 'addons' && onTabChange) {
      // Navigate to product-addons tab for demonstration
      setTimeout(() => {
        onTabChange('product-addons');
      }, 1000);
    }
  }, [currentStep, isVisible, onTabChange, currentStepData.id]);

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
      return;
    }

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      setIsAnimating(false);
    }, 200);
  };

  const handlePrevious = () => {
    if (isFirstStep) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(prev => prev - 1);
      setIsAnimating(false);
    }, 200);
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex === currentStep) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(stepIndex);
      setIsAnimating(false);
    }, 200);
  };

  const handleActionClick = () => {
    if (currentStepData.action?.callback) {
      currentStepData.action.callback();
    }
    handleNext();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" />
      
      {/* Tour Modal */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className={`bg-card border border-border rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-200 ${
          isAnimating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center gap-3">
              {currentStepData.icon}
              <div>
                <h3 className="font-semibold">{currentStepData.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    Step {currentStep + 1} of {onboardingSteps.length}
                  </Badge>
                </div>
              </div>
            </div>
            <button
              onClick={onSkip}
              className="p-1 hover:bg-accent rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pb-4">
            <div className="flex gap-1">
              {onboardingSteps.map((_, index) => (
                <Button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                    index <= currentStep
                      ? 'bg-blue-500'
                      : 'bg-muted'
                  } ${index === currentStep ? 'ring-2 ring-blue-500/30' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            <p className="text-muted-foreground leading-relaxed mb-6">
              {currentStepData.description}
            </p>

            {/* Step-specific content */}
            {currentStepData.id === 'welcome' && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-4 mb-6">
                <h4 className="font-medium mb-2 text-blue-800 dark:text-blue-200">Quick Setup Tips:</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Start with free addons to test functionality</li>
                  <li>• Enable performance monitoring first</li>
                  <li>• Configure cart recovery for immediate ROI</li>
                </ul>
              </div>
            )}

            {currentStepData.id === 'dashboard' && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg p-4 mb-6">
                <h4 className="font-medium mb-2 text-green-800 dark:text-green-200">Pro Tip:</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Click on any statistic card to see detailed breakdowns and trends over time.
                </p>
              </div>
            )}

            {/* Action Button */}
            {currentStepData.action && (
              <div className="mb-4">
                <Button 
                  onClick={handleActionClick}
                  variant="outline" 
                  size="sm"
                  className="w-full"
                >
                  {currentStepData.action.text}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                onClick={handlePrevious}
                variant="ghost"
                size="sm"
                disabled={isFirstStep}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <Button
                onClick={onSkip}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                Skip Tour
              </Button>

              <Button
                onClick={handleNext}
                size="sm"
                className="flex items-center gap-2"
              >
                {isLastStep ? 'Complete' : 'Next'}
                {!isLastStep && <ChevronRight className="w-4 h-4" />}
                {isLastStep && <CheckCircle className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}