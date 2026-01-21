<?php
/**
 * Handles Addons database table creation and management
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

class SPWA_DB {

    private $table_name;

    public function __construct() {
        global $wpdb;
        $this->table_name = $wpdb->prefix . 'spwa_addons';

        // Only create table on activation
        register_activation_hook(SPWA_FILE, [ $this, 'spwa_create_table' ]);

        // Always insert/update addons on admin load
        if ( is_admin() ) {
            add_action( 'admin_init', [ $this, 'spwa_insert_addons' ] );
        }
    }

    /**
     * Create addons table (only once on activation)
     */
    public function spwa_create_table() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE {$this->table_name} (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            addon_slug VARCHAR(191) NOT NULL UNIQUE,
            title VARCHAR(255) NOT NULL,
            description TEXT NULL,
            type ENUM('free','premium') DEFAULT 'free',
            category VARCHAR(255) NOT NULL,
            is_enabled TINYINT(1) DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) $charset_collate;";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta($sql);
    }

    /**
     * Insert/Update default addons efficiently
     */
    public function spwa_insert_addons() {
        global $wpdb;

        $addons = [
            [
                'addon_slug'  => 'product-views-counter',
                'title'       => 'Product Views Counter',
                'description' => 'Counts how many times a product is viewed or clicked by user.',
                'type'        => 'free',
                'category'    => 'general',
                'is_enabled'  => 0,
            ],
            [
                'addon_slug'  => 'maintenance-mode',
                'title'       => 'Maintenance Mode',
                'description' => 'Allows you to put your store in maintenance mode.',
                'type'        => 'free',//premium
                'category'    => 'general',
                'is_enabled'  => 0,
            ],
            [
                'addon_slug'  => 'low-stock-notifier',
                'title'       => 'Low Stock Notifier',
                'description' => 'Allows you to get notified when your product stock is lower.',
                'type'        => 'free',
                'category'    => 'general',
                'is_enabled'  => 0,
            ],
            [
                'addon_slug'  => 'product-purchase-counter',
                'title'       => 'Product Purchase Counter',
                'description' => 'Counts how many times a product is purchased.',
                'type'        => 'free',
                'category'    => 'general',
                'is_enabled'  => 0,
            ],
            [
                'addon_slug'  => 'block-country-for-order',
                'title'       => 'Block Country For Order',
                'description' => 'Manage which country user can purchase your products.',
                'type'        => 'free',
                'category'    => 'general',
                'is_enabled'  => 0,
            ],
            [
                'addon_slug'  => 'force-login-before-cart',
                'title'       => 'Force Login Before Cart',
                'description' => 'Force user to log in before cart.',
                'type'        => 'free',
                'category'    => 'general',
                'is_enabled'  => 0,
            ],
            [
                'addon_slug'  => 'wishlist-lite',
                'title'       => 'Wishlist Lite',
                'description' => 'Allow users to favorite (wishlist) WooCommerce products.',
                'type'        => 'free',
                'category'    => 'product',
                'is_enabled'  => 0,
            ],
            [
                'addon_slug'  => 'auto-apply-coupon',
                'title'       => 'Auto Apply Coupon',
                'description' => 'Automatically applies a coupon if the cart total exceeds a set threshold.',
                'type'        => 'free',
                'category'    => 'cart-checkout',
                'is_enabled'  => 0,
            ]
            // Add more addons here
        ];

        $values       = [];
        $placeholders = [];

        foreach ( $addons as $addon ) {
            // Sanitize inputs
            $slug        = sanitize_key( $addon['addon_slug'] );
            $title       = sanitize_text_field( $addon['title'] );
            $description = wp_kses_post( $addon['description'] );
            $type        = in_array( $addon['type'], [ 'free', 'premium' ], true ) ? $addon['type'] : 'free';
            $category    = sanitize_text_field( $addon['category'] );
            $enabled     = (int) $addon['is_enabled'];

            $values = array_merge( $values, [ $slug, $title, $description, $type, $category, $enabled ] );
            $placeholders[] = "(%s, %s, %s, %s, %s, %d)";
        }

        if ( ! empty( $values ) ) {
            $query = "
                INSERT INTO {$this->table_name} 
                    (addon_slug, title, description, type, category, is_enabled) 
                VALUES " . implode( ', ', $placeholders ) . "
                ON DUPLICATE KEY UPDATE
                    title = VALUES(title),
                    description = VALUES(description),
                    type = VALUES(type),
                    category = VALUES(category)";
                    // keeps user's is_enabled choice safe
                    // If you want to reset on update, add:
                    // , is_enabled = VALUES(is_enabled)

            $wpdb->query( $wpdb->prepare( $query, ...$values ) );
        }
    }

}

new SPWA_DB();


