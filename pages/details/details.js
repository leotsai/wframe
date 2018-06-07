var mvcApp = require('../../mvcApp.js');
var DemoPageBase = require('../DemoPageBase.js');
var DetailsViewModel = require('DetailsViewModel.js');

function DetailsPage(){
	DemoPageBase.call(this, 'details');
};

DetailsPage.prototype = new DemoPageBase();

DetailsPage.prototype.onPreload = function(options){
	this.vm = new DetailsViewModel();
	this.render();
};

DetailsPage.prototype.ready = function(options){
	
	this.vm.id = options.id;
	this.vm.showLoading = false;
	this.render();
};

DetailsPage.prototype.goEditor = function(){
	this.go('/pages/editor/editor?id=' + this.vm.id)
};

Page(new DetailsPage());