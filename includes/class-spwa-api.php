<?php
/**
 * All required api for SpeedPress for Woocommrece
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class SPWA_REST_API {

    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'register_routes' ] );
    }

    /**
     * Register all REST routes
     */
    public function register_routes() {
        $namespace = 'spwa/v1';

        // Route: toggle addon
        register_rest_route( $namespace, '/addon-toggle', [
            'methods'             => WP_REST_Server::CREATABLE, // POST
            'callback'            => [ $this, 'toggle_addon' ],
            'permission_callback' => [ $this, 'check_permissions' ],
            'args'                => [
                'addon_slug' => [
                    'required'          => true,
                    'sanitize_callback' => 'sanitize_key',
                ],
                'enabled' => [
                    'required'          => true,
                    'validate_callback' => function( $value ) {
                        return in_array( $value, [ 0, 1, '0', '1', true, false ], true );
                    },
                ],
            ],
        ] );

        // Route: get all addons
        register_rest_route( $namespace, '/get-addons', [
            'methods'             => WP_REST_Server::READABLE, // GET
            'callback'            => [ $this, 'get_addons' ],
            'permission_callback' => [ $this, 'check_permissions' ],
        ] );
    }

    /**
     * Permission check
     * Only allow admins to manage addons
     */
    public function check_permissions() {
        return current_user_can( 'manage_options' );
    }

    /**
     * Toggle addon enabled/disabled
     */
    public function toggle_addon( WP_REST_Request $request ) {
        global $wpdb;

        $addon_slug = $request->get_param( 'addon_slug' );
        $enabled    = $request->get_param( 'enabled' ) ? 1 : 0;

        $table_name = $wpdb->prefix . 'spwa_addons';

        // Ensure addon exists
        $exists = $wpdb->get_var(
            $wpdb->prepare( "SELECT COUNT(*) FROM {$table_name} WHERE addon_slug = %s", $addon_slug )
        );

        if ( ! $exists ) {
            return new WP_REST_Response( [
                'success' => false,
                'message' => 'Addon not found.',
            ], 404 );
        }

        // Update addon status
        $updated = $wpdb->update(
            $table_name,
            [ 'is_enabled' => $enabled ],
            [ 'addon_slug' => $addon_slug ],
            [ '%d' ],
            [ '%s' ]
        );

        if ( $updated === false ) {
            return new WP_REST_Response( [
                'success' => false,
                'message' => 'Failed to update addon.',
            ], 500 );
        }

        return new WP_REST_Response( [
            'success'    => true,
            'addon_slug' => $addon_slug,
            'enabled'    => (bool) $enabled,
        ], 200 );
    }

    /**
     * Fetch all addons with their status
     */
    public function get_addons( WP_REST_Request $request ) {
        global $wpdb;
        $table = $wpdb->prefix . 'spwa_addons';

        $results = $wpdb->get_results(
            "SELECT addon_slug, title, description, type, category, is_enabled 
             FROM $table ORDER BY category, title",
            ARRAY_A
        );

        if ( empty( $results ) ) {
            return rest_ensure_response( [
                'success' => false,
                'message' => 'No addons found.',
            ] );
        }

        // Group addons by category
        $grouped = [];
        foreach ( $results as $addon ) {
            $category_key = ! empty( $addon['category'] ) ? sanitize_key( $addon['category'] ) . '-addons' : 'general-addons';

            $grouped[ $category_key ][] = [
                'id'          => $addon['addon_slug'],
                'name'        => esc_html( $addon['title'] ),
                'description' => wp_kses_post( $addon['description'] ),
                'type'        => esc_html( $addon['type'] ),
                'category'    => esc_html( $addon['category'] ),
                'enabled'     => (bool) $addon['is_enabled'],
            ];
        }

        return rest_ensure_response( [
            'success' => true,
            'addons'  => $grouped,
        ] );
    }
}

// Instantiate the class
new SPWA_REST_API();
