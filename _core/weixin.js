
var weixin = {
	_busyTimer: null,
	_busyDelay: 1500,
	toast: function (message, icon) {
		wx.showToast({
			title: message,
			icon: icon == null || icon == '' ? 'none' : icon
		});
	},
	toastSuccess: function (message) {
		this.toast(message, 'success');
	},
	busy: function (option, delay) {
		clearTimeout(this._busyTimer);
		if (option === false) {
			wx.hideLoading();
			return;
		}
		if (delay === 0) {
			wx.showLoading({
				title: option,
				mask: true
			});
		}
		else {
			this._busyTimer = setTimeout(function () {
				wx.showLoading({
					title: option,
					mask: true
				});
			}, delay == null ? this._busyDelay : delay);
		}
	},
	alert: function (title, content, callback) {
		content = content == undefined ? '' : content;
		wx.showModal({
			title: title,
			content: content,
			showCancel: false,
			confirmText: "确定",
			success: res => {
				callback && callback();
			}
		});
	},
	confirm: function (title, content, buttons) {
		var buttonList = [];
		for (var p in buttons) {
			if (buttons.hasOwnProperty(p)) {
				buttonList.push({
					text: p,
					handler: buttons[p]
				})
			}
		}
		content = content == undefined ? '' : content;
		wx.showModal({
			title: title,
			content: content,
			showCancel: true,
			cancelText: buttonList[0].text,
			confirmText: buttonList[1].text,
			success: res => {
				if (res.confirm) {
					buttonList[1].handler && buttonList[1].handler();
				} else if (res.cancel) {
					buttonList[0].handler && buttonList[0].handler();
				}
			}
		});
	}
};

module.exports = weixin;