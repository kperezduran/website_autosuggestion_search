# -*- coding: utf-8 -*-

import simplejson
import json
from odoo import http
from odoo.http import request
from odoo.addons.http_routing.models.ir_http import unslug, slug
from odoo.exceptions import ValidationError


class website_sale_search(http.Controller):

    @http.route(['/shop/get_products'], type='json', auth="public", website=True)
    def search_product(self, **post):
        website = request.website
        pricelist = request.website.get_current_pricelist()

        product_list = website._get_autocomplete_infos(pricelist,website)

        return simplejson.dumps(product_list)

    @http.route(['/shop/get_product_image'], type='json', auth="public", website=True)
    def search_product_image(self,name, **post):
        res = request.env['product.template'].search([('name','=',name)])
        product_image_list = []
        for variant_img in res.product_image_ids:
            product_image_list.append(variant_img.image)

        if res:
            return simplejson.dumps({'main_image':res.image,'variant_img':product_image_list})
        else:
            return False