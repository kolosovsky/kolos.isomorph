const MILLISECONDS_PER_SECOND = 1000;
const MILLISECONDS_PER_MINUTE = 60 * MILLISECONDS_PER_SECOND;
const MILLISECONDS_PER_HOUR = 60 * MILLISECONDS_PER_MINUTE;
const MILLISECONDS_PER_DAY = 24 * MILLISECONDS_PER_HOUR;

export class Countdown {
	days?: number;
	hours?: number;
	minutes?: number;
	seconds?: number;

	protected interval: any;
	protected milliseconds: number;
	protected tickCallbacks = new Set();
	protected finishCallbacks = new Set();

	constructor(params: ICountdownParams) {
		this.milliseconds = params.milliseconds;

		this.run();
	}

	run() {
		this.interval = setInterval(() => {
			this.tick();
		}, MILLISECONDS_PER_SECOND);
	}

	pause() {
		this.clearInterval();
	}

	destroy() {
		this.clearInterval();

		this.tickCallbacks.clear();
		this.finishCallbacks.clear();
	}

	clearInterval() {
		clearInterval(this.interval);

		this.interval = null;
	}

	tick() {
		this.milliseconds = Math.max(this.milliseconds - MILLISECONDS_PER_SECOND, 0);

		let milliseconds = this.milliseconds;

		this.days = Math.floor(milliseconds / MILLISECONDS_PER_DAY);

		milliseconds -= this.days * MILLISECONDS_PER_DAY;

		this.hours = Math.floor(milliseconds / MILLISECONDS_PER_HOUR);

		milliseconds -= this.hours * MILLISECONDS_PER_HOUR;

		this.minutes = Math.floor(milliseconds / MILLISECONDS_PER_MINUTE);

		milliseconds -= this.minutes * MILLISECONDS_PER_MINUTE;

		this.seconds = Math.floor(milliseconds / MILLISECONDS_PER_SECOND);

		for (let callback of this.tickCallbacks) {
			callback();
		}

		if (this.milliseconds === 0) {
			this.clearInterval();

			for (let callback of this.finishCallbacks) {
				callback();
			}
		}
	}

	addTickCallback(callback) {
		this.tickCallbacks.add(callback);
	}

	removeTickCallback(callback) {
		this.tickCallbacks.delete(callback);
	}

	addFinishCallback(callback) {
		this.finishCallbacks.add(callback);
	}

	removeFinishCallback(callback) {
		this.finishCallbacks.delete(callback);
	}
}

export interface ICountdownParams {
	milliseconds: number;
}