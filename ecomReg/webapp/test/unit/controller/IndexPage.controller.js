/*global QUnit*/

sap.ui.define([
	"ink/trng/proj/ecomReg/controller/IndexPage.controller"
], function (Controller) {
	"use strict";

	QUnit.module("IndexPage Controller");

	QUnit.test("I should test the IndexPage controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});