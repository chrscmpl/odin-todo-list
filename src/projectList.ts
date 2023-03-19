import Project from './dataObjects/Project';
import EventHandler from './eventHandler';
import buildProjectElement from './components/projectElement';

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

	public addProject(project: Project, selected: boolean): void {
		const element: HTMLElement = buildProjectElement(project);
		element.addEventListener('click', () =>
			EventHandler.getEventHandler().projectSelection(element, project)
		);
		if (selected)
			EventHandler.getEventHandler().projectSelection(element, project);
		this.element.appendChild(element);
	}

	public fill(selectedProject?: Project) {
		this.element.innerHTML = '';
		this.projects.forEach(project =>
			this.addProject(project, project == selectedProject)
		);
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
