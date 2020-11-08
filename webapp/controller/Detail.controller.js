sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.sap.Matser_Detail_App.controller.Detail", {

		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function (evt) {
			// this.getView().setBusy(true);
			this.oDataModel = this.getOwnerComponent().getModel();
			this.LocalModel = new sap.ui.model.json.JSONModel({
				EmpAddrItems: [],
				EmpExpItems: []
			});
			this.getView().setModel(this.LocalModel, "LocalModel");

			this.key = "/" + evt.getParameter("arguments").EmpId;
			this.getView().bindElement({
				path: this.key,
				parameters: {
					"expand": "to_EmpAddress,to_EmpExperience"
				}
			});

			// this.getView().byId("mTblEmpAdr").bindItems({
			// 	path: this.key + "/to_EmpAddress",
			// 	template: this.getTemplate()
			// });
			// this.fetchLineItem();
		},

		getTemplate: function () {
			var oTemplate = new sap.m.ColumnListItem({
				vAlign: "Middle",
				cells: [
					new sap.m.Text({
						text: "{zemp_id}"
					}),
					new sap.m.Input({
						value: "{zemp_addr_street}"
					}),
					new sap.m.Input({
						value: "{zemp_addr_city}"
					}),
					new sap.m.Input({
						value: "{zemp_addr_state}"
					}),
					new sap.m.Input({
						value: "{zemp_addr_region}"
					}),
					new sap.m.Input({
						value: "{zemp_addr_country}"
					})
				]
			});

			return oTemplate;

		},

		//fetch data for expaned line item
		fetchLineItem: function () {
			var oEntitySet = this.key,
				urlParameters = {
					"$expand": "NAV_EMPLOYEEHEADERTOITEM,Nav_EmployeeExperience"
				},
				fnSuccess, fnError;

			fnSuccess = function (oData) {
				this.LocalModel.setProperty("/EmpAddrItems", oData.NAV_EMPLOYEEHEADERTOITEM.results);
				this.LocalModel.setProperty("/EmpExpItems", oData.Nav_EmployeeExperience.results);
			}.bind(this);

			fnError = function (err) {
				sap.m.MessageToast.show("Unknown Error Occured!.");
			};

			this.oDataModel.read(oEntitySet, {
				urlParameters: urlParameters,
				success: fnSuccess,
				error: fnError
			});
		},

		//adding the new entry for employee addrs items
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

		onPrsBtnSave: function () {
			this.oDataModel.submitChanges({
				success: function (oData) {
					sap.m.MessageToast.show("Success");
				},
				error: function (err) {
					sap.m.MessageToast.show("Error");
				}
			});
		},

		//Saving the deep entity complex structure for Employee address information
		onPrsBtnSave1: function () {
			var PayLoadObj = {},
				fnSuccess,
				fnError,
				oEntitySet = "/EmployeeHeaderSet";

			PayLoadObj.EmployeeID = this.oDataModel.getProperty(this.key).EmployeeID;
			PayLoadObj.EmployeeName = this.oDataModel.getProperty(this.key).EmployeeName;
			PayLoadObj.EmployeeMobile = this.oDataModel.getProperty(this.key).EmployeeMobile;
			PayLoadObj.EmployeeAge = this.oDataModel.getProperty(this.key).EmployeeAge;
			PayLoadObj.EmployeePosition = this.oDataModel.getProperty(this.key).EmployeePosition;
			PayLoadObj.NAV_EMPLOYEEHEADERTOITEM = this.LocalModel.getProperty("/EmpAddrItems");
			PayLoadObj.Nav_EmployeeExperience = this.LocalModel.getProperty("/EmpExpItems");

			fnSuccess = function (oData) {
				sap.m.MessageToast.show("Employee Address Information has been created successfuly.");
			};

			fnError = function (err) {
				sap.m.MessageToast.show("Unknown Error Occured!.");
			};

			this.oDataModel.create(oEntitySet, PayLoadObj, {
				success: fnSuccess,
				error: fnError
			});
		}

	});

});