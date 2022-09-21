import './todo.css';

function Field(name, content) {
	const field = document.createElement('span');
	field.className = name;
	field.textContent = content;
	return field;
}

export default function Todo(todoData) {
	const todo = document.createElement('div');
	todo.classList = 'todo';

	const shown = document.createElement('div');
	shown.classList = 'todo-shown';
	todo.appendChild(shown);

	const hidden = document.createElement('div');
	hidden.classList = 'todo-hidden';
	todo.appendChild(hidden);

	Object.keys(todoData).forEach(key => {
		switch (key) {
			case 'title':
			case 'dueDate':
				shown.appendChild(Field(key, todoData[key]));
				break;

			case 'description':
			case 'notes':
				hidden.appendChild(Field(key, todoData[key]));
				break;

			case 'checked':
				todo.classList.add(todoData[key] ? 'checked' : 'not-checked');
				break;

			case 'priority':
				todo.classList.add(todoData[key]);
				break;

			default:
				throw new Error('Invalid field');
		}
	});

	const showBtn = document.createElement('div');
	showBtn.innerHTML =
		'<svg xmlns="http://www.w3.org/2000/svg" height="38" width="48"><path d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z"/></svg>';
	showBtn.className = 'todo-show-btn';
	todo.appendChild(showBtn);

	todo.addEventListener(
		'click',
		function () {
			this.classList.toggle('show-hidden');
		}.bind(todo)
	);

	return todo;
}
