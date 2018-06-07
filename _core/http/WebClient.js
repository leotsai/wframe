var weixin = require('../weixin.js');

function WebClient() {
	this.busyText = null;
	this.busyDelay = 1500;
	this.url = '';
	this.data = null;
	this.method = 'GET';
	this.contentType = 'application/x-www-form-urlencoded';
	this.dataType = 'json';
	this.onlyCallbackOnSuccess = false;
	this._request = null;
	this._callback = null;
	this._header = {};
};

WebClient.prototype = {
	setHeader: function(key, value){
		this._header[key] = value;
	},
	removeHeader: function(key){
		delete this.header[key];
	},
	get: function (url, callback, busyText, onlyCallbackOnSuccess){
		this.method = 'GET';
		this.url = url;
		this.data = null;
		this._callback = callback; 
		this.busyText = busyText;
		this.onlyCallbackOnSuccess = onlyCallbackOnSuccess == null ? false : onlyCallbackOnSuccess;
		this.execute();
	},
	post: function (url, data, callback, busyText, onlyCallbackOnSuccess) {
		this.method = 'POST';
		this.url = url;
		this.data = data;
		this._callback = callback;
		this.busyText = busyText;
		this.onlyCallbackOnSuccess = onlyCallbackOnSuccess == null ? false : onlyCallbackOnSuccess;
		this.execute();
	},
	execute: function () {
		var me = this;
		if (this.busyText != null && this.busyText !== '') {
			weixin.busy(me.busyText, me.busyDelay);
		}
		this._request = wx.request({
			url: me.url,
			data: me.data,
			method: me.method,
			header: me._getRequestHeader(),
			success: (response) => {
				if (me.busyText != null) {
					weixin.busy(false);
				}
				me._onResponse(response);
			},
			fail: res => {
				if (me.busyText != null) {
					weixin.busy(false);
				}
				me._handleError({ statusCode: 500 });
			}
		});
	},
	_getRequestHeader: function(){
		var header = {};
		if(this.contentType != null && this.contentType !== ''){
			header['content-type'] = this.contentType;
		}
		for(var p in this._header){
			if(this._header.hasOwnProperty(p)){
				header[p] = this._header[p];
			}
		}
		return header;
	},
	_onResponse: function (response) {
		if (response.statusCode === 200) {
			if (this.onlyCallbackOnSuccess === false) {
				this._callback && this._callback(response.data);
			} else {
				if (response.data.success === true) {
					this._callback && this._callback(response.data);
				} else {
					weixin.alert("提示", response.data.message);
				}
			}
		}
		else {
			this._handleError(response);
		}
	},
	_handleError: function (response) {
		if (response.statusCode === 0 && err.statusText === "abort") {
			return;
		}
		if (this.onlyCallbackOnSuccess) {
			weixin.alert("网络错误", "错误码：" + response.statusCode);
		} else {
			this._callback && this._callback({
				success: false,
				message: "网络错误：" + response.statusCode,
				code: response.statusCode
			});
		}
	}
};

module.exports = WebClient;

