# -*- coding: utf-8 -*-
# Copyright (c) 2015, d and contributors
# For license information, please see license.txt
from __future__ import unicode_literals
import frappe
import logging
import string
import datetime
import re
import json

from frappe.utils import getdate, flt,validate_email_add, cint
from frappe.model.naming import make_autoname
from frappe import throw, _, msgprint
import frappe.permissions
from frappe.model.document import Document
from frappe.model.mapper import get_mapped_doc
import flat_invoice


class FlatInvoice(Document):
	def charges_method(self):
		#frappe.msgprint(self.charges_table)
		#frappe.msgprint(self.charges)
		doc_req = []
		if self.charges:
			doc_master = frappe.get_doc("Sales Taxes and Charges Master", self.charges)
			#frappe.msgprint("From Python charges_method")
			val=0
			for value in doc_master.get("other_charges"):
				val=val+value.rate
				doc_req = {
					"doctype": "Sales Taxes and Charges",
					"charge_type":value.charge_type,
					"description": value.description,
					"rate": value.rate,
					"tax_amount":value.tax_amount,
					}
				self.other_charges_total=val
				self.append("charges_table", doc_req)
				

	def discounts_method(self):
		#frappe.msgprint(self.charges_table)
		#frappe.msgprint(self.discounts)
		doc_req = []
		if self.discounts:
			doc_master = frappe.get_doc("Sales Taxes and Charges Master", self.discounts)
			#frappe.msgprint("From Python discounts_method")
			for value in doc_master.get("other_charges"):
				#if "discount" or "Discount" in value.description:
				#frappe.msgprint(value.description)
				doc_req = {
					"doctype": "Sales Taxes and Charges",
					"charge_type":value.charge_type,
					"description": value.description,
					"rate": value.rate,
					}
				self.append("discounts_table", doc_req)
				
				

	def taxes_method(self):
		#frappe.msgprint(self.charges_table)
		#frappe.msgprint(self.charges)
		doc_req = []
		if self.charges:
			doc_master = frappe.get_doc("Sales Taxes and Charges Master", self.charges)
			#frappe.msgprint("From Python taxes_method")
			for value in doc_master.get("other_charges"):
				doc_req = {
					"doctype": "Sales Taxes and Charges",
					"charge_type":value.charge_type,
					"description": value.description,
					"rate": value.rate,
					}
				self.append("taxes_table", doc_req)

	
	
	
	