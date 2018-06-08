var mvcApp = require('../mvcApp.js');

var api = {
	login: function (userInfo, code, callback) {
		var data = mvcApp.serializeToKeyValues(userInfo) + "&code=" + code;
		mvcApp.ajax.busyPost('/demo/api/login', data, function(result){
			callback(result.value);
		}, '登陆中...', true);
	}
};
if (getApp().mock) {
	var api = {
		login: function (userInfo, code, callback) {
			setTimeout(function(){
				callback({
					token: '98c2f1bd7beb3bef3b796a5ebf32940498cb5586ddb4a5aa8e'
				});
			}, 2000);
		}
	};
}

module.exports = api;