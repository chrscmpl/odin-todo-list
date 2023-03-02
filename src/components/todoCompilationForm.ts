import Todo from '../dataObjects/Todo';

export default function buildTodoCompilationForm(todo?: Todo) {
	const form = document.createElement('form');
	form.className = 'todo-form';

	const title = buildTitleInput(todo?.title);
	const dueDate = buildDueDateInput(todo?.dueDate);
	const priority = buildPriorityInput(todo?.priority);
	const description = buildDescriptionInput(todo?.description);
	const notes = buildNotesInput(todo?.notes);

	form.appendChild(title);
	form.appendChild(dueDate);
	form.appendChild(priority);
	form.appendChild(description);
	form.appendChild(notes);

	return { form, title, dueDate, priority, description, notes };
}

function buildTitleInput(title = ''): HTMLInputElement {
	const titleInput = document.createElement('input');
	titleInput.setAttribute('type', 'text');
	titleInput.setAttribute('value', title);
	titleInput.setAttribute('name', 'title');
	titleInput.className = 'todo-title-input';
	return titleInput;
}

function buildDueDateInput(dueDate = new Date()): HTMLInputElement {
	const dueDateInput = document.createElement('input');
	dueDateInput.setAttribute('type', 'date');
	dueDateInput.setAttribute('name', 'dueDate');
	dueDateInput.className = 'todo-dueDate-input';
	dueDateInput.valueAsDate = dueDate;
	return dueDateInput;
}

function buildPriorityInput(priority = 'medium'): HTMLElement {
	const priorityInput = document.createElement('section');
	priorityInput.className = 'todo-priority-input';

	priorityInput.appendChild(buildRadioBox('low'));
	priorityInput.appendChild(buildRadioBox('medium'));
	priorityInput.appendChild(buildRadioBox('high'));

	for (const radioBox of priorityInput.children)
		if (radioBox.getAttribute('value') === priority)
			(radioBox as HTMLInputElement).checked = true;

	return priorityInput;
}

function buildRadioBox(boxPriority: string): HTMLInputElement {
	const radioBox = document.createElement('input');
	radioBox.setAttribute('type', 'radio');
	radioBox.setAttribute('name', 'priority');
	radioBox.setAttribute('value', boxPriority);
	radioBox.className = `priority-radio-box`;
	return radioBox;
}

function buildDescriptionInput(description = ''): HTMLTextAreaElement {
	const descriptionInput = document.createElement('textarea');
	descriptionInput.setAttribute('name', 'description');
	descriptionInput.className = 'todo-description-input';
	descriptionInput.textContent = description;
	return descriptionInput;
}

function buildNotesInput(notes = ''): HTMLTextAreaElement {
	const notesInput = document.createElement('textarea');
	notesInput.setAttribute('name', 'notes');
	notesInput.className = 'todo-notes-input';
	notesInput.textContent = notes;
	return notesInput;
}
