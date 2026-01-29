<?php
/**  
 * Addon        : Product Purchase Counter  
 * Description  : Counts and displays how many times each WooCommerce product was purchased.  
 * Category     : General
 * Type         : Free
 * Author       : SpeedPress
 * Version      : 1.0.0
 */  

if ( ! defined( 'ABSPATH' ) ) { 
    exit; // Prevent direct access 
}

class SPWA_Product_Purchase_Counter {
    
    /**  
     * Constructor  
     */  
    public function __construct() { 

            // Display purchase count on single product page  
            add_action( 'woocommerce_single_product_summary', [ $this, 'display_purchase_count' ], 30 ); 

    } 

    /**  
     * Get product purchase count based on completed orders  
     *  
     * @param int $product_id Product ID  
     * @return int Purchase count  
     */  
    public function get_purchase_count( $product_id ) {  
        // Query to get all completed orders containing this product  
        $args = array(  
            'limit'    => -1, // No limit  
            'status'   => 'completed', // Only completed orders  
            'return'   => 'ids', // Return only order IDs  
            'product'  => $product_id, // Filter by product ID  
        );  

        $orders = wc_get_orders( $args );  

        $total_count = 0;  

        foreach ( $orders as $order_id ) {  
            $order = wc_get_order( $order_id );  

            foreach ( $order->get_items() as $item ) {  
                if ( $item->get_product_id() == $product_id ) {  
                    $total_count += $item->get_quantity();  
                }  
            }  
        }  

        return $total_count;  
    }  

    /**  
     * Display purchase count on single product page  
     */  
    public function display_purchase_count() {
        global $product;

        if ( ! $product instanceof WC_Product ) {
            return;
        }

        // Get the product purchase count dynamically
        $count = $this->get_purchase_count( $product->get_id() );

        if ( $count > 0 ) {
            // Default text

        $text = sprintf(
            /* translators: 1: Number of purchases */
            __( 'Purchased %1$d times', 'speedpress-for-woocommerce' ),
            $count
        );



            // Apply filter for custom text
            $text = apply_filters( 'spwa_purchase_counter_text', $text, $count, $product );

            echo '<div class="spwa-purchase-count icon-style">';
            echo '<span class="purchase-icon">💰</span>';
            echo '<span>' . esc_html( $text ) . '</span>';
            echo '</div>';
        }
    }

}  

// Initialize the addon  
new SPWA_Product_Purchase_Counter();
