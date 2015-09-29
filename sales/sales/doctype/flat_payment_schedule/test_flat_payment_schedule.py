# Copyright (c) 2013, deepak and Contributors
# See license.txt
from __future__ import unicode_literals

import frappe
import unittest

test_records = frappe.get_test_records('Flat Payment Schedule')

class TestFlatPaymentSchedule(unittest.TestCase):
	pass
