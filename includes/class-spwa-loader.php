<?php

class SPWA_Loader {

    /**
     * Constructor
     * Runs hooks when the class is initialized
     */
    public function __construct() {
        require_once SPWA_PATH . 'public/class-spwa-public.php';
        require_once SPWA_PATH . 'admin/class-spwa-admin.php';

        add_action( 'plugins_loaded', [ $this, 'run_public' ] );
        add_action( 'plugins_loaded', [ $this, 'run_admin' ] );
    }

    /**
     * Initialize Public Area
     */
    public function run_public() {
        new SPWA_Public( SPWA_PATH, SPWA_URL );
    }

    /**
     * Initialize Admin Area
     */
    public function run_admin() {
        if ( is_admin() ) {
            new SPWA_Admin( SPWA_PATH, SPWA_URL );
        }
    }
}

// Initialize the loader
new SPWA_Loader();
