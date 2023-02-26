import Project from '../dataObjects/Project';
import Todo from '../dataObjects/Todo';

export default function buildProjectElement(project: Project): HTMLElement {
	const projectElement = document.createElement('div');
	projectElement.className =
		'project round bg-300 fw-m flexbox-row-space-between';
	projectElement.textContent = project.title;
	projectElement.appendChild(buildSizeIndicator(project));
	return projectElement;
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
