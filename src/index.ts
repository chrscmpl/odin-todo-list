import 'normalize.css';
import './index.css';
import Todo from './dataObjects/Todo';
import Project from './dataObjects/Project';

const todo = new Todo({
	title: 'Hello',
	description: 'World',
	notes: '!',
	checked: true,
	dueDate: new Date('2022-12-25'),
	priority: 'high',
});
console.log(todo);

const project = new Project({ title: 'default project', todoList: [] });
project.todoList.push(todo);
console.log(project);
