var PageBase = require('../_core/PageBase.js');
var api = require('api.js');
const app = getApp();

function DemoPageBase(title) {
	PageBase.call(this, title);
};

DemoPageBase.prototype = new PageBase();

DemoPageBase.prototype.login = function (userInfo, callback) {
	var me = this;
	wx.login({
		success: function (res) {
			api.login(userInfo, res.code, function(value){
				app.accessToken = value.token;
				callback && callback(value);
			});
		}
	});
};


module.exports = DemoPageBase;