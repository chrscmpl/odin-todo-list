export default class Todo {
	constructor({
		title,
		description = '',
		dueDate = '',
		priority = 'normal',
		notes = '',
		checked = false,
	} = {}) {
		if (!title) throw new Error('cannot instantiate todo with no title');
		if (!this.#validPriority(priority))
			throw new Error('Invalid priority level');
		Object.assign(this, {
			title,
			description,
			dueDate,
			priority,
			notes,
			checked,
		});
	}

	#validPriority(priority) {
		const levels = Object.keys(this.priorityLevels);
		for (let i = 0; i < levels.length; i++)
			if (priority === this.priorityLevels[levels[i]]) return true;
		return false;
	}
}

Todo.prototype.priorityLevels = {
	low: 'low',
	normal: 'normal',
	high: 'high',
};
