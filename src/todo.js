export default class Todo {
	constructor({
		title,
		description = '',
		dueDate = '',
		priority = '',
		notes = '',
		checked = false,
	} = {}) {
		if (!title) throw new Error('cannot instantiate todo with no title');
		Object.assign(this, {
			title,
			description,
			dueDate,
			priority,
			notes,
			checked,
		});
	}
}
