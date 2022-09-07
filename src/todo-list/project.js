import Todo from './todo';

export default class Project {
	constructor(name, ...tds) {
		this.name = name ?? 'Project';
		this.todo = [];
		if (tds) tds.forEach(td => this.push(td));
	}

	push(td) {
		if (!(td instanceof Todo))
			throw new Error('Project can only store todo objects');
		return this.todo.push(td);
	}

	remove(td) {
		const index = this.todo.indexOf(td);
		return index > 0 ? this.todo.splice(index, 1) : null;
	}
}
