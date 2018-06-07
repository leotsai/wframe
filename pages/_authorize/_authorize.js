var DemoPageBase = require('../DemoPageBase.js');


function AuthPage() {
	DemoPageBase.call(this, 'auth');
	this.requireLogin = false;
};

AuthPage.prototype = new DemoPageBase();

AuthPage.prototype.onPreload = function (options) {
	this.returnUrl = decodeURIComponent(options.returnUrl);
};

AuthPage.prototype.onGotUserInfo = function (event) {
	var me = this;
	if (event.detail.userInfo == null) {
		return;
	}
	var app = getApp();
	app._userInfo = event.detail;
	DemoPageBase.prototype.login.call(this, app._userInfo.userInfo, function () {
		me.go(me.returnUrl, false);
	})
}

Page(new AuthPage())