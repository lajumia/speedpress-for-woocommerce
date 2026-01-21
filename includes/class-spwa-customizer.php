<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class SpeedPress_Customizer {

    public function __construct() {
        add_action( 'customize_register', [ $this, 'register_customizer' ] );
    }

    /**
     * Register Customizer Panel only
     *
     * @param WP_Customize_Manager $wp_customize
     */
    public function register_customizer( $wp_customize ) {

        // ✅ Add SpeedPress Panel only
        $wp_customize->add_panel( 'speedpress_panel', [
            'title'       => __( 'SpeedPress', 'speedpress' ),
            'priority'    => 10,
            'capability'  => 'manage_options',
            'description' => __( 'Customize settings for SpeedPress addons.', 'speedpress' ),
        ] );

    }
}

// Initialize
new SpeedPress_Customizer();
