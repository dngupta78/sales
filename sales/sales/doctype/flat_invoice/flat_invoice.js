cur_frm.add_fetch("invoice_flat_no","flat_no","flat_no")
cur_frm.add_fetch("invoice_flat_no","floor","invoice_floor")
cur_frm.add_fetch("invoice_flat_no","type","invoice_flat_type")
cur_frm.add_fetch("invoice_flat_no","area","area")
cur_frm.add_fetch("invoice_flat_no","plc_rate","plc_rate")
cur_frm.add_fetch("invoice_flat_no","frc_rate","frc_rate")
cur_frm.add_fetch("flat_invoice","customer_name","customer_name")
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
 frm.set_value("basic_cost",frm.doc.basic_rate * frm.doc.area);
});
frappe.ui.form.on("Flat Invoice","basic_rate",function(frm)
{
 frm.set_value("basic_cost",frm.doc.basic_rate * frm.doc.area);
});
frappe.ui.form.on("Flat Invoice","basic_rate",function(frm)
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
//----------------------Total B Amount Calculation------------
frappe.ui.form.on("Flat Invoice","total_a",function(frm)
{
 frm.set_value("total_b",frm.doc.total_a + frm.doc.discounts_total);
});
//----------------------Total C Amount Calculation------------
frappe.ui.form.on("Flat Invoice","total_b",function(frm)
{
 frm.set_value("total_b_c2",frm.doc.total_b + frm.doc.total_c);
});
//----------------------Other Charges Calculation------------
cur_frm.cscript.charges= function(frm,this.frm.doc.charges_table) {
            var me = this;
            //msgprint("from js Charges function")
            if(0==0) {
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
//-----------------
/*cur_frm.cscript.charges_table = function(doc, cdt, cdn) {
	 var me = this;
            if(1) {
                return this.frm.call({
                    doc: this.frm.doc,
                    method: "charges_table_method",
                    callback: function(r) {
                        if(!r.exc) {
							//frm.set_value("total_a",frm.doc.basic_cost + frm.doc.pref_loc_charges + frm.doc.floor_rise_charges + frm.doc.other_charges_total);
                        
						}
                    }
                })
            }
        };
	*/
	
	
	
	
	
	
cur_frm.cscript.rate = function(doc, cdt, cdn) {
    var charge = frappe.get_doc(cdt, cdn);
    var amount = (doc.basic_cost * charge.rate)/100  ;
	frappe.model.set_value(cdt, cdn, "tax_amount", amount);
	frappe.model.set_value("other_charges_total", doc.other_charges_total + amount)
	//cur_frm.set_value('other_charges_total', doc.other_charges_total + amount);
	//refresh_field('other_charges_total');
	
};
	