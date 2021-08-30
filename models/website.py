# -*- coding: utf-8 -*-
import logging
import random
from dateutil.relativedelta import relativedelta
from odoo.http import request
from odoo.osv import expression
from odoo.exceptions import UserError, ValidationError
from odoo import api, fields, models, tools, _
import requests
from datetime import datetime, timedelta, time

_logger = logging.getLogger(__name__)
try:
    import base64
except ImportError:
    _logger.debug('Cannot `import base64`.')


class Website(models.Model):
    _inherit = 'website'

    @api.multi
    def _get_autocomplete_infos(self, pricelist, website):
        self.ensure_one()

        cr = self.env.cr
        sql = "select pt.id, min(ppi.fixed_price) as price, pt.name as value, pt.name as label, pt.product_brand_ept_id as brand, pbe.name as brand_name, pt.id as product_id " \
              "from product_template as pt inner join product_brand_ept as pbe on pbe.id = pt.product_brand_ept_id " \
              "inner join website as web on web.id = " + str(website.id) + " inner join website_pricelist_rel as wpr on wpr.website_id = web.id " \
              "inner join product_pricelist_item as ppi on ((ppi.product_tmpl_id = pt.id) and (ppi.min_quantity = 1) and (ppi.date_start <= now() or ppi.date_end is null) and (ppi.date_end >= now() or ppi.date_end is null) and (ppi.pricelist_id = " + str(pricelist.id)+ " or pricelist_id = wpr.base_pricelist_id or ppi.pricelist_id = wpr.qty_pricelist_id)) group by pt.id, pbe.name;"
        cr.execute(sql)
        results = cr.dictfetchall()

        return results