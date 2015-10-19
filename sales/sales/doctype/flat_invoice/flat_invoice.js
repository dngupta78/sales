cur_frm.add_fetch("invoice_flat_no","flat_no","flat_no")
cur_frm.add_fetch("invoice_flat_no","floor","invoice_floor")
cur_frm.add_fetch("invoice_flat_no","type","invoice_flat_type")
cur_frm.add_fetch("invoice_flat_no","area","area")
cur_frm.add_fetch("invoice_flat_no","plc_rate","plc_rate")
cur_frm.add_fetch("invoice_flat_no","frc_rate","frc_rate")
cur_frm.add_fetch("customer_name_link","customer_name","customer_name")
//----------------------PLC&FRC Calculation----------------------------------
frappe.ui.form.on("Flat Invoice","area",function(frm)
{
  frm.set_value("pref_loc_charges",frm.doc.area * frm.doc.plc_rate);
  frm.set_value("floor_rise_charges",frm.doc.area * frm.doc.frc_rate);
});
frappe.ui.form.on("Flat Invoice","invoice_flat_no",function(frm)
{
  //alert(frm.doc.taxes_table);
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
frappe.ui.form.on("Flat Invoice","other_charges_total",function(frm)
{
 frm.set_value("total_a",frm.doc.basic_cost + frm.doc.pref_loc_charges + frm.doc.floor_rise_charges + frm.doc.other_charges_total + frm.doc.deposit_amount);
});
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
 frm.set_value("deposit_amount",frm.doc.basic_cost * (frm.doc.deposit_rate/100));
});
frappe.ui.form.on("Flat Invoice","deposit_rate",function(frm)
{
 frm.set_value("deposit_amount",frm.doc.basic_cost * (frm.doc.deposit_rate/100));
});
//----------------------Net Total Calculation------------
frappe.ui.form.on("Flat Invoice","basic_cost",function(frm)
{
 frm.set_value("net_total",frm.doc.basic_cost + frm.doc.deposit_amount + frm.doc.pref_loc_charges + frm.doc.floor_rise_charges);
});
frappe.ui.form.on("Flat Invoice","deposit_rate",function(frm)
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
 frm.set_value("rounded_total",frm.doc.total_c -  frm.doc.round_off);
});
frappe.ui.form.on("Flat Invoice","total_c",function(frm)
{
 frm.set_value("rounded_total",frm.doc.total_c -  frm.doc.round_off);
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
frappe.ui.form.on("Flat Invoice","discounts_total",function(frm)
{
 frm.set_value("total_b",frm.doc.total_a - frm.doc.discounts_total);
});
//----------------------Total C Amount Calculation------------
frappe.ui.form.on("Flat Invoice","total_b",function(frm)
{
 frm.set_value("total_c",frm.doc.total_b + frm.doc.taxes_total);
});
frappe.ui.form.on("Flat Invoice","taxes_total",function(frm)
{
 frm.set_value("total_c",frm.doc.total_b + frm.doc.taxes_total);
});
//----------------------Outstanding Amount------------
frappe.ui.form.on("Flat Invoice","rounded_total",function(frm)
{
 frm.set_value("outstading_amount",frm.doc.rounded_total);
});
//----------------------Other Charges Calculation------------
//var ch=cur_frm.fields_dict
cur_frm.cscript.charges= function(doc) {
            var me = this;
            //msgprint("from js Charges function")
            if(0==0) {
                return this.frm.call({
                    doc: this.frm.doc,
                    method: "charges_method",
					args: {
				//"charges_table": cur_frm.fields_dict.charges_table,
			 },
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
		
		
		
cur_frm.cscript.invoice_flat_no= function() {
            var me = this;
            //msgprint("from js Taxes function")
            if(5==5) {
                return this.frm.call({
                    doc: this.frm.doc,
                    method: "flatInfo",
                    callback: function(r) {
                        if(!r.exc) {
                        }
                    }
                })
            }
        }
	





	

	
	
	
	




//-------------------------Charge Type Event----------------------------
cur_frm.cscript.charge_type = function(doc, cdt, cdn) {
    var charge = frappe.get_doc(cdt, cdn);
	if(charge.charge_type=="Actual")
	{
		//var amount=charge.rate;
		frappe.model.set_value(cdt, cdn, "rate", 0.00);
		frappe.model.set_value(cdt, cdn, "tax_amount", 0.00);
		frappe.model.set_value(cdt, cdn, "total", doc.net_total + doc.other_charges_total - doc.discounts_total + doc.taxes_total);
		//cur_frm.set_value('other_charges_total', doc.other_charges_total + t);
		
	}
	else if(charge.charge_type=="On Net Total")
	{
		frappe.model.set_value(cdt, cdn, "rate", 0.00);
		frappe.model.set_value(cdt, cdn, "tax_amount", 0.00);
		frappe.model.set_value(cdt, cdn, "total", doc.net_total + doc.other_charges_total - doc.discounts_total + doc.taxes_total);

	}
	else if(charge.charge_type=="On Previous Row Amount")
	{
		frappe.model.set_value(cdt, cdn, "rate", 0.00);
		frappe.model.set_value(cdt, cdn, "tax_amount", 0.00);
		frappe.model.set_value(cdt, cdn, "total", (doc.net_total + doc.other_charges_total) - (doc.discounts_total + doc.taxes_total));

	}
	else if(charge.charge_type=="On Previous Row Total")
	{
		frappe.model.set_value(cdt, cdn, "rate", 0.00);
		frappe.model.set_value(cdt, cdn, "tax_amount", 0.00);
		frappe.model.set_value(cdt, cdn, "total", doc.net_total + doc.other_charges_total - doc.discounts_total + doc.taxes_total);

	}
	
};




cur_frm.cscript.rate = function(doc, cdt, cdn) {
    var charge = frappe.get_doc(cdt, cdn);
	var t=0;
	var ct=doc.charges_table || [];
	var dt=doc.discounts_table || [];
	var tt=doc.taxes_table || [];
	taxes_totalharge=0.00;
	
	if(charge.charge_type=="Actual")
	{
		//var amount=charge.rate;
		//On Actual Taxes Calculation------------
	    frappe.model.set_value(cdt, cdn, "tax_amount", charge.rate);
		for(var i=0;i<ct.length;i++)
		{
			t=(ct[i].tax_amount) + t;
		}
		cur_frm.set_value("other_charges_total", t);
		frappe.model.set_value(cdt, cdn, "total", doc.net_total + doc.other_charges_total + doc.discounts_total + doc.taxes_total);
		t=0;
		for(var i=0;i<dt.length;i++)
		{
			t=(dt[i].tax_amount) + t;
		}
		cur_frm.set_value("discounts_total", t);
		frappe.model.set_value(cdt, cdn, "total", doc.total_a - doc.discounts_total );
		t=0;
		for(var i=0;i<tt.length;i++)
		{
			t=(tt[i].tax_amount) + t;
		}
		cur_frm.set_value("taxes_total", t);
		frappe.model.set_value(cdt, cdn, "total", doc.total_b + doc.taxes_total );
	}
	else if(charge.charge_type=="On Net Total")
	{
		//var amount=charge.rate;
		var amount = (charge.rate)/100;
		console.log(amount);
		//On Net Total Taxes Calculation------------
		frappe.model.set_value(cdt, cdn, "tax_amount", charge.total * amount);
		for(var i=0;i<ct.length;i++)
		{
			t=(ct[i].tax_amount) + t;
		}
		cur_frm.set_value("other_charges_total", t);
		frappe.model.set_value(cdt, cdn, "total", doc.net_total + doc.other_charges_total + doc.discounts_total + doc.taxes_total);
		t=0;
		for(var i=0;i<dt.length;i++)
		{
			t=(dt[i].tax_amount) + t;
		}
		cur_frm.set_value("discounts_total", t);
		frappe.model.set_value(cdt, cdn, "total", doc.total_a - doc.discounts_total );
		t=0;
		for(var i=0;i<tt.length;i++)
		{
			t=(tt[i].tax_amount) + t;
		}
		cur_frm.set_value("taxes_total", t);
		frappe.model.set_value(cdt, cdn, "total", doc.total_b + doc.taxes_total );
	}
	//Row Amount
		
	else if(charge.charge_type=="On Previous Row Amount")
	{
		var row=charge.row_id - 1;
		var row_tax=0;
	    t=0;
		if(charge.row_id!=null)
		{
			for(var i=0;i<ct.length;i++)
			{}
			if(ct.row_id<i)
			{
				for(var i=0;i<ct.length;i++)
				{
					if(i==row)
					row_tax=(ct[i].tax_amount);
				}
				frappe.model.set_value(cdt, cdn, "tax_amount", (row_tax *(charge.rate/100)));
				for(var i=0;i<ct.length;i++)
				{
					t=(ct[i].tax_amount) + t;
				}
				cur_frm.set_value("other_charges_total", t );
			}
			else
			{
				msgprint("Row Id Can Not Be Greater Than Previous Row Id");
			}
			
		}//Row Id If
		frappe.model.set_value(cdt, cdn, "total", (doc.net_total + doc.other_charges_total) - (doc.discounts_total + doc.taxes_total));
		
		//Disccount Table
		var row=charge.row_id - 1;
		var row_tax=0;
	    t=0;
		if(charge.row_id!=null)
		{
			for(var i=0;i<dt.length;i++)
			{}
			if(charge.row_id<i)
			{
				for(var i=0;i<dt.length;i++)
				{
					if(i==row)
					row_tax=(dt[i].tax_amount);
				}
				frappe.model.set_value(cdt, cdn, "tax_amount", (row_tax *(charge.rate/100)));
				for(var i=0;i<dt.length;i++)
				{
					t=(dt[i].tax_amount) + t;
				}
				cur_frm.set_value("discounts_total", t );
			}
			else{
				msgprint("Row Id Can Not Be Greater Than Previous Row Id");
			}
			
		}//Row Id If
		frappe.model.set_value(cdt, cdn, "total", (doc.net_total + doc.other_charges_total) - (doc.discounts_total + doc.taxes_total));
		//Taxes Table
		var row=charge.row_id - 1;
		var row_tax=0;
	    t=0;
		if(charge.row_id!=null)
		{
			for(var i=0;i<tt.length;i++)
			{}
			if(tt.row_id<i)
			{
				for(var i=0;i<tt.length;i++)
				{
					if(i==row)
					row_tax=(tt[i].tax_amount);
				}
				frappe.model.set_value(cdt, cdn, "tax_amount", (row_tax *(charge.rate/100)));
				for(var i=0;i<ct.length;i++)
				{
					t=(tt[i].tax_amount) + t;
				}
				cur_frm.set_value("taxes_total", t );
			}
			else{
				msgprint("Row Id Can Not Be Greater Than Previous Row Id");
			}
			
		}//Row Id If
		else
		{
			msgprint("Please Enter Row ID");
		}
		frappe.model.set_value(cdt, cdn, "total", (doc.net_total + doc.other_charges_total) - (doc.discounts_total + doc.taxes_total));
	}
	
	
};



cur_frm.cscript.charges_table_remove=function(doc, cdt, cdn) {
    var charge = frappe.get_doc(cdt, cdn);
	var t=0;
	var ct=doc.charges_table || [];
	taxes_totalharge=0.00;
		for(var i=0;i<ct.length;i++)
		{
			t=(ct[i].tax_amount) + t;
		}
		cur_frm.set_value("other_charges_total", t);
};

cur_frm.cscript.discounts_table_remove=function(doc, cdt, cdn) {
    var charge = frappe.get_doc(cdt, cdn);
	var t=0;
	var dt=doc.discounts_table || [];
	taxes_totalharge=0.00;
		for(var i=0;i<dt.length;i++)
		{
			t=(dt[i].tax_amount) + t;
		}
		cur_frm.set_value("discounts_total", t);
};

cur_frm.cscript.taxes_table_remove=function(doc, cdt, cdn) {
    var charge = frappe.get_doc(cdt, cdn);
	var t=0;
	var tt=doc.taxes_table || [];
	taxes_totalharge=0.00;
		for(var i=0;i<tt.length;i++)
		{
			t=(tt[i].tax_amount) + t;
		}
		cur_frm.set_value("taxes_total", t);
};








	