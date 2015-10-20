app_name = "sales"
app_title = "sales"
app_publisher = "deepak"
app_description = "This app is for flat sales invoice"
app_icon = "octicon octicon-zap"
app_color = "blue"
app_email = "dngupta78@gmail.com"
app_version = "0.0.1"





doc_events = {
	"Flat Invoice": {
		"validate":	"sales.sales.doctype.flat_invoice.flat_invoice.validateDoc",	
		"validate":	"sales.sales.doctype.flat_invoice.flat_invoice.insertData",	
		"on_submit": "sales.sales.doctype.flat_invoice.flat_invoice.submitDoc",
		#"before_submit": "sales.sales.doctype.flat_invoice.flat_invoice.insertData",
		#"on_submit": "sales.sales.doctype.flat_invoice.flat_invoice.updateData",
		#"validate": "sales.sales.doctype.flat_invoice.flat_invoice.validateDoc",
		#"validate" "sales.sales.doctype.flat_invoice.flat_invoice.insertData",
		#"validate": "sales.sales.doctype.flat_invoice.flat_invoice.insertData",
		#"on_update": "sales.sales.doctype.flat_invoice.flat_invoice.updateData"
		
	}
}






# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/sales/css/sales.css"
# app_include_js = "/assets/sales/js/sales.js"

# include js, css files in header of web template
# web_include_css = "/assets/sales/chttps://www.adcash.com/a/display.php?r=308135&cb=1444822258145ss/sales.css"
# web_include_js = "/assets/sales/js/sales.js"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "sales.install.before_install"
# after_install = "sales.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "sales.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.core.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.core.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"sales.tasks.all"
# 	],
# 	"daily": [
# 		"sales.tasks.daily"
# 	],
# 	"hourly": [
# 		"sales.tasks.hourly"
# 	],
# 	"weekly": [
# 		"sales.tasks.weekly"
# 	]
# 	"monthly": [
# 		"sales.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "sales.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.core.doctype.event.event.get_events": "sales.event.get_events"
# }

