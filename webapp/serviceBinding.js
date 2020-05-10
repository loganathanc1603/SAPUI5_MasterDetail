function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZFLM_WORKID_MAINT_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}