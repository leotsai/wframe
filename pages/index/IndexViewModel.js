var api = require('api.js');
var mvcApp = require('../../mvcApp.js');

function IndexViewModel(page){
	this.users = [];
	this.showLoading = true;
	this.males = 0;
	this.females = 0;
	this.page = page;
};

IndexViewModel.prototype.load = function(){
	var me = this;
	api.getUsers(function(users){
		me.showLoading = false;
		me.females = users._count(function(x){
			return x.gender === 'female';
		});
		me.males = users._count(function (x) {
			return x.gender === 'male';
		});
		me.users = users._orderByDescending(null, function(first, second){
			if(first.gender === 'male'){
				if(second.gender === 'male'){
					return first.birthYear > second.birthYear;
				}
				return true;
			}
			if(second.gender === 'female'){
				return first.birthYear > second.birthYear;
			}
			return false;
		});
		me.page.render();
	});
};

module.exports = IndexViewModel;