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
  alert(frm.doc.taxes_table);
  frm.set_value("pref_loc_charges",frm.doc.area * frm.doc.plc_rate);
  frm.set_value("floor_rise_charges",frm.doc.area * frm.doc.frc_rate);
});
//----------------------Basic Cost Calculation---------------------------------- outstanding_amount
frappe.ui.form.on("Flat Invoice","area",function(frm)
{
 frm.set_value("basic_cost",frm.doc.basic_rate * frm.doc.area);
});
frappe.ui.form.on("Flat Invoice","basic_rate",function(frm)
{
 frm.set_value("basic_cost",frm.doc.basic_rate * frm.doc.area);
});
/*frappe.ui.form.on("Flat Invoice","basic_rate",function(frm)
{
 frm.set_value("total_a",frm.doc.basic_cost + frm.doc.pref_loc_charges + frm.doc.floor_rise_charges + frm.doc.other_charges_total);
});
frappe.ui.form.on("Flat Invoice","other_charges_total",function(frm)
{
 frm.set_value("total_a",frm.doc.basic_cost + frm.doc.pref_loc_charges + frm.doc.floor_rise_charges + frm.doc.other_charges_total);
});*/
frappe.ui.form.on("Flat Invoice","net_total",function(frm)
{
 frm.set_value("total_a",frm.doc.net_total);
});
//----------------------Total A Calculation------------
frappe.ui.form.on("Flat Invoice","tax_amount",function(frm)
{
 frm.set_value("total_a",frm.doc.basic_cost + frm.doc.pref_loc_charges + frm.doc.floor_rise_charges + frm.doc.other_charges_total + frm.doc.deposit_amount);
});
frappe.ui.form.on("Flat Invoice","invoice_flat_no",function(frm)
{
  frm.set_value("total_a",frm.doc.basic_cost + frm.doc.pref_loc_charges + frm.doc.floor_rise_charges + frm.doc.other_charges_total + frm.doc.deposit_amount);
});

