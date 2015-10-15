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
from frappe import throw, _, msgprint


class FlatInvoice(Document):

	#charges_table=[]

	#def __init__(self,charges_table):
	#	self.charges_table=charges_table
	

	def charges_method(self):
		#frappe.msgprint(self.charges_table)
		#frappe.msgprint(self.charges)
		doc_req = []
		#a = self.doc.get("taxes_table")
		#frappe.msgprint(a)
		if self.flag1==0:
		#if not self.charges_table:
		#frappe.msgprint("From Python charges_method")
		#if not self.charges_table:
		#if self.charges:
			frappe.msgprint(self)
			doc_master = frappe.get_doc("Sales Taxes and Charges Master", self.charges)
			#frappe.msgprint("From Python charges_method")
			val=0
			frappe.msgprint(self)
			for value in doc_master.get("other_charges"):
				if value.charge_type=="Actual":
					val=val+value.rate
					doc_req = {
						"doctype": "Sales Taxes and Charges",
						"charge_type":value.charge_type,
						"description": value.description,
						"rate": value.rate,
						"tax_amount":value.rate,
						}
			        #frappe.model.clear_table("charges_table");
				elif value.charge_type=="On Net Total":
					val=val+(self.net_total * (value.rate/100))
					doc_req = {
						"doctype": "Sales Taxes and Charges",
						"charge_type":value.charge_type,
						"description": value.description,
						"rate": value.rate,
						"tax_amount":self.total_a * (value.rate/100),
						}
					self.other_charges_total=val
					#frappe.msgprint(self.other_charges_total)
				self.append("charges_table", doc_req)
			self.other_charges_total=val
			self.total_a=self.total_a+self.other_charges_total
			self.flag1=1
						

	def discounts_method(self):
		#frappe.msgprint(self.charges_table)
		#frappe.msgprint(self.discounts)
		doc_req = []
		val1=0
		#if not self.discounts_table:
		if self.flag2==0:
			doc_master = frappe.get_doc("Sales Taxes and Charges Master", self.discounts)
			frappe.msgprint("From Python discounts_method")
			for value in doc_master.get("other_charges"):
				#if "discount" or "Discount" in value.description:
				#frappe.msgprint(value.description)
				if value.charge_type=="Actual":
					val1=val1+value.rate
					doc_req = {
						"doctype": "Sales Taxes and Charges",
						"charge_type":value.charge_type,
						"description": value.description,
						"rate": value.rate,
						"tax_amount":value.rate,
						}
					#self.append("discounts_table", doc_req)
				elif value.charge_type=="On Net Total":
					val1=val1+(self.total_a * (value.rate/100))
					doc_req = {
						"doctype": "Sales Taxes and Charges",
						"charge_type":value.charge_type,
						"description": value.description,
						"rate": value.rate,
						"tax_amount":self.total_a * (value.rate/100),
						}	
					
				self.append("discounts_table", doc_req)
			self.discounts_total=val1
			self.total_b=self.total_a-self.discounts_total			
			self.flag2=1;

	
	
	def taxes_method(self):
		#frappe.msgprint(self.charges_table)
		#frappe.msgprint(self.charges)
		doc_req = []
		val2=0
		if self.flag3==0:
			self.flag3=1
		#if not self.taxes_table:
			doc_master = frappe.get_doc("Sales Taxes and Charges Master", self.taxes)
			#frappe.msgprint("From Python taxes_method")
			for value in doc_master.get("other_charges"):
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
					val2=val2+(self.total_b * (value.rate/100))
					doc_req = {
						"doctype": "Sales Taxes and Charges",
						"charge_type":value.charge_type,
						"description": value.description,
						"rate": value.rate,
						"tax_amount":self.total_b * (value.rate/100),
						}
					self.append("taxes_table", doc_req)
			self.taxes_total=val2
			self.total_c=self.total_b+self.taxes_total
			

'''@frappe.whitelist(allow_guest=True)			
def validateDoc(self,method):
	if not self.invoice_flat_no:
		frappe.msgprint("Please Select Any Flat")
'''
	

@frappe.whitelist(allow_guest=True)			
def insertData(self,method):
	frappe.msgprint("hi")
	#frappe.db.sql("""select MAX(name) from `tabSales Order`""")
	frappe.db.sql("""
		insert 
		
		into
		
			`tabSales Order`
		(name,customer_name,net_total,other_charges_total,grand_total,rounded_total)	
		select 
		
			name,customer_name,net_total,other_charges_total,total_c,rounded_total
		from
			`tabFlat Invoice`
		where
			name=(select MAX(name) from `tabFlat Invoice`)
		""")
			
					
	
	
	
	