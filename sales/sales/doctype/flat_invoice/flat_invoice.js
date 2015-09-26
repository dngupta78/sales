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
//----------------------Other Charges Calculation----------------------------------

cur_frm.cscript.charges= function() {
            var me = this;
            msgprint("from js function")
            if(5==5) {
                return this.frm.call({
                    doc: this.frm.doc,
                    method: "charges_method",
                    callback: function(r) {
                        if(!r.exc) {
                        }
                    }
                })
            }
        }
