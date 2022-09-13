import './todo';

export default class TodoData {
	constructor(todo) {
		Object.keys(todo).forEach(key => {
			if (typeof todo[key] !== 'function') this[key] = todo[key];
		});
	}
}
