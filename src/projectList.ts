import Project from './dataObjects/Project';
import EventHandler from './eventHandler';
import buildProjectBox from './components/projectElement';
import buildAddButton from './components/addButton';

export default class ProjectList {
	private _element = document.createElement('div');
	private _projects: Project[] = [];

	public constructor(projects: Project[]) {
		this.projects = projects;
		this.buildElement();
	}

	public refreshElement(): HTMLElement {
		this.element.remove();
		return this.buildElement();
	}

	private buildElement(): HTMLElement {
		this.element = document.createElement('div');
		this.element.className = 'project-list flexbox-column';
		return this.element;
	}

	private buildAddButton(): HTMLElement {
		const addBtn = buildAddButton();
		addBtn.addEventListener('click', () =>
			EventHandler.getEventHandler().addProject()
		);
		const height = this.element.querySelector('.project')?.clientHeight ?? 20;
		addBtn.style.height = `${height}px`;
		addBtn.style.width = '100%';
		return addBtn;
	}

	public addProject(project: Project, selected: boolean): void {
		const projectElement = buildProjectBox(project);
		projectElement.projectSection.addEventListener('click', () =>
			EventHandler.getEventHandler().projectSelection(
				projectElement.projectBox,
				project
			)
		);
		projectElement.deleteButton.addEventListener('click', () =>
			EventHandler.getEventHandler().deleteProject(
				project,
				projectElement.projectBox
			)
		);
		projectElement.editButton.addEventListener('click', () =>
			EventHandler.getEventHandler().editProject(project)
		);
		if (selected)
			EventHandler.getEventHandler().projectSelection(
				projectElement.projectBox,
				project
			);
		this.element.appendChild(projectElement.projectBox);
	}

	public fill(selectedProject?: Project, projects?: Project[]) {
		this.element.innerHTML = '';
		if (projects) this.projects = projects;
		this.projects.forEach(project =>
			this.addProject(project, project == selectedProject)
		);
		this.element.appendChild(this.buildAddButton());
	}

	public get element() {
		return this._element;
	}
	private set element(value) {
		this._element = value;
	}
	public get projects(): Project[] {
		return this._projects;
	}
	public set projects(value: Project[]) {
		this._projects = value;
	}
}
