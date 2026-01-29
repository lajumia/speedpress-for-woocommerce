<?php
/**
 * Addon        : Product Views Counter
 * Description  : Counts and displays how many times each WooCommerce product has been viewed.
 * Category     : General
 * Type         : Free
 * Author       : SpeedPress
 * Version      : 1.0.0
 * 
 */

if ( ! defined( 'ABSPATH' ) ) exit;

class SPWA_Product_View_Counter {

    public function __construct() {
        // Frontend hooks
        add_action( 'wp', [ $this, 'count_product_views' ] );
        add_action( 'woocommerce_single_product_summary', [ $this, 'show_product_views' ], 25 );

        // Admin hooks
        add_filter( 'manage_edit-product_columns', [ $this, 'add_product_views_column' ] );
        add_action( 'manage_product_posts_custom_column', [ $this, 'render_views_column' ], 10, 2 );
        // add_filter( 'manage_edit-product_sortable_columns', [ $this, 'make_views_column_sortable' ] );
        // add_action( 'pre_get_posts', [ $this, 'views_column_orderby' ] );
    }

    /**
     * Count product views
     */
    public function count_product_views() {
        if ( is_singular( 'product' ) && ! current_user_can( 'manage_options' ) ) {
            global $post;
            $views = (int) get_post_meta( $post->ID, '_spwa_product_views', true );
            $views++;
            update_post_meta( $post->ID, '_spwa_product_views', $views );
        }
    }

    /**
     * Show product views on product page
     */

    public function show_product_views() {
        global $post;

        $views = (int) get_post_meta( $post->ID, '_spwa_product_views', true );

        if ( $views > 0 ) {
            // Default output
            $output = '<p class="spwa-count-product-views">👁️ ' . esc_html( $views ) . ' Views</p>';

            /**
             * Filter to modify product views output
             *
             * @param string $output Default HTML output
             * @param int    $views  Number of views
             * @param int    $post_id Product ID
             */
            echo wp_kses_post(
                apply_filters( 'spwa_product_views_html', $output, $views, $post->ID )
            );

        }
    }



    /**
     * Add "Views" column in admin product list
     */
    public function add_product_views_column( $columns ) {
        $columns['spwa_views'] = 'Views';
        return $columns;
    }

    /**
     * Render views column value
     */
    public function render_views_column( $column, $post_id ) {
        if ( $column === 'spwa_views' ) {
            echo (int) get_post_meta( $post_id, '_spwa_product_views', true );
        }
    }

    /**
     * Make Views column sortable
     */
    // public function make_views_column_sortable( $columns ) {
    //     $columns['spwa_views'] = 'spwa_views';
    //     return $columns;
    // }

    /**
     * Sort Views column by numeric value
     */
    // public function views_column_orderby( $query ) {
    //     if ( ! is_admin() ) return;

    //     $orderby = $query->get( 'orderby' );
    //     if ( 'spwa_views' === $orderby ) {
    //         $query->set( 'meta_key', '_spwa_product_views' );
    //         $query->set( 'orderby', 'meta_value_num' );
    //     }
    // }
}

// Initialize the addon
new SPWA_Product_View_Counter();
