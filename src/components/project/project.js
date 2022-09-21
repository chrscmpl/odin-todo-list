import './project.css';

export default function Project(projectData) {
	const project = document.createElement('div');
	project.className = 'project';

	const name = document.createElement('span');
	name.className = 'project-name';
	name.textContent = projectData.name;
	project.appendChild(name);

	const length = document.createElement('span');
	length.className = 'project-length';
	length.textContent = projectData.todo.length;
	project.appendChild(length);

	return project;
}
