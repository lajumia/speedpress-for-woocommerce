<?php
/**
 * Addon        : SPWA - Block Countries by Name (Case-Insensitive)
 * Description  : Block customers from placing WooCommerce orders based on country name (case-insensitive).
 * Category     : General
 * Type         : Free
 * Author       : SpeedPress
 * Version      : 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class SPWA_Block_Countries_By_Name {

    public function __construct() {
        add_action( 'customize_register', [ $this, 'register_customizer_setting' ] );
        add_action( 'woocommerce_after_checkout_validation', [ $this, 'maybe_block_checkout' ] );
    }

    /**
     * Register Customizer setting
     */
    public function register_customizer_setting( $wp_customize ) {
        $wp_customize->add_section( 'spwa_blocked_countries_section', [
            'title'    => __( 'Blocked Countries for Orders', 'speedpress-for-woocommerce' ),
            'panel'    => 'speedpress_panel',
            'priority' => 160,
        ] );

        $wp_customize->add_setting( 'spwa_blocked_country_names', [
            'default'           => '',
            'sanitize_callback' => [ $this, 'sanitize_country_names' ],
            'type'              => 'theme_mod',
        ] );

        $wp_customize->add_control( 'spwa_blocked_country_names', [
            'label'       => __( 'Blocked Country Names (Case-insensitive)', 'speedpress-for-woocommerce' ),
            'description' => __( 'Enter comma-separated country names (e.g., bangladesh, Canada, INDIA).', 'speedpress-for-woocommerce' ),
            'section'     => 'spwa_blocked_countries_section',
            'type'        => 'text',
        ] );
    }

    /**
     * Sanitize input
     */
    public function sanitize_country_names( $input ) {
        if ( empty( $input ) ) {
            return '';
        }

        $names = array_map( 'sanitize_text_field', explode( ',', $input ) );
        $names = array_map( 'trim', $names );
        $names = array_filter( $names );

        return implode( ', ', $names );
    }

    /**
     * Block checkout by country name (case-insensitive)
     */
    public function maybe_block_checkout() {

        error_log( 'SPWA: woocommerce_checkout_process fired' );

        $raw_input = get_theme_mod( 'spwa_blocked_country_names', '' );

        if ( empty( $raw_input ) || ! WC()->customer ) {
            return;
        }

        // Prepare blocked list
        $blocked = array_map( 'trim', explode( ',', $raw_input ) );
        $blocked = array_filter( $blocked );
        $blocked = array_map( 'strtolower', $blocked );

        // Get customer country codes
        $billing_country  = WC()->customer->get_billing_country();
        $shipping_country = WC()->customer->get_shipping_country();

        if ( ! $billing_country && ! $shipping_country ) {
            return;
        }

        // Convert codes → country names
        $countries = WC()->countries->countries;

        $billing_name  = isset( $countries[ $billing_country ] ) ? strtolower( $countries[ $billing_country ] ) : '';
        $shipping_name = isset( $countries[ $shipping_country ] ) ? strtolower( $countries[ $shipping_country ] ) : '';

        // Match
        if (
            in_array( $billing_name, $blocked, true ) ||
            in_array( $shipping_name, $blocked, true )
        ) {
            wc_add_notice(
                __( 'We do not accept orders from your country.', 'speedpress-for-woocommerce' ),
                'error'
            );
        }
    }
}

new SPWA_Block_Countries_By_Name();
