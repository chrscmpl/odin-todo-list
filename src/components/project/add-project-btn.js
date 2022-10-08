import './project.css';

export default function addProject(cbFunction) {
	const project = document.createElement('div');
	project.classList.add('project', 'add-project');

	const addBtn = document.createElement('div');
	addBtn.innerHTML =
		'<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>';
	addBtn.className = 'project-add-btn';
	project.appendChild(addBtn);

	project.addEventListener('click', cbFunction);

	return project;
}
