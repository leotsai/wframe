// pages/editor/editor.js

var PageBase = require('../../_core/PageBase.js');
var EditorViewModel = require('EditorViewModel.js');

function EditorPage() {
	PageBase.call(this, 'editor page');
}

EditorPage.prototype = PageBase.extend({
	onLoad: function(options){
		this.vm = new EditorViewModel(this, options.id);
		this.vm.getEditData();
		PageBase.prototype.onLoad.call(this);
	},
	goSave: function () {
		this.go('../details/details?id=' + this.vm.id);
	}
});

// EditorPage.prototype = new PageBase();
// var pro = EditorPage.prototype;

// pro.onLoad = function (options) {
// 	this.vm = new EditorViewModel(this, options.id);
// 	this.vm.getEditData();
// 	PageBase.prototype.onLoad.call(this);
// };

// pro.goSave = function () {
// 	this.go('../details/details?id=' + this.vm.id);
// };

Page(new EditorPage());
