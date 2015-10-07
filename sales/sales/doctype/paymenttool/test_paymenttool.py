# Copyright (c) 2013, deepak and Contributors
# See license.txt
from __future__ import unicode_literals

import frappe
import unittest

test_records = frappe.get_test_records('PaymentTool')

class TestPaymentTool(unittest.TestCase):
	pass
