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
    def _get_autocomplete_infos(self, pricelist, website, lang):
        self.ensure_one()

        cr = self.env.cr
        # raise ValidationError('%s%s%s' % (str(pricelist), str(website),str(lang)))
        sql = "select pt.id, min(ppi.fixed_price) as price, CASE WHEN it.value is not null THEN it.value else pt.name end as value, CASE WHEN it.value is not null THEN it.value else pt.name end as label, pt.product_brand_ept_id as brand, pbe.name as brand_name, pt.id as product_id " \
              "from product_template as pt left join product_brand_ept as pbe on pbe.id = pt.product_brand_ept_id " \
              "inner join website as web on web.id = " + str(website.id) + " inner join website_pricelist_rel as wpr on wpr.website_id = web.id " \
              "inner join product_pricelist_item as ppi on ((ppi.product_tmpl_id = pt.id) and (ppi.min_quantity = 1) and (ppi.date_start <= now() or ppi.date_end is null) and (ppi.date_end >= now() or ppi.date_end is null) and (ppi.pricelist_id = " \
              + str(pricelist.id)+ " or pricelist_id = wpr.base_pricelist_id or ppi.pricelist_id = wpr.qty_pricelist_id))" \
              " left join ir_translation as it on ((it.name = 'product.template,name') and (it.lang = '"+ lang +"') and (it.res_id = pt.id)) where pt.is_published = True group by pt.id, pbe.name, it.value order by pt.id desc, pt.website_sequence desc ;"
        # raise ValidationError(('%s') % (sql))

        cr.execute(sql)
        results = cr.dictfetchall()

        return results