# -*- coding: utf-8 -*-
# Copyright (c) 2015, d and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class FlatMaster(Document):
	


	def insertItem(self):
		im=frappe.get_doc({      
		"doctype": "Item",
		"item_code":self.flat_no,
		"item_name":self.flat_no,
		"item_group":"All Item Group",
		"default_warehouse":"Stores-TGR",

		}).insert
	




#Insert Same Item in to the Item master
@frappe.whitelist(allow_guest=True)
def saveItem(self,method):
	frappe.msgprint("Item")
	'''im=frappe.get_doc({      
		"doctype": "Item",
		"item_code":self.flat_no,
		"item_name":self.flat_no,
		"item_group":"All Item Group",
		"default_warehouse":"Stores-TGR",

		}).insert
	im.save()

	#im.submit()
'''


