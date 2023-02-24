import Project from '../dataObjects/Project';

export default function buildProjectElement(project: Project): HTMLElement {
	const projectElement = document.createElement('div');
	projectElement.className =
		'project round bg-300 fw-m flexbox-row-space-between';
	projectElement.textContent = project.title;
	projectElement.appendChild(buildSizeIndicator(project.todoList.length));
	return projectElement;
}

function buildSizeIndicator(size: number): HTMLElement {
	const sizeIndicator = document.createElement('span');
	sizeIndicator.className =
		'size-indicator circle centered-box primary-100 color-text-300 fw-b';
	sizeIndicator.textContent = size.toString();
	return sizeIndicator;
}
