sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function (Controller, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("com.sap.Matser_Detail_App.controller.FileUpload", {

		onInit: function () {
			this.oDataModel = this.getOwnerComponent().getModel("FU");
			this.fnFetchDocumentsList();
		},

		//fetching the document list
		fnFetchDocumentsList: function () {
			var oEntitySet = "/AttachmentSet",
				aFilters = [],
				fnSuccess,
				fnError,
				fileUpload = this.byId("mUpId"),
				tempObj,
				Data = [],
				fileModel = new sap.ui.model.json.JSONModel();

			aFilters.push(new sap.ui.model.Filter("AdminID", sap.ui.model.FilterOperator.EQ, "O4100000376"));

			fnSuccess = function (oData) {
				for (var i = 0; i < oData.results.length; i++) {
					tempObj = {};
					tempObj.documentId = oData.results[i].Guid;
					tempObj.fileName = oData.results[i].FileName;
					tempObj.Reason = oData.results[i].Reason;
					var u = "AttachmentSet(AdminID='O4100000376',FileName='" + oData.results[i].FileName +
						"',Guid='" + oData.results[i].Guid + "')/$value";
					tempObj.url = "/sap/opu/odata/sap/ZFLM_WORKID_MAINT_SRV/" + u;
					tempObj.CreatedDate = oData.results[i].CreatedDate;
					tempObj.CreatedTime = oData.results[i].CreatedTime;
					tempObj.CreatedBy = oData.results[i].CreatedBy;
					Data.push(tempObj);
				}
				fileModel.setData(Data);
				fileUpload.setModel(fileModel, "fileModel");
			};

			fnError = function (err) {
				MessageBox.show("Error Occurred!.", MessageBox.Icon.ERROR, "Error");
			};

			this.oDataModel.read(oEntitySet, {
				filters: aFilters,
				success: fnSuccess,
				error: fnError
			});
		},

		// change function once document uploaded from file upload collection control
		onChange: function (evt) {
			var oPurpose = this.byId("mTaPurpose").getValue();
			if (oPurpose === "") {
				MessageBox.show("Please enter the purpose.", MessageBox.Icon.ERROR, "Error");
				return;
			}

			var oFileUpload = evt.getSource(),
				oModel = this.getOwnerComponent().getModel("FU"),
				fileName = evt.mParameters.files[0].name;
			oModel.refreshSecurityToken();

			//setting the header token
			var oCustHeader = new sap.m.UploadCollectionParameter({
				name: "x-csrf-token",
				value: oModel.getSecurityToken()
			});
			//adding the header to upload collection
			oFileUpload.addHeaderParameter(oCustHeader);

			//setting the slug parameter to the file upload collection
			var oCustomerHeaderSlug = new sap.m.UploadCollectionParameter({
				name: "slug",
				value: fileName + ";O4100000376;" + oPurpose
			});

			//adding the slug parameter in file upload collection
			oFileUpload.addHeaderParameter(oCustomerHeaderSlug);
		},

		//Once the process is compelete[ saved or went error] it will trigger this function
		onComplete: function (evt) {
			if (evt.getParameter("files")[0].status == "201") {
				MessageBox.show("File Uploaded Successfully", MessageBox.Icon.SUCCESS, "Success");
				this.fnFetchDocumentsList();
			}
		}
	});

});