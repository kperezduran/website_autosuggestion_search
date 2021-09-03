# -*- coding: utf-8 -*-

import simplejson
import json
from odoo import http
from odoo.http import request
from odoo.addons.http_routing.models.ir_http import unslug, slug
from odoo.exceptions import ValidationError


# website = request.website
# pricelist = request.website.get_current_pricelist()
#
# product_list = website._get_autocomplete_infos(pricelist,website)
class website_sale_search(http.Controller):

    @http.route(['/shop/get_products'], type='json', auth="public", website=True)
    def search_product(self, **post):
        website = request.website
        pricelist = request.website.get_current_pricelist()
        lang = request.env.lang
        # raise ValidationError('%s' % str(lang))

        product_list = website._get_autocomplete_infos(pricelist,website,lang)
        # res = request.env['product.template'].search([('is_published', '=', True), ('active', '=', True)], order='website_sequence desc, id desc')
        # product_list = []
        # for each in res:
        #     url = ('/shop/product/%s' % slug(each))
        #     current_pricelist = request.env['product.pricelist'].browse(
        #         request.env.user.sudo().partner_id.property_product_pricelist)
        #     test = each._get_combination_info(only_template=True, add_qty=1, pricelist=current_pricelist.id)
        #     product_list.append({'value':each.name,'label': each.name, 'url': url, 'product_id': each.id, 'price': str(test['price']), 'brand': each.product_brand_ept_id.id, 'brand_name': each.product_brand_ept_id.name})
        # raise ValidationError('%s' % str(product_list))

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
