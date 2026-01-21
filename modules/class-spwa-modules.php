<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly for security
}

/**
 * Class Addon_Loader
 *
 * Loads free and premium addons based on enabled/disabled status stored in the database.
 */
class Addon_Loader {

    private $plugin_path;

    public function __construct( $plugin_path ) {
        $this->plugin_path = trailingslashit( $plugin_path );

        // Load enabled addons
        $this->load_enabled_addons();
    }

    /**
     * Load all enabled addons
     */
    private function load_enabled_addons() {
        global $wpdb;

        // Fetch enabled addon slugs from DB
        $table = $wpdb->prefix . 'spwa_addons';
        $results = $wpdb->get_results(
            "SELECT addon_slug, type, category FROM {$table} WHERE is_enabled = 1",
            ARRAY_A
        );

        $enabled_addons = [];
        if ( $results ) {
            foreach ( $results as $addon ) {
                $enabled_addons[] = $addon['addon_slug'];
            }
        }

        // Load free and premium addons that are enabled
        $this->load_modules( 'free', $enabled_addons );
        $this->load_modules( 'premium', $enabled_addons );
    }

    /**
     * Load modules from folder if enabled
     *
     * @param string $type 'free' or 'premium'
     * @param array $enabled_addons List of enabled addon slugs
     */
    private function load_modules( $type, $enabled_addons ) {
        $modules = glob( $this->plugin_path . $type . '/*/*.php' );

        if ( $modules ) {
            foreach ( $modules as $module ) {
                // Folder name is assumed to match addon_slug
                $folder_name = basename( dirname( $module ) );

                if ( in_array( $folder_name, $enabled_addons, true ) && is_file( $module ) ) {
                    include_once $module;
                }
            }
        }
    }
}

// Initialize the loader
new Addon_Loader( plugin_dir_path( __FILE__ ) );



