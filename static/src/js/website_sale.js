odoo.define('website_autocomplete_search.website_sale', function (require) {
    "use strict";

    var sAnimations = require('website.content.snippets.animation');
    var core = require('web.core');
    var _t = core._t;
    var ajax = require('web.ajax');

    $(document).ready(function () {
        ajax.jsonRpc("/shop/get_products", 'call', {}).then(function (data2) {
            var data3 = JSON.parse(data2);
            var auto = $('#wrapwrap').find(".an_pre_navbar_desktop").find("#searchItem3").autocomplete({
                source: function (request, response) {
                    var results = $.ui.autocomplete.filter(data3, request.term);
                    response(results.slice(0, 42));
                },
            });

            var oldparent = auto.data('uiAutocomplete').menu.element.parent();

            auto.data('ui-autocomplete').menu = $('<div></div>').addClass("ui-autocomplete ui-front an_shop")
                .appendTo(oldparent).menu({role: null}).hide().data("uiMenu");

            auto.data("ui-autocomplete")._renderItem = function (ul, item) {
                var inner_html = "" +
                    "<div class='an_shop_article_title'>" +
                        "<span>" + item.label + "'<span/>" +
                    "</div>" +

                    "<div class='an_shop_article_img'>" +
                        "<img src='/web/image/product.template/" + item.product_id + "/image' t-att-alt='" + item.label + "'/>" +
                    "</div>" +

                    "<div class='an_shop_article_bottom'>" +

                        "<div class='an_shop_article_logo an_filter'>" +
                            "<a>" +
                                "<img src='/web/image/product.brand.ept/" + item.brand + "/logo' alt='" + item.brand_name + "'/>" +
                            "</a>" +
                        "</div>" +

                        "<div class='an_shop_article_prices no_promo'>" +

                            "<div class='an_shop_arrow_promo'>" +
                            "</div>" +

                            "<div class='an_shop_arrow_price'>" +
                                "<div class='an_shop_article_prices_promo_add_infos'>Par unité</div>" +

                                "<div class='an_shop_article_actual_price'>" +
                                    '<span>' + item.price + '</span> €' +
                                "</div>" +
                            "</div>" +

                        "</div>" +
                    "</div>"

                return $("<a class='an_shop_article' href='/shop/product/product-" + item.product_id + "'></a>")
                    .data("item.autocomplete", item)
                    .append(inner_html)
                    .appendTo(ul);
            };
        });
    });
});