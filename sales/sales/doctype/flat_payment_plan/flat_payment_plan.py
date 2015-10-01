# -*- coding: utf-8 -*-
# Copyright (c) 2015, d and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class FlatPaymentPlan(Document):
	def payment_schedule_method(self):
		doc_req = []
		val2=0
		if self.payment_schedule:
			doc_master = frappe.get_doc("Payment Schedule Template", self.payment_schedule)
			frappe.msgprint("From Python method")
			for value in doc_master.get("payment_schedule"):
				if value.charge_type=="Actual":
					val2=val2+value.rate
					doc_req = {
						"doctype": "Sales Taxes and Charges",
						"charge_type":value.charge_type,
						"description": value.description,
						"rate": value.rate,
						"tax_amount":value.rate,
						}
					self.append("taxes_table", doc_req)
				elif value.charge_type=="On Net Total":
					val2=val2+(self.total_sales_consideration * (value.rate/100))
					doc_req = {
						"doctype": "Payment Schedule",
						"charge_type":value.charge_type,
						"description": value.description,
						"rate": value.rate,
						"paid_amount":self.total_sales_consideration * (value.rate/100),
						}
					self.append("payment_schedule_table", doc_req)
			#self.total_c=val2
			#self.total_b_c2=self.total_b-self.total_c 
