cur_frm.add_fetch("flat_invoice","customer_name","customer_name")
cur_frm.add_fetch("flat_invoice","flat_no","flat_number")
cur_frm.add_fetch("flat_invoice","rounded_total","total_sales_consideration")
//-------------------------Payment Plan--------------------------------------------------------------------
cur_frm.cscript.payment_schedule= function(frm) {
            var me = this;
            //msgprint("from js Charges function")
            if(this.frm.doc.charges_table ==null) {
                return this.frm.call({
                    doc: this.frm.doc,
                    method: "payment_schedule_method",
                    callback: function(r) {
                        if(!r.exc) {
							//frm.set_value("total_a",frm.doc.basic_cost + frm.doc.pref_loc_charges + frm.doc.floor_rise_charges + frm.doc.other_charges_total);
                        
						}
                    }
                })
            }
        }
		
		
cur_frm.cscript.received_amount = function(doc, cdt, cdn) {
    var payment = frappe.get_doc(cdt, cdn);
    var balance = (payment.paid_amount - payment.received_amount)  ;
	frappe.model.set_value(cdt, cdn, "balance", balance);
	//frappe.model.set_value("other_charges_total", doc.other_charges_total + amount)
	//cur_frm.set_value('other_charges_total', doc.other_charges_total + amount);
	//refresh_field('other_charges_total');
	
};		

