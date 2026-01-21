<?php
/**
 * Addon Name: SPWA - Force Login Before Cart
 * Description: Redirects non-logged-in users to the login page before they can access the WooCommerce cart.
 * Version: 1.0
 * Author: SpeedPress
 */

if ( ! defined( 'ABSPATH' ) ) exit;

class SPWA_Force_Login_Cart {

    public function __construct() {
        add_action( 'template_redirect', [ $this, 'redirect_guests_from_cart' ] );
    }

    /**
     * Redirect guest users to login page if accessing cart
     */
    public function redirect_guests_from_cart() {
        if ( is_admin() || is_user_logged_in() ) {
            return;
        }

        // Only redirect on cart page
        if ( function_exists( 'is_cart' ) && is_cart() ) {
            $redirect_url = wp_login_url( wc_get_cart_url() );
            wp_safe_redirect( $redirect_url );
            exit;
        }
    }
}

new SPWA_Force_Login_Cart();
