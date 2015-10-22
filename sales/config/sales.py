from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"label": _("Documents"),
			"icon": "icon-star",
			"items": [
				{
					"type": "doctype",
					"label":"Sales Invoice",
					"name": "Flat Invoice",
					"description": _("Create Flat Invoice")
				},
				{
					"type": "doctype",
					"name": "Flat Payment Plan",
					"description": _("Make Flat Payment Plan")
				},
			]
		},
		{
			"label": _("Tools"),
			"icon": "icon-wrench",
			"items": [
				{
					"type": "doctype",
					"name": "Flat Master",
					"description": _("Insert Flat Details")
				},
				{
					"type": "doctype",
					"name": "Flat Type Master",
					"description": _("Insert Flat Type Details")
				},
				{
					"type": "doctype",
					"name": "Floor Rise Master",
					"description": _("Insert Flat Details")
				},
			]
		}
		]