//----------------------Deposit Amount Calculation------------
frappe.ui.form.on("Flat Invoice","basic_cost",function(frm)
{
 frm.set_value("deposit_amount",frm.doc.basic_cost * (6.5/100));
});
//----------------------Net Total Calculation------------
frappe.ui.form.on("Flat Invoice","basic_cost",function(frm)
{
 frm.set_value("net_total",frm.doc.basic_cost + frm.doc.deposit_amount + frm.doc.pref_loc_charges + frm.doc.floor_rise_charges);
});
frappe.ui.form.on("Flat Invoice","invoice_flat_no",function(frm)
{
  frm.set_value("net_total",frm.doc.basic_cost + frm.doc.deposit_amount + frm.doc.pref_loc_charges + frm.doc.floor_rise_charges);
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
 frm.set_value("total_b",frm.doc.total_a - frm.doc.discounts_total);
});
//----------------------Total C Amount Calculation------------
frappe.ui.form.on("Flat Invoice","total_b",function(frm)
{
 frm.set_value("total_b_c2",frm.doc.total_b + frm.doc.total_c);
});
frappe.ui.form.on("Flat Invoice","total_c",function(frm)
{
 frm.set_value("total_b_c2",frm.doc.total_b + frm.doc.total_c);
});
//----------------------Outstanding Amount------------
frappe.ui.form.on("Flat Invoice","rounded_total",function(frm)
{
 frm.set_value("outstading_amount",frm.doc.rounded_total);
});
//----------------------Other Charges Calculation------------
cur_frm.cscript.charges= function(doc) {
            var me = this;
            //msgprint("from js Charges function")
            if(doc.charge_table != null) {
                return this.frm.call({
                    doc: this.frm.doc,
                    method: "charges_method",
					//args: {
				//"charges_table": doc.charges_table,
			 //},
                    callback: function(r) {
                        if(!r.exc) {
							
                        
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
	


cur_frm.cscript.charge_type= function() {
            var me = this;
            //msgprint("from js Taxes function")
            if(5==5) {
                return this.frm.call({
                    doc: this.frm.doc,
                    method: "charge_type_method",
                    callback: function(r) {
                        if(!r.exc) {
                        }
                    }
                })
            }
        }



	

	
	
	
	
/*cur_frm.cscript.rate = function(doc, cdt, cdn) {
    var charge = frappe.get_doc(cdt, cdn);
    var amount = (doc.basic_cost * charge.rate)/100  ;
	frappe.model.set_value(cdt, cdn, "tax_amount", amount);
	frappe.model.set_value("other_charges_total", doc.other_charges_total + amount)
	//cur_frm.set_value('other_charges_total', doc.other_charges_total + amount);
	//refresh_field('other_charges_total');
	
};*/



//-------------------------Actual Event----------------------------
cur_frm.cscript.charge_type = function(doc, cdt, cdn) {
    var charge = frappe.get_doc(cdt, cdn);
	if(charge.charge_type=="Actual")
	{
		//var amount=charge.rate;
		frappe.model.set_value(cdt, cdn, "total", doc.basic_cost);
		frappe.model.set_value(cdt, cdn, "tax_amount", 0.00);
		//cur_frm.set_value('other_charges_total', doc.other_charges_total + t);
		
	}
	else if(charge.charge_type=="On Net Total")
	{
		//var amount=charge.rate;
		var amount = (doc.basic_cost * charge.rate)/100;
		frappe.model.set_value(cdt, cdn, "tax_amount", amount);
		//frappe.model.set_value("other_charges_total", doc.other_charges_total + amount)
	}
	
    //var amount = (doc.basic_cost * charge.rate)/100  ;
	//frappe.model.set_value(cdt, cdn, "tax_amount", amount);
	//frappe.model.set_value("other_charges_total", doc.other_charges_total + amount)
	//cur_frm.set_value('other_charges_total', doc.other_charges_total + amount);
	//refresh_field('other_charges_total');
	
};
/*fun1=function(doc,cdn,cdt)
{
	
	for(var i=0;i<ct.length;i++)
		{
			t=(ct[i].tax_amount) + t;
			console.log(t);
		}

	
}*/




cur_frm.cscript.rate = function(doc, cdt, cdn) {
    var charge = frappe.get_doc(cdt, cdn);
	var t=0;
	var ct=doc.charges_table || [];
	total_charge=0.00;
	
	if(charge.charge_type=="Actual")
	{
		//var amount=charge.rate;
	    frappe.model.set_value(cdt, cdn, "tax_amount", charge.rate);
		for(var i=0;i<ct.length;i++)
		{
			t=(ct[i].tax_amount) + t;
			console.log(t);
		}
		cur_frm.set_value("other_charges_total", t);
		//cur_frm.set_value('total_a', charge.total + doc.other_charges_total);
	}
	else if(charge.charge_type=="On Net Total")
	{
		//var amount=charge.rate;
		var amount = (doc.basic_cost * charge.rate)/100;
		frappe.model.set_value(cdt, cdn, "tax_amount", amount);
		//frappe.model.set_value("other_charges_total", doc.other_charges_total + amount)
	}
	
    //var amount = (doc.basic_cost * charge.rate)/100  ;
	//frappe.model.set_value(cdt, cdn, "tax_amount", amount);
	//frappe.model.set_value("other_charges_total", doc.other_charges_total + amount)
	//cur_frm.set_value('other_charges_total', doc.other_charges_total + amount);
	//refresh_field('other_charges_total');
	
};




frappe.ui.form.on("Sales Taxes and Charges","charges_table_remove",function(doc,cdn,cdt)
{
	var t=0.00;
	var ct=doc.charges_table || [];
	for(var i=0;i<ct.length;i++)
		{
			t=(ct[i].tax_amount) + t;
			console.log(t);
		}
    console.log(cdn,cdt);
	cur_frm.set_value("other_charges_total", t);
});



	