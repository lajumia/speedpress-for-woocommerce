<?php
/**
 * Addon        : Wishlist Lite
 * Description  : Allow users to favorite (wishlist) WooCommerce products.
 * Category     : Products
 * Type         : Free
 * Author       : SpeedPress
 * Version      : 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

class SPWA_Wishlist_Lite {

    public function __construct() {
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
        add_action( 'woocommerce_after_add_to_cart_button', [ $this, 'wishlist_button' ] );
        add_action( 'wp_ajax_spwa_toggle_wishlist', [ $this, 'toggle_wishlist' ] );
        add_action( 'wp_ajax_nopriv_spwa_toggle_wishlist', [ $this, 'toggle_wishlist' ] );
        add_shortcode( 'spwa_wishlist', [ $this, 'wishlist_page' ] );
    }

    public function enqueue_scripts() {
        wp_enqueue_script(
            'spwa-wishlist-lite',
            plugin_dir_url( __FILE__ ) . 'assets/wishlist-lite.js',
            [ 'jquery' ],
            '1.0',
            true
        );

        wp_enqueue_style(
            'spwa-wishlist-lite',
            plugin_dir_url( __FILE__ ) . 'assets/wishlist-lite.css',
            [],
            '1.0'
        );

        wp_localize_script( 'spwa-wishlist-lite', 'spwaWishlist', [
            'ajax_url' => admin_url( 'admin-ajax.php' ),
            'nonce'    => wp_create_nonce( 'spwa_wishlist_nonce' ),
        ]);
    }

    public function wishlist_button() {
        global $product;
        if ( ! $product ) return;

        $user_id = get_current_user_id();
        $wishlist = $user_id ? get_user_meta( $user_id, '_spwa_wishlist', true ) : [];
        $in = in_array( $product->get_id(), (array) $wishlist, true );

        echo sprintf(
            '<button class="spwa-wishlist-btn" data-product="%d" data-in="%d">❤️ %s</button>',
            esc_attr( $product->get_id() ),
            $in ? 1 : 0,
            $in ? esc_html__( 'Remove from Wishlist', 'speedpress-for-woocommerce' ) : esc_html__( 'Add to Wishlist', 'speedpress-for-woocommerce' )
        );
    }

    public function toggle_wishlist() {
        check_ajax_referer( 'spwa_wishlist_nonce', 'nonce' );

        $product_id = intval( $_POST['product_id'] ?? 0 );
        $user_id = get_current_user_id();

        if ( ! $user_id ) {
            wp_send_json_error( 'Login required.' );
        }

        $wishlist = get_user_meta( $user_id, '_spwa_wishlist', true ) ?: [];

        if ( in_array( $product_id, $wishlist, true ) ) {
            $wishlist = array_diff( $wishlist, [ $product_id ] );
            update_user_meta( $user_id, '_spwa_wishlist', $wishlist );
            wp_send_json_success( [ 'action' => 'removed' ] );
        } else {
            $wishlist[] = $product_id;
            update_user_meta( $user_id, '_spwa_wishlist', array_unique( $wishlist ) );
            wp_send_json_success( [ 'action' => 'added' ] );
        }
    }

    public function wishlist_page() {
        $user_id = get_current_user_id();
        if ( ! $user_id ) {
            return '<p class="spwa-login-message">Please log in to view your wishlist.</p>';
        }

        $wishlist = get_user_meta( $user_id, '_spwa_wishlist', true ) ?: [];
        if ( empty( $wishlist ) ) {
            return '<p class="spwa-empty">Your wishlist is empty.</p>';
        }

        ob_start(); ?>

        <div class="spwa-wishlist-container">
            <table class="spwa-wishlist-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ( $wishlist as $product_id ) :
                        $product = wc_get_product( $product_id );
                        if ( ! $product ) continue; ?>
                        <tr data-product-id="<?php echo esc_attr( $product_id ); ?>">
                            <td class="spwa-image">
                                <a href="<?php echo esc_url( get_permalink( $product_id ) ); ?>">
                                    <?php echo wp_kses_post( $product->get_image( 'thumbnail' ) ); ?>
                                </a>
                            </td>
                            <td class="spwa-name">
                                <a href="<?php echo esc_url( get_permalink( $product_id ) ); ?>">
                                    <?php echo esc_html( $product->get_name() ); ?>
                                </a>
                            </td>
                            <td class="spwa-price">
                                <?php echo wp_kses_post( $product->get_price_html() ); ?>
                            </td>
                            <td class="spwa-remove">
                                <button class="spwa-remove-btn" data-product="<?php echo esc_attr( $product_id ); ?>">❌ Remove</button>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

        <?php
        return ob_get_clean();
    }



}

new SPWA_Wishlist_Lite();
