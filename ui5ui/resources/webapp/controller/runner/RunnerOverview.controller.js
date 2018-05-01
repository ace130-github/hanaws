sap.ui.define([
	"sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  'sap/ui/model/Filter',
  'sap/ui/model/FilterOperator'
], function(Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("ui5ui.controller.runner.RunnerOverview", {

		onInit: function() {
			this.getView().setModel(new JSONModel(), 'search');
		},

		formatGenderIconURI: function(genderValue) {
			if (genderValue === 'M') {
				return 'sap-icon://customer';
			} else if (genderValue === 'W') {
				return 'sap-icon://physical-activity';
			} else {
				return 'sap-icon://sys-help';
			}
		},
		
		onPressRunner: function(event) {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("detail", {
				runnerPath: event.getSource().getBindingContext("db").getPath().substring(1) // cut off the leading '/' which is not legal in a route parameter
			});
		},
		
		onSearch: function (event) {
			var view = this.getView();
			var searchTerm = view.getModel('search').getProperty('/searchTerm');
			var filter = new Filter('name', FilterOperator.Contains, searchTerm);
			var runnerList = view.byId('runnerList');
			runnerList.getBinding('items').filter([filter]);

    }
	});
});