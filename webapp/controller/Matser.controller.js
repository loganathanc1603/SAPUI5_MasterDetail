sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.sap.Matser_Detail_App.controller.Matser", {

		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
		},

		onAfterRendering: function () {
			// this.oRouter.navTo("Create", {}, true);
		},

		onBeforeRendering: function () {
			var obj = {};
		},

		onExit: function () {
			var obj = {};
		},

		onSelectionChange: function (evt) {
			var oEmpId = evt.getParameter("listItem").getBindingContextPath().substr(1);
			this.oRouter.navTo("Detail", {
				EmpId: oEmpId
			}, true);
		},

		onPrsBtnAddEmp: function () {
			this.oRouter.navTo("Create", {}, true);
		},

		onPrsBtnFileUpload: function () {
			this.oRouter.navTo("FileUpload", {}, true);
		},

		onSearch: function (evt) {
			var sQuery = evt.getParameter("query"),
				oBindings = this.byId("mListId").getBinding("items"),
				aFilters = [];
			if (sQuery) {
				aFilters.push(new sap.ui.model.Filter("EmployeeID", sap.ui.model.FilterOperator.Contains, sQuery));
			}
			oBindings.filter(aFilters);
		}

	});

});