<?php
/**
 * Plugin Name: Auto Apply Coupon
 * Description: Automatically applies a coupon if the cart total exceeds a set threshold (customizable in Customizer).
 * Author: SpeedPress
 * Version: 1.1
 */

if ( ! defined( 'ABSPATH' ) ) exit;

class SPWA_Auto_Apply_Coupon {

    public function __construct() {
        // Add Customizer settings
        add_action( 'customize_register', [ $this, 'aac_register_customizer_settings' ] );

        // Apply coupon automatically
        add_action( 'woocommerce_before_calculate_totals', [ $this, 'aac_auto_apply_coupon' ] );
    }

    /**
     * Register Customizer Settings
     */
    public function aac_register_customizer_settings( $wp_customize ) {

        // Add Section
        $wp_customize->add_section( 'spwa_auto_apply_coupon_section', [
            'title'       => __( 'Auto Apply Coupon', 'spwa' ),
            'panel'       => 'speedpress_panel', // remove if no panel exists
            'priority'    => 160,
            'description' => __( 'Automatically apply a coupon when the cart total exceeds a threshold.', 'spwa' ),
        ] );

        // Coupon Code
        $wp_customize->add_setting( 'spwa_auto_apply_coupon_code', [
            'default'           => '',
            'sanitize_callback' => 'sanitize_text_field',
        ] );

        $wp_customize->add_control( 'spwa_auto_apply_coupon_code', [
            'label'   => __( 'Coupon Code', 'spwa' ),
            'section' => 'spwa_auto_apply_coupon_section',
            'type'    => 'text',
        ] );

        // Threshold Amount
        $wp_customize->add_setting( 'spwa_auto_apply_coupon_threshold', [
            'default'           => 100,
            'sanitize_callback' => 'floatval',
        ] );

        $wp_customize->add_control( 'spwa_auto_apply_coupon_threshold', [
            'label'   => __( 'Cart Total Threshold ($)', 'spwa' ),
            'section' => 'spwa_auto_apply_coupon_section',
            'type'    => 'number',
        ] );
    }

    /**
     * Automatically apply coupon based on threshold
     */
    public function aac_auto_apply_coupon() {
        if ( is_admin() && ! defined( 'DOING_AJAX' ) ) return;

        $threshold = floatval( get_theme_mod( 'spwa_auto_apply_coupon_threshold', 100 ) );
        $coupon    = sanitize_text_field( get_theme_mod( 'spwa_auto_apply_coupon_code', '' ) );

        if ( empty( $coupon ) ) return;

        $cart = WC()->cart;
        if ( ! $cart ) return;

        $subtotal = $cart->subtotal_ex_tax;

        if ( $subtotal >= $threshold ) {
            if ( ! $cart->has_discount( $coupon ) ) {
                $cart->apply_coupon( $coupon );
                wc_add_notice( sprintf( __( 'Coupon "%s" has been automatically applied!', 'spwa' ), $coupon ), 'success' );
            }
        } else {
            if ( $cart->has_discount( $coupon ) ) {
                $cart->remove_coupon( $coupon );
                wc_add_notice( sprintf( __( 'Coupon "%s" removed. Cart total below $%s.', 'spwa' ), $coupon, $threshold ), 'notice' );
            }
        }
    }

}

new SPWA_Auto_Apply_Coupon();
