<?php
/**
 * Addon Name: SPWA - Force Login Before Cart & Checkout
 * Description: Redirects non-logged-in users to the login page when accessing WooCommerce cart or checkout pages.
 * Version: 1.0.0
 * Author: SpeedPress
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class SPWA_Force_Login_Cart_Checkout {

    public function __construct() {
        add_action( 'template_redirect', [ $this, 'redirect_guests_from_cart_checkout' ] );
    }

    /**
     * Redirect guest users to login page if accessing cart or checkout
     */
    public function redirect_guests_from_cart_checkout() {

        // Allow admins and logged-in users
        if ( is_user_logged_in() || is_admin() ) {
            return;
        }

        // Make sure WooCommerce functions exist
        if ( ! function_exists( 'is_cart' ) || ! function_exists( 'is_checkout' ) ) {
            return;
        }

        // Redirect on Cart OR Checkout page
        if ( is_cart() || is_checkout() ) {

            // Where to send user back after login
            $redirect_to = is_cart()
                ? wc_get_cart_url()
                : wc_get_checkout_url();

            wp_safe_redirect( wp_login_url( $redirect_to ) );
            exit;
        }
    }
}

new SPWA_Force_Login_Cart_Checkout();
