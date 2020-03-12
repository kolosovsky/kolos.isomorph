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
		return new NativePromise((resolve) => {
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

	getLast(arr: any[]) {
		return arr[arr.length - 1];
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

	makeUnixTimeStamp(date = new Date()) {
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

	counters = {};

	counter(name: string, silently?: boolean) {
		if (this.counters[name]) {
			this.counters[name]++;
		} else {
			this.counters[name] = 1;
		}

		let message = `counter ${name}: ${this.counters[name]}`;

		if (!silently) {
			console.log(message);
		}

		return message;
	}

	logState(obj: any) {
		console.log(JSON.parse(JSON.stringify(obj)));
	}

	randomIntFromInterval(min, max) { // min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	randomArrElem(arr: any[]) {
		return arr[this.randomIntFromInterval(0, arr.length - 1)];
	}

	escapeHTML(html: string) {
		// https://github.com/lodash/lodash/blob/9d11b48ce5758df247607dc837a98cbfe449784a/escape.js

		const htmlEscapes = {
			'&': '&amp',
			'<': '&lt',
			'>': '&gt',
			'"': '&quot',
			"'": '&#39'
		};

		/** Used to match HTML entities and HTML characters. */
		const reUnescapedHtml = /[&<>"']/g;
		const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

		return (html && reHasUnescapedHtml.test(html))
			? html.replace(reUnescapedHtml, (chr) => htmlEscapes[chr])
			: html;
	}
}
