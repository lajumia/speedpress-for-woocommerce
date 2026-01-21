<?php
/**
 * Plugin Name: SpeedPress for WooCommerce
 * Plugin URI:  https://example.com/speedpress-for-woocommerce
 * Description: A collection of WooCommerce addons with React & TypeScript.
 * Version:     1.0.0
 * Author:      Your Name
 * Author URI:  https://example.com
 * License:     GPL2+
 * Text Domain: speedpress-for-woocommerce
 * Requires Plugins: woocommerce
 */

defined('ABSPATH') || exit;

// Define plugin constants
define("SPWA_FILE",__FILE__);
define('SPWA_PATH', plugin_dir_path(__FILE__));
define('SPWA_URL', plugin_dir_url(__FILE__));

// Load DB class
require_once SPWA_PATH . 'includes/class-spwa-db.php';

// Include loader class
require_once SPWA_PATH . 'includes/class-spwa-loader.php';

// Include addons class
require_once SPWA_PATH . 'modules/class-spwa-modules.php';

// Include APIs class
require_once SPWA_PATH . 'includes/class-spwa-api.php';

// Include customizer class
require_once SPWA_PATH . 'includes/class-spwa-customizer.php';

