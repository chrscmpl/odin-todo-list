import Todo from './Todo';

interface ProjectData {
	title: string;
	todoList?: Todo[];
}

export default class Project implements ProjectData {
	private _todoList: Todo[] = [];
	private _title: string = '';

	public constructor(project: ProjectData) {
		Object.assign(this, project);
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
