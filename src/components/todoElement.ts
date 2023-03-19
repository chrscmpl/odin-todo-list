import Todo from '../dataObjects/Todo';

export default function buildTodoBox(todo: Todo) {
	const todoBox = document.createElement('div');
	todoBox.className = 'todo-box';

	const { checkbox, todoSection, editButton, deleteButton } =
		buildElements(todo);

	todoBox.appendChild(checkbox);
	todoBox.appendChild(todoSection);
	todoBox.appendChild(editButton);
	todoBox.appendChild(deleteButton);

	return { todoBox, checkbox, todoSection, editButton, deleteButton };
}

function buildElements(todo: Todo) {
	return {
		checkbox: buildCheckbox(todo),
		todoSection: buildTodoSection(todo),
		editButton: buildEditButton(),
		deleteButton: buildDeleteButton(),
	};
}

function buildTodoSection(todo: Todo): HTMLElement {
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

function buildCheckbox(todo: Todo): HTMLElement {
	const checkboxSection = document.createElement('div');
	checkboxSection.className =
		'todo-checkbox-section stretch-content bg-300 round bordered-primary-100';
	const checkbox = document.createElement('input');
	checkbox.setAttribute('type', 'checkbox');
	checkbox.className = 'todo-checkbox round';
	checkbox.checked = todo.checked;
	checkboxSection.appendChild(checkbox);
	return checkboxSection;
}

function buildEditButton(): HTMLElement {
	const editButton = document.createElement('button');
	editButton.setAttribute('type', 'button');
	editButton.className = 'todo-edit-button bg-300 round bordered-primary-100';
	editButton.innerHTML =
		'<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><title>edit</title><path d="M480 936v-71l216-216 71 71-216 216h-71ZM120 726v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120 561v-60h470v60H120Zm0-165v-60h470v60H120Z"/></svg>';
	return editButton;
}

function buildDeleteButton(): HTMLElement {
	const deleteButton = document.createElement('button');
	deleteButton.setAttribute('type', 'button');
	deleteButton.className =
		'todo-delete-button bg-300 round bordered-primary-100';
	deleteButton.innerHTML =
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>';
	return deleteButton;
}

function buildShownSection(todo: Todo): HTMLElement {
	const shownSection = document.createElement('div');
	shownSection.className = `todo-shown flexbox-column fw-b color-text-200`;
	addField(shownSection, 'todo-title', todo.title);
	addField(
		shownSection,
		'todo-dueDate',
		`<span class="todo-date-field">${todo.dueDate.toLocaleString([], {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})}</span>`
	);
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
	child.innerHTML = textContent;
	element.appendChild(child);
}
