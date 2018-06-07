console.log("PageBae.js entered");

const app = getApp();

function PageBase(title) {
	this.vm = null;
	this.title = title;
	this.requireLogin = true;
};

PageBase.prototype = {
	onLoad: function (options) {
		var me = this;
		if (this.title != null) {
			this.setTitle(this.title);
		}
		this.onPreload(options);
		app.ready(function () {
			if (me.requireLogin && app.session == null) {
				app.getUserInfo(function (info) {
					me.login(info, function (session) {
						app.session = session;
						me.ready(options);
					});
				});
			}
			else {
				me.ready(options);
			}
		});
	},
	ready: function (options) {

	},
	onPreload: function(options){

	},
	render: function () {
		var data = {};
		for (var p in this.vm) {
			var value = this.vm[p];
			if (!this.vm.hasOwnProperty(p)) {
				continue;
			}
			if (value == null || typeof (value) === 'function') {
				continue;
			}
			if (value.__route__ != null) {
				continue;
			}
			data[p] = this.vm[p];
		}
		this.setData(data);
	},
	go: function (url, addToHistory) {
		if (addToHistory === false) {
			wx.redirectTo({ url: url });
		}
		else {
			wx.navigateTo({ url: url });
		}
	},
	goBack: function () {
		wx.navigateBack({});
	},
	setTitle: function (title) {
		this.title = title;
		wx.setNavigationBarTitle({ title: this.title });
	},
	login: function (userInfo, callback) {
		throw 'please implement PageBase.login method.';
	},
	getFullUrl: function () {
		var url = this.route.indexOf('/') === 0 ? this.route : '/' + this.route;
		var parts = [];
		for (var p in this.options) {
			if (this.options.hasOwnProperty(p)) {
				parts.push(p + "=" + this.options[p]);
			}
		}
		if (parts.length > 0) {
			url += "?" + parts.join('&');
		}
		return url;
	},
	isCurrentPage: function(){
		return this === getApp().getCurrentPage();
	}
};

PageBase.extend = function (prototypeObject) {
	var fn = new PageBase();
	for (var p in prototypeObject) {
		fn[p] = prototypeObject[p];
	}
	return fn;
};

module.exports = PageBase;