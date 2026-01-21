jQuery(function ($) {
    $('body').on('click', '.spwa-wishlist-btn', function (e) {
        e.preventDefault();
        const btn = $(this);
        const product_id = btn.data('product');
        const inWishlist = btn.data('in') == 1;

        $.post(spwaWishlist.ajax_url, {
        action: 'spwa_toggle_wishlist',
        product_id,
        nonce: spwaWishlist.nonce,
        }, function (res) {
        if (res.success) {
            if (res.data.action === 'added') {
            btn.text('❤️ Remove from Wishlist').data('in', 1);
            } else {
            btn.text('❤️ Add to Wishlist').data('in', 0);
            }
        } else {
            alert(res.data || 'Something went wrong.');
        }
        });
    });

    $('body').on('click', '.spwa-remove-btn', function (e) {
        e.preventDefault();
        const btn = $(this);
        const product_id = btn.data('product');

        $.post(spwaWishlist.ajax_url, {
        action: 'spwa_toggle_wishlist',
        product_id,
        nonce: spwaWishlist.nonce,
        }, function (res) {
        if (res.success) {
            btn.closest('tr').fadeOut(300, function () { $(this).remove(); });
        } else {
            alert(res.data || 'Something went wrong.');
        }
        });
    });





});
