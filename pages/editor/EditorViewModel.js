

function EditorViewModel(page, id){
	this.page = page;
	this.id = id;
	this.product = null;
	this.name = 'editor vm';
};

EditorViewModel.prototype = {
	getEditData: function () {
		var me = this;
		setTimeout(function () {
			me.product = {
				id: me.id,
				name: '新品五粮液500mL 52度 浓香型',
				price: 1099.00,
				imageUrl: 'https://www.domedomain.com2/images/sksuwjsuwj-sjsas-dasdk.jpg'
			}
			me.page.render();
		}, 2000);
	}
};

module.exports = EditorViewModel;