import Todo from '../dataObjects/Todo';

export default function buildTodoCompilationForm(todo?: Todo) {
	const form = document.createElement('form');
	form.className = 'todo-form flexbox-column';

	const title = buildSection(buildTitleInput, 'title', 'Title', todo?.title);
	const dueDate = buildSection(
		buildDueDateInput,
		'dueDate',
		'Due date',
		todo?.dueDate
	);
	const priority = buildPrioritySection(todo?.priority);
	const description = buildSection(
		buildDescriptionInput,
		'description',
		'Description',
		todo?.description
	);
	const notes = buildSection(buildNotesInput, 'notes', 'Notes', todo?.notes);

	form.appendChild(title.section);
	form.appendChild(dueDate.section);
	form.appendChild(priority);
	form.appendChild(description.section);
	form.appendChild(notes.section);

	return {
		form,
		title: title.input,
		dueDate: dueDate.input,
		priority: priority,
		description: description.input,
		notes: notes.input,
	};
}

function buildSection(
	inputBuilder: (arg0: any) => HTMLInputElement | HTMLTextAreaElement,
	name: string,
	labelText: string,
	defaultValue?: any
) {
	const section = document.createElement('section');
	const label = buildLabel(labelText, name);
	const input = inputBuilder(defaultValue);
	section.className = `todo-${name}-section todo-form-section flexbox-row-space-between`;
	section.appendChild(label);
	section.appendChild(input);
	return { section, input };
}

function buildLabel(
	textContent: string,
	forAttribute: string
): HTMLLabelElement {
	const label = document.createElement('label');
	label.setAttribute('for', forAttribute);
	label.className = `todo-${forAttribute}-label`;
	label.textContent = textContent;
	return label;
}

function buildTitleInput(title = ''): HTMLInputElement {
	const titleInput = document.createElement('input');
	titleInput.setAttribute('type', 'text');
	titleInput.setAttribute('value', title);
	titleInput.setAttribute('name', 'title');
	titleInput.className = 'todo-title-input bg-200 color-text-100';
	return titleInput;
}

function buildDueDateInput(dueDate = new Date()): HTMLInputElement {
	const dueDateInput = document.createElement('input');
	dueDateInput.setAttribute('type', 'date');
	dueDateInput.setAttribute('name', 'dueDate');
	dueDateInput.className = 'todo-dueDate-input bg-200 color-text-100';
	dueDateInput.valueAsDate = dueDate;
	return dueDateInput;
}

function buildPrioritySection(priority = 'medium'): HTMLElement {
	const priorityInput = document.createElement('section');
	priorityInput.className = 'todo-priority-input flexbox-row-space-between';

	priorityInput.appendChild(buildLabel('Priority', 'priority'));
	priorityInput.appendChild(buildRadioBox('low'));
	priorityInput.appendChild(buildRadioBox('medium'));
	priorityInput.appendChild(buildRadioBox('high'));

	for (const radioBox of priorityInput.querySelectorAll("input[type='radio']"))
		if (radioBox.getAttribute('value') === priority)
			(radioBox as HTMLInputElement).checked = true;

	return priorityInput;
}

function buildRadioBox(boxPriority: string): HTMLElement {
	const section = document.createElement('div');
	const radioBox = document.createElement('input');
	radioBox.setAttribute('type', 'radio');
	radioBox.setAttribute('name', 'priority');
	radioBox.setAttribute('value', boxPriority);
	radioBox.className = 'priority-radio-box';
	section.appendChild(buildLabel(boxPriority, boxPriority));
	section.appendChild(radioBox);
	section.className = 'priority-radio-box-section flexbox-row';
	return section;
}

function buildDescriptionInput(description = ''): HTMLTextAreaElement {
	const descriptionInput = document.createElement('textarea');
	descriptionInput.setAttribute('name', 'description');
	descriptionInput.className = 'todo-description-input bg-200 color-text-100';
	descriptionInput.textContent = description;
	return descriptionInput;
}

function buildNotesInput(notes = ''): HTMLTextAreaElement {
	const notesInput = document.createElement('textarea');
	notesInput.setAttribute('name', 'notes');
	notesInput.className = 'todo-notes-input bg-200 color-text-100';
	notesInput.textContent = notes;
	return notesInput;
}
