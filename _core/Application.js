var WebClient = require('http/WebClient.js');
var AuthorizeManager = require('weixin/AuthorizeManager.js');
var weixin = require('weixin.js');


function Application() {
	this.initUrl = '';
	this.host = '';
	this.session = null;
	this.initialized = false;
	this.mock = false;
	this.useDefaultConfigsOnInitFailed = false;
	this.authorizeManager = new AuthorizeManager();
	this._userInfo = null;
	this._readyHandlers = [];
};

Application.prototype = {
	onLaunch: function () {
		var me = this;
		if(this.initUrl === ''){
			throw 'please create YourOwnApplication class in app.js that inerits from Application class and provide initUrl in constructor';
		}
		var client = new WebClient();
		client.post(this.initUrl, null, function(result){
			if (result.success || me.useDefaultConfigsOnInitFailed){
				me.initialized = true;
				me.onInitialized(result.success ? result.value : null);
				me.triggerReady();
			}
			else{
				weixin.alert('小程序初始化失败', result.message);
			}
		}, '初始化中...');
	},
	onShow: function () {

	},
	onHide: function () {

	},
	onError: function () {

	},
	onPageNotFound: function () {

	},
	ready: function (callback) {
		var me = this;
		if (this.initialized === true) {
			callback && callback();
			return;
		}
		this._readyHandlers.push(callback);
	},
	triggerReady: function () {
		for (var i = 0; i < this._readyHandlers.length; i++) {
			var callback = this._readyHandlers[i];
			callback && callback();
		}
		this._readyHandlers = [];
	},
	onInitialized: function(configs){

	},
	getUserInfo: function(callback){
		var me = this;
		if(this._userInfo != null){
			callback && callback(this._userInfo.userInfo);
			return;
		}
		this.authorizeManager.getUserInfo(function(result){
			me._userInfo = result;
			callback && callback(me._userInfo.userInfo);
		});
	},
	getCurrentPage: function(){
		var pages = getCurrentPages();
		return pages.length > 0 ? pages[0] : null;
	}
};

module.exports = Application;