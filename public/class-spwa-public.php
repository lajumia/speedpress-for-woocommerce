<?php

class SPWA_Public {

    /**
     * Plugin path and URL.
     *
     * @var string
     */
    private $path;
    private $url;

    /**
     * Constructor.
     *
     * @param string $path Full plugin path.
     * @param string $url  Plugin base URL.
     */
    public function __construct($path, $url) {
        $this->path = trailingslashit($path);
        $this->url  = trailingslashit($url);

        $this->init_hooks();
    }

    /**
     * Register hooks.
     */
    private function init_hooks() {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_assets']);
        add_action('wp_footer', [$this, 'render_react_root']);
    }

    /**
     * Enqueue public-facing scripts and styles.
     */
    public function enqueue_assets() {
        $build_dir   = $this->path . 'public/build/';
        $script_file = $build_dir . 'index.js';
        $style_file  = $build_dir . 'index.css';

        // Verify that the compiled React assets exist
        if (!file_exists($script_file)) {
            return;
        }

        $build_url = $this->url . 'public/build/';

        $index_dep = include_once SPWA_PATH . 'public/build/index.asset.php';
        wp_enqueue_script(
            'spwa-public-js',
            $build_url . 'index.js',
            $index_dep['dependencies'], 
            $index_dep['version'],
            true
        );

        if (file_exists($style_file)) {
            wp_enqueue_style(
                'spwa-public-css',
                $build_url . 'index.css',
                [],
                '1.0'
            );
        }

        wp_localize_script('spwa-public-js', 'SPWAPublic', [
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce'    => wp_create_nonce('wp_rest'),
        ]);
    }

    /**
     * Output React root container for public app.
     */
    public function render_react_root() {
        echo '<div id="spwa-public-root"></div>';
    }
}

