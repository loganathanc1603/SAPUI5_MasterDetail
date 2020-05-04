/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"com/sap/Matser_Detail_App/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"com/sap/Matser_Detail_App/test/integration/pages/App",
	"com/sap/Matser_Detail_App/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "com.sap.Matser_Detail_App.view.",
		autoWait: true
	});
});