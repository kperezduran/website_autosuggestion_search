odoo.define('website_autocomplete_search.website_sale', function (require) {
    "use strict";

    var sAnimations = require('website.content.snippets.animation');
    var core = require('web.core');
    var _t = core._t;
    var ajax = require('web.ajax');

    $(document).ready(function () {
        ajax.jsonRpc("/shop/get_products", 'call', {}).then(function (data2) {
            var data3 = JSON.parse(data2);

            // var auto = $('#wrapwrap').find(".an_pre_navbar_desktop").find("#searchItem3").autocomplete({
            //     source: data3,
            // });
            var auto = $('#wrapwrap').find(".an_pre_navbar_desktop").find("#searchItem3").autocomplete({
                source: function (request, response) {
                    var results = $.ui.autocomplete.filter(data3, request.term);
                    response(results.slice(0, 42));
                },
                // select: function (event, ui) {
                //     console.log(ui);
                //     // var url = window.location.origin + '/shop/';
                //     var url = window.location.origin + '/shop/product/product-' + ui.item.product_id;
                //     console.log(url);
                //     // window.location.replace(url)/;
                // },
            });


            var oldparent = auto.data('uiAutocomplete').menu.element.parent();

            auto.data('ui-autocomplete').menu = $('<div></div>').addClass("ui-autocomplete ui-front an_shop")
                .appendTo(oldparent).menu({role: null}).hide().data("uiMenu");


            auto.data("ui-autocomplete")._renderItem = function (ul, item) {
                  if (item.brand) {
                      var inner_html = "<div class='an_shop_article_title'" +
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
                  } else {
                      var inner_html = "<div class='an_shop_article_title'" +
                          "<span>" + item.label + "'<span/>" +
                          "</div>" +
                          "<div class='an_shop_article_img'>" +
                          "<img src='/web/image/product.template/" + item.product_id + "/image' t-att-alt='" + item.label + "'/>" +
                          "</div>" +
                          "<div class='an_shop_article_bottom'>" +
                          "<div class='an_shop_article_logo an_filter'>" +
                          "<a>" +
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
                  }
                return $("<a class='an_shop_article' href='/shop/product/product-" + item.product_id + "'></a>")
                    .data("item.autocomplete", item)
                    .append(inner_html)
                    .appendTo(ul);
            };


        });
    });
});

//         $(document).on('click','#ui-id-1 .image',function(){
//             var name = $(this).attr('value');
//             ajax.jsonRpc("/shop/get_product_image", 'call', {'name':name})
//                 .then(function (data) {
//                     if(data){
//                         var data = JSON.parse(data)
//                         var inner_html = '<div class="carousel-inner"><div class="carousel-item active"><img src="data:image/png;base64,' + data['main_image'] + '"/></div>';
//                         for(var i=0;i<data['variant_img'].length;i++){
//                             inner_html += '<div class="carousel-item"><img src="data:image/png;base64,' + data['variant_img'][i] + '"/></div>';
//                         }
//                         if(data['variant_img'].length != 0){
//                             inner_html += '</div><a class="carousel-control-prev" href="#o-carousel-product_img_search" role="button" data-slide="prev"><span class="fa fa-chevron-left" style="color: #000;"></span></a><a class="carousel-control-next" href="#o-carousel-product_img_search" role="button" data-slide="next"><span class="fa fa-chevron-right" style="color: #000;"></span></a>';
//                             inner_html += '<ol class="carousel-indicators"><li data-target="#o-carousel-product_img_search" data-slide-to="0" class="active" style="margin: 0px 5px !important;"><img src="data:image/png;base64,' + data['main_image'] + '" style="height:inherit"/></li>';
//                             for(var i=0;i<data['variant_img'].length;i++){
//                                 inner_html += '<li data-target="#o-carousel-product_img_search" data-slide-to="'+(i+1)+'" class="active" style="margin: 0px 5px !important;"><img src="data:image/png;base64,' + data['variant_img'][i] + '" style="height:inherit;width:100%"/></li>';
//                             }
//                             inner_html += '</ol>'
//                         }
//                         $(document).find('#product_image_model .modal-body #o-carousel-product_img_search').html('').html(inner_html);
//                         $(document).find('#product_image_model').modal('show');
//                     }
//                 });
//         });
// 	});
// });