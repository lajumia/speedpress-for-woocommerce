<?php
/**
 * Plugin Name: SPWA - Block Countries by Name (Case-Insensitive)
 * Description: Block customers from placing WooCommerce orders based on country name (case-insensitive). Country names are entered in Customizer (e.g. Bangladesh, canada, IRAN).
 * Version: 1.3
 * Author: SpeedPress
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class SPWA_Block_Countries_By_Name {

    public function __construct() {
        add_action( 'customize_register', [ $this, 'register_customizer_setting' ] );
        add_action( 'woocommerce_after_checkout_validation', [ $this, 'maybe_block_checkout' ], 10, 2 );
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
            'description' => __( 'Enter comma-separated country names (e.g., bangladesh, Canada, INDIA). Case doesn’t matter.', 'speedpress-for-woocommerce' ),
            'section'     => 'spwa_blocked_countries_section',
            'type'        => 'text',
        ] );
    }

    /**
     * Sanitize and clean user input
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
     * Block checkout if country name matches (case-insensitive)
     */
    public function maybe_block_checkout( $fields, $errors ) {
        $raw_input = get_theme_mod( 'spwa_blocked_country_names', '' );

        if ( empty( $raw_input ) ) {
            return;
        }

        $blocked_input = array_map( 'trim', explode( ',', $raw_input ) );
        $blocked_input = array_filter( $blocked_input );

        // Normalize to lowercase for comparison
        $blocked_normalized = array_map( 'strtolower', $blocked_input );

        $billing_country  = isset( $fields['billing_country'] ) ? $fields['billing_country'] : '';
        $shipping_country = isset( $fields['shipping_country'] ) ? $fields['shipping_country'] : '';

        $wc_countries = new WC_Countries();
        $billing_name  = $wc_countries->countries[ $billing_country ] ?? '';
        $shipping_name = $wc_countries->countries[ $shipping_country ] ?? '';

        if (
            in_array( strtolower( $billing_name ), $blocked_normalized, true ) ||
            in_array( strtolower( $shipping_name ), $blocked_normalized, true )
        ) {
            $errors->add( 'blocked_country_error', __( 'We do not accept orders from your country.', 'speedpress-for-woocommerce' ) );
        }
    }
}

new SPWA_Block_Countries_By_Name();
