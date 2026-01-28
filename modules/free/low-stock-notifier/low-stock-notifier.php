<?php
/**
 * Addon: Low Stock Notifier
 * Description: Sends an email to the site admin when a product's stock falls below a set threshold.
 * Category: General
 * Type: Free
 * Author: SpeedPress
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Prevent direct access
}

class SPWA_Low_Stock_Notifier {

    /**
     * Default low stock threshold
     * @var int
     */
    private $default_threshold = 5;

    /**
     * Constructor
     */
    public function __construct() {
        // Run only if WooCommerce is active
        if ( class_exists( 'WooCommerce' ) ) {
            add_action( 'woocommerce_low_stock', [ $this, 'send_low_stock_email' ] );
        }

        // Register Customizer option
        add_action( 'customize_register', [ $this, 'register_customizer_settings' ] );
    }

    /**
     * Register Customizer settings for Low Stock Threshold
     *
     * @param WP_Customize_Manager $wp_customize
     */
    public function register_customizer_settings( $wp_customize ) {
        // Add Section under SpeedPress panel
        $wp_customize->add_section( 'spwa_low_stock_section', [
            'title'    => __( 'Low Stock Notifier', 'speedpress-for-woocommerce' ),
            'panel'    => 'speedpress_panel', // Ensure this panel is created in your plugin
            'priority' => 10,
        ] );

        // Add Setting
        $wp_customize->add_setting( 'spwa_low_stock_threshold', [
            'default'           => $this->default_threshold,
            'sanitize_callback' => 'absint',
            'transport'         => 'refresh',
        ] );

        // Add Control (Number Input)
        $wp_customize->add_control( 'spwa_low_stock_threshold_control', [
            'label'       => __( 'Low Stock Threshold', 'speedpress-for-woocommerce' ),
            'description' => __( 'Set the stock quantity that triggers a low stock email alert.', 'speedpress-for-woocommerce' ),
            'section'     => 'spwa_low_stock_section',
            'settings'    => 'spwa_low_stock_threshold',
            'type'        => 'number',
            'input_attrs' => [
                'min'  => 1,
                'step' => 1,
            ],
        ] );
    }

    /**
     * Sends an email notification when product stock falls below threshold
     *
     * @param WC_Product $product WooCommerce product object
     */
    public function send_low_stock_email( $product ) {
        if ( ! $product instanceof WC_Product ) {
            return; // Ensure it's a valid product object
        }

        // Sanitize product data
        $product_name = sanitize_text_field( $product->get_name() );
        $stock        = absint( $product->get_stock_quantity() );

        // Get threshold from Customizer or fallback to default
        $threshold = absint( get_theme_mod( 'spwa_low_stock_threshold', $this->default_threshold ) );

        // Allow filtering threshold (for developers)
        $threshold = apply_filters( 'spwa_low_stock_threshold', $threshold, $product );

        // Bail if stock is still above threshold or product is not stock-managed
        if ( ! $product->managing_stock() || $stock > $threshold ) {
            return;
        }

        // Get recipient (admin email)
        $to = sanitize_email( get_option( 'admin_email' ) );
        if ( empty( $to ) || ! is_email( $to ) ) {
            return; // Invalid email, don't attempt sending
        }

        // Prepare email subject & message

        /* translators: %s: product name */
        $subject = sprintf( __( 'Low Stock Alert: %s', 'speedpress-for-woocommerce' ), $product_name );
       /* translators: 1: product name, 2: current stock quantity */
        $message = sprintf(
            /* translators: 1: product name, 2: current stock quantity */
            __( 'Product: %1$s is running low on stock.

        Current stock: %2$d

        Please restock soon.', 'speedpress-for-woocommerce' ),
            $product_name,
            $stock
        );



        // Send email securely
        wp_mail( $to, $subject, $message );
    }
}

// Initialize the addon
new SPWA_Low_Stock_Notifier();
