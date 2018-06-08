var mvcApp = require('mvcApp.js');
var Application = require('_core/Application.js');

function MvcApplication() {
	Application.call(this);
	this.initUrl = 'https://www.somdomain.com/api/client-config/get?key=wx_applet_wframe';
	this.host = 'http://localhost:18007';
	this.confgis = {
		host: 'http://localhost:18007',
		cdn: 'https://images.local-dev.cdn.somedomain.com'
	};
	this.mock = true;
	this.accessToken = null;
	this.useDefaultConfigsOnInitFailed = false;
};

MvcApplication.prototype = new Application();

MvcApplication.prototype.onInitialized = function (configs) {
	if (configs != null && configs !== '') {
		this.configs = JSON.parse(configs);
		this.host = this.configs.host;
	}
};

App(new MvcApplication());