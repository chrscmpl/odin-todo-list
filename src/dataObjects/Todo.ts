export interface TodoData {
	title: string;
	dueDate: string | Date;
	checked: boolean;
	priority: 'low' | 'medium' | 'high';
	description?: string;
	notes?: string;
}

export default class Todo {
	private _title: string = '';
	private _dueDate: Date = new Date();
	private _checked: boolean = false;
	private _priority: 'low' | 'medium' | 'high' = 'low';
	private _description?: string;
	private _notes?: string;

	public constructor(todo: TodoData) {
		Object.assign(this, todo);
	}

	public toData(): TodoData {
		return {
			title: this.title,
			dueDate: this.dueDate,
			checked: this.checked,
			priority: this.priority,
			description: this.description,
			notes: this.notes,
		};
	}

	public get title(): string {
		return this._title;
	}
	public set title(value: string) {
		this._title = value;
	}
	public get dueDate(): Date {
		return this._dueDate;
	}
	public set dueDate(value: Date | string) {
		this._dueDate = typeof value === 'object' ? value : new Date(value);
	}
	public get checked(): boolean {
		return this._checked;
	}
	public set checked(value: boolean) {
		this._checked = value;
	}
	public get priority(): 'low' | 'medium' | 'high' {
		return this._priority;
	}
	public set priority(value: 'low' | 'medium' | 'high') {
		this._priority = value;
	}
	public get description(): string | undefined {
		return this._description;
	}
	public set description(value: string | undefined) {
		this._description = value;
	}
	public get notes(): string | undefined {
		return this._notes;
	}
	public set notes(value: string | undefined) {
		this._notes = value;
	}
}
