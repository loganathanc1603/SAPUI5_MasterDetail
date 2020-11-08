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
				var f1 = new sap.ui.model.Filter("zemp_name", sap.ui.model.FilterOperator.Contains, sQuery);
				var f2 = new sap.ui.model.Filter("zemp_id", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(new sap.ui.model.Filter([f1, f2], false));
			}
			oBindings.filter(aFilters);
		},

		onPrsBatchSet: function () {
			this.oDataModel = this.getOwnerComponent().getModel();
			var oPayload = this.getPayload();

			var mParameter = {
				urlParameters: null,
				groupId: "randomgroupid",
				success: function (innerdata) {
					var obj = {};
				},
				error: function (oError) {
					var obj = {};
				}
			};

			var singleentry = {
				groupId: "randomgroupid",
				urlParameters: null,
				success: function (innerdata) {
					sap.m.MessageToast.show("Success");
				},
				error: function (oError) {
					sap.m.MessageToast.show("Error");
				}
			};

			for (var i = 0; i < oPayload.length; i++) {
				singleentry.properties = oPayload[i];
				singleentry.changeSetId = "changeset " + i;
				this.getOwnerComponent().getModel().createEntry("Z_C_EMP('1000000101')/to_EmpAddress", singleentry);
			}

			this.getOwnerComponent().getModel().submitChanges(mParameter);
		},

		getPayload: function () {
			var Obj = {
					"zemp_id": "1000000101",
					"zemp_addr_street": "101",
					"zemp_addr_city": "METTUPALAYAM",
					"zemp_addr_state": "TAMILNADU",
					"zemp_addr_region": "ASIA",
					"zemp_addr_country": "INDIA"
				},
				oTempArry = [];

			oTempArry.push(Obj);

			Obj = {};
			Obj = {
				"zemp_id": "1000000101",
				"zemp_addr_street": "102",
				"zemp_addr_city": "METTUPALAYAM",
				"zemp_addr_state": "TAMILNADU",
				"zemp_addr_region": "ASIA",
				"zemp_addr_country": "INDIA"
			};
			oTempArry.push(Obj);

			return oTempArry;
		},

		onPrsMultipleCreate: function () {
			var oModel = this.getOwnerComponent().getModel(),
				oPayload = this.getPayload(),
				mParameters;

			mParameters = {
				success: function (oData, oResponse) {
					sap.m.MessageToast.show("Success");
				},
				error: function (err) {
					sap.m.MessageToast.show("Error");
				}
			};

			oPayload.forEach(function (oValue) {
				oModel.create("/Z_C_EMP('9200022')/to_EmpAddress", oValue, mParameters);
			}.bind(this));
		},

		onPrsCreateEntry: function () {
			var oModel = this.getOwnerComponent().getModel(),
				oPayload = {},
				fnSuccess,
				fnError;

			oPayload = {
				"zemp_id": "9200022",
				"zemp_name": "ACM_01",
				"zemp_age": "4",
				"zemp_mobile": "1234567890",
				"zemp_position": "Senior Consultant"
			};

			fnSuccess = function (oData, oResponse) {
				sap.m.MessageToast.show("Success");
			};

			fnError = function (err) {
				sap.m.MessageToast.show("Error");
			};

			oModel.createEntry("/Z_C_EMP", {
				properties: oPayload
			});

			oModel.submitChanges({
				success: fnSuccess,
				error: fnError
			});
		}

	});

});