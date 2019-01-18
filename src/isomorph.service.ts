export class IsomorphService {
	toArr(obj) {
		let arr = [];

		if (obj) {
			if (Array.isArray(obj)) {
				arr = Array.from(obj);
			} else {
				for (let key in obj) {
					arr.push(obj[key]);
				}
			}
		}

		return arr;
	}

	async sleep(delay = 0) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, delay);
		});
	}

	isDefined(value) {
		return typeof value !== 'undefined';
	}

	isObject(value) {
		const type = typeof value;

		return value != null && (type === 'object' || type === 'function');
	}

	loop(num, func) {
		for (let i = 0; i < num; i++) {
			func(i);
		}
	}

	loopReverse(num, func) {
		for (let i = num; i > 0; i--) {
			func(i);
		}
	}

	delFromList(list, elem) {
		if (Array.isArray(list)) {
			this.delFromArr(list, elem);
		} else {
			for (let key in list) {
				let objElem = list[key];

				if (objElem === elem) {
					delete list[key];
					break;
				}
			}
		}
	}

	inList(list, val) {
		let result;

		if (Array.isArray(list)) {
			result = (list.indexOf(val) > -1) ? true : false;
		} else {
			for (let key in list) {
				if (list[key] === val) {
					result = true;
					break;
				}
			}
		}

		return result;
	}

	delFromArr(arr: any[], elem) {
		const index = arr.indexOf(elem);

		if (index !== -1) {
			arr.splice(index, 1);
		}
	}

	getFirstProp(list) {
		return list[this.getFirstKey(list)];
	}

	getFirstKey(list) {
		return Array.isArray(list) ? 0 : Object.keys(list)[0];
	}

	getKeyByValue(obj, value) {
		for (let key in obj) {
			if (obj[key] === value) {
				return key;
			}
		}
	};

	isEven(num) {
		return num % 2 === 0;
	}

	makeUnixTimeStamp(date) {
		return Math.round(+date / 1000);
	}

	getMonthName(date) {
		return date.toLocaleString('en-us', {month: 'long'});
	}

	capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	clearList(list) {
		if (!list) { return; }

		if (Array.isArray(list)) {
			list.length = 0;
		} else {
			for (let key in list) {
				delete list[key];
			}
		}
	}
	
	mergeSets(set1: Set<any>, set2: Set<any>) {
		for (let elem of set2) {
			set1.add(elem);
		}
	}
}


