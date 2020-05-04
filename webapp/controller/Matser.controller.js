sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.sap.Matser_Detail_App.controller.Matser", {

		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
		},

		onSelectionChange: function (evt) {
			var oEmpId = evt.getParameter("listItem").getBindingContextPath().substr(1);
			this.oRouter.navTo("Detail", {EmpId:oEmpId}, true);
		},
		
		onSearch: function(){
			
		}

	});

});