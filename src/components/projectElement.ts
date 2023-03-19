import Project from '../dataObjects/Project';
import Todo from '../dataObjects/Todo';

export default function buildProjectBox(project: Project) {
	const projectBox = document.createElement('div');
	projectBox.className = 'project-box flexbox-row-space-between-centered fw-m';

	const { deleteButton, editButton, projectSection } = buildElements(project);

	projectBox.appendChild(deleteButton);
	projectBox.appendChild(editButton);
	projectBox.appendChild(projectSection);

	return { projectBox, deleteButton, editButton, projectSection };
}

function buildElements(project: Project) {
	return {
		deleteButton: buildDeleteButton(),
		editButton: buildEditButton(),
		projectSection: buildProjectSection(project),
	};
}

function buildProjectSection(project: Project): HTMLElement {
	const projectElement = document.createElement('div');
	projectElement.className =
		'project round bg-300 flexbox-row-space-between-centered';

	projectElement.appendChild(buildTitle(project));
	projectElement.appendChild(buildSizeIndicator(project));
	return projectElement;
}

function buildTitle(project: Project) {
	const title = document.createElement('span');
	title.className = 'project-title';
	title.textContent = project.title;
	return title;
}

function buildSizeIndicator(project: Project): HTMLElement {
	const sizeIndicator = document.createElement('span');
	sizeIndicator.className =
		'size-indicator circle centered-box primary-100 color-text-300 fw-b';
	sizeIndicator.textContent = project.todoList
		.reduce((prev: number, curr: Todo) => (curr.checked ? prev : prev + 1), 0)
		.toString();
	return sizeIndicator;
}

function buildEditButton(): HTMLElement {
	const editButton = document.createElement('button');
	editButton.setAttribute('type', 'button');
	editButton.className = 'project-edit-button bg-300 round no-border';
	editButton.innerHTML =
		'<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><title>edit</title><path d="M480 936v-71l216-216 71 71-216 216h-71ZM120 726v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120 561v-60h470v60H120Zm0-165v-60h470v60H120Z"/></svg>';
	return editButton;
}

function buildDeleteButton(): HTMLElement {
	const deleteButton = document.createElement('button');
	deleteButton.setAttribute('type', 'button');
	deleteButton.className = 'project-delete-button bg-300 round no-border';
	deleteButton.innerHTML =
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>';
	return deleteButton;
}
