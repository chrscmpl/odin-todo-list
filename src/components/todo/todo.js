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

	const showBtn = document.createElement('button');
	showBtn.className = 'todo-show-btn';
	showBtn.setAttribute('type', 'button');
	showBtn.textContent = 'show';
	showBtn.addEventListener('click', () => todo.classList.toggle('show-hidden'));
	todo.appendChild(showBtn);

	return todo;
}
