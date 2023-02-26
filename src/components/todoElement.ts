import Todo from '../dataObjects/Todo';

export default function buildTodoElement(todo: Todo): HTMLElement {
	const todoElement = document.createElement('div');

	todoElement.className = `todo round bg-300 fw-m flexbox-column ${
		todo.priority
	}-priority ${todo.checked ? 'todo-checked' : ''} ${
		todo.dueDate.getTime() < new Date().getTime() ? 'todo-overdue' : ''
	}`;
	todoElement.appendChild(buildShownSection(todo));
	todoElement.appendChild(buildHiddenSection(todo));
	todoElement.appendChild(buildExpandArrow());
	return todoElement;
}

function buildShownSection(todo: Todo): HTMLElement {
	const shownSection = document.createElement('div');
	shownSection.className = `todo-shown flexbox-column fw-b color-text-200`;
	addField(shownSection, 'todo-title', todo.title);
	addField(shownSection, 'todo-dueDate', todo.dueDate.toLocaleString());
	return shownSection;
}

function buildHiddenSection(todo: Todo): HTMLElement {
	const hiddenSection = document.createElement('div');
	hiddenSection.className = `todo-hidden flexbox-column fw-m`;
	addField(hiddenSection, 'todo-priority', `Priority: ${todo.priority}`);
	if (todo.description)
		addField(hiddenSection, 'todo-description', todo.description);
	if (todo.notes) addField(hiddenSection, 'todo-notes fw-n', todo.notes);
	return hiddenSection;
}

function buildExpandArrow() {
	const expandArrow = document.createElement('div');
	expandArrow.className = 'todo-expand-arrow centered-box';
	expandArrow.innerHTML =
		'<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 1060 960" width="48"><path d="M480 711 240 471l43-43 197 198 197-197 43 43-240 239Z"/></svg>';
	return expandArrow;
}

function addField(
	element: HTMLElement,
	className: string,
	textContent: string
): void {
	const child = document.createElement('div');
	child.className = className;
	child.textContent = textContent;
	element.appendChild(child);
}
