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
		doc_req = []
		#<<<<<<< HEAD
#=======
#>>>>>>> d1c12b8ead7aa6bf31699eff964584c774e6ae17
		if self.charges and not len(self.get("charges_table")):
			doc_master = frappe.get_doc("Sales Taxes and Charges Template", self.charges)
			val=0
			frappe.msgprint(self)
			for value in doc_master.get("taxes"):
				if value.charge_type=="Actual":
					val=val+value.tax_amount
					doc_req = {
						"doctype": "Sales Taxes and Charges",
						"charge_type":value.charge_type,
						"description": value.description,
						"tax_amount":value.tax_amount,
						}
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
				self.append("charges_table", doc_req)
			self.other_charges_total=val
			self.total_a=self.total_a+self.other_charges_total
			#self.flag1=1
						

	def discounts_method(self):
		#frappe.msgprint(self.charges_table)
		#frappe.msgprint(self.discounts)
		doc_req = []
		val1=0
		#if not self.discounts_table:
		if self.discounts and not len(self.get("discounts_table")):
			doc_master = frappe.get_doc("Sales Taxes and Charges Template", self.discounts)
			#frappe.msgprint("From Python discounts_method")
			for value in doc_master.get("taxes"):
				#if "discount" or "Discount" in value.description:
				#frappe.msgprint(value.description)
				if value.charge_type=="Actual":
					val1=val1+value.tax_amount
					doc_req = {
						"doctype": "Sales Taxes and Charges",
						"charge_type":value.charge_type,
						"description": value.description,
						"tax_amount":value.tax_amount,
						}
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
		if self.taxes and not len(self.get("taxes_table")):
			doc_master = frappe.get_doc("Sales Taxes and Charges Template", self.taxes)
			#frappe.msgprint("From Python taxes_method")
			for value in doc_master.get("taxes"):
				if value.charge_type=="Actual":
					val2=val2+value.tax_amount
					doc_req = {
						"doctype": "Sales Taxes and Charges",
						"charge_type":value.charge_type,
						"description": value.description,
						"tax_amount":value.tax_amount,
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
		#flatCheck=frappe.db.sql("""select isBooked from `tabFlat Master` where flat_no='%s'"""%(self.flat_no))
		flatMaster=frappe.get_doc("Flat Master",self.flat_no)
		if flatMaster.isbooked==1:
			frappe.msgprint("Flat Already Sold Out")
			
			
			
			
			
			

@frappe.whitelist(allow_guest=True)			
def validateDoc(self,method):
	flag1=0
	if self.invoice_flat_no is None:
		frappe.msgprint("Select Flat")
		flag1=1
	if self.invoice_flat_no:
		flatMaster=frappe.get_doc("Flat Master",self.flat_no)
		if flatMaster.isbooked==1:
			frappe.msgprint("Flat Already Sold Out")
			flag1=1
	if self.customer_name_link is None:
		frappe.msgprint("Select Customer")
		flag1=1
	if self.booking_date is None:
		frappe.msgprint("Enter Booking Date")
		flag1=1

	return flag1
	

	

@frappe.whitelist(allow_guest=True)			
def insertData(self,method):
	frappe.msgprint("Start")
	#flatMaster=frappe.get_doc("Flat Master",self.flat_no)
	if flatMaster.isbooked==1:
		frappe.msgprint("Flat Already Sold Out")
	else:
		si =  frappe.get_doc({      
			"doctype": "Sales Invoice",
				"net_total": self.net_total,
				"grand_total": self.basic_cost,
				"debit_to": "Cash - ST",
				"territory":"India",
				"grand_total":self.rounded_total,
				"rounded_total":self.rounded_total,
				"grand_total_export":self.rounded_total,
				"outstanding_amount":self.rounded_total,	
			"items": [{
				"item_name": self.flat_no,
				"item_code": self.flat_no,
				"description": self.flat_no,
				"qty": self.flag1,
				"rate": self.net_total,
				"amount": self.net_total,
				"income_account": "Administrative Expenses - ST",
			}],
    	}).insert()
		si.submit()
		frappe.msgprint("Over")

@frappe.whitelist(allow_guest=True)
def submitDoc(self,method):
	frappe.msgprint("submit")


@frappe.whitelist(allow_guest=True)			
def beforeInsertDoc(self,method):
	frappe.msgprint("Start Validate")
	'''if self.invoice_flat_no is None:
		frappe.msgprint("Select Any Flat")
	if self.customer_name_link is None:
		frappe.msgprint("Select Customer")
	if self.booking_date is None:
		frappe.msgprint("Enter Booking Date")'''
	if validateDoc(self,method)==0:
		insertData(self,method)
	frappe.msgprint("End Validate")
