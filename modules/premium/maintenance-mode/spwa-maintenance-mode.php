<?php
/**
 * Addon: Maintenance Mode
 * Description: Redirects visitors to a custom link when maintenance mode is enabled.
 * Category: General
 * Type: Free
 * Author: SpeedPress
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Prevent direct access
}

class SPWA_Maintenance_Mode {

    /**
     * Constructor
     */
    public function __construct() {
        // Register Customizer option
        add_action( 'customize_register', [ $this, 'register_customizer' ] );

        // Apply maintenance mode on frontend
        add_action( 'template_redirect', [ $this, 'maybe_redirect' ] );
    }

    /**
     * Register Maintenance Mode settings in Customizer
     */
    public function register_customizer( $wp_customize ) {
        // Add a section inside SpeedPress panel
        $wp_customize->add_section( 'speedpress_maintenance_mode', [
            'title'       => __( 'Maintenance Mode', 'speedpress-for-woocommerce' ),
            'panel'       => 'speedpress_panel', // parent panel
            'description' => __( 'Set up the redirect link for Maintenance Mode.', 'speedpress-for-woocommerce' ),
        ] );

        // Redirect link only
        $wp_customize->add_setting( 'spwa_maintenance_link', [
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
        ] );

        $wp_customize->add_control( 'spwa_maintenance_link', [
            'label'       => __( 'Redirect Link', 'speedpress-for-woocommerce' ),
            'type'        => 'url',
            'section'     => 'speedpress_maintenance_mode',
            'description' => __( 'Users will be redirected here when Maintenance Mode addon is enabled.', 'speedpress-for-woocommerce' ),
        ] );
    }

    /**
     * Handle frontend redirection
     */
    public function maybe_redirect() {
        // Only run if addon is enabled from plugin dashboard
        global $wpdb;
        $table  = $wpdb->prefix . 'spwa_addons';
        $status = $wpdb->get_var( $wpdb->prepare(
            "SELECT is_enabled FROM $table WHERE addon_slug = %s",
            'maintenance-mode'
        ) );

        // Exit if the addon is not enabled
        if ( intval( $status ) !== 1 ) {
            return;
        }

        // Do not apply to admin users
        // if ( current_user_can( 'manage_options' ) ) {
        //     return;
        // }

        // Get redirect URL from theme mod
        $link = get_theme_mod( 'spwa_maintenance_link', '' );

        // If redirect URL is set, redirect
        if ( ! empty( $link ) ) {
            wp_safe_redirect( $link, 302 );
            exit;
        }

        // If no redirect URL is set, show maintenance message
        wp_die(
            '<h1>Maintenance Mode</h1><p>The site is currently undergoing maintenance. Please check back later.</p>',
            'Maintenance Mode',
            array( 'response' => 503 )
        );
    }

}

// Initialize addon
new SPWA_Maintenance_Mode();
