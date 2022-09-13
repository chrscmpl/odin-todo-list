import './todo.css';
import '../../todo-list/todo-data';

function Field(name, content) {
	const field = document.createElement('span');
	field.className = name;
	field.textContent = content;
	return field;
}

export default function Todo(todoData) {
	const todo = document.createElement('div');
	todo.classList = 'todo';

	Object.keys(todoData).forEach(key =>
		todo.appendChild(Field(key, todoData[key]))
	);

	return todo;
}
