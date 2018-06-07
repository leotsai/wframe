var mvcApp = require('../../mvcApp.js');

var api = {
	getUsers: function(callback){
		mvcApp.ajax.busyPost('/app/demo/get-users', null, function(result){
			callback(result.value);
		}, '加载中...', true);
	}
};
if(getApp().mock){
	api = {
		getUsers: function (callback) {
			setTimeout(function(){
				function createUser(id, name, gender, birthYear){
					return {
						id: id,
						name: name,
						gender: gender,
						birthYear: birthYear
					};
				}
				var list = [];
				list.push(createUser(1,'mike', 'male', 1992));
				list.push(createUser(2, 'jam', 'male', 1992));
				list.push(createUser(3, 'jason', 'male', 1987));
				list.push(createUser(4, 'harry', 'female', 1985));
				list.push(createUser(5, 'lucy', 'female', 1989));
				list.push(createUser(10, 'lily', 'female', 1991));
				list.push(createUser(12, 'ganrry', 'female', 1992));
				list.push(createUser(21, 'shirlley', 'female', 1990));
				list.push(createUser(28, 'jack', 'male', 1991));
				list.push(createUser(49, 'vaccub', 'male', 1987));
				list.push(createUser(51, 'vasson', 'male', 1987));
				list.push(createUser(67, 'laura', 'female', 1992));
				list.push(createUser(102, 'linda', 'female', 1992));
				list.push(createUser(298, 'vivian', 'female', 1990));
				list.push(createUser(389, 'luke', 'male', 1991));
				callback(list);
			}, 1000);
		}
	};
}

module.exports = api;