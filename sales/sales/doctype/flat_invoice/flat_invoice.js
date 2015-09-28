cur_frm.add_fetch("invoice_flat_no","flat_no","flat_no")
cur_frm.add_fetch("invoice_flat_no","floor","invoice_floor")
cur_frm.add_fetch("invoice_flat_no","type","invoice_flat_type")
cur_frm.add_fetch("invoice_flat_no","area","area")
cur_frm.add_fetch("invoice_flat_no","plc_rate","plc_rate")
cur_frm.add_fetch("invoice_flat_no","frc_rate","frc_rate")
//----------------------PLC&FRC Calculation----------------------------------
frappe.ui.form.on("Flat Invoice","area",function(frm)
{
  frm.set_value("pref_loc_charges",frm.doc.area * frm.doc.plc_rate);
  frm.set_value("floor_rise_charges",frm.doc.area * frm.doc.frc_rate);
});
frappe.ui.form.on("Flat Invoice","invoice_flat_no",function(frm)
{
  frm.set_value("pref_loc_charges",frm.doc.area * frm.doc.plc_rate);
  frm.set_value("floor_rise_charges",frm.doc.area * frm.doc.frc_rate);
});
//----------------------Basic Cost Calculation----------------------------------
frappe.ui.form.on("Flat Invoice","area",function(frm)
{
 frm.set_value("basic_cost",frm.doc.rate * frm.doc.area);
});
frappe.ui.form.on("Flat Invoice","rate",function(frm)
{
 frm.set_value("basic_cost",frm.doc.rate * frm.doc.area);
});
frappe.ui.form.on("Flat Invoice","rate",function(frm)
{
 frm.set_value("total_a",frm.doc.basic_cost + frm.doc.pref_loc_charges + frm.doc.floor_rise_charges + frm.doc.other_charges_total);
});
frappe.ui.form.on("Flat Invoice","other_charges_total",function(frm)
{
 frm.set_value("total_a",frm.doc.basic_cost + frm.doc.pref_loc_charges + frm.doc.floor_rise_charges + frm.doc.other_charges_total);
});
//----------------------Rounded Total Calculation------------
frappe.ui.form.on("Flat Invoice","round_off",function(frm)
{
 frm.set_value("rounded_total",frm.doc.total_b_c2 -  frm.doc.round_off);
});
//----------------------Balance Amount Calculation------------
frappe.ui.form.on("Flat Invoice","down_payment",function(frm)
{
 frm.set_value("balance_amount",frm.doc.rounded_total -  frm.doc.down_payment);
});
//----------------------Other Charges Calculation------------
cur_frm.cscript.charges= function() {
            var me = this;
            //msgprint("from js Charges function")
            if(5==5) {
                return this.frm.call({
                    doc: this.frm.doc,
                    method: "charges_method",
                    callback: function(r) {
                        if(!r.exc) {
							//frm.set_value("total_a",frm.doc.basic_cost + frm.doc.pref_loc_charges + frm.doc.floor_rise_charges + frm.doc.other_charges_total);
                        }
                    }
                })
            }
        }
		
cur_frm.cscript.discounts= function() {
            var me = this;
            //msgprint("from js Disccount function")
            if(5==5) {
                return this.frm.call({
                    doc: this.frm.doc,
                    method: "discounts_method",
                    callback: function(r) {
                        if(!r.exc) {
                        }
                    }
                })
            }
        }
		
		
		
cur_frm.cscript.taxes= function() {
            var me = this;
            //msgprint("from js Taxes function")
            if(5==5) {
                return this.frm.call({
                    doc: this.frm.doc,
                    method: "taxes_method",
                    callback: function(r) {
                        if(!r.exc) {
                        }
                    }
                })
            }
        }
