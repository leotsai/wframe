var weixin = require('../weixin.js');



function AuthorizeManager() {
	this.pageUrl = '/pages/_authorize/_authorize';
};

AuthorizeManager.scopes = {
	userInfo: 'scope.userInfo'
};

AuthorizeManager.prototype = {
	authorize: function (scope, callback) {
		var me = this;
		me._isAuthorized(scope, function (authorized) {
			if (authorized) {
				callback();
			}
			else {
				me._showAuthorize(scope, callback);
			}
		});
	},
	getUserInfo: function (callback) {
		var me = this;
		var scope = AuthorizeManager.scopes.userInfo;
		function handleAuthorized() {
			wx.getUserInfo({
				success: function (res) {
					callback && callback(res);
				},
				fail: function (res) {
					var url = getApp().getCurrentPage().getFullUrl();
					wx.redirectTo({
						url: me.pageUrl + "?returnUrl=" + encodeURIComponent(url)
					});
				}
			})
		};
		me.authorize(scope, handleAuthorized);
	},
	_isAuthorized: function (scope, callback) {
		wx.getSetting({
			success: function (res) {
				callback(res.authSetting[scope] === true);
			}
		});
	},
	_showAuthorize: function (scope, callback) {
		var me = this;
		wx.authorize({
			scope: scope,
			success: function () {
				callback();
			},
			fail: function (res) {
				if (scope === AuthorizeManager.scopes.userInfo) {
					callback();
				}
				else {
					me._openAuthorizeSetting(scope, callback);
				}
			}
		})
	},
	_openAuthorizeSetting: function (scope, calback) {
		var me = this;
		weixin.alert('提示', '您需要授权才能继续操作', function () {
			wx.openSetting({
				success: function (res) {
					if (!res.authSetting[scope]) {
						me._openAuthorizeSetting(scope, callback);
					} else {
						callback && callback();
					}
				}
			})
		});
	}
};

module.exports = AuthorizeManager;
