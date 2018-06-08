var mvcApp = require('../../mvcApp.js');
var DemoPageBase = require('../DemoPageBase.js');
var IndexViewModel = require('IndexViewModel.js');

function IndexPage() {
	DemoPageBase.call(this, 'index');
};

IndexPage.prototype = new DemoPageBase();

IndexPage.prototype.onPreload = function(options){
	this.vm = new IndexViewModel(this);
	this.render();
};

IndexPage.prototype.ready = function () {
	var me = this;
	this.vm.load();
};

IndexPage.prototype.goDetails = function (e) {
	var item = e.target.dataset.item;
	wx.navigateTo({
		url: '/pages/details/details?id=' + item.id
	});
};

Page(new IndexPage());
