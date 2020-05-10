sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("com.sap.Matser_Detail_App.controller.Create", {

		onInit: function () {
			this.oDataModel = this.getOwnerComponent().getModel();
			this.LocalModel = new JSONModel({
				iBusy: false,
				iBusyDelay: 10,
				EmpAddrItems: [],
				EmpExpItems: []
			});
			this.getView().setModel(this.LocalModel, "LocalModel");
		},

		onPrsBtnAddEmpAdr: function () {
			var Obj = {
				EmployeeID: this.getView().byId("mIpEmpId").getValue(),
				EmployeeAddrStreet: "",
				EmployeeAddrCity: "",
				EmployeeAddrState: "",
				EmployeeAddrRegion: "",
				EmployeeAddrCountry: ""
			};

			var items = this.LocalModel.getProperty("/EmpAddrItems");
			items.push(Obj);
			this.LocalModel.refresh();
		},

		onPrsBtnAddEmpExp: function () {
			var Obj = {
				EmployeeID: this.getView().byId("mIpEmpId").getValue(),
				EmpCompanyCode: "",
				EmpCompanyLocation: "",
				EmpExperience: "",
				EmpCompanyName: ""
			};

			var items = this.LocalModel.getProperty("/EmpExpItems");
			items.push(Obj);
			this.LocalModel.refresh();
		},

		onPrsBtnSave: function () {
			var PayLoadObj = {},
				fnSuccess,
				fnError,
				oEntitySet = "/EmployeeHeaderSet";

			PayLoadObj.EmployeeID = this.getView().byId("mIpEmpId").getValue();
			PayLoadObj.EmployeeName = this.getView().byId("mIpEmpNam").getValue();
			PayLoadObj.EmployeeMobile = this.getView().byId("mIpEmpMob").getValue();
			PayLoadObj.EmployeeAge = this.getView().byId("mIpEmpAge").getValue();
			PayLoadObj.EmployeePosition = this.getView().byId("mIpEmpPos").getValue();
			PayLoadObj.NAV_EMPLOYEEHEADERTOITEM = this.LocalModel.getProperty("/EmpAddrItems");
			PayLoadObj.Nav_EmployeeExperience = this.LocalModel.getProperty("/EmpExpItems");

			fnSuccess = function (oData) {
				var msg = "Employee Information (" + oData.EmployeeID + " ) has been created successfully.";
				sap.m.MessageToast.show(msg);
			}.bind(this);

			fnError = function (err) {
				sap.m.MessageToast.show("Unknown Error Occured!.");
			}.bind(this);

			this.oDataModel.create(oEntitySet, PayLoadObj, {
				success: fnSuccess,
				error: fnError
			});
		}

	});

});