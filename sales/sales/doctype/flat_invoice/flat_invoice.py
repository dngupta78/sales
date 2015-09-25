# -*- coding: utf-8 -*-
# Copyright (c) 2015, d and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class FlatInvoice(Document):
	def charges(self):
		#frappe.msgprint(self.flat_total)
		doc_req = []
		if not self.charges and self.charges_table:
			doc_master = frappe.get_doc("Sales Taxes and Charges Template", self.charges)
			#frappe.msgprint(doc_master)
			for value in doc_master.get("Sales Taxes and Charges"):
				doc_req = {
					"doctype": "Sales Taxes and Charges",
					"charge_type":value.charge_type,
					"description": value.description,
					"rate": value.rate,
				}
				self.append("charges_table", doc_req)
