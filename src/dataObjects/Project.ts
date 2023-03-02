import Todo, { TodoData } from './Todo';

export interface ProjectData {
	title: string;
	todoList?: TodoData[];
}

export default class Project {
	private TodoList: Todo[] = [];

	private Title = '';

	public constructor(project: ProjectData) {
		this.title = project.title;
		this.todoList = project.todoList?.map(todo => new Todo(todo)) ?? [];
	}

	public toData(): ProjectData {
		return {
			title: this.title,
			todoList: this.todoList.map(todo => todo.toData()),
		};
	}

	public remove(todo: Todo): boolean {
		const oldLenght = this.todoList.length;
		this.todoList = this.todoList.filter(todos => todos !== todo);
		return oldLenght !== this.todoList.length;
	}

	public get todoList(): Todo[] {
		return this.TodoList;
	}

	public set todoList(value: Todo[]) {
		this.TodoList = value;
	}

	public get title(): string {
		return this.Title;
	}

	public set title(value: string) {
		this.Title = value;
	}
}
