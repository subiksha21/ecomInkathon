/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ink/trng/proj/ecomReg/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});