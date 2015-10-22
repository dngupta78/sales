cur_frm.add_fetch("flat_type","flat_type","type")
cur_frm.add_fetch("flat_type","plc","plc_rate")
cur_frm.add_fetch("floor_link","floor","floor")
cur_frm.add_fetch("floor_link","frc","frc_rate")
frappe.ui.form.on("Flat Master","flat_no",function(frm)
{
	frm.set_value("flat_name",frm.doc.flat_no);
});


cur_frm.cscript._save= function(doc) {
            var me = this;
            msgprint("from js Charges function")
            if(0==0) {
                return this.frm.call({
                    doc: this.frm.doc,
                    method: "insertItem",
					args: {
			 },
                    callback: function(r) {
                        if(!r.exc) {
							
                        
						}
                    }
                })
            }
        }
