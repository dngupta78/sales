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
from frappe import throw, _, msgprint
import sys,os
import MySQLdb




class FlatInvoice(Document):

	#charges_table=[]

	#def __init__(self,charges_table):
	#	self.charges_table=charges_table
	#def __init__(self):
	#	db=MySQLdb.connect("localhost","root","O18py74ynojdggPJ","1bd3e0294d")
	#	cursor = db.cursor()

	def charges_method(self):
		#frappe.msgprint(self.charges_table)
		#frappe.msgprint(self.charges)
		doc_req = []
		#a = self.doc.get("taxes_table")
		#frappe.msgprint(a)
		if self.flag1==0:
		#if not self.charges_table:
		#frappe.msgprint("From Python charges_method")
		#if self.charges_table is None:
		#if self.charges:
			#frappe.msgprint(self)
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
			
			
			
			
	def flatInfo(self):
		k=0
		flatInvoiceList=frappe.db.sql('''select  flat_no from `tabFlat Invoice`''')
		#flatMasterList=frappe.db.sql('''select  flat_no from `tabFlat Master`''')
		doc_m = frappe.get_doc("Flat Invoice", self.name)
		for i in flatInvoiceList:
				if i==doc_m.flat_no:
						k=1
						
		if k==1:
			frappe.msgprint("Flat Already Sold Out")
			
			
			
			
			
			
			

@frappe.whitelist(allow_guest=True)			
def validateDoc(self,method):
	if self.invoice_flat_no is None:
		frappe.msgprint("Please Select Any Flat")
	if self.customer_name_link is None:
		frappe.msgprint("Please Select Customer")
	if self.booking_date is None:
		frappe.msgprint("Please Enter Booking Date")

	

@frappe.whitelist(allow_guest=True)			
def insertData(self,method):
	frappe.msgprint("Hi")
	si =  frappe.get_doc({
        "doctype": "Sales Invoice",
        "items": [{
            "item_name": "self.flat_no",
			"description": "self.flat_no",
			"qty": "1",
			"rate": "self.basic_rate",
			"amount": "self.basic_cost",
	   "income_account": "Administrative Expenses - ST",
       }],
	   "customer":"self.customer_name",
	   "customer_name":"self.customer_name",
	   "contact_mobile":"self.email_id",
	   "company":"self.customer_name",
	   "posting_date":"self.booking_date",
	   "due_date":"self.booking_date",
	   "net_total":"self.net_total",
	   "net_total_export":"self.net_total",
	   "other_charges_total_export":"self.other_charges_total",
	   "discount_amount":"self.discounts_total",
	   "grand_total":"self.rounded_total",
	   "contact_email":"self.email_id",
	   "icon":"icon-shopping-cart",
    }).insert()	
'''
@frappe.whitelist(allow_guest=True)			
def updateData(self,method):
	doc_m = frappe.get_doc("Sales Invoice", self.name)	
	doc_m.on_update()
'''	
	
	
	