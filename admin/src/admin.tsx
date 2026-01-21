import { useState, useEffect } from 'react';
import { AdminSidebar } from './components/AdminSidebar';
import { ContentArea } from './components/ContentArea';
import { QuickActionButton } from './components/QuickActionButton';
import { ThemeProvider } from './components/ThemeProvider';
import { AddonConfigModal } from './components/AddonConfigModal';
import { OnboardingTour } from './components/OnboardingTour';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

interface Addon {
  id: string;
  name: string;
  description: string;
  type: 'free' | 'premium';
  enabled: boolean;
}

const mockAddons: Record<string, Addon[]> = {
  // 'general-addons':[{
  //   id: 'product-views-counter',
  //   name: 'Product Views Counter',
  //   description: 'This addon will show how many times product is viewed or clicked by customer.',
  //   type: 'free',
  //   enabled: false
  // }]
  // 'product-addons': [
  //   {
  //     id: 'product-bundles',
  //     name: 'Product Bundles',
  //     description: 'Create product bundles with discounted pricing to increase average order value.',
  //     type: 'premium',
  //     enabled: true
  //   },
  //   {
  //     id: 'product-tabs',
  //     name: 'Custom Product Tabs',
  //     description: 'Add custom tabs to product pages with rich content and media.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'product-badges',
  //     name: 'Product Badges',
  //     description: 'Display eye-catching badges on products like "Sale", "New", or custom labels.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'quick-view',
  //     name: 'Quick View Modal',
  //     description: 'Allow customers to preview products in a modal without leaving the page.',
  //     type: 'premium',
  //     enabled: true
  //   },
  //   {
  //     id: 'product-360',
  //     name: '360 Product View',
  //     description: 'Interactive 360-degree product images for immersive shopping.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'product-video',
  //     name: 'Product Video Gallery',
  //     description: 'Add video galleries to showcase products in action.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'zoom-magnifier',
  //     name: 'Image Zoom & Magnifier',
  //     description: 'Enable image zoom functionality for detailed product viewing.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'product-compare',
  //     name: 'Product Comparison',
  //     description: 'Allow customers to compare multiple products side by side.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'size-guide',
  //     name: 'Size Guide & Charts',
  //     description: 'Interactive size guides to reduce returns and improve satisfaction.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'color-swatches',
  //     name: 'Color & Attribute Swatches',
  //     description: 'Visual swatches for product variations and attributes.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'stock-alerts',
  //     name: 'Stock Alert Notifications',
  //     description: 'Notify customers when out-of-stock products are available.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'bulk-discounts',
  //     name: 'Bulk Quantity Discounts',
  //     description: 'Automatic discounts based on quantity purchased.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'product-enquiry',
  //     name: 'Product Enquiry Form',
  //     description: 'Contact forms for product-specific customer inquiries.',
  //     type: 'free',
  //     enabled: false
  //   },
  //   {
  //     id: 'recently-viewed',
  //     name: 'Recently Viewed Products',
  //     description: 'Show customers their recently viewed products.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'product-sharing',
  //     name: 'Social Product Sharing',
  //     description: 'Social media sharing buttons for products.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'product-reviews-pro',
  //     name: 'Advanced Product Reviews',
  //     description: 'Enhanced review system with photos and verified purchases.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'product-faq',
  //     name: 'Product FAQ Section',
  //     description: 'Dedicated FAQ sections for each product.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'product-countdown',
  //     name: 'Product Sale Countdown',
  //     description: 'Countdown timers for product-specific sales.',
  //     type: 'premium',
  //     enabled: false
  //   }
  // ],
  // 'cart-checkout': [
  //   {
  //     id: 'cart-abandonment',
  //     name: 'Cart Abandonment Recovery',
  //     description: 'Automatically send recovery emails to customers who abandon their carts.',
  //     type: 'premium',
  //     enabled: true
  //   },
  //   {
  //     id: 'one-click-checkout',
  //     name: 'One-Click Checkout',
  //     description: 'Streamline the checkout process with a single-click purchase option.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'cart-drawer',
  //     name: 'Sliding Cart Drawer',
  //     description: 'Show cart contents in a sliding drawer without page reload.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'checkout-fields',
  //     name: 'Custom Checkout Fields',
  //     description: 'Add custom fields to the checkout form for additional customer information.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'guest-checkout',
  //     name: 'Enhanced Guest Checkout',
  //     description: 'Streamlined checkout process for guest customers.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'cart-upsells',
  //     name: 'Cart Page Upsells',
  //     description: 'Show related products and upsells on the cart page.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'checkout-upsells',
  //     name: 'Checkout Page Upsells',
  //     description: 'Add upsell offers during the checkout process.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'save-cart',
  //     name: 'Save & Share Cart',
  //     description: 'Allow customers to save and share their shopping carts.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'mini-cart-widget',
  //     name: 'Mini Cart Widget',
  //     description: 'Floating mini cart with quick add/remove functionality.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'checkout-progress',
  //     name: 'Checkout Progress Indicator',
  //     description: 'Visual progress bar for multi-step checkout process.',
  //     type: 'free',
  //     enabled: false
  //   },
  //   {
  //     id: 'order-notes',
  //     name: 'Enhanced Order Notes',
  //     description: 'Rich text order notes with file attachments.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'address-validation',
  //     name: 'Address Validation',
  //     description: 'Real-time address validation and auto-completion.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'delivery-date',
  //     name: 'Delivery Date Picker',
  //     description: 'Allow customers to select preferred delivery dates.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'checkout-coupons',
  //     name: 'Smart Coupon Suggestions',
  //     description: 'Automatically suggest applicable coupons at checkout.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'cart-timer',
  //     name: 'Cart Reservation Timer',
  //     description: 'Reserve cart items for a limited time to create urgency.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'quantity-breaks',
  //     name: 'Quantity Break Pricing',
  //     description: 'Display tiered pricing based on quantity in cart.',
  //     type: 'premium',
  //     enabled: false
  //   }
  // ],
  // 'shipping-payment': [
  //   {
  //     id: 'shipping-calculator',
  //     name: 'Advanced Shipping Calculator',
  //     description: 'Provide accurate shipping costs with multiple carrier integrations.',
  //     type: 'premium',
  //     enabled: true
  //   },
  //   {
  //     id: 'local-delivery',
  //     name: 'Local Delivery Scheduler',
  //     description: 'Allow customers to schedule local delivery with time slot selection.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'payment-icons',
  //     name: 'Payment Method Icons',
  //     description: 'Display accepted payment method icons to build customer trust.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'shipping-zones-pro',
  //     name: 'Advanced Shipping Zones',
  //     description: 'Complex shipping zone configuration with multiple conditions.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'free-shipping-bar',
  //     name: 'Free Shipping Progress Bar',
  //     description: 'Show customers how much more they need to spend for free shipping.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'multi-currency',
  //     name: 'Multi-Currency Support',
  //     description: 'Support multiple currencies with automatic conversion.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'cod-fee',
  //     name: 'Cash on Delivery Fee',
  //     description: 'Add configurable fees for cash on delivery orders.',
  //     type: 'free',
  //     enabled: false
  //   },
  //   {
  //     id: 'express-checkout',
  //     name: 'Express Payment Methods',
  //     description: 'Apple Pay, Google Pay, and PayPal Express integration.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'shipping-protection',
  //     name: 'Shipping Insurance',
  //     description: 'Offer shipping protection and insurance options.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'pickup-locations',
  //     name: 'Store Pickup Locations',
  //     description: 'Allow customers to pick up orders from physical locations.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'shipping-estimator',
  //     name: 'Shipping Cost Estimator',
  //     description: 'Estimate shipping costs on product and cart pages.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'payment-plans',
  //     name: 'Installment Payment Plans',
  //     description: 'Offer flexible payment plans and installments.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'tax-exemption',
  //     name: 'Tax Exemption Manager',
  //     description: 'Handle tax-exempt customers and organizations.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'shipping-labels',
  //     name: 'Automatic Shipping Labels',
  //     description: 'Generate shipping labels automatically for orders.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'delivery-slots',
  //     name: 'Delivery Time Slots',
  //     description: 'Allow customers to choose specific delivery time windows.',
  //     type: 'premium',
  //     enabled: false
  //   }
  // ],
  // 'marketing-sales': [
  //   {
  //     id: 'flash-sales',
  //     name: 'Flash Sales Timer',
  //     description: 'Create urgency with countdown timers for limited-time offers.',
  //     type: 'premium',
  //     enabled: true
  //   },
  //   {
  //     id: 'social-proof',
  //     name: 'Social Proof Notifications',
  //     description: 'Show recent purchases and customer activity to boost conversions.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'wishlist',
  //     name: 'Product Wishlist',
  //     description: 'Let customers save products for later purchase.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'cross-sell',
  //     name: 'Smart Cross-Sell',
  //     description: 'Automatically suggest related products based on purchase history.',
  //     type: 'premium',
  //     enabled: true
  //   },
  //   {
  //     id: 'popup-campaigns',
  //     name: 'Marketing Popups',
  //     description: 'Create targeted popup campaigns for promotions and lead capture.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'loyalty-program',
  //     name: 'Customer Loyalty Program',
  //     description: 'Reward customers with points and exclusive benefits.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'referral-system',
  //     name: 'Referral & Affiliate System',
  //     description: 'Turn customers into brand ambassadors with referral rewards.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'exit-intent',
  //     name: 'Exit Intent Campaigns',
  //     description: 'Capture leaving visitors with targeted offers.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'email-capture',
  //     name: 'Email Capture Forms',
  //     description: 'Beautiful forms to capture email addresses for marketing.',
  //     type: 'free',
  //     enabled: false
  //   },
  //   {
  //     id: 'product-recommendations',
  //     name: 'AI Product Recommendations',
  //     description: 'Machine learning powered product suggestions.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'dynamic-pricing',
  //     name: 'Dynamic Pricing Rules',
  //     description: 'Automated pricing based on various conditions and rules.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'coupon-campaigns',
  //     name: 'Advanced Coupon Campaigns',
  //     description: 'Create sophisticated coupon and discount campaigns.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'urgency-indicators',
  //     name: 'Urgency & Scarcity Indicators',
  //     description: 'Show stock levels and create buying urgency.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'seasonal-campaigns',
  //     name: 'Seasonal Marketing Campaigns',
  //     description: 'Pre-built templates for holiday and seasonal promotions.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'abandoned-browse',
  //     name: 'Abandoned Browse Recovery',
  //     description: 'Re-engage customers who viewed products but didn\'t purchase.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'social-login',
  //     name: 'Social Media Login',
  //     description: 'Allow customers to login with social media accounts.',
  //     type: 'free',
  //     enabled: false
  //   },
  //   {
  //     id: 'review-incentives',
  //     name: 'Review Incentive System',
  //     description: 'Encourage customer reviews with rewards and incentives.',
  //     type: 'premium',
  //     enabled: false
  //   }
  // ],
  // 'reports-analytics': [
  //   {
  //     id: 'advanced-reports',
  //     name: 'Advanced Sales Reports',
  //     description: 'Get detailed insights into your sales performance with custom date ranges.',
  //     type: 'premium',
  //     enabled: true
  //   },
  //   {
  //     id: 'customer-analytics',
  //     name: 'Customer Behavior Analytics',
  //     description: 'Track customer behavior and identify optimization opportunities.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'basic-stats',
  //     name: 'Basic Statistics',
  //     description: 'View essential store statistics and key performance indicators.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'conversion-tracking',
  //     name: 'Conversion Funnel Analytics',
  //     description: 'Track customer journey from visit to purchase.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'inventory-reports',
  //     name: 'Inventory Analytics',
  //     description: 'Detailed reports on stock levels, turnover, and trends.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'customer-lifetime',
  //     name: 'Customer Lifetime Value',
  //     description: 'Calculate and track customer lifetime value metrics.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'abandoned-cart-analytics',
  //     name: 'Abandoned Cart Analytics',
  //     description: 'Detailed insights into cart abandonment patterns.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'product-performance',
  //     name: 'Product Performance Reports',
  //     description: 'Analyze which products are performing best.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'geographic-reports',
  //     name: 'Geographic Sales Reports',
  //     description: 'Sales analytics broken down by geographic location.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'cohort-analysis',
  //     name: 'Customer Cohort Analysis',
  //     description: 'Analyze customer retention and behavior over time.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'profit-analytics',
  //     name: 'Profit & Margin Analytics',
  //     description: 'Track profit margins and cost of goods sold.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'traffic-analytics',
  //     name: 'Traffic Source Analytics',
  //     description: 'Analyze where your customers are coming from.',
  //     type: 'free',
  //     enabled: false
  //   },
  //   {
  //     id: 'email-performance',
  //     name: 'Email Campaign Analytics',
  //     description: 'Track performance of email marketing campaigns.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'search-analytics',
  //     name: 'Site Search Analytics',
  //     description: 'Analyze internal site search behavior and results.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'export-reports',
  //     name: 'Report Export & Scheduling',
  //     description: 'Export reports to various formats and schedule automated reports.',
  //     type: 'premium',
  //     enabled: false
  //   }
  // ],
  // 'seo-performance': [
  //   {
  //     id: 'seo-optimizer',
  //     name: 'SEO Meta Optimizer',
  //     description: 'Automatically optimize meta titles, descriptions, and keywords for products.',
  //     type: 'premium',
  //     enabled: true
  //   },
  //   {
  //     id: 'sitemap-generator',
  //     name: 'Advanced XML Sitemap',
  //     description: 'Generate comprehensive XML sitemaps for better search engine indexing.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'schema-markup',
  //     name: 'Rich Schema Markup',
  //     description: 'Add structured data markup for enhanced search results.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'page-speed-optimizer',
  //     name: 'Page Speed Optimizer',
  //     description: 'Image compression, lazy loading, and caching optimization.',
  //     type: 'premium',
  //     enabled: true
  //   },
  //   {
  //     id: 'minify-assets',
  //     name: 'CSS/JS Minification',
  //     description: 'Minify and combine CSS and JavaScript files for faster loading.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'breadcrumbs',
  //     name: 'SEO Breadcrumbs',
  //     description: 'Add structured breadcrumb navigation for better SEO.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'redirect-manager',
  //     name: '301 Redirect Manager',
  //     description: 'Manage redirects to maintain SEO value during site changes.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'robots-txt',
  //     name: 'Robots.txt Manager',
  //     description: 'Easily manage robots.txt file for search engine crawling.',
  //     type: 'free',
  //     enabled: false
  //   },
  //   {
  //     id: 'core-web-vitals',
  //     name: 'Core Web Vitals Monitor',
  //     description: 'Track and optimize Core Web Vitals performance metrics.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'image-alt-optimizer',
  //     name: 'Image Alt Text Optimizer',
  //     description: 'Automatically generate and optimize image alt text for SEO.',
  //     type: 'premium',
  //     enabled: false
  //   }
  // ],
  // 'customer-management': [
  //   {
  //     id: 'customer-dashboard',
  //     name: 'Enhanced Customer Dashboard',
  //     description: 'Advanced customer account dashboard with order history and preferences.',
  //     type: 'premium',
  //     enabled: true
  //   },
  //   {
  //     id: 'customer-groups',
  //     name: 'Customer Groups & Tiers',
  //     description: 'Organize customers into groups with different pricing and benefits.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'customer-messaging',
  //     name: 'Customer Messaging System',
  //     description: 'Built-in messaging system for customer communication.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'birthday-campaigns',
  //     name: 'Birthday & Anniversary Campaigns',
  //     description: 'Automated birthday and anniversary marketing campaigns.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'customer-profiles',
  //     name: 'Extended Customer Profiles',
  //     description: 'Detailed customer profiles with preferences and behavior tracking.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'support-tickets',
  //     name: 'Customer Support Tickets',
  //     description: 'Integrated support ticket system for customer inquiries.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'customer-notes',
  //     name: 'Customer Notes & Tags',
  //     description: 'Add private notes and tags to customer accounts.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'account-registration',
  //     name: 'Enhanced Account Registration',
  //     description: 'Customizable registration forms with additional fields.',
  //     type: 'free',
  //     enabled: false
  //   },
  //   {
  //     id: 'customer-avatars',
  //     name: 'Customer Profile Avatars',
  //     description: 'Allow customers to upload and manage profile pictures.',
  //     type: 'free',
  //     enabled: false
  //   },
  //   {
  //     id: 'purchase-history',
  //     name: 'Detailed Purchase History',
  //     description: 'Enhanced order history with reorder and tracking features.',
  //     type: 'premium',
  //     enabled: false
  //   }
  // ],
  // 'inventory-management': [
  //   {
  //     id: 'stock-alerts',
  //     name: 'Advanced Stock Alerts',
  //     description: 'Multi-level stock alerts with automated reorder suggestions.',
  //     type: 'premium',
  //     enabled: true
  //   },
  //   {
  //     id: 'bulk-inventory',
  //     name: 'Bulk Inventory Management',
  //     description: 'Import/export and bulk edit inventory levels and details.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'supplier-management',
  //     name: 'Supplier Management System',
  //     description: 'Manage suppliers, purchase orders, and restock schedules.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'inventory-tracking',
  //     name: 'Real-time Inventory Tracking',
  //     description: 'Track inventory movements and stock levels in real-time.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'low-stock-reports',
  //     name: 'Low Stock Reports',
  //     description: 'Automated reports for products running low on stock.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'inventory-forecasting',
  //     name: 'Inventory Forecasting',
  //     description: 'AI-powered inventory forecasting based on sales trends.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'barcode-scanner',
  //     name: 'Barcode Scanner Integration',
  //     description: 'Mobile barcode scanning for inventory management.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'warehouse-management',
  //     name: 'Multi-Warehouse Management',
  //     description: 'Manage inventory across multiple warehouse locations.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'product-bundles-inventory',
  //     name: 'Bundle Inventory Tracking',
  //     description: 'Track inventory for product bundles and kits.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'expiry-tracking',
  //     name: 'Product Expiry Tracking',
  //     description: 'Track expiration dates for perishable products.',
  //     type: 'premium',
  //     enabled: false
  //   }
  // ],
  // 'security-compliance': [
  //   {
  //     id: 'security-scanner',
  //     name: 'Security Vulnerability Scanner',
  //     description: 'Regular security scans and vulnerability assessments.',
  //     type: 'premium',
  //     enabled: true
  //   },
  //   {
  //     id: 'gdpr-compliance',
  //     name: 'GDPR Compliance Kit',
  //     description: 'Complete GDPR compliance tools and privacy management.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'ssl-monitor',
  //     name: 'SSL Certificate Monitor',
  //     description: 'Monitor SSL certificate status and expiration dates.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'two-factor-auth',
  //     name: 'Two-Factor Authentication',
  //     description: 'Enhanced security with 2FA for admin and customer accounts.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'login-security',
  //     name: 'Login Security & Monitoring',
  //     description: 'Monitor login attempts and block suspicious activity.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'data-backup',
  //     name: 'Automated Data Backup',
  //     description: 'Scheduled backups of store data and configurations.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'privacy-policy',
  //     name: 'Privacy Policy Generator',
  //     description: 'Generate compliant privacy policies for your store.',
  //     type: 'free',
  //     enabled: false
  //   },
  //   {
  //     id: 'cookie-consent',
  //     name: 'Cookie Consent Manager',
  //     description: 'GDPR-compliant cookie consent management.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'firewall-protection',
  //     name: 'Web Application Firewall',
  //     description: 'Advanced firewall protection against common attacks.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'audit-logs',
  //     name: 'Security Audit Logs',
  //     description: 'Comprehensive logging of security events and admin actions.',
  //     type: 'premium',
  //     enabled: false
  //   }
  // ],
  // 'integrations-api': [
  //   {
  //     id: 'rest-api-extended',
  //     name: 'Extended REST API',
  //     description: 'Additional REST API endpoints for advanced integrations.',
  //     type: 'premium',
  //     enabled: true
  //   },
  //   {
  //     id: 'webhook-manager',
  //     name: 'Advanced Webhook Manager',
  //     description: 'Manage webhooks for real-time data synchronization.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'zapier-integration',
  //     name: 'Zapier Integration',
  //     description: 'Connect with 3000+ apps through Zapier automation.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'google-analytics',
  //     name: 'Google Analytics 4 Integration',
  //     description: 'Enhanced Google Analytics tracking with ecommerce events.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'facebook-pixel',
  //     name: 'Facebook Pixel Integration',
  //     description: 'Advanced Facebook Pixel tracking for ads optimization.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'mailchimp-sync',
  //     name: 'Mailchimp Synchronization',
  //     description: 'Sync customers and orders with Mailchimp campaigns.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'crm-integration',
  //     name: 'CRM Integration Hub',
  //     description: 'Connect with popular CRM systems like HubSpot and Salesforce.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'accounting-sync',
  //     name: 'Accounting Software Sync',
  //     description: 'Sync with QuickBooks, Xero, and other accounting platforms.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'social-media-sync',
  //     name: 'Social Media Synchronization',
  //     description: 'Sync products with Facebook Shop, Instagram, and more.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'api-rate-limiter',
  //     name: 'API Rate Limiter',
  //     description: 'Control and monitor API usage with rate limiting.',
  //     type: 'free',
  //     enabled: false
  //   }
  // ],
  // 'content-design': [
  //   {
  //     id: 'page-builder',
  //     name: 'Drag & Drop Page Builder',
  //     description: 'Visual page builder for creating custom layouts and pages.',
  //     type: 'premium',
  //     enabled: true
  //   },
  //   {
  //     id: 'theme-customizer',
  //     name: 'Advanced Theme Customizer',
  //     description: 'Extensive theme customization without coding.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'custom-css',
  //     name: 'Custom CSS Editor',
  //     description: 'Live CSS editor with syntax highlighting and preview.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'content-templates',
  //     name: 'Content Template Library',
  //     description: 'Pre-built templates for product pages, landing pages, and more.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'mega-menu',
  //     name: 'Mega Menu Builder',
  //     description: 'Create advanced mega menus with products and categories.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'custom-fonts',
  //     name: 'Custom Font Manager',
  //     description: 'Upload and manage custom fonts for your store.',
  //     type: 'free',
  //     enabled: false
  //   },
  //   {
  //     id: 'slider-builder',
  //     name: 'Advanced Slider Builder',
  //     description: 'Create responsive sliders and carousels for any page.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'banner-manager',
  //     name: 'Banner & Promotion Manager',
  //     description: 'Create and manage promotional banners across your site.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'footer-builder',
  //     name: 'Custom Footer Builder',
  //     description: 'Design custom footers with widgets and layouts.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'color-schemes',
  //     name: 'Color Scheme Manager',
  //     description: 'Pre-defined color schemes and palette generator.',
  //     type: 'free',
  //     enabled: false
  //   }
  // ],
  // 'mobile-apps': [
  //   {
  //     id: 'mobile-app-builder',
  //     name: 'Mobile App Builder',
  //     description: 'Generate native mobile apps for iOS and Android.',
  //     type: 'premium',
  //     enabled: true
  //   },
  //   {
  //     id: 'pwa-generator',
  //     name: 'Progressive Web App',
  //     description: 'Convert your store into a Progressive Web App.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'mobile-optimization',
  //     name: 'Mobile Speed Optimization',
  //     description: 'Optimize your store specifically for mobile devices.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'app-notifications',
  //     name: 'Push Notifications',
  //     description: 'Send push notifications to mobile app users.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'mobile-checkout',
  //     name: 'Mobile-First Checkout',
  //     description: 'Optimized checkout experience for mobile devices.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'touch-gestures',
  //     name: 'Touch Gesture Support',
  //     description: 'Enhanced touch gestures for mobile product galleries.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'offline-mode',
  //     name: 'Offline Mode Support',
  //     description: 'Allow browsing and cart functionality when offline.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'mobile-search',
  //     name: 'Mobile Search Enhancement',
  //     description: 'Voice search and enhanced mobile search experience.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'app-analytics',
  //     name: 'Mobile App Analytics',
  //     description: 'Detailed analytics for mobile app usage and behavior.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'mobile-payments',
  //     name: 'Mobile Payment Optimization',
  //     description: 'Optimized mobile payments with Apple Pay and Google Pay.',
  //     type: 'premium',
  //     enabled: false
  //   }
  // ],
  // 'automation-workflows': [
  //   {
  //     id: 'workflow-builder',
  //     name: 'Visual Workflow Builder',
  //     description: 'Create automated workflows with drag-and-drop interface.',
  //     type: 'premium',
  //     enabled: true
  //   },
  //   {
  //     id: 'email-automation',
  //     name: 'Email Marketing Automation',
  //     description: 'Automated email sequences based on customer behavior.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'order-automation',
  //     name: 'Order Processing Automation',
  //     description: 'Automate order fulfillment and status updates.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'inventory-automation',
  //     name: 'Inventory Automation Rules',
  //     description: 'Automatic inventory updates and reorder triggers.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'customer-tagging',
  //     name: 'Automated Customer Tagging',
  //     description: 'Automatically tag customers based on behavior and purchases.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'price-automation',
  //     name: 'Dynamic Pricing Automation',
  //     description: 'Automated pricing rules based on inventory and demand.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'task-scheduler',
  //     name: 'Task Scheduler',
  //     description: 'Schedule recurring tasks and maintenance operations.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'conditional-logic',
  //     name: 'Conditional Logic Engine',
  //     description: 'Create if-then rules for various store operations.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'trigger-actions',
  //     name: 'Custom Trigger Actions',
  //     description: 'Define custom triggers and automated responses.',
  //     type: 'premium',
  //     enabled: false
  //   },
  //   {
  //     id: 'workflow-analytics',
  //     name: 'Workflow Performance Analytics',
  //     description: 'Track and analyze automated workflow performance.',
  //     type: 'premium',
  //     enabled: false
  //   }
  // ],
  // 'free-addons': [
  //   {
  //     id: 'product-badges-free',
  //     name: 'Product Badges',
  //     description: 'Display eye-catching badges on products like "Sale", "New", or custom labels.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'cart-drawer-free',
  //     name: 'Sliding Cart Drawer',
  //     description: 'Show cart contents in a sliding drawer without page reload.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'payment-icons-free',
  //     name: 'Payment Method Icons',
  //     description: 'Display accepted payment method icons to build customer trust.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'wishlist-free',
  //     name: 'Product Wishlist',
  //     description: 'Let customers save products for later purchase.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'basic-stats-free',
  //     name: 'Basic Statistics',
  //     description: 'View essential store statistics and key performance indicators.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'zoom-magnifier-free',
  //     name: 'Image Zoom & Magnifier',
  //     description: 'Enable image zoom functionality for detailed product viewing.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'color-swatches-free',
  //     name: 'Color & Attribute Swatches',
  //     description: 'Visual swatches for product variations and attributes.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'product-enquiry-free',
  //     name: 'Product Enquiry Form',
  //     description: 'Contact forms for product-specific customer inquiries.',
  //     type: 'free',
  //     enabled: false
  //   },
  //   {
  //     id: 'recently-viewed-free',
  //     name: 'Recently Viewed Products',
  //     description: 'Show customers their recently viewed products.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'product-sharing-free',
  //     name: 'Social Product Sharing',
  //     description: 'Social media sharing buttons for products.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'guest-checkout-free',
  //     name: 'Enhanced Guest Checkout',
  //     description: 'Streamlined checkout process for guest customers.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'mini-cart-widget-free',
  //     name: 'Mini Cart Widget',
  //     description: 'Floating mini cart with quick add/remove functionality.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'checkout-progress-free',
  //     name: 'Checkout Progress Indicator',
  //     description: 'Visual progress bar for multi-step checkout process.',
  //     type: 'free',
  //     enabled: false
  //   },
  //   {
  //     id: 'free-shipping-bar-free',
  //     name: 'Free Shipping Progress Bar',
  //     description: 'Show customers how much more they need to spend for free shipping.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'cod-fee-free',
  //     name: 'Cash on Delivery Fee',
  //     description: 'Add configurable fees for cash on delivery orders.',
  //     type: 'free',
  //     enabled: false
  //   },
  //   {
  //     id: 'shipping-estimator-free',
  //     name: 'Shipping Cost Estimator',
  //     description: 'Estimate shipping costs on product and cart pages.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'email-capture-free',
  //     name: 'Email Capture Forms',
  //     description: 'Beautiful forms to capture email addresses for marketing.',
  //     type: 'free',
  //     enabled: false
  //   },
  //   {
  //     id: 'urgency-indicators-free',
  //     name: 'Urgency & Scarcity Indicators',
  //     description: 'Show stock levels and create buying urgency.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'social-login-free',
  //     name: 'Social Media Login',
  //     description: 'Allow customers to login with social media accounts.',
  //     type: 'free',
  //     enabled: false
  //   },
  //   {
  //     id: 'product-performance-free',
  //     name: 'Product Performance Reports',
  //     description: 'Analyze which products are performing best.',
  //     type: 'free',
  //     enabled: true
  //   },
  //   {
  //     id: 'traffic-analytics-free',
  //     name: 'Traffic Source Analytics',
  //     description: 'Analyze where your customers are coming from.',
  //     type: 'free',
  //     enabled: false
  //   }
  // ]
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [addons, setAddons] = useState(mockAddons);
  const [filter, setFilter] = useState<'all' | 'free' | 'premium'>('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardVisitCount, setDashboardVisitCount] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [configModal, setConfigModal] = useState<{
    isOpen: boolean;
    addonId: string;
    addonName: string;
    addonType: 'free' | 'premium';
    category: string;
  }>({
    isOpen: false,
    addonId: '',
    addonName: '',
    addonType: 'free',
    category: ''
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setFilter('all'); // Reset filter when switching tabs
    setSidebarOpen(false); // Close mobile sidebar when tab changes
    
    // Increment dashboard visit count when switching to dashboard
    if (tab === 'dashboard') {
      setDashboardVisitCount(prev => prev + 1);
    }
  };

  // Check for first-time user and show onboarding
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('speedpress-onboarding-completed');
    if (!hasSeenOnboarding) {
      // Delay onboarding slightly to let the UI render
      setTimeout(() => {
        setShowOnboarding(true);
      }, 1000);
    }
    
    // Increment dashboard visit count on initial load since we start on dashboard
    if (activeTab === 'dashboard') {
      setDashboardVisitCount(1);
    }
  }, []);

  const handleToggleAddon = (tabId: string, addonId: string) => {
    setAddons(prev => ({
      ...prev,
      [tabId]: prev[tabId]?.map(addon => 
        addon.id === addonId 
          ? { ...addon, enabled: !addon.enabled }
          : addon
      ) || []
    }));

    const addon = addons[tabId]?.find(a => a.id === addonId);
    if (addon) {
      toast.success(`${addon.name} ${addon.enabled ? 'disabled' : 'enabled'} successfully`);
    }
  };

  const handleConfigureAddon = (tabId: string, addonId: string) => {
    const addon = addons[tabId]?.find(a => a.id === addonId);
    if (addon) {
      setConfigModal({
        isOpen: true,
        addonId: addon.id,
        addonName: addon.name,
        addonType: addon.type,
        category: tabId
      });
    }
  };

  const closeConfigModal = () => {
    setConfigModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('speedpress-onboarding-completed', 'true');
    setShowOnboarding(false);
    toast.success('Welcome to SpeedPress! You\'re all set up.');
  };

  const handleOnboardingSkip = () => {
    localStorage.setItem('speedpress-onboarding-completed', 'true');
    setShowOnboarding(false);
  };

  const getAddons = async () => {
    try {
      if (!window.SPWAAdmin) throw new Error("SPWAAdmin not available");

      const response = await fetch("/wordpress/wp-json/spwa/v1/get-addons", {
        headers: {
          "X-WP-Nonce": window.SPWAAdmin.nonce,
        },
      });

      const data = await response.json();

      if (data.success) {
        setAddons(data.addons); // already grouped ✅
        console.log(data.addons);
      } else {
        console.error(data.message);
      }
    } catch (error) {
    
      console.error("Error fetching addons:", error);
    }
  };
  useEffect(() => {
    getAddons();
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="speedpress-theme">
      <div className="h-screen bg-background flex transition-colors duration-300">
        {/* Desktop Sidebar */}
        <div className=" lg:block hide">
          <AdminSidebar 
            activeTab={activeTab}
            onTabChange={handleTabChange}
            addons={addons}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-50 lg:hide"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute left-0 top-0 h-full w-64 bg-background">
              <AdminSidebar 
                activeTab={activeTab}
                onTabChange={handleTabChange}
                addons={addons}
                isMobile={true}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        <div className="flex-1 h-full">
          <ContentArea 
            activeTab={activeTab}
            addons={addons}
            filter={filter}
            dashboardVisitCount={dashboardVisitCount}
            onFilterChange={setFilter}
            onToggleAddon={handleToggleAddon}
            onConfigureAddon={handleConfigureAddon}
            onOpenSidebar={() => setSidebarOpen(true)}
            onTabChange={handleTabChange}
          />
        </div>
        <QuickActionButton />
        <OnboardingTour
          isVisible={showOnboarding}
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
          onTabChange={handleTabChange}
        />
        <AddonConfigModal
          isOpen={configModal.isOpen}
          onClose={closeConfigModal}
          addonId={configModal.addonId}
          addonName={configModal.addonName}
          addonType={configModal.addonType}
        />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}