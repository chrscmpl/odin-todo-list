import Project from './dataObjects/Project';
import Todo from './dataObjects/Todo';
import EventHandler from './eventHandler';
import buildAddButton from './components/addButton';
import buildTodoElement from './components/todoElement';

export default class TodoList {
	private _element: HTMLElement = document.createElement('div');
	private _project!: Project;

	public constructor(project: Project) {
		this.buildElement();
		this.project = project;
	}

	public refreshElement(): HTMLElement {
		this.element.remove();
		return this.buildElement();
	}

	private buildElement(): HTMLElement {
		this.element = document.createElement('div');
		this.element.className = 'todo-list flexbox-column';
		return this.element;
	}

	private buildAddButton(): HTMLElement {
		const addBtn = buildAddButton();
		addBtn.addEventListener('click', () =>
			EventHandler.getEventHandler().addTodo()
		);
		window.addEventListener('resize', () =>
			EventHandler.getEventHandler().resizeTodoAddBtn(addBtn)
		);
		EventHandler.getEventHandler().resizeTodoAddBtn(addBtn);
		return addBtn;
	}

	private addTodo(todo: Todo): void {
		const todoElement = buildTodoElement(todo);
		const todoSection = todoElement.querySelector('.todo')!;
		const checkbox = todoElement.querySelector('.todo-checkbox')!;
		const deleteButton = todoElement.querySelector('.todo-delete-button')!;
		const editButton = todoElement.querySelector('.todo-edit-button')!;
		todoSection.addEventListener('click', () =>
			EventHandler.getEventHandler().todoSelection(todoSection)
		);
		checkbox.addEventListener('change', () => {
			EventHandler.getEventHandler().todoChecked(todo, todoSection);
		});
		deleteButton.addEventListener('click', () => {
			EventHandler.getEventHandler().deleteTodo(todo, todoElement);
		});
		editButton.addEventListener('click', () => {
			EventHandler.getEventHandler().editTodo(todo);
		});
		this.element.appendChild(todoElement);
	}

	public fill(project: Project): void {
		this.element.innerHTML = '';
		project.todoList
			.filter(todo => !todo.checked)
			.forEach(todo => this.addTodo(todo));
		project.todoList
			.filter(todo => todo.checked)
			.forEach(todo => this.addTodo(todo));
		this.element.appendChild(this.buildAddButton());

		this.project = project;
	}

	public get element(): HTMLElement {
		return this._element;
	}

	private set element(value: HTMLElement) {
		this._element = value;
	}

	public get project(): Project {
		return this._project;
	}
	private set project(value: Project) {
		this._project = value;
	}
}
