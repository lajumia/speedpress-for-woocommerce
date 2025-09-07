<?php

require_once SPWA_PATH . 'public/class-spwa-public.php';
require_once SPWA_PATH . 'admin/class-spwa-admin.php';


function spwa_run_public() {
    new SPWA_Public(SPWA_PATH, SPWA_URL);
}
add_action('plugins_loaded', 'spwa_run_public');

function spwa_run_admin() {
    if (is_admin()) {
        new SPWA_Admin(SPWA_PATH, SPWA_URL);
    }
}
add_action('plugins_loaded', 'spwa_run_admin');
