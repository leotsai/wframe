
var WebClient = require('_core/http/WebClient.js');
var ArrayExtensions = require('_core/extensions/ArrayExtensions.js');

var mvcApp = {
	weixin: require('_core/weixin.js'),
	ajax: {
		busyPost: function (url, data, callback, busyText, onlyCallbackOnSuccess) {
			var app = getApp();
			var client = new WebClient();
			if (app.accessToken != null) {
				client.setHeader("X-ACCESSTOKEN", app.accessToken);
			}
			client.post(app.host + url, data, callback, busyText, onlyCallbackOnSuccess);
		}
	},
	serializeToKeyValues: function (obj, prefix) {
		var me = this;
		var text = '';
		prefix = prefix == null ? "" : prefix;
		for (var p in obj) {
			if (!obj.hasOwnProperty(p)) {
				continue;
			}
			var value = obj[p];
			if (value instanceof Array) {
				for (var i = 0; i < value.length; i++) {
					text += "&" + me.serializeToKeyValues(value[i], prefix + p + "[" + i + "].");
				}
			}
			else if (typeof value === "object") {
				text += me.serializeToKeyValues(value, prefix + p + ".");
			}
			else if (typeof value !== "function") {
				text += "&" + prefix + p + "=" + value;
			}
		}
		if (text.indexOf("&") === 0) {
			text = text.substr(1);
		}
		return text;
	}
};

module.exports = mvcApp;