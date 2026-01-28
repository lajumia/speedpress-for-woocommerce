<?php
/**
 * Plugin Name:       SpeedPress for WooCommerce
 * Plugin URI:        https://wpspeedpress.com/speedpress-for-woocommerce/
 * Description:       SpeedPress for WooCommerce is a collection of lightweight, performance-focused WooCommerce addons designed to improve speed, usability, and conversion rates.
 * Version:           1.0.0
 * Author:            Md Laju Miah
 * Author URI:        https://profiles.wordpress.org/devlaju/
 * Text Domain:       speedpress-for-woocommerce
 * Domain Path:       /languages
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Requires Plugins:  woocommerce
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

