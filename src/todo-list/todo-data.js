import './todo';

export default class TodoData {
	constructor(todo) {
		Object.keys(todo).forEach(key => {
			if (this.validFields.some(field => field === key)) this[key] = todo[key];
		});
	}
}

TodoData.prototype.validFields = [
	'title',
	'description',
	'dueDate',
	'priority',
	'notes',
	'checked',
];
