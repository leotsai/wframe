var ArrayExtensions = {};

Array.prototype._each = function (func) {
	for (var i = 0; i < this.length; i++) {
		var item = this[i];
		var result = func(i, item);
		if (result === false) {
			return;
		}
	}
};

Array.prototype._sum = function (propertyOrFunc) {
	var total = 0;
	var isFunc = typeof (propertyOrFunc) == "function";
	this._each(function (i, item) {
		if (isFunc) {
			total += propertyOrFunc(item);
		} else {
			var value = item[propertyOrFunc];
			if (value != undefined) {
				value = value * 1;
				if (!isNaN(value)) {
					total += value;
				}
			}
		}
	});
	return total;
};

Array.prototype._where = function (predicateFunction) {
	var results = new Array();
	this._each(function (i, item) {
		if (predicateFunction(item)) {
			results.push(item);
		}
	});
	return results;
};

Array.prototype._orderBy = function (property, isFirstGreaterThanSecondFunction) {
	var items = this;
	for (var i = 0; i < items.length - 1; i++) {
		for (var j = 0; j < items.length - 1 - i; j++) {
			if (isFirstGreaterThanSecond(items[j], items[j + 1])) {
				var temp = items[j + 1];
				items[j + 1] = items[j];
				items[j] = temp;
			}
		}
	}
	function isFirstGreaterThanSecond(first, second) {
		if (isFirstGreaterThanSecondFunction != undefined) {
			return isFirstGreaterThanSecondFunction(first, second);
		}
		else if (property == undefined || property == null) {
			return first > second;
		}
		else {
			return first[property] > second[property];
		}
	}

	return items;
};

Array.prototype._orderByDescending = function (property, isFirstGreaterThanSecondFunction) {
	var items = this;
	for (var i = 0; i < items.length - 1; i++) {
		for (var j = 0; j < items.length - 1 - i; j++) {
			if (!isFirstGreaterThanSecond(items[j], items[j + 1])) {
				var temp = items[j + 1];
				items[j + 1] = items[j];
				items[j] = temp;
			}
		}
	}
	function isFirstGreaterThanSecond(first, second) {
		if (isFirstGreaterThanSecondFunction != undefined) {
			return isFirstGreaterThanSecondFunction(first, second);
		}
		else if (property == undefined || property == null) {
			return first > second;
		}
		else {
			return first[property] > second[property];
		}
	}

	return items;
};

Array.prototype._groupBy = function (property) {
	var results = [];
	var items = this;

	var keys = {}, index = 0;
	for (var i = 0; i < items.length; i++) {
		var selector;
		if (typeof property === "string") {
			selector = items[i][property];
		} else {
			selector = property(items[i]);
		}
		if (keys[selector] === undefined) {
			keys[selector] = index++;
			results.push({ key: selector, value: [items[i]] });
		} else {
			results[keys[selector]].value.push(items[i]);
		}
	}
	return results;
};

Array.prototype._skip = function (count) {
	var items = new Array();
	for (var i = count; i < this.length; i++) {
		items.push(this[i]);
	}
	return items;
};

Array.prototype._take = function (count) {
	var items = new Array();
	for (var i = 0; i < this.length && i < count; i++) {
		items.push(this[i]);
	}
	return items;
};

Array.prototype._firstOrDefault = function (predicateFunction) {
	if (this.length == 0) {
		return null;
	}
	if (predicateFunction == undefined) {
		return this[0];
	}
	var foundItem = null;
	this._each(function (i, item) {
		if (predicateFunction(item)) {
			foundItem = item;
			return false;
		}
		return true;
	});
	return foundItem;
};

Array.prototype._any = function (predicateFunction) {
	if (predicateFunction == undefined) {
		return this.length > 0;
	}
	var hasAny = false;
	this._each(function (i, item) {
		if (predicateFunction(item)) {
			hasAny = true;
			return false;
		}
		return true;
	});
	return hasAny;
};

Array.prototype._select = function (newObjectFunction) {
	if (newObjectFunction == undefined) {
		throw "parameter newObjectFunction cannot be null or undefined";
	}
	var items = [];
	this._each(function (i, item) {
		items.push(newObjectFunction(item));
	});
	return items;
};

Array.prototype._insert = function (index, item) {
	this.splice(index, 0, item);
};

Array.prototype._insertMany = function (index, items) {
	if (items == null) {
		return;
	}
	for (var i = 0; i < items.length; i++) {
		this._insert(index + i, items[i]);
	}
};

Array.prototype._add = function (item) {
	this.push(item);
};

Array.prototype._addMany = function (items) {
	if (items == null) {
		return;
	}
	for (var i = 0; i < items.length; i++) {
		this.push(items[i]);
	}
};

Array.prototype._clear = function () {
	this.splice(0, this.length);
};

Array.prototype._count = function (predicateFunction) {
	var count = 0;
	this._each(function (i, item) {
		if (predicateFunction(item)) {
			count++;
		}
	});
	return count;
};


/************************************** */
module.exports = ArrayExtensions;