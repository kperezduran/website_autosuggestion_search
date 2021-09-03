odoo.define('website_autocomplete_search.shop_article', function (require) {
    'use strict';

    var sAnimations = require('website.content.snippets.animation');
    var core = require('web.core');
    var _t = core._t;
    console.log('click uiauto');

    sAnimations.registry.websiteArticleAutocomplete = sAnimations.Class.extend({
        selector: '#ui-id-2',
        read_events: {
            'click .an_shop_article.an_redirection.ui-menu-item': '_onClickRedirection',
        },

        //--------------------------------------------------------------------------
        // Handlers
        //--------------------------------------------------------------------------
       
        _onClickRedirection: function (ev) {
            console.log('click');
            let elem = ev.target;
            if (elem.dataset.redirection) {
                let redirection = elem.dataset.redirection;
                var url = window.location.origin + redirection;
                if (url) {
                    window.location.href = url;
                }
            }
        },
    });
});