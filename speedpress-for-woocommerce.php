<?php
/**
 * Plugin Name: PBWR – Plugin Boilerplate With React
 * Description: Modular WordPress plugin boilerplate with a React-powered admin and public interface.
 * Version: 1.0.0
 * Author: Your Name
 * Text Domain: pbwr
 */

defined('ABSPATH') || exit;

// Define plugin constants
define('SPWA_PATH', plugin_dir_path(__FILE__));
define('SPWA_URL', plugin_dir_url(__FILE__));

// Include loader classes
require_once SPWA_PATH . 'includes/class-spwa-loader.php';
