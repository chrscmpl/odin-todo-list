import Todo from '../dataObjects/Todo';

export default function buildTodoElement(todo: Todo): HTMLElement {
	const todoElement = document.createElement('div');
	todoElement.className = `todo round bg-300 fw-m flexbox-row-space-between ${
		todo.priority
	}-priority ${todo.checked ? 'checked' : ''}`;
	todoElement.innerHTML = `<span>${
		todo.title
	}</span><span>${todo.dueDate.toLocaleString()}</span>`;
	return todoElement;
}
