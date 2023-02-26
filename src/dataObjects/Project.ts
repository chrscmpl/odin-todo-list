import Todo, { TodoData } from './Todo';

export interface ProjectData {
	title: string;
	todoList?: TodoData[];
}

export default class Project implements ProjectData {
	private _todoList: Todo[] = [];
	private _title: string = '';

	public constructor(project: ProjectData) {
		Object.assign(this, {
			title: project.title,
			todoList: project?.todoList?.map(todo => new Todo(todo)),
		});
	}

	public get todoList(): Todo[] {
		return this._todoList;
	}
	public set todoList(value: Todo[]) {
		this._todoList = value;
	}
	public get title(): string {
		return this._title;
	}
	public set title(value: string) {
		this._title = value;
	}
}
