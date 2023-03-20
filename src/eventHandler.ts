import showDeletePopup from './components/deletePopup';
import ProjectList from './projectList';
import showTodoCompilationPopup from './components/todoCompilationPopup';
import TodoList from './todoList';
import DAO from './DataAccessObject';
import Project, { ProjectData } from './dataObjects/Project';
import Todo from './dataObjects/Todo';
import showProjectCompilationPopup from './components/projectCompilationPopup';
import sampleData from './sample.json';

export default class EventHandler {
	private static instance: EventHandler | null = null;
	private projects: Project[];
	private currentProject: Project;
	private todoList: TodoList;
	private projectList: ProjectList;

	private constructor(
		projects: Project[],
		currentProject: Project,
		todoList: TodoList,
		projectList: ProjectList
	) {
		this.projects = projects;
		this.currentProject = currentProject;
		this.todoList = todoList;
		this.projectList = projectList;
	}

	public static buildEventHandler(
		projects: Project[],
		currentProject: Project,
		todoList: TodoList,
		projectList: ProjectList
	) {
		if (!this.instance)
			this.instance = new EventHandler(
				projects,
				currentProject,
				todoList,
				projectList
			);
		return this.instance;
	}

	public static getEventHandler() {
		if (!this.instance)
			throw new Error('EventHandler was not built before being used');
		return this.instance;
	}

	public projectSelection(selectedProject: Element, project: Project): void {
		this.projectList.element
			.querySelector('.project-selected')
			?.classList.remove('project-selected');
		selectedProject.classList.add('project-selected');
		this.todoList.fill(project);
		this.currentProject = project;
	}

	public todoSelection(selectedTodo: Element): void {
		if (selectedTodo.classList.contains('todo-checked')) return;
		if (selectedTodo.classList.contains('todo-selected')) {
			selectedTodo.classList.remove('todo-selected');
			return;
		}
		this.todoList.element
			.querySelector('.todo-selected')
			?.classList.remove('todo-selected');
		selectedTodo.classList.add('todo-selected');
	}

	public todoChecked(todo: Todo, checkedTodo: Element): void {
		todo.toggleChecked();
		checkedTodo.classList.toggle('todo-checked');
		DAO.storeProjects(this.projects);
		this.todoList.fill(this.currentProject);
		this.projectList.fill(this.currentProject);
	}

	public deleteTodo(todo: Todo, todoElement: HTMLElement): void {
		showDeletePopup().then(result => {
			if (!result) return;
			this.currentProject.remove(todo);
			todoElement.remove();
			DAO.storeProjects(this.projects);
			this.todoList.fill(this.currentProject);
			this.projectList.fill(this.currentProject);
		});
	}

	public editTodo(todo: Todo): void {
		showTodoCompilationPopup(todo).then(newTodo => {
			if (!(newTodo instanceof Todo)) return;
			Object.assign(todo, newTodo);
			DAO.storeProjects(this.projects);
			this.todoList.fill(this.currentProject);
		});
	}

	public addTodo() {
		console.log(this.currentProject);
		showTodoCompilationPopup().then(newTodo => {
			if (!(newTodo instanceof Todo)) return;
			this.currentProject.todoList.push(newTodo);
			DAO.storeProjects(this.projects);
			this.todoList.fill(this.currentProject);
			this.projectList.fill(this.currentProject);
		});
	}

	private getTodoAddBtnSize(addBtn: HTMLElement) {
		const clientHeight =
			addBtn.previousElementSibling?.querySelector('.todo')?.clientHeight;
		const clientWidth =
			addBtn.previousElementSibling?.querySelector('.todo')?.clientWidth;
		return {
			height: clientHeight ? `${clientHeight}px` : '90px',
			width: clientWidth ? `${clientWidth}px` : '80%',
		};
	}

	public resizeTodoAddBtn(addBtn: HTMLElement) {
		const size = this.getTodoAddBtnSize(addBtn);
		addBtn.style.height = size.height;
		addBtn.style.width = size.width;
	}

	public addProject() {
		showProjectCompilationPopup().then(result => {
			if (!result) return;
			const newProject = new Project({ title: result });
			this.projects.push(newProject);
			DAO.storeProjects(this.projects);
			this.projectList.fill(newProject, this.projects);
		});
	}

	public editProject(project: Project) {
		showProjectCompilationPopup(project).then(result => {
			if (!result) return;
			project.title = result;
			DAO.storeProjects(this.projects);
			this.projectList.fill(this.currentProject, this.projects);
		});
	}

	public deleteProject(project: Project, projectElement: HTMLElement): void {
		showDeletePopup().then(result => {
			if (!result) return;
			this.projects = this.projects.filter(aProject => aProject !== project);
			projectElement.remove();

			if (project === this.currentProject) {
				this.currentProject = this.projects[0];
				if (this.currentProject)
					this.projectList.fill(this.currentProject, this.projects);
				else this.todoList.element.innerHTML = '';
			}
			DAO.storeProjects(this.projects);
		});
	}

	private randomInt(max: number) {
		return Math.floor(Math.random() * max);
	}

	public startSampleMode(btn: HTMLButtonElement) {
		DAO.enable(false);
		const sampleProjects: Project[] = (sampleData as ProjectData[]).map(
			project => new Project(project)
		);
		sampleProjects.forEach(project =>
			project.todoList.forEach(todo => {
				todo.dueDate = new Date();
				todo.dueDate.setDate(todo.dueDate.getDate() + this.randomInt(90));
				todo.dueDate.setHours(this.randomInt(23), this.randomInt(59));
			})
		);
		this.projects = sampleProjects;
		this.currentProject = sampleProjects[0];
		this.projectList.fill(this.currentProject, this.projects);
		btn.remove();
	}
}
