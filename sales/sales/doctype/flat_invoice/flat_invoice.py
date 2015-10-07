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

	#charges_table=[]

	#def __init__(self,charges_table):
	#	self.charges_table=charges_table
	

	def charges_method(self):
		#frappe.msgprint(self.charges_table)
		#frappe.msgprint(self.charges)
		doc_req = []
		#a = self.doc.get("taxes_table")
		#frappe.msgprint(a)
		#if self.flag1==0:
		#if not self.charges_table:
		frappe.msgprint("From Python charges_method")
		if self.charges:
			doc_master = frappe.get_doc("Sales Taxes and Charges Master", self.charges)
			frappe.msgprint("From Python charges_method")
			val=0
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
					val=val+(self.basic_cost * (value.rate/100))
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
			
			
	'''def calculate_charges(self):
		frappe.msgprint("From Python")
		doc_req = []
		#doc_master = frappe.get_doc("Sales Taxes and Charges")
		val=0
		frappe.doclist.getchildren(name, Sales Taxes and , field='tax_amount')
		for value in doc_master:
			val=val+value.tax_amount
			frappe.msgprint(val)
			self.other_charges_total=val
		self.total_a=self.total_a+self.other_charges_total'''
				

	def discounts_method(self):
		#frappe.msgprint(self.charges_table)
		#frappe.msgprint(self.discounts)
		doc_req = []
		val1=0
		if self.flag2==0:
			self.flag2=1
			doc_master = frappe.get_doc("Sales Taxes and Charges Master", self.discounts)
			#frappe.msgprint("From Python discounts_method")
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
					self.append("discounts_table", doc_req)
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

	
	
	def taxes_method(self):
		#frappe.msgprint(self.charges_table)
		#frappe.msgprint(self.charges)
		doc_req = []
		val2=0
		if self.flag3==0:
			self.flag3=1
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
			self.total_c=val2
			self.total_b_c2=self.total_b-self.total_c
			
			
	def charge_type_method(self):
		doc_req = []
		#frappe.msgprint("From Python charges_method")
		#if self.charges_type:
		if 0==0:
			doc_master = frappe.get_doc("Sales Taxes and Charges")
			#frappe.msgprint("From Python charges_method")
			val=0
			for value in doc_master.get("taxes_table"):
				if value.charge_type=="Actual":
					val=val+value.rate
					doc_req = {
						"doctype": "Sales Taxes and Charges",
						"charge_type":value.charge_type,
						"description": value.description,
						"rate": value.rate,
						"tax_amount":value.rate,
						"tax_amount":self.basic_cost + value.rate,
						
						}
			        #frappe.model.clear_table("charges_table");
					self.append("charges_table", doc_req)
				elif value.charge_type=="On Net Total":
					val=val+(self.total_a * (value.rate/100))
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
			
	
	
	
	