cur_frm.cscript.charges= function() {
            var me = this;
            msgprint("from js function")
            if(5==5) {
                return this.frm.call({
                    doc: this.frm.doc,
                    method: "sales.sales.sales.doctype.flat_invoice.flat_invoice.charges",
                    callback: function(r) {
                        if(!r.exc) {
                        }
                    }
                })
            }
        }
